package net.javagets.springboot;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import net.javagets.springboot.repository.EmployeeRepository;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class MeetingService {

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private ParticipantRepository participantRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    // Check if a participant is available during a time range
    public boolean isParticipantAvailable(String participantEmail, LocalDateTime startTime, LocalDateTime endTime) {
        // Find meetings where participant is booked and overlap with given time
        List<Participant> participantMeetings = participantRepository.findByParticipantEmail(participantEmail);

        for (Participant p : participantMeetings) {
        	Optional<Meeting> meetingOpt = Optional.ofNullable(p.getMeeting());
            if (meetingOpt.isPresent()) {
                Meeting m = meetingOpt.get();
                // Check time overlap
                if (!(endTime.isBefore(m.getStartTime()) || startTime.isAfter(m.getEndTime()))) {
                    return false;  // conflict found
                }
            }
        }
        return true;  // no conflicts
    }
    public Meeting createMeetingWithParticipants(Meeting meeting, List<String> participants) throws Exception {
        // Check availability of all participants including organizer
        for (String email : participants) {
            if (!isParticipantAvailable(email, meeting.getStartTime(), meeting.getEndTime())) {
                throw new Exception("Participant " + email + " is not available during the selected time.");
            }
        }

        // Also check the organizer's availability
        if (!isParticipantAvailable(meeting.getOrganizerEmail(), meeting.getStartTime(), meeting.getEndTime())) {
            throw new Exception("Organizer " + meeting.getOrganizerEmail() + " is not available during the selected time.");
        }

        // Save the meeting
        Meeting savedMeeting = meetingRepository.save(meeting);

        // Save organizer as a participant
        Participant organizerParticipant = new Participant();
        organizerParticipant.setMeeting(savedMeeting);
        organizerParticipant.setParticipantEmail(meeting.getOrganizerEmail());
        organizerParticipant.setStartTime(meeting.getStartTime());
        organizerParticipant.setEndTime(meeting.getEndTime());
        participantRepository.save(organizerParticipant);

        // Save each participant
        for (String email : participants) {
            Participant participant = new Participant();
            participant.setMeeting(savedMeeting);
            participant.setParticipantEmail(email);
            participant.setStartTime(meeting.getStartTime());
            participant.setEndTime(meeting.getEndTime());
            participantRepository.save(participant);
        }

        return savedMeeting;
    }

//    public Meeting createMeetingWithParticipants(Meeting meeting, List<String> participants) throws Exception {
//        for (String email : participants) {
//        	
//        	   if (!employeeRepository.existsByEmail(email)) {
//        	        throw new Exception("Participant " + email + " is not a registered employee.");
//        	    }
//
//            if (!isParticipantAvailable(email, meeting.getStartTime(), meeting.getEndTime())) {
//                throw new Exception("Participant " + email + " is not available during the selected time.");
//            }
//        }
//
//        Meeting savedMeeting = meetingRepository.save(meeting);
//
//        for (String email : participants) {
//            try {
//                Participant participant = new Participant();
//                participant.setMeetingId(savedMeeting.getId());
//                participant.setParticipantEmail(email);
//                participantRepository.save(participant);
//            } catch (Exception e) {
//                throw new Exception("Error saving participant: " + email + " → " + e.getMessage());
//            }
//        }
//
//        return savedMeeting;
//    }

    public List<Meeting> getMeetingsForParticipant(String email) {
    	 List<Integer> meetingIds = participantRepository.findMeetingIdsByParticipantEmail(email);

    	    List<Meeting> meetings = meetingRepository.findAllById(meetingIds);

    	    // For each meeting, fetch and attach participants manually
    	    for (Meeting meeting : meetings) {
    	        List<Participant> participants = participantRepository.findByMeetingId(meeting.getId());
    	        meeting.setParticipants(participants); // You must have setParticipants() method
    	    }

    	    return meetings;
    	}
}
