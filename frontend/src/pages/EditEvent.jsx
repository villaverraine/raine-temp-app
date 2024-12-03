import React, { useEffect, useState } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";
import { schema, uischema } from "../schema/eventSchema";
import { Button, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export default function EditEvent() {
  const { eventId } = useParams();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => { // not working this is AI generated
      try {
        const response = await fetch(`http://127.0.0.1:3001/api/events/${eventId}`);
        const result = await response.json();
        setFormData(result);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3001/api/events/${eventId}`, { // not working
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
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