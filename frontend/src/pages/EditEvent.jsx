import React, { useContext, useEffect, useState } from 'react';
import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";
import { schema, uischema } from "../schema/eventSchema";
import { Button, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from '../context/AppContext';
import axios from 'axios';

export default function EditEvent() {
  const appContext = useContext(AppContext);
  const token = appContext.state.token;
  const { eventId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    venue: '',
    category: '',
    description: ''
  });
  const navigate = useNavigate();


  useEffect(() => {
    console.log(eventId)
    const fetchEventDetails = async () => {
      try {
        const response = await axios.post(
          'http://localhost:3001/api/search/Event',
          { eventId }, 
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          }
        );
        console.log(response.data.result[0]);
        setFormData(response.data.result[0]);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  const handleSave = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:3001/api/crud/update/Event/${eventId}/`, formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
      if (response.success) {
        alert("Event updated successfully!");
        navigate("/userDashBoard");
      } else {
        alert("Failed to update event.");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      alert("An error occurred while updating the event.");
    }
  };

  return (
    <Box p={3}>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={formData}
        renderers={materialRenderers}
        onChange={({ data }) => setFormData(data)}
      />
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          style={{ marginRight: "10px" }}
        >
          Save Changes
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/userDashBoard")}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}