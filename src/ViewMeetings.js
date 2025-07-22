// ViewMeetings.jsx
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function ViewMeetings() {
  const [meetings, setMeetings] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    const parsed = stored ? JSON.parse(stored) : null;
    setCurrentUser(parsed);

    if (parsed?.email) {
      fetch(`http://localhost:8080/api/meetings/participant/${parsed.email}`)
        .then((res) => res.json())
        .then((data) => {
          setMeetings(data);
        })
        .catch((err) => {
          console.error("Error fetching meetings:", err);
        });
    }
  }, []);

  const handleDelete = async (meetingId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This meeting will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:8080/api/meetings/${meetingId}`, {
          method: "DELETE",
        });

        if (res.ok) {
          Swal.fire("Deleted!", "Meeting has been deleted.", "success");
          setMeetings(meetings.filter((m) => m.id !== meetingId));
        } else {
          Swal.fire("Error", "Failed to delete meeting.", "error");
        }
      } catch (err) {
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  return (
    <div style={{ padding: '2rem', color: '#fff' }}>
      <h2 style={{ color: 'black', alignContent: 'center' }}>Your Meetings</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#0D1B2A', borderRadius: '12px', overflow: 'hidden' }}>
        <thead style={{ background: '#415A77', color: '#fff' }}>
          <tr>
            <th style={{ padding: '0.8rem' }}>Title</th>
            <th style={{ padding: '0.8rem' }}>Date</th>
            <th style={{ padding: '0.8rem' }}>Start Time</th>
            <th style={{ padding: '0.8rem' }}>End Time</th>
            <th style={{ padding: '0.8rem' }}>Participants</th>
            <th style={{ padding: '0.8rem' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting) => {
            const start = new Date(meeting.startTime);
            const end = new Date(meeting.endTime);
            const isOrganizer = meeting.organizerEmail === currentUser?.email;

            return (
              <tr key={meeting.id} style={{ borderBottom: '1px solid #778DA9' }}>
                <td style={{ padding: '0.8rem' }}>{meeting.title}</td>
                <td style={{ padding: '0.8rem' }}>{start.toISOString().split('T')[0]}</td>
                <td style={{ padding: '0.8rem' }}>{start.toTimeString().split(' ')[0].slice(0, 5)}</td>
                <td style={{ padding: '0.8rem' }}>{end.toTimeString().split(' ')[0].slice(0, 5)}</td>
                <td style={{ padding: '0.8rem' }}>
                  <ul>
                   {Array.isArray(meeting.participants) ? (
  meeting.participants.map((p, i) => (
    // <li key={i}>{p.email}</li>
    <li key={i}>{p.participantEmail}</li>

  ))
) : (
  <li style={{ color: '#ccc' }}>No participants</li>
)}

                  </ul>
                </td>
                <td style={{ padding: '0.8rem' }}>
                  {isOrganizer ? (
                    <>
                      <button
                        style={{
                          padding: '0.4rem 0.8rem',
                          marginRight: '0.5rem',
                          background: '#4CAF50',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                        onClick={() => alert('Edit Meeting (TBD)')}
                      >
                        Edit
                      </button>
                      <button
                        style={{
                          padding: '0.4rem 0.8rem',
                          background: '#EF4444',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleDelete(meeting.id)}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <span style={{ color: '#ccc' }}>Participant</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
