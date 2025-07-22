import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditMeeting() {
  const { id } = useParams(); // get meeting ID from route
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: ''
  });

  useEffect(() => {
    fetch(`http://localhost:8080/api/meetings/${id}`)
      .then(res => res.json())
      .then(data => setMeeting(data))
      .catch(err => console.error('Error loading meeting:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeeting(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/api/meetings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meeting)
    })
      .then(res => {
        if (res.ok) {
          alert('Meeting updated!');
          navigate('/meetings');
        } else {
          alert('Error updating meeting');
        }
      });
  };

  return (
    <div>
      <h2>Edit Meeting</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={meeting.title} onChange={handleChange} placeholder="Title" required />
        <input name="description" value={meeting.description} onChange={handleChange} placeholder="Description" />
        <input name="date" value={meeting.date} onChange={handleChange} type="date" required />
        <input name="time" value={meeting.time} onChange={handleChange} type="time" required />
        <input name="location" value={meeting.location} onChange={handleChange} placeholder="Location" />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditMeeting;
