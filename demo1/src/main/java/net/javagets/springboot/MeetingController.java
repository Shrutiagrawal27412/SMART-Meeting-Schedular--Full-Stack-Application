package net.javagets.springboot;

import org.springframework.beans.factory.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class MeetingController {

    @Autowired
    private MeetingService meetingService;
    @Autowired
    private MeetingRepository meetingRepository;

    // Create meeting with participants
    @PostMapping("/meetings")
    public ResponseEntity<?> createMeeting(@RequestBody MeetingRequest request) {
        try {
            Meeting meeting = new Meeting();
            meeting.setTitle(request.getTitle());
            meeting.setOrganizerEmail(request.getOrganizerEmail());
            meeting.setStartTime(request.getStartTime());
            meeting.setEndTime(request.getEndTime());
            meeting.setDescription(request.getDescription());

            Meeting savedMeeting = meetingService.createMeetingWithParticipants(meeting, request.getParticipants());
            return ResponseEntity.ok(savedMeeting);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
//    @PutMapping("/meetings/{id}")
//    public ResponseEntity<?> updateMeeting(@PathVariable Long id, @RequestBody Meeting updatedMeeting) {
//        Optional<Meeting> optionalMeeting = meetingRepository.findAll(id);
//
//        if (optionalMeeting.isPresent()) {
//            Meeting existing = optionalMeeting.get();
//            existing.setTitle(updatedMeeting.getTitle());
//            existing.setDescription(updatedMeeting.getDescription());
////            existing.setDate(updatedMeeting.getDate());
//            existing.setStartTime(updatedMeeting.getStartTime());
//            existing.setEndTime(updatedMeeting.getEndTime());
//            
//
//            meetingRepository.save(existing);
//            return ResponseEntity.ok(existing);
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Meeting not found");
//        }
//    }


    // Get meetings for a participant email
    @GetMapping("/meetings/participant/{email}")
    public ResponseEntity<List<Meeting>> getMeetingsForParticipant(@PathVariable String email) {
        List<Meeting> meetings = meetingService.getMeetingsForParticipant(email);
        return ResponseEntity.ok(meetings);
    }
    @DeleteMapping("/meetings/{id}")
    public ResponseEntity<String> deleteMeeting(@PathVariable Integer id) {
        Optional<Meeting> meetingOpt = meetingRepository.findById(id);

        if (meetingOpt.isPresent()) {
            meetingRepository.deleteById(id);
            return ResponseEntity.ok("Meeting deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Meeting not found.");
        }
    }

    }

