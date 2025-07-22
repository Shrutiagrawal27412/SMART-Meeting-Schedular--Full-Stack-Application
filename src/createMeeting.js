import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function CreateMeeting() {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [participants, setParticipants] = useState(['']); // Start with one empty participant input
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const stored = localStorage.getItem('user');
  const currentUser = stored ? JSON.parse(stored) : null;
  const organizerEmail = currentUser?.email;

  function toIso(date, time) {
    return `${date}T${time}:00`;
  }

  const handleAddParticipant = () => {
    setParticipants([...participants, '']);
  };

  const handleParticipantChange = (index, value) => {
    const newParticipants = [...participants];
    newParticipants[index] = value;
    setParticipants(newParticipants);
  };

  const handleRemoveParticipant = (indexToRemove) => {
    setParticipants(participants.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!organizerEmail) {
      Swal.fire({
        title: 'Error!',
        text: 'Organizer email not found. Please log in again.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
      setIsSubmitting(false);
      return;
    }

    // --- Added date/time validation ---
    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(`${date}T${endTime}`);
    const currentDateTime = new Date();

    if (startDateTime >= endDateTime) {
      Swal.fire({
        title: 'Error!',
        text: 'End time must be after start time.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
      setIsSubmitting(false);
      return;
    }

    if (startDateTime < currentDateTime) {
        Swal.fire({
            title: 'Error!',
            text: 'Meeting start time cannot be in the past.',
            icon: 'error',
            confirmButtonColor: '#ef4444'
        });
        setIsSubmitting(false);
        return;
    }
    // --- End date/time validation ---

    const startIso = toIso(date, startTime);
    const endIso = toIso(date, endTime);

    const meetingData = {
      title: meetingTitle,
      organizerEmail: organizerEmail,
      startTime: startIso,
      endTime: endIso,
      description: notes,
      participants: participants.filter(p => p.trim() !== ''),
    };

    try {
      const response = await fetch('http://localhost:8080/api/meetings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meetingData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to create meeting' }));
        throw new Error(errorData.message || 'Failed to create meeting');
      }

      const data = await response.json();
      console.log('Meeting created:', data);

      Swal.fire({
        title: 'Success!',
        text: 'Meeting created successfully!',
        icon: 'success',
        confirmButtonColor: '#4CAF50', // Changed to a more standard green for success
        timer: 2000
      });
      navigate('/main/dashboard');
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error!',
        text: `Failed to create meeting: ${error.message || 'Please try again.'}`, // More descriptive error
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Style Definitions (based on your provided code, with minor adjustments) ---
  const cardBackgroundColor = '#1B263B';
  const inputBackgroundColor = '#0D1B2A';
  const labelColor = '#FFFFFF';
  const inputTextColor = '#FFFFFF';
  const inputBorderColor = '#778DA9'; // Original border color
  const primaryGreen = '#34D399'; // Vibrant green from your app's theme
  const secondaryGreen = '#10B981'; // A slightly darker green for hover states

  const pageContainerStyle = {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2rem',
    background: cardBackgroundColor,
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const headingStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: '0.5rem',
    textAlign: 'center',
  };

  const subheadingStyle = {
    fontSize: '1.1rem',
    color: '#CCCCCC',
    textAlign: 'center',
  };

  const labelBaseStyle = { // Base style for labels
    color: labelColor,
    marginBottom: '0.5rem',
    display: 'block',
  };

  const inputBaseStyle = { // Base style for inputs
    width: '100%',
    padding: '0.8rem 1rem',
    borderRadius: '8px',
    border: `1px solid ${inputBorderColor}`,
    background: inputBackgroundColor,
    color: inputTextColor,
    fontSize: '1rem',
    outline: 'none',
  };

  const buttonBaseStyle = {
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    border: 'none',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const submitButtonStyle = {
    ...buttonBaseStyle,
    background: primaryGreen, // Use primary green for the main button
    color: cardBackgroundColor, // Dark text on green button
  };

  const submitButtonHoverStyle = {
    background: secondaryGreen, // Darker green on hover
    transform: 'translateY(-2px)',
  };

  const addParticipantButtonStyle = {
    ...buttonBaseStyle,
    padding: '0.6rem 1rem', // Smaller padding
    borderRadius: '8px',
    background: primaryGreen, // Use primary green for add button
    color: cardBackgroundColor, // Dark text on green button
    border: `1px solid ${primaryGreen}`, // Green border
  };

  const addParticipantButtonHoverStyle = {
    background: secondaryGreen,
    transform: 'translateY(-1px)',
  };

  const removeParticipantButtonStyle = {
    padding: '0.4rem', // Adjust padding for a small circle
    borderRadius: '50%', // Make it round
    border: '1px solid #DC2626', // Red border
    background: '#DC2626', // Red background
    color: '#FFFFFF',
    cursor: 'pointer',
    fontWeight: '700',
    transition: 'background 0.2s ease, transform 0.1s ease',
    marginLeft: '0.5rem', // Space from input
    width: '30px', // Fixed width/height for round shape
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0, // Prevent shrinking when flex item
  };

  const removeParticipantButtonHoverStyle = {
    background: '#EF4444', // Lighter red on hover
    transform: 'scale(1.05)',
  };


  return (
    <div style={pageContainerStyle}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={headingStyle}>
          Create New Meeting
        </h1>
        <p style={subheadingStyle}>
          Schedule a meeting with your team
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Title */}
        <div>
          <label style={labelBaseStyle}>
            MEETING TITLE *
          </label>
          <input
            type="text"
            value={meetingTitle}
            onChange={(e) => setMeetingTitle(e.target.value)}
            required
            placeholder="Enter meeting title..."
            style={inputBaseStyle}
          />
        </div>

        {/* Date, Start and End Time */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={labelBaseStyle}>
              DATE *
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={inputBaseStyle}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={labelBaseStyle}>
              START TIME *
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              style={inputBaseStyle}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={labelBaseStyle}>
              END TIME *
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              style={inputBaseStyle}
            />
          </div>
        </div>

        {/* Participants */}
        <div>
          <label style={labelBaseStyle}>
            PARTICIPANTS *
          </label>
          {participants.map((participant, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <input
                type="email"
                value={participant}
                onChange={(e) => handleParticipantChange(index, e.target.value)}
                placeholder="user@example.com"
                required
                style={{ ...inputBaseStyle, marginBottom: '0', flexGrow: 1 }} // flexGrow to make input take available space
              />
              {participants.length > 1 && ( // Only show remove button if more than one participant
                <button
                  type="button"
                  onClick={() => handleRemoveParticipant(index)}
                  style={removeParticipantButtonStyle}
                  onMouseOver={(e) => Object.assign(e.currentTarget.style, removeParticipantButtonHoverStyle)}
                  onMouseOut={(e) => Object.assign(e.currentTarget.style, removeParticipantButtonStyle)}
                >
                  X
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddParticipant}
            style={addParticipantButtonStyle}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, addParticipantButtonHoverStyle)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, addParticipantButtonStyle)}
          >
            + Add Participant
          </button>
        </div>

        {/* Notes */}
        <div>
          <label style={labelBaseStyle}>
            NOTES / DESCRIPTION (OPTIONAL)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="4"
            placeholder="Add notes..."
            style={inputBaseStyle}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={isSubmitting ? { ...submitButtonStyle, opacity: 0.7, cursor: 'not-allowed' } : submitButtonStyle}
          onMouseOver={(e) => { if (!isSubmitting) Object.assign(e.currentTarget.style, submitButtonHoverStyle); }}
          onMouseOut={(e) => { if (!isSubmitting) Object.assign(e.currentTarget.style, submitButtonStyle); }}
        >
          {isSubmitting ? 'Creating...' : 'Create Meeting'}
        </button>
      </form>
    </div>
  );
}
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

// export default function CreateMeeting() {
//   const [meetingTitle, setMeetingTitle] = useState('');
//   const [date, setDate] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [participants, setParticipants] = useState(['']);
//   const [notes, setNotes] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const stored = localStorage.getItem('user');
//   const currentUser = stored ? JSON.parse(stored) : null;
//   const organizerEmail = currentUser?.email;

//   function toIso(date, time) {
//     return `${date}T${time}:00`;
//   }

//   const handleAddParticipant = () => {
//     setParticipants([...participants, '']);
//   };

//   const handleParticipantChange = (index, value) => {
//     const newParticipants = [...participants];
//     newParticipants[index] = value;
//     setParticipants(newParticipants);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!organizerEmail) {
//       alert('Organizer email not found. Please log in again.');
//       setIsSubmitting(false);
//       return;
//     }

//     const startIso = toIso(date, startTime);
//     const endIso = toIso(date, endTime);

//     const meetingData = {
//       title: meetingTitle,
//       organizerEmail: organizerEmail,
//       startTime: startIso,
//       endTime: endIso,
//       description: notes,
//       participants: participants.filter(p => p.trim() !== ''),
//     };

//     try {
//       const response = await fetch('http://localhost:8080/api/meetings', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(meetingData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create meeting');
//       }

//       const data = await response.json();
//       console.log('Meeting created:', data);

//       Swal.fire({
//         title: 'Success!',
//         text: 'Meeting created successfully!',
//         icon: 'success',
//         confirmButtonColor: '#415A77',
//         timer: 2000
//       });
//       navigate('/main/dashboard');
//     } catch (error) {
//       console.error('Error:', error);
//       Swal.fire({
//         title: 'Error!',
//         text: 'Failed to create meeting. Please try again.',
//         icon: 'error',
//         confirmButtonColor: '#ef4444'
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div style={{
//       maxWidth: '800px',
//       margin: '2rem auto',
//       padding: '2rem',
//       background: '#1B263B',
//       borderRadius: '15px',
//       boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//     }}>
//       <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
//         <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '0.5rem' }}>
//           Create New Meeting
//         </h1>
//         <p style={{ fontSize: '1.1rem', color: '#CCCCCC' }}>
//           Schedule a meeting with your team
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
//         {/* Title */}
//         <div>
//           <label style={{ color: '#FFFFFF', marginBottom: '0.5rem', display: 'block' }}>
//             MEETING TITLE *
//           </label>
//           <input
//             type="text"
//             value={meetingTitle}
//             onChange={(e) => setMeetingTitle(e.target.value)}
//             required
//             placeholder="Enter meeting title..."
//             style={{
//               width: '100%',
//               padding: '0.8rem 1rem',
//               borderRadius: '8px',
//               border: '1px solid #778DA9',
//               background: '#0D1B2A',
//               color: '#FFFFFF',
//               fontSize: '1rem',
//               outline: 'none',
//             }}
//           />
//         </div>

//         {/* Date, Start and End Time */}
//         <div style={{ display: 'flex', gap: '1rem' }}>
//           <div style={{ flex: 1 }}>
//             <label style={{ color: '#FFFFFF', marginBottom: '0.5rem', display: 'block' }}>
//               DATE *
//             </label>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               required
//               style={{
//                 width: '100%',
//                 padding: '0.8rem 1rem',
//                 borderRadius: '8px',
//                 border: '1px solid #778DA9',
//                 background: '#0D1B2A',
//                 color: '#FFFFFF',
//                 fontSize: '1rem',
//                 outline: 'none',
//               }}
//             />
//           </div>

//           <div style={{ flex: 1 }}>
//             <label style={{ color: '#FFFFFF', marginBottom: '0.5rem', display: 'block' }}>
//               START TIME *
//             </label>
//             <input
//               type="time"
//               value={startTime}
//               onChange={(e) => setStartTime(e.target.value)}
//               required
//               style={{
//                 width: '100%',
//                 padding: '0.8rem 1rem',
//                 borderRadius: '8px',
//                 border: '1px solid #778DA9',
//                 background: '#0D1B2A',
//                 color: '#FFFFFF',
//                 fontSize: '1rem',
//                 outline: 'none',
//               }}
//             />
//           </div>

//           <div style={{ flex: 1 }}>
//             <label style={{ color: '#FFFFFF', marginBottom: '0.5rem', display: 'block' }}>
//               END TIME *
//             </label>
//             <input
//               type="time"
//               value={endTime}
//               onChange={(e) => setEndTime(e.target.value)}
//               required
//               style={{
//                 width: '100%',
//                 padding: '0.8rem 1rem',
//                 borderRadius: '8px',
//                 border: '1px solid #778DA9',
//                 background: '#0D1B2A',
//                 color: '#FFFFFF',
//                 fontSize: '1rem',
//                 outline: 'none',
//               }}
//             />
//           </div>
//         </div>

//         {/* Participants */}
//         <div>
//           <label style={{ color: '#FFFFFF', marginBottom: '0.5rem', display: 'block' }}>
//             PARTICIPANTS *
//           </label>
//           {participants.map((participant, index) => (
//             <input
//               key={index}
//               type="email"
//               value={participant}
//               onChange={(e) => handleParticipantChange(index, e.target.value)}
//               placeholder="user@example.com"
//               required
//               style={{
//                 width: '100%',
//                 marginBottom: '0.5rem',
//                 padding: '0.8rem 1rem',
//                 borderRadius: '8px',
//                 border: '1px solid #778DA9',
//                 background: '#0D1B2A',
//                 color: '#FFFFFF',
//                 fontSize: '1rem',
//                 outline: 'none',
//               }}
//             />
//           ))}
//           <button
//             type="button"
//             onClick={handleAddParticipant}
//             style={{
//               padding: '0.6rem 1rem',
//               borderRadius: '8px',
//               border: '1px solid #415A77',
//               background: '#415A77',
//               color: '#FFFFFF',
//               cursor: 'pointer',
//               fontWeight: '500',
//             }}
//           >
//             + Add Participant
//           </button>
//         </div>

//         {/* Notes */}
//         <div>
//           <label style={{ color: '#FFFFFF', marginBottom: '0.5rem', display: 'block' }}>
//             NOTES / DESCRIPTION (OPTIONAL)
//           </label>
//           <textarea
//             value={notes}
//             onChange={(e) => setNotes(e.target.value)}
//             rows="4"
//             placeholder="Add notes..."
//             style={{
//               width: '100%',
//               padding: '0.8rem 1rem',
//               borderRadius: '8px',
//               border: '1px solid #778DA9',
//               background: '#0D1B2A',
//               color: '#FFFFFF',
//               fontSize: '1rem',
//               outline: 'none',
//             }}
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           style={{
//             padding: '1rem 1.5rem',
//             borderRadius: '12px',
//             border: 'none',
//             background: '#415A77',
//             color: '#FFFFFF',
//             fontSize: '1.1rem',
//             fontWeight: '600',
//             cursor: 'pointer',
//             transition: 'all 0.3s ease',
//           }}
//         >
//           {isSubmitting ? 'Creating...' : 'Create Meeting'}
//         </button>
//       </form>
//     </div>
//   );
// }



// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

// export default function CreateMeeting() {
//   const [meetingTitle, setMeetingTitle] = useState('');
//   const [date, setDate] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [participants, setParticipants] = useState(['']); // Start with one empty participant input
//   const [notes, setNotes] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const stored = localStorage.getItem('user');
//   const currentUser = stored ? JSON.parse(stored) : null;
//   const organizerEmail = currentUser?.email;

//   function toIso(date, time) {
//     return `${date}T${time}:00`;
//   }

//   const handleAddParticipant = () => {
//     setParticipants([...participants, '']);
//   };

//   const handleParticipantChange = (index, value) => {
//     const newParticipants = [...participants];
//     newParticipants[index] = value;
//     setParticipants(newParticipants);
//   };

//   const handleRemoveParticipant = (indexToRemove) => {
//     setParticipants(participants.filter((_, index) => index !== indexToRemove));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!organizerEmail) {
//       Swal.fire({
//         title: 'Error!',
//         text: 'Organizer email not found. Please log in again.',
//         icon: 'error',
//         confirmButtonColor: '#ef4444'
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     const startDateTime = new Date(`${date}T${startTime}`);
//     const endDateTime = new Date(`${date}T${endTime}`);
//     const currentDateTime = new Date();

//     if (startDateTime >= endDateTime) {
//       Swal.fire({
//         title: 'Error!',
//         text: 'End time must be after start time.',
//         icon: 'error',
//         confirmButtonColor: '#ef4444'
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     if (startDateTime < currentDateTime) {
//         Swal.fire({
//             title: 'Error!',
//             text: 'Meeting start time cannot be in the past.',
//             icon: 'error',
//             confirmButtonColor: '#ef4444'
//         });
//         setIsSubmitting(false);
//         return;
//     }

//     const startIso = toIso(date, startTime);
//     const endIso = toIso(date, endTime);

//     const meetingData = {
//       title: meetingTitle,
//       organizerEmail: organizerEmail,
//       startTime: startIso,
//       endTime: endIso,
//       description: notes,
//       participants: participants.filter(p => p.trim() !== ''),
//     };

//     try {
//       const response = await fetch('http://localhost:8080/api/meetings', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(meetingData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({ message: 'Failed to create meeting' }));
//         throw new Error(errorData.message || 'Failed to create meeting');
//       }

//       const data = await response.json();
//       console.log('Meeting created:', data);

//       Swal.fire({
//         title: 'Success!',
//         text: 'Meeting created successfully!',
//         icon: 'success',
//         confirmButtonColor: '#4CAF50',
//         timer: 2000
//       });
//       navigate('/main/dashboard');
//     } catch (error) {
//       console.error('Error:', error);
//       Swal.fire({
//         title: 'Error!',
//         text: `Failed to create meeting: ${error.message || 'Please try again.'}`,
//         icon: 'error',
//         confirmButtonColor: '#ef4444'
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // --- Styles for a "No Box" Integrated Green Theme ---

//   // Main application background - THIS MUST BE SET GLOBALLY (e.g., in App.css for <body>)
//   const appBackgroundColor = '#0A192F'; // A deep, dark blue-green that complements your header/sidebar

//   // Input Field & Button Colors
//   // Input fields will be slightly lighter than the page background to stand out
//   const inputBackgroundColor = '#12243D'; // A slightly lighter dark blue-green for input fields
//   const inputBorderColor = '#065F46'; // Darker green for input borders
//   const inputFocusBorderColor = '#34D399'; // Vibrant green on focus

//   // Text Colors
//   const headingColor = '#34D399'; // Vibrant green for main titles
//   const subHeadingColor = '#A7F3D0'; // Lighter, muted green for descriptions
//   const labelColor = '#A7F3D0'; // Same as subheading for labels
//   const inputTextColor = '#E0F2F7'; // Very light text for inputs

//   // Button Colors
//   const primaryButtonColor = '#34D399'; // Vibrant green for main actions
//   const primaryButtonTextColor = '#0A192F'; // Dark text on vibrant green (matches app background)
//   const primaryButtonHoverColor = '#10B981'; // Slightly darker green on hover

//   const secondaryButtonColor = '#065F46'; // Darker green for secondary actions (e.g., Add Participant)
//   const secondaryButtonTextColor = '#E0F2F7'; // Light text on darker green
//   const secondaryButtonHoverColor = '#047857'; // Even darker green on hover

//   const dangerColor = '#DC2626'; // Red for remove actions
//   const dangerHoverColor = '#EF4444'; // Lighter red on hover


//   // CRUCIAL: No background, border, or shadow on this main container div.
//   // It only handles layout (width, centering, vertical padding).
//   const pageContainerStyle = {
//     maxWidth: '800px', // Still constrain width for readability
//     margin: '2rem auto', // Center content horizontally
//     padding: '2.5rem 0', // Vertical padding, no horizontal padding from a "box"
//   };

//   const headingStyle = {
//     fontSize: '2.8rem',
//     fontWeight: '700',
//     color: headingColor,
//     marginBottom: '0.8rem',
//     textAlign: 'center',
//     textShadow: '1px 1px 3px rgba(0,0,0,0.4)'
//   };

//   const subheadingStyle = {
//     fontSize: '1.3rem',
//     color: subHeadingColor,
//     textAlign: 'center',
//     marginBottom: '3rem',
//   };

//   const labelStyle = {
//     color: labelColor,
//     marginBottom: '0.8rem',
//     display: 'block',
//     fontWeight: '600',
//     fontSize: '1.05rem',
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '1.1rem 1.4rem',
//     borderRadius: '10px',
//     border: `1px solid ${inputBorderColor}`, // Subtle green border
//     background: inputBackgroundColor, // THIS IS THE KEY: A slightly lighter dark background
//     color: inputTextColor,
//     fontSize: '1.05rem',
//     outline: 'none',
//     boxShadow: 'none', // Absolutely no box shadow for a flat, integrated look
//     transition: 'border-color 0.2s ease',
//   };

//   const inputFocusStyle = {
//     borderColor: inputFocusBorderColor, // Vibrant green on focus
//     boxShadow: 'none', // No glow, just border change
//   };

//   const buttonStyle = {
//     padding: '1.3rem 2.5rem',
//     borderRadius: '12px',
//     border: 'none',
//     background: primaryButtonColor,
//     color: primaryButtonTextColor,
//     fontSize: '1.3rem',
//     fontWeight: '700',
//     cursor: 'pointer',
//     transition: 'background 0.3s ease, transform 0.2s ease',
//     boxShadow: 'none', // No box shadow
//   };

//   const buttonHoverStyle = {
//     background: primaryButtonHoverColor,
//     transform: 'translateY(-2px)',
//   };

//   const addParticipantButtonStyle = {
//     padding: '0.8rem 1.5rem',
//     borderRadius: '8px',
//     border: `1px solid ${primaryButtonColor}`,
//     background: secondaryButtonColor,
//     color: secondaryButtonTextColor,
//     cursor: 'pointer',
//     fontWeight: '600',
//     transition: 'background 0.3s ease, transform 0.1s ease',
//   };

//   const addParticipantHoverStyle = {
//     background: secondaryButtonHoverColor,
//     transform: 'translateY(-1px)',
//   };

//   const removeParticipantButtonStyle = {
//     padding: '0.5rem',
//     borderRadius: '50%',
//     border: `1px solid ${dangerColor}`,
//     background: dangerColor,
//     color: '#FFFFFF',
//     cursor: 'pointer',
//     fontWeight: '700',
//     transition: 'background 0.2s ease, transform 0.1s ease',
//     marginLeft: '1rem',
//     flexShrink: 0,
//     width: '36px',
//     height: '36px',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     boxShadow: 'none', // No box shadow
//   };

//   const removeParticipantHoverStyle = {
//     background: dangerHoverColor,
//     transform: 'scale(1.05)',
//   };

//   return (
//     // This div is purely for layout (max-width, centering, vertical padding)
//     // It has NO visual styling (background, border, shadow) of its own.
//     <div style={pageContainerStyle}>
//       <div style={{ marginBottom: '3rem' }}>
//         <h1 style={headingStyle}>
//           Create New Meeting
//         </h1>
//         <p style={subheadingStyle}>
//           Schedule a meeting with your team
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
//         {/* Title */}
//         <div>
//           <label style={labelStyle}>
//             MEETING TITLE *
//           </label>
//           <input
//             type="text"
//             value={meetingTitle}
//             onChange={(e) => setMeetingTitle(e.target.value)}
//             required
//             placeholder="Enter meeting title..."
//             style={inputStyle}
//             onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
//             onBlur={(e) => Object.assign(e.target.style, inputStyle)}
//           />
//         </div>

//         {/* Date, Start and End Time */}
//         <div style={{ display: 'flex', gap: '1.5rem' }}>
//           <div style={{ flex: 1 }}>
//             <label style={labelStyle}>
//               DATE *
//             </label>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               required
//               style={inputStyle}
//               onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
//               onBlur={(e) => Object.assign(e.target.style, inputStyle)}
//             />
//           </div>

//           <div style={{ flex: 1 }}>
//             <label style={labelStyle}>
//               START TIME *
//             </label>
//             <input
//               type="time"
//               value={startTime}
//               onChange={(e) => setStartTime(e.target.value)}
//               required
//               style={inputStyle}
//               onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
//               onBlur={(e) => Object.assign(e.target.style, inputStyle)}
//             />
//           </div>

//           <div style={{ flex: 1 }}>
//             <label style={labelStyle}>
//               END TIME *
//             </label>
//             <input
//               type="time"
//               value={endTime}
//               onChange={(e) => setEndTime(e.target.value)}
//               required
//               style={inputStyle}
//               onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
//               onBlur={(e) => Object.assign(e.target.style, inputStyle)}
//             />
//           </div>
//         </div>

//         {/* Participants */}
//         <div>
//           <label style={labelStyle}>
//             PARTICIPANTS *
//           </label>
//           {participants.map((participant, index) => (
//             <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.8rem' }}>
//               <input
//                 type="email"
//                 value={participant}
//                 onChange={(e) => handleParticipantChange(index, e.target.value)}
//                 placeholder="user@example.com"
//                 required
//                 style={{ ...inputStyle, marginBottom: '0', flexGrow: 1 }}
//                 onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
//                 onBlur={(e) => Object.assign(e.target.style, inputStyle)}
//               />
//               {participants.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveParticipant(index)}
//                   style={removeParticipantButtonStyle}
//                   onMouseOver={(e) => Object.assign(e.currentTarget.style, removeParticipantHoverStyle)}
//                   onMouseOut={(e) => Object.assign(e.currentTarget.style, removeParticipantButtonStyle)}
//                 >
//                   X
//                 </button>
//               )}
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={handleAddParticipant}
//             style={addParticipantButtonStyle}
//             onMouseOver={(e) => Object.assign(e.currentTarget.style, addParticipantHoverStyle)}
//             onMouseOut={(e) => Object.assign(e.currentTarget.style, addParticipantButtonStyle)}
//           >
//             + Add Participant
//           </button>
//         </div>

//         {/* Notes */}
//         <div>
//           <label style={labelStyle}>
//             NOTES / DESCRIPTION (OPTIONAL)
//           </label>
//           <textarea
//             value={notes}
//             onChange={(e) => setNotes(e.target.value)}
//             rows="4"
//             placeholder="Add notes..."
//             style={inputStyle}
//             onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
//             onBlur={(e) => Object.assign(e.target.style, inputStyle)}
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           style={isSubmitting ? { ...buttonStyle, opacity: 0.7, cursor: 'not-allowed' } : buttonStyle}
//           onMouseOver={(e) => { if (!isSubmitting) Object.assign(e.currentTarget.style, buttonHoverStyle); }}
//           onMouseOut={(e) => { if (!isSubmitting) Object.assign(e.currentTarget.style, buttonStyle); }}
//         >
//           {isSubmitting ? 'Creating...' : 'Create Meeting'}
//         </button>
//       </form>
//     </div>
//   );
// }




/////////////////////
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';


// export default function CreateMeeting() {
//   const [meetingTitle, setMeetingTitle] = useState('');
//   const [date, setDate] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [participants, setParticipants] = useState(['']);
//   const [notes, setNotes] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   // Fetch logged-in user's email
//   const stored = localStorage.getItem('user');
//   const currentUser = stored ? JSON.parse(stored) : null;
//   const organizerEmail = currentUser?.email;

//   // Convert date and time to ISO string format (without timezone info)
//   function toIso(date, time) {
//     return `${date}T${time}:00`;  // backend expects this format
//   }

//   const handleAddParticipant = () => {
//     setParticipants([...participants, '']);
//   };

//   const handleParticipantChange = (index, value) => {
//     const newParticipants = [...participants];
//     newParticipants[index] = value;
//     setParticipants(newParticipants);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!organizerEmail) {
//       alert('Organizer email not found. Please log in again.');
//       setIsSubmitting(false);
//       return;
//     }

//     const startIso = toIso(date, startTime);
//     const endIso = toIso(date, endTime);

//     const meetingData = {
//       title: meetingTitle,
//       organizerEmail: organizerEmail,
//       startTime: startIso,
//       endTime: endIso,
//       description: notes,
//       participants: participants.filter(p => p.trim() !== ''),
//     };

//     try {
//       const response = await fetch('http://localhost:8080/api/meetings', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(meetingData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create meeting');
//       }

//       const data = await response.json();
//       console.log('Meeting created:', data);

//       Swal.fire({
//         title: 'Success!',
//         text: 'Meeting created successfully!',
//         icon: 'success',
//         confirmButtonColor: '#415A77',
//         timer: 2000
//       });
//       navigate('/main/dashboard');
//     } catch (error) {
//       console.error('Error:', error);
//       Swal.fire({
//         title: 'Error!',
//         text: 'Failed to create meeting. Please try again.',
//         icon: 'error',
//         confirmButtonColor: '#ef4444'
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
// return (
//     <div style={{
//       maxWidth: '800px',
//       margin: '2rem auto',
//       padding: '2rem',
//       background: '#1B263B',
//       borderRadius: '15px',
//       boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//     }}>
//       <div style={{
//         marginBottom: '2rem',
//         textAlign: 'center'
//       }}>
//         <h1 style={{
//           fontSize: '2rem',
//           fontWeight: '700',
//           color: '#E0E1DD',
//           marginBottom: '0.5rem'
//         }}>Create New Meeting</h1>
//         <p style={{
//           fontSize: '1.1rem',
//           color: '#778DA9'
//         }}>Schedule a meeting with your team</p>
//       </div>
//       {/* Meeting Form */}
//       <form onSubmit={handleSubmit} style={{
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '1.5rem'
//       }}>
//           <div>
//             <label htmlFor="meetingTitle" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '500' }}>
//               MEETING TITLE *
//             </label>
//             <input
//               type="text"
//               id="meetingTitle"
//               value={meetingTitle}
//               onChange={(e) => setMeetingTitle(e.target.value)}
//               placeholder="Enter meeting title..."
//               required
//               style={{
//                 width: '100%',
//                 padding: '0.8rem 1rem',
//                 borderRadius: '8px',
//                 border: '1px solid #778DA9', // Light blue/gray border
//                 background: '#0D1B2A', // Darkest blue for input background
//                 color: '#E0E1DD', // Light text color
//                 fontSize: '1rem',
//                 outline: 'none',
//                 transition: 'border-color 0.3s ease',
//               }}
//               onFocus={(e) => e.target.style.borderColor = '#415A77'} // Medium blue on focus
//               onBlur={(e) => e.target.style.borderColor = '#778DA9'}
//             />
//           </div>

//           <div style={{ display: 'flex', gap: '1rem' }}>
//             <div style={{ flex: 1 }}>
//               <label htmlFor="date" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '500' }}>
//                 DATE *
//               </label>
//               <input
//                 type="date"
//                 id="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 required
//                 style={{
//                   width: '100%',
//                   padding: '0.8rem 1rem',
//                   borderRadius: '8px',
//                   border: '1px solid #778DA9',
//                   background: '#0D1B2A',
//                   color: '#E0E1DD',
//                   fontSize: '1rem',
//                   outline: 'none',
//                   transition: 'border-color 0.3s ease',
//                   // Ensure text color is applied to the date input content as well
//                   colorScheme: 'dark' // Helps dark mode for date picker itself
//                 }}
//                 onFocus={(e) => e.target.style.borderColor = '#415A77'}
//                 onBlur={(e) => e.target.style.borderColor = '#778DA9'}
//               />
//             </div>
//             <div style={{ flex: 1 }}>
//               <label htmlFor="startTime" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '500' }}>
//                 START TIME *
//               </label>
//               <input
//                 type="time"
//                 id="startTime"
//                 value={startTime}
//                 onChange={(e) => setStartTime(e.target.value)}
//                 required
//                 style={{
//                   width: '100%',
//                   padding: '0.8rem 1rem',
//                   borderRadius: '8px',
//                   border: '1px solid #778DA9',
//                   background: '#0D1B2A',
//                   color: '#E0E1DD',
//                   fontSize: '1rem',
//                   outline: 'none',
//                   transition: 'border-color 0.3s ease',
//                   colorScheme: 'dark' // Helps dark mode for time picker itself
//                 }}
//                 onFocus={(e) => e.target.style.borderColor = '#415A77'}
//                 onBlur={(e) => e.target.style.borderColor = '#778DA9'}
//               />
//             </div>
//           </div>
//           <div style={{ flex: 1 }}>
//               <label htmlFor="endTime" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '500' }}>
//                 END TIME *
//               </label>
//               <input
//                 type="time"
//                 id="endTime"
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//                 required
//                 style={{
//                   width: '100%',
//                   padding: '0.8rem 1rem',
//                   borderRadius: '8px',
//                   border: '1px solid #778DA9',
//                   background: '#0D1B2A',
//                   color: '#E0E1DD',
//                   fontSize: '1rem',
//                   outline: 'none',
//                   transition: 'border-color 0.3s ease',
//                   colorScheme: 'dark' // Helps dark mode for time picker itself
//                 }}
//                 onFocus={(e) => e.target.style.borderColor = '#415A77'}
//                 onBlur={(e) => e.target.style.borderColor = '#778DA9'}
//               />
//             </div>
//           <div>
            
//             <label htmlFor="participants" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '500' }}>
//               PARTICIPANTS *
//             </label>
//             {participants.map((participant, index) => (
//               <input
//                 key={index}
//                 type="email"
//                 value={participant}
//                 onChange={(e) => handleParticipantChange(index, e.target.value)}
//                 placeholder="user@example.com"
//                 required
//                 style={{
//                   width: '100%',
//                   padding: '0.8rem 1rem',
//                   borderRadius: '8px',
//                   border: '1px solid #778DA9',
//                   background: '#0D1B2A',
//                   color: '#E0E1DD',
//                   fontSize: '1rem',
//                   outline: 'none',
//                   transition: 'border-color 0.3s ease',
//                   marginBottom: '0.5rem',
//                 }}
//                 onFocus={(e) => e.target.style.borderColor = '#415A77'}
//                 onBlur={(e) => e.target.style.borderColor = '#778DA9'}
//               />
//             ))}
//             <button
//               type="button"
//               onClick={handleAddParticipant}
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '0.5rem',
//                 padding: '0.6rem 1rem',
//                 borderRadius: '8px',
//                 border: '1px solid #415A77',
//                 background: '#415A77', // Medium blue for add button
//                 color: '#E0E1DD', // Light text color
//                 cursor: 'pointer',
//                 fontSize: '0.9rem',
//                 fontWeight: '500',
//                 transition: 'all 0.3s ease',
//               }}
//               onMouseEnter={(e) => e.target.style.background = '#778DA9'} // Lighter on hover
//               onMouseLeave={(e) => e.target.style.background = '#415A77'}
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <line x1="12" y1="5" x2="12" y2="19"></line>
//                 <line x1="5" y1="12" x2="19" y2="12"></line>
//               </svg>
//               Add Participant
//             </button>
//           </div>

//           <div>
//             <label htmlFor="notes" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '500' }}>
//               NOTES / DESCRIPTION (OPTIONAL)
//             </label>
//             <textarea
//               id="notes"
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               placeholder="Add meeting agenda, notes, or any additional information..."
//               rows="4"
//               style={{
//                 width: '100%',
//                 padding: '0.8rem 1rem',
//                 borderRadius: '8px',
//                 border: '1px solid #778DA9',
//                 background: '#0D1B2A',
//                 color: '#E0E1DD',
//                 fontSize: '1rem',
//                 outline: 'none',
//                 transition: 'border-color 0.3s ease',
//                 resize: 'vertical',
//               }}
//               onFocus={(e) => e.target.style.borderColor = '#415A77'}
//               onBlur={(e) => e.target.style.borderColor = '#778DA9'}
//             />
//           </div>

//           <button
//             type="submit"
//             style={{
//               padding: '1rem 1.5rem',
//               borderRadius: '12px',
//               border: 'none',
//               background: '#415A77', // Primary button with medium blue
//               color: '#E0E1DD',
//               fontSize: '1.1rem',
//               fontWeight: '600',
//               cursor: 'pointer',
//               transition: 'all 0.3s ease',
//               boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.background = '#778DA9'; // Lighter on hover
//               e.target.style.transform = 'translateY(-2px)';
//               e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.background = '#415A77';
//               e.target.style.transform = 'translateY(0)';
//               e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
//             }}
//           >
//             Create Meeting
//           </button>
//         </form>
//       </div>
//   );
// }
// // import { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';

// // export default function CreateMeeting() {
// //   const [meetingTitle, setMeetingTitle] = useState('');
// //   const [date, setDate] = useState('');
// //   const [startTime, setStartTime] = useState('');
// //   const [endTime, setEndTime] = useState('');
// //   const [participants, setParticipants] = useState(['']);
// //   const [notes, setNotes] = useState('');
// //   const navigate = useNavigate();

// //   // Fetch logged-in user's email
// //   const stored = localStorage.getItem('user');
// //   const currentUser = stored ? JSON.parse(stored) : null;
// //   const organizerEmail = currentUser?.email;

// //   // Convert date and time to ISO string format (without timezone info)
// //   function toIso(date, time) {
// //     return `${date}T${time}:00`;  // backend expects this format
// //   }

// //   const handleAddParticipant = () => {
// //     setParticipants([...participants, '']);
// //   };

// //   const handleParticipantChange = (index, value) => {
// //     const newParticipants = [...participants];
// //     newParticipants[index] = value;
// //     setParticipants(newParticipants);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!organizerEmail) {
// //       alert('Organizer email not found. Please log in again.');
// //       return;
// //     }

// //     const startIso = toIso(date, startTime);
// //     const endIso = toIso(date, endTime);

// //     const meetingData = {
// //       title: meetingTitle,
// //       organizerEmail: organizerEmail,
// //       startTime: startIso,
// //       endTime: endIso,
// //       description: notes,
// //       participants: participants.filter(p => p.trim() !== ''),
// //     };

// //     try {
// //       const response = await fetch('http://localhost:8080/meetings', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(meetingData),
// //       });

// //       if (!response.ok) {
// //         throw new Error('Failed to create meeting');
// //       }

// //       const data = await response.json();
// //       console.log('Meeting created:', data);

// //       alert('Meeting Created Successfully!');
// //       navigate('/main/dashboard');
// //     } catch (error) {
// //       console.error('Error:', error);
// //       alert('Failed to create meeting. Please try again.');
// //     }
// //   };
// //  return (
// //     <div style={{
// //       color: 'white',
// //       fontFamily: 'Inter, system-ui, sans-serif'
// //     }}>
// // <div style={{
// //         // Using Sea Salt Sage with opacity for header background
// //         background: 'rgba(135, 157, 145, 0.3)',
// //         backdropFilter: 'blur(20px)',
// //         borderRadius: '20px',
// //         border: '1px solid rgba(255, 255, 255, 0.2)',
// //         padding: '2rem',
// //         textAlign: 'center',
// //         marginBottom: '3rem',
// //         boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
// //         textDecorationColor: 'black'
// //       }}>
// //         <h1>CREATE NEW MEETING</h1>
// //         </div>
// //       {/* Meeting Form */}
// //       <div style={{
// //         maxWidth: '800px',
// //         margin: '0 auto',
// //         padding: '2rem',
// //         // Using Sea Salt Sage with opacity for form background
// //         background: 'rgba(135, 157, 145, 0.3)',
// //         backdropFilter: 'blur(20px)',
// //         borderRadius: '20px',
// //         border: '1px solid rgba(255, 255, 255, 0.1)',
// //         boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
// //       }}>
// //         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
// //           <div>
// //             <label htmlFor="meetingTitle" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '500' }}>
// //               MEETING TITLE *
// //             </label>
// //             <input
// //               type="text"
// //               id="meetingTitle"
// //               value={meetingTitle}
// //               onChange={(e) => setMeetingTitle(e.target.value)}
// //               placeholder="Enter meeting title..."
// //               required
// //               style={{
// //                 width: '100%',
// //                 padding: '0.8rem 1rem',
// //                 borderRadius: '8px',
// //                 border: '1px solid rgba(255, 255, 255, 0.3)',
// //                 background: 'rgba(255, 255, 255, 0.05)',
// //                 color: 'white',
// //                 fontSize: '1rem',
// //                 outline: 'none',
// //                 transition: 'border-color 0.3s ease',
// //               }}
// //               onFocus={(e) => e.target.style.borderColor = '#93c5fd'}
// //               onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
// //             />
// //           </div>

// //           <div style={{ display: 'flex', gap: '1rem' }}>
// //             <div style={{ flex: 1 }}>
// //               <label htmlFor="date" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '500' }}>
// //                 DATE *
// //               </label>
// //               <input
// //                 type="date"
// //                 id="date"
// //                 value={date}
// //                 onChange={(e) => setDate(e.target.value)}
// //                 required
// //                 style={{
// //                   width: '100%',
// //                   padding: '0.8rem 1rem',
// //                   borderRadius: '8px',
// //                   border: '1px solid rgba(255, 255, 255, 0.3)',
// //                   background: 'rgba(255, 255, 255, 0.05)',
// //                   color: 'white',
// //                   fontSize: '1rem',
// //                   outline: 'none',
// //                   transition: 'border-color 0.3s ease',
// //                 }}
// //                 onFocus={(e) => e.target.style.borderColor = '#93c5fd'}
// //                 onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
// //               />
// //             </div>
// //             <div style={{ flex: 1 }}>
// //               <label htmlFor="startTime" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '500' }}>
// //                 START TIME *
// //               </label>
// //               <input
// //                 type="time"
// //                 id="startTime"
// //                 value={startTime}
// //                 onChange={(e) => setStartTime(e.target.value)}
// //                 required
// //                 style={{
// //                   width: '100%',
// //                   padding: '0.8rem 1rem',
// //                   borderRadius: '8px',
// //                   border: '1px solid rgba(255, 255, 255, 0.3)',
// //                   background: 'rgba(255, 255, 255, 0.05)',
// //                   color: 'white',
// //                   fontSize: '1rem',
// //                   outline: 'none',
// //                   transition: 'border-color 0.3s ease',
// //                 }}
// //                 onFocus={(e) => e.target.style.borderColor = '#93c5fd'}
// //                 onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
// //               />
// //             </div>
// //           </div>
// // <div style={{ flex: 1 }}>
// //               <label htmlFor="endTime" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '500' }}>
// //                 END TIME *
// //               </label>
// //               <input
// //                 type="time"
// //                 id="endTime"
// //                 value={endTime}
// //                 onChange={(e) => setEndTime(e.target.value)}
// //                 required
// //                 style={{
// //                   width: '100%',
// //                   padding: '0.8rem 1rem',
// //                   borderRadius: '8px',
// //                   border: '1px solid rgba(255, 255, 255, 0.3)',
// //                   background: 'rgba(255, 255, 255, 0.05)',
// //                   color: 'white',
// //                   fontSize: '1rem',
// //                   outline: 'none',
// //                   transition: 'border-color 0.3s ease',
// //                 }}
// //                 onFocus={(e) => e.target.style.borderColor = '#93c5fd'}
// //                 onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
// //               />
// //             </div>
// //           <div>
// //             <label htmlFor="participants" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '500' }}>
// //               PARTICIPANTS *
// //             </label>
// //             {participants.map((participant, index) => (
// //               <input
// //                 key={index}
// //                 type="email"
// //                 value={participant}
// //                 onChange={(e) => handleParticipantChange(index, e.target.value)}
// //                 placeholder="user@example.com"
// //                 required
// //                 style={{
// //                   width: '100%',
// //                   padding: '0.8rem 1rem',
// //                   borderRadius: '8px',
// //                   border: '1px solid rgba(255, 255, 255, 0.3)',
// //                   background: 'rgba(255, 255, 255, 0.05)',
// //                   color: 'white',
// //                   fontSize: '1rem',
// //                   outline: 'none',
// //                   transition: 'border-color 0.3s ease',
// //                   marginBottom: '0.5rem',
// //                 }}
// //                 onFocus={(e) => e.target.style.borderColor = '#93c5fd'}
// //                 onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
// //               />
// //             ))}
// //             <button
// //               type="button"
// //               onClick={handleAddParticipant}
// //               style={{
// //                 display: 'flex',
// //                 alignItems: 'center',
// //                 gap: '0.5rem',
// //                 padding: '0.6rem 1rem',
// //                 borderRadius: '8px',
// //                 border: '1px solid rgba(255, 255, 255, 0.3)',
// //                 background: 'rgba(255, 255, 255, 0.05)',
// //                 color: 'white',
// //                 cursor: 'pointer',
// //                 fontSize: '0.9rem',
// //                 fontWeight: '500',
// //                 transition: 'all 0.3s ease',
// //               }}
// //               onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
// //               onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
// //             >
// //               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                 <line x1="12" y1="5" x2="12" y2="19"></line>
// //                 <line x1="5" y1="12" x2="19" y2="12"></line>
// //               </svg>
// //               Add Participant
// //             </button>
// //           </div>

// //           <div>
// //             <label htmlFor="notes" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '500' }}>
// //               NOTES / DESCRIPTION (OPTIONAL)
// //             </label>
// //             <textarea
// //               id="notes"
// //               value={notes}
// //               onChange={(e) => setNotes(e.target.value)}
// //               placeholder="Add meeting agenda, notes, or any additional information..."
// //               rows="4"
// //               style={{
// //                 width: '100%',
// //                 padding: '0.8rem 1rem',
// //                 borderRadius: '8px',
// //                 border: '1px solid rgba(255, 255, 255, 0.3)',
// //                 background: 'rgba(255, 255, 255, 0.05)',
// //                 color: 'white',
// //                 fontSize: '1rem',
// //                 outline: 'none',
// //                 transition: 'border-color 0.3s ease',
// //                 resize: 'vertical',
// //               }}
// //               onFocus={(e) => e.target.style.borderColor = '#93c5fd'}
// //               onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
// //             />
// //           </div>

// //           <button
// //             type="submit"
// //             style={{
// //               padding: '1rem 1.5rem',
// //               borderRadius: '12px',
// //               border: 'none',
// //               // Changed to Deep Harbor and Misty Pine for button gradient
// //               background: 'linear-gradient(90deg, #134340 0%, #7C8C76 100%)',
// //               color: 'white',
// //               fontSize: '1.1rem',
// //               fontWeight: '600',
// //               cursor: 'pointer',
// //               transition: 'all 0.3s ease',
// //               boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
// //             }}
// //             onMouseEnter={(e) => {
// //               // Darker shades of Deep Harbor and Misty Pine for hover
// //               e.target.style.background = 'linear-gradient(90deg, #0f3432 0%, #647060 100%)';
// //               e.target.style.transform = 'translateY(-2px)';
// //               e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
// //             }}
// //             onMouseLeave={(e) => {
// //               e.target.style.background = 'linear-gradient(90deg, #134340 0%, #7C8C76 100%)';
// //               e.target.style.transform = 'translateY(0)';
// //               e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
// //             }}
// //           >
// //             Create Meeting
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }
// // // import { useState } from 'react';
// // // import { useNavigate } from 'react-router-dom';

// // // export default function CreateMeeting() {
// // //   const [meetingTitle, setMeetingTitle] = useState('');
// // //   const [date, setDate] = useState('');
// // //   const [startTime, setStartTime] = useState('');
// // //   const [endTime, setEndTime] = useState('');
// // //   const [participants, setParticipants] = useState(['']);
// // //   const [notes, setNotes] = useState('');
// // //   const navigate = useNavigate();

// // //   // Fetch logged-in user's email
// // //   const stored = localStorage.getItem('user');
// // //   const currentUser = stored ? JSON.parse(stored) : null;
// // //   const organizerEmail = currentUser?.email;

// // //   // Convert date and time to ISO string format (without timezone info)
// // //   function toIso(date, time) {
// // //     return `${date}T${time}:00`;  // backend expects this format
// // //   }

// // //   const handleAddParticipant = () => {
// // //     setParticipants([...participants, '']);
// // //   };

// // //   const handleParticipantChange = (index, value) => {
// // //     const newParticipants = [...participants];
// // //     newParticipants[index] = value;
// // //     setParticipants(newParticipants);
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     if (!organizerEmail) {
// // //       alert('Organizer email not found. Please log in again.');
// // //       return;
// // //     }

// // //     const startIso = toIso(date, startTime);
// // //     const endIso = toIso(date, endTime);

// // //     const meetingData = {
// // //       title: meetingTitle,
// // //       organizerEmail: organizerEmail,
// // //       startTime: startIso,
// // //       endTime: endIso,
// // //       description: notes,
// // //       participants: participants.filter(p => p.trim() !== ''),
// // //     };

// // //     try {
// // //       const response = await fetch('http://localhost:8080/meetings', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify(meetingData),
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error('Failed to create meeting');
// // //       }

// // //       const data = await response.json();
// // //       console.log('Meeting created:', data);

// // //       alert('Meeting Created Successfully!');
// // //       navigate('/main/dashboard');
// // //     } catch (error) {
// // //       console.error('Error:', error);
// // //       alert('Failed to create meeting. Please try again.');
// // //     }
// // //   };
// // //  return (
// // //     <div style={{
// // //       color: 'white',
// // //       fontFamily: 'Inter, system-ui, sans-serif'
// // //     }}>
// // // <div style={{
// // //         background: 'rgba(255, 255, 255, 0.1)',
// // //         backdropFilter: 'blur(20px)',
// // //         borderRadius: '20px',
// // //         border: '1px solid rgba(255, 255, 255, 0.2)',
// // //         padding: '2rem',
// // //         textAlign: 'center',
// // //         marginBottom: '3rem',
// // //         boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
// // //         textDecorationColor: 'black'
// // //       }}>
// // //         <h1>CREATE NEW MEETING</h1>
// // //         </div>
// // //       {/* Meeting Form */}
// // //       <div style={{
// // //         maxWidth: '800px',
// // //         margin: '0 auto',
// // //         padding: '2rem',
// // //         background: 'rgba(255, 255, 255, 0.1)',
// // //         backdropFilter: 'blur(20px)',
// // //         borderRadius: '20px',
// // //         border: '1px solid rgba(255, 255, 255, 0.1)',
// // //         boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
// // //       }}>
// // //         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
// // //           <div>
// // //             <label htmlFor="meetingTitle" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '500' }}>
// // //               MEETING TITLE *
// // //             </label>
// // //             <input
// // //               type="text"
// // //               id="meetingTitle"
// // //               value={meetingTitle}
// // //               onChange={(e) => setMeetingTitle(e.target.value)}
// // //               placeholder="Enter meeting title..."
// // //               required
// // //               style={{
// // //                 width: '100%',
// // //                 padding: '0.8rem 1rem',
// // //                 borderRadius: '8px',
// // //                 border: '1px solid rgba(255, 255, 255, 0.3)',
// // //                 background: 'rgba(255, 255, 255, 0.05)',
// // //                 color: 'white',
// // //                 fontSize: '1rem',
// // //                 outline: 'none',
// // //                 transition: 'border-color 0.3s ease',
// // //               }}
// // //               onFocus={(e) => e.target.style.borderColor = '#93c5fd'}
// // //               onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
// // //             />
// // //           </div>

// // //           <div style={{ display: 'flex', gap: '1rem' }}>
// // //             <div style={{ flex: 1 }}>
// // //               <label htmlFor="date" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '500' }}>
// // //                 DATE *
// // //               </label>
// // //               <input
// // //                 type="date"
// // //                 id="date"
// // //                 value={date}
// // //                 onChange={(e) => setDate(e.target.value)}
// // //                 required
// // //                 style={{
// // //                   width: '100%',
// // //                   padding: '0.8rem 1rem',
// // //                   borderRadius: '8px',
// // //                   border: '1px solid rgba(255, 255, 255, 0.3)',
// // //                   background: 'rgba(255, 255, 255, 0.05)',
// // //                   color: 'white',
// // //                   fontSize: '1rem',
// // //                   outline: 'none',
// // //                   transition: 'border-color 0.3s ease',
// // //                 }}
// // //                 onFocus={(e) => e.target.style.borderColor = '#93c5fd'}
// // //                 onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
// // //               />
// // //             </div>
// // //             <div style={{ flex: 1 }}>
// // //               <label htmlFor="startTime" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '500' }}>
// // //                 START TIME *
// // //               </label>
// // //               <input
// // //                 type="time"
// // //                 id="startTime"
// // //                 value={startTime}
// // //                 onChange={(e) => setStartTime(e.target.value)}
// // //                 required
// // //                 style={{
// // //                   width: '100%',
// // //                   padding: '0.8rem 1rem',
// // //                   borderRadius: '8px',
// // //                   border: '1px solid rgba(255, 255, 255, 0.3)',
// // //                   background: 'rgba(255, 255, 255, 0.05)',
// // //                   color: 'white',
// // //                   fontSize: '1rem',
// // //                   outline: 'none',
// // //                   transition: 'border-color 0.3s ease',
// // //                 }}
// // //                 onFocus={(e) => e.target.style.borderColor = '#93c5fd'}
// // //                 onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
// // //               />
// // //             </div>
// // //           </div>
// // // <div style={{ flex: 1 }}>
// // //               <label htmlFor="endTime" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '500' }}>
// // //                 END TIME *
// // //               </label>
// // //               <input
// // //                 type="time"
// // //                 id="endTime"
// // //                 value={endTime}
// // //                 onChange={(e) => setEndTime(e.target.value)}
// // //                 required
// // //                 style={{
// // //                   width: '100%',
// // //                   padding: '0.8rem 1rem',
// // //                   borderRadius: '8px',
// // //                   border: '1px solid rgba(255, 255, 255, 0.3)',
// // //                   background: 'rgba(255, 255, 255, 0.05)',
// // //                   color: 'white',
// // //                   fontSize: '1rem',
// // //                   outline: 'none',
// // //                   transition: 'border-color 0.3s ease',
// // //                 }}
// // //                 onFocus={(e) => e.target.style.borderColor = '#93c5fd'}
// // //                 onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
// // //               />
// // //             </div>
// // //           <div>
// // //             <label htmlFor="participants" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '500' }}>
// // //               PARTICIPANTS *
// // //             </label>
// // //             {participants.map((participant, index) => (
// // //               <input
// // //                 key={index}
// // //                 type="email"
// // //                 value={participant}
// // //                 onChange={(e) => handleParticipantChange(index, e.target.value)}
// // //                 placeholder="user@example.com"
// // //                 required
// // //                 style={{
// // //                   width: '100%',
// // //                   padding: '0.8rem 1rem',
// // //                   borderRadius: '8px',
// // //                   border: '1px solid rgba(255, 255, 255, 0.3)',
// // //                   background: 'rgba(255, 255, 255, 0.05)',
// // //                   color: 'white',
// // //                   fontSize: '1rem',
// // //                   outline: 'none',
// // //                   transition: 'border-color 0.3s ease',
// // //                   marginBottom: '0.5rem',
// // //                 }}
// // //                 onFocus={(e) => e.target.style.borderColor = '#93c5fd'}
// // //                 onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
// // //               />
// // //             ))}
// // //             <button
// // //               type="button"
// // //               onClick={handleAddParticipant}
// // //               style={{
// // //                 display: 'flex',
// // //                 alignItems: 'center',
// // //                 gap: '0.5rem',
// // //                 padding: '0.6rem 1rem',
// // //                 borderRadius: '8px',
// // //                 border: '1px solid rgba(255, 255, 255, 0.3)',
// // //                 background: 'rgba(255, 255, 255, 0.05)',
// // //                 color: 'white',
// // //                 cursor: 'pointer',
// // //                 fontSize: '0.9rem',
// // //                 fontWeight: '500',
// // //                 transition: 'all 0.3s ease',
// // //               }}
// // //               onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
// // //               onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
// // //             >
// // //               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                 <line x1="12" y1="5" x2="12" y2="19"></line>
// // //                 <line x1="5" y1="12" x2="19" y2="12"></line>
// // //               </svg>
// // //               Add Participant
// // //             </button>
// // //           </div>

// // //           <div>
// // //             <label htmlFor="notes" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '500' }}>
// // //               NOTES / DESCRIPTION (OPTIONAL)
// // //             </label>
// // //             <textarea
// // //               id="notes"
// // //               value={notes}
// // //               onChange={(e) => setNotes(e.target.value)}
// // //               placeholder="Add meeting agenda, notes, or any additional information..."
// // //               rows="4"
// // //               style={{
// // //                 width: '100%',
// // //                 padding: '0.8rem 1rem',
// // //                 borderRadius: '8px',
// // //                 border: '1px solid rgba(255, 255, 255, 0.3)',
// // //                 background: 'rgba(255, 255, 255, 0.05)',
// // //                 color: 'white',
// // //                 fontSize: '1rem',
// // //                 outline: 'none',
// // //                 transition: 'border-color 0.3s ease',
// // //                 resize: 'vertical',
// // //               }}
// // //               onFocus={(e) => e.target.style.borderColor = '#93c5fd'}
// // //               onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
// // //             />
// // //           </div>

// // //           <button
// // //             type="submit"
// // //             style={{
// // //               padding: '1rem 1.5rem',
// // //               borderRadius: '12px',
// // //               border: 'none',
// // //                 background: 'linear-gradient(90deg, #6366f1 0%, #a78bfa 100%)',
// // //               color: 'white',
// // //               fontSize: '1.1rem',
// // //               fontWeight: '600',
// // //               cursor: 'pointer',
// // //               transition: 'all 0.3s ease',
// // //               boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
// // //             }}
// // //             onMouseEnter={(e) => {
// // //               e.target.style.background = 'linear-gradient(90deg, #4f46e5 0%, #8b5cf6 100%)';
// // //               e.target.style.transform = 'translateY(-2px)';
// // //               e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
// // //             }}
// // //             onMouseLeave={(e) => {
// // //               e.target.style.background = 'linear-gradient(90deg, #6366f1 0%, #a78bfa 100%)';
// // //               e.target.style.transform = 'translateY(0)';
// // //               e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
// // //             }}
// // //           >
// // //             Create Meeting
// // //           </button>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // }
