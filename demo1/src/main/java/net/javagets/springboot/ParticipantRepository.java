package net.javagets.springboot;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Integer> {
    // You can add custom queries here if needed later
	@Query("SELECT p.meeting.id FROM Participant p WHERE p.participantEmail = :email")
	List<Integer> findMeetingIdsByParticipantEmail(String email); // ✅ correct

	List<Participant> findByMeetingId(Integer meetingId);
    List<Participant> findByParticipantEmail(String email);
}
