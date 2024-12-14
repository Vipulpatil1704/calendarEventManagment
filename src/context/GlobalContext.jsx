import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => { },
  daySelected: null,
  setDaySelected: (day) => { },
  showEventModal: false,
  setShowEventModal: () => { },
  eventState: {},
  dispatchCalEvent: ({ state, action }) => { },
  selectedEvent: null,
  setSelectedEvent: () => { },
});

export default GlobalContext;