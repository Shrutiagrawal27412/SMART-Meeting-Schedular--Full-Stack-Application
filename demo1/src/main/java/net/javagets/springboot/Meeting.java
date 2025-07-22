package net.javagets.springboot;

import java.time.LocalDateTime;

import java.util.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
@Table(name = "meetings")
	
public class Meeting {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;

	    private String title;
	    private String organizerEmail;
	    private LocalDateTime startTime;
	    private LocalDateTime endTime;
	    private String description;
	    @OneToMany(mappedBy = "meeting", cascade = CascadeType.ALL, orphanRemoval = true)
	    @JsonManagedReference
	    private List<Participant> participants;

	    // Getters and Setters
	    public int getId() {
	        return id;
	    }

	    public void setId(int id) {
	        this.id = id;
	    }

	    public String getTitle() {
	        return title;
	    }

	    public void setTitle(String title) {
	        this.title = title;
	    }

	    public String getOrganizerEmail() {
	        return organizerEmail;
	    }

	    public void setOrganizerEmail(String organizerEmail) {
	        this.organizerEmail = organizerEmail;
	    }

	    public LocalDateTime getStartTime() {
	        return startTime;
	    }

	    public void setStartTime(LocalDateTime startTime) {
	        this.startTime = startTime;
	    }

	    public LocalDateTime getEndTime() {
	        return endTime;
	    }

	    public void setEndTime(LocalDateTime endTime) {
	        this.endTime = endTime;
	    }

	    public String getDescription() {
	        return description;
	    }

	    public void setDescription(String description) {
	        this.description = description;
	    }
	    public List<Participant> getParticipants() {
	        return participants;
	    }

	    public void setParticipants(List<Participant> participants) {
	        this.participants = participants;
	    }
	
}
