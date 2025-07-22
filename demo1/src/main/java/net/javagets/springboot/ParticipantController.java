package net.javagets.springboot;

import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;

import java.util.*;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ParticipantController {

    @Autowired
    private ParticipantRepository participantRepository;

    @GetMapping("/participants/meeting/{meetingId}")
    public List<Participant> getParticipantsByMeeting(@PathVariable Integer meetingId) {
        return participantRepository.findByMeetingId(meetingId);
    }

    @PostMapping("/participants")
    public Participant addParticipant(@RequestBody Participant participant) {
        return participantRepository.save(participant);
    }

    @DeleteMapping("/participants/{id}")
    public ResponseEntity<Void> deleteParticipant(@PathVariable Integer id) {
        if (participantRepository.existsById(id)) {
            participantRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
