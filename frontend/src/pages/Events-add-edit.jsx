import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Grid,
  IconButton,
  Select,
  Divider,
} from '@mui/material';

  import axios from 'axios';
  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';

  import CloseIcon from '@mui/icons-material/Close';
  import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
  import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


  export default function EventForm() {
    const [eventName, setEventName] = useState('');
    const [eventVenue, setEventVenue] = useState('');
    const [eventCategory, setEventCategory] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [startAmPm, setStartAmPm] = useState('AM');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [endAmPm, setEndAmPm] = useState('AM');
    const [eventDescription, setEventDescription] = useState('');
    const [showEndDate, setShowEndDate] = useState(true);

    // State for Event Staff
    const [staffEmails, setStaffEmails] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [emailSuggestions, setEmailSuggestions] = useState([
      'villaver.raine@gmail.com',
      'ponj_elazegui@dlsu.edu.ph',
      'jacy_nate_s_liu@dlsu.edu.ph',
    ]);

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogClose = () => {
      setDialogOpen(false);
    };

    // Utility function to validate time format (12-hour format)
    const isValidTime = (time) => {
      const timeRegex = /^(0?[1-9]|1[0-2]):([0-5][0-9])$/; // HH:MM format
      return timeRegex.test(time);
    };

    const handleSave = async (e) => {
      e.preventDefault();

      // Validate required fields
      if (!eventName || !startDate || !startTime) {
        console.error('Please fill in all required fields.');
        alert('Please fill in all required fields.');
        return;
      }

      // Validate startTime and endTime formats
      if (!isValidTime(startTime)) {
        alert('Please enter a valid start time in HH:MM format.');
        return;
      }

      if (showEndDate && endTime && !isValidTime(endTime)) {
        alert('Please enter a valid end time in HH:MM format.');
        return;
      }

      // Function to convert time to 24-hour format
      const convertTo24HourFormat = (time, period) => {
        if (!time || !period) {
          throw new Error("Invalid input: time and period are required.");
        }
      
        const [hours, minutes] = time.split(':').map((value) => parseInt(value, 10));
        let formattedHours = hours;
      
        if (period.toUpperCase() === 'PM' && formattedHours !== 12) {
          formattedHours += 12;
        } else if (period.toUpperCase() === 'AM' && formattedHours === 12) {
          formattedHours = 0;
        }
      
        return `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      };

      // Combine and format start date & time
      const formattedStartTime = convertTo24HourFormat(startTime, startAmPm);
      const startDateTime = new Date(`${startDate}T${formattedStartTime}`);

      let endDateTime = null;
      if (showEndDate && endDate && endTime) {
        const formattedEndTime = convertTo24HourFormat(endTime, endAmPm);
        endDateTime = new Date(`${endDate}T${formattedEndTime}`);
      }

      // Proceed with API request
      try {
        const payload = {
          name: eventName,
          date: startDateTime,
          venue: eventVenue,
          category: eventCategory,
          description: eventDescription,
        };

        if (endDateTime) {
          payload.endDate = endDateTime;
        }

        const response = await axios.post('http://127.0.0.1:3001/api/events', payload);

        console.log('Response:', response);

        if (response.data.success) {
          console.log('Event saved successfully:', response.data.message);
          alert('Event saved successfully');
          setTimeout(() => {
            handleCancel();
          }, 1000);
        } else {
          console.error('Error saving event:', response.data);
          alert('Error saving event');
        }
      } catch (error) {
        console.error('Error in network call:', error.response || error.message);
      }
    };
    
  
    const handleCancel = () => {
      setEventName('');
      setEventVenue('');
      setEventCategory('');
      setStartDate('');
      setStartTime('');
      setStartAmPm('AM');
      setEndDate('');
      setEndTime('');
      setEndAmPm('AM');
      setEventDescription('');
    };

    // Add a new staff member
    const handleAddStaff = (email) => {
      if (!email || staffEmails.some((staff) => staff.email === email)) return;
      setStaffEmails([...staffEmails, { email, role: 'Moderator' }]);
      setSearchTerm('');
    };

    // Remove a staff member
    const handleRemoveStaff = (index) => {
      const updatedStaff = staffEmails.filter((_, i) => i !== index);
      setStaffEmails(updatedStaff);
    };

    // Update role of a staff member
    const handleRoleChange = (index, role) => {
      const updatedStaff = [...staffEmails];
      updatedStaff[index].role = role;
      setStaffEmails(updatedStaff);
    };

    const filteredSuggestions = emailSuggestions.filter((email) =>
      email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleFileUpload = (event) => {
    
    };
  

    return (
      <>
        <Typography variant="h5" component="h2" gutterBottom>
          Event Info
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Adding basic details for your event helps your attendees know where to
          be and when to be there. All of this information can be edited and
          customized later.
        </Typography>

        {/* Event Name */}
        <Typography variant="subtitle1" gutterBottom>
          Event Name{' '}
          {eventName === '' && <span style={{ color: 'red' }}>*</span>}
        </Typography>
        <TextField
          placeholder="Enter Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          fullWidth
          margin="none"
          required
          sx={{ mb: 2 }}
        />

        {/* Event Venue */}
        <Typography variant="subtitle1" gutterBottom>
          Event Venue{' '}
          {eventVenue === '' && <span style={{ color: 'red' }}>*</span>}
        </Typography>
        <TextField
          placeholder="Enter Event Venue"
          value={eventVenue}
          onChange={(e) => setEventVenue(e.target.value)}
          fullWidth
          margin="none"
          sx={{ mb: 2 }}
        />

        {/* Event Category */}
        <Typography variant="subtitle1" gutterBottom>
          Event Category{' '}
          {eventCategory === '' && <span style={{ color: 'red' }}>*</span>}
        </Typography>
        <TextField
          placeholder="Enter Event Category"
          value={eventCategory}
          onChange={(e) => setEventCategory(e.target.value)}
          fullWidth
          margin="none"
          sx={{ mb: 2 }}
        />

        {/* Start Date and Time */}
        <Typography variant="subtitle1" gutterBottom>
          Start Date{' '}
          {startDate === '' && <span style={{ color: 'red' }}>*</span>}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              placeholder="Select Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={8}>
          <Typography variant="subtitle1" gutterBottom>
              Start Time{' '}
              {startTime === '' && <span style={{ color: 'red' }}>*</span>}
            </Typography>
            <TextField
              placeholder="HH:MM"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              fullWidth
              required
              sx={{ mb: 2 }}
              error={!isValidTime(startTime) && startTime !== ''}
              helperText={!isValidTime(startTime) && startTime !== '' ? 'Invalid time format. Use 12-Hour HH:MM Format.' : ''}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom>
              AM/PM
            </Typography>
            <TextField
              select
              value={startAmPm}
              onChange={(e) => setStartAmPm(e.target.value)}
              placeholder="Select AM/PM"
              fullWidth
            >
              <MenuItem value="AM">AM</MenuItem>
              <MenuItem value="PM">PM</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* Optional End Date and Time */}
        {showEndDate && (
          <>
            <Typography variant="subtitle1" gutterBottom>
              End Date
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  placeholder="Select End Date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle1" gutterBottom>
                  End Time
                </Typography>
                <TextField
                  placeholder="HH:MM"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                  error={!isValidTime(endTime) && endTime !== ''}
                  helperText={!isValidTime(endTime) && endTime !== '' ? 'Invalid time format. Use HH:MM.' : ''}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" gutterBottom>
                  AM/PM
                </Typography>
                <TextField
                  select
                  value={endAmPm}
                  onChange={(e) => setEndAmPm(e.target.value)}
                  placeholder="Select AM/PM"
                  fullWidth
                >
                  <MenuItem value="AM">AM</MenuItem>
                  <MenuItem value="PM">PM</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </>
        )}

        {/* Toggle End Date and Time */}
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => setShowEndDate(!showEndDate)}
            color="inherit"
          >
            {showEndDate ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineIcon />}
          </IconButton>
          <Typography variant="body2">
            {showEndDate ? 'Remove End Date & Time' : 'Add End Date & Time'}
          </Typography>
        </Box>

        {/* Event Description */}
        <Typography variant="subtitle1" gutterBottom>
          Event Description
        </Typography>
        <TextField
          placeholder="Enter Event Description"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          fullWidth
          margin="none"
          multiline
          rows={4}
        />

        {/* Extra Event Details */}
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Extra Event Details
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Enter your Event Capacity below in order to add tickets to your event.
          This can be adjusted later.
        </Typography>

        {/* Media Upload Section */}
        <Typography variant="h6" gutterBottom>
          Media
        </Typography>
        <Box
          sx={{
            border: "1px solid gray",
            borderRadius: "4px",
            padding: "16px",
            textAlign: "center",
            mb: 3,
          }}
        >
          {/* File Upload Input */}
          <input
            type="file"
            onChange={handleFileUpload}
            style={{ display: "none" }}
            id="file-upload"
            multiple // Allow selecting multiple files
            accept="image/*,video/*,audio/*" // Restrict to media files
          />
          <label htmlFor="file-upload">
            <Button
              variant="outlined"
              component="span"
              sx={{
                color: "darkgrey",
                border: "none",
                fontSize: "16px", 
                "&:hover": {
                  border: "none",
                  color: "grey", 
                },
              }}
            >
              File Upload
            </Button>
          </label>
        </Box>

        {/* Staff Email and Role Section */}
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Event Staff
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Invite to event as staff
        </Typography>

        <TextField
          label="Search by email address"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Typography variant="subtitle1" gutterBottom>
          Give your members access permissions below
        </Typography>

        <Divider sx={{ mb: 2 }} />
        

        {staffEmails.length > 0 && (
          <Box sx={{ mt: 2 }}>
            {staffEmails.map((staff, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                  {staff.email}
                </Typography>
                <Select
                  value={staff.role}
                  onChange={(e) => handleRoleChange(index, e.target.value)}
                  sx={{ mr: 2 }}
                >
                  <MenuItem value="Moderator">Moderator</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Staff">Staff</MenuItem>
                </Select>
                <IconButton
                  onClick={() => handleRemoveStaff(index)}
                  color="error"  // The 'error' color is typically red in Material-UI
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}

        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Assign Staff</DialogTitle>
          <DialogContent>
            <TextField
              label="Search Staff"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            {filteredSuggestions.map((email) => (
              <MenuItem key={email} onClick={() => handleAddStaff(email)}>
                {email}
              </MenuItem>
            ))}
          </DialogContent>
          <DialogActions>
            {/* Add any buttons or actions you want here */}
            <Button onClick={handleDialogClose}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Buttons */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: 'grey.400', color: 'white' }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: 'black', color: 'white' }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </>
    );
  }