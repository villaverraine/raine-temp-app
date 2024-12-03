import React, { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";
import { schema, uischema } from "../schema/eventSchema";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3001/api/crud/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        alert("Event created successfully!");
        navigate("/userDashBoard");
      } else {
        alert("Failed to create event.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("An error occurred while creating the event.");
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
          onClick={handleSubmit}
          style={{ marginRight: "10px" }}
        >
          Submit
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