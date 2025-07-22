package net.javagets.springboot;
import java.util.*;
import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MeetingRepository extends JpaRepository<Meeting, Integer> {
	@Query("SELECT p.meeting.id FROM Participant p WHERE p.participantEmail = :email")
	List<Integer> findMeetingIdsByParticipantEmail(String email);


    List<Meeting> findByOrganizerEmail(String organizerEmail);
    List<Meeting> findByStartTimeLessThanEqualAndEndTimeGreaterThanEqual(LocalDateTime end, LocalDateTime start);
}