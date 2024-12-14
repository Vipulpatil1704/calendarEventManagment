import React, { useState, useEffect, useReducer, useMemo } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

const eventReducer = (state, action) => {
  switch (action.type) {
    /*Normal ADD_EVENT */
    // case "ADD_EVENT":
    //   return {
    //     ...state, events: [...state.events, action.payload]
    //   }
    /*ADD_EVENT with overlapping */
    case "ADD_EVENT":
      const newEvent = action.payload;
      const overlapping = state.events.some(event => {
        return (
          (newEvent.startTime >= event.startTime && newEvent.startTime < event.endTime) ||
          (newEvent.endTime > event.startTime && newEvent.endTime <= event.endTime)
        );
      });

      if (overlapping) {

        alert('Event overlaps with existing event');
        return state;
      }

      return {
        ...state,
        events: [...state.events, newEvent]
      };
    case "SET_SELECTED_DAY_EVENTS":
      return {
        ...state,
        selectedDayEvents: state.events.filter(event => event.day === action.payload)
      };
    case "DELETE_EVENT":
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload)
      };
    case "UPDATE_EVENT":
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id ? { ...event, ...action.payload } : event
        )
      };

    default:
      return state;
  }
}
export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [daySelected, setDaySelected] = useState(localStorage.getItem('daySelected') || dayjs().format('DD-MM-YY'));
  const [showEventModal, setShowEventModal] = useState(JSON.parse(localStorage.getItem('showEventModal')) || false);
  const [showUpdateEventModal, setUpdateShowEventModal] = useState(JSON.parse(localStorage.getItem('showUpdateEventModal')) || false);
  const initialEvents = JSON.parse(localStorage.getItem('events')) || [];
  const eventState = {
    events: initialEvents,
    selectedDayEvents: []
  }
  const [calEvent, calEventDispatch] = useReducer(eventReducer, eventState);
  // Function to set selected day events
  const selectDayEvents = (selectedDay) => {
    calEventDispatch({ type: "SET_SELECTED_DAY_EVENTS", payload: selectedDay });
  };

  // console.log(eventState);
  const [selectedEvent, setSelectedEvent] = useState(null);
  useEffect(() => {
    localStorage.setItem("monthIndex", monthIndex);
    localStorage.setItem("daySelected", daySelected);
    localStorage.setItem("showEventModal", showEventModal);
    localStorage.setItem("showUpdateEventModal", showUpdateEventModal);
    localStorage.setItem("events", JSON.stringify(calEvent.events));
  }, [calEvent.events, monthIndex, daySelected, showEventModal, showUpdateEventModal]);
  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        calEvent,
        calEventDispatch,
        selectDayEvents,

        selectedEvent,
        setSelectedEvent,
        showUpdateEventModal,
        setUpdateShowEventModal,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
