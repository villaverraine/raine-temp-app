export const schema = {
    type: "object",
    properties: {
      name: { type: "string", minLength: 1, title: "Event Name" },
      date: { type: "string", format: "date", title: "Event Date" },  
      time: { type: "string", format: "time", title: "Event Time" },
      venue: { type: "string", minLength: 1, title: "Venue" },
      category: { type: "string", minLength: 1, title: "Category" },
      description: { type: "string", title: "Description" },
    },
    required: ["name", "date", "time", "venue", "category"],
  };
  
  export const uischema = {
    type: "VerticalLayout",
    elements: [
      { type: "Control", scope: "#/properties/name" },
      { type: "Control", scope: "#/properties/date" },
      { type: "Control", scope: "#/properties/time" },
      { type: "Control", scope: "#/properties/venue" },
      { type: "Control", scope: "#/properties/category" },
      {
        type: "Control",
        scope: "#/properties/description",
        options: { multi: true },
      },
    ],
  };