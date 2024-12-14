


import React, { useContext, useEffect, useState } from "react";
import { Calendar } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import GlobalContext from "@/context/GlobalContext";

export function AppSidebar() {
  const {
    calEvent,
    daySelected,
    selectDayEvents,
    setUpdateShowEventModal,
    setSelectedEvent,
  } = useContext(GlobalContext);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch the events for the selected day
    selectDayEvents(daySelected);
  }, [daySelected]);

  // Filter all events based on the search term (name or description)
  const filteredAllEvents = calEvent.events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="">
      <Sidebar>
        <SidebarContent>
          {/* Section for selected day events */}
          <SidebarGroup>
            <SidebarGroupLabel>Events for {daySelected}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {calEvent.selectedDayEvents.length === 0 ? (
                  <div className="text-center p-4">No events for this day</div>
                ) : (
                  calEvent.selectedDayEvents.map((event) => (
                    <SidebarMenuItem key={event.id}>
                      <SidebarMenuButton
                        asChild
                        onClick={() => {
                          setSelectedEvent(event);
                          setUpdateShowEventModal(true);
                        }}
                      >
                        <a href="#">
                          <Calendar />
                          <span>{event.name}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Search input and all events list */}
          <SidebarGroup>
            <SidebarGroupLabel>All Events</SidebarGroupLabel>
            <div className="p-4">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredAllEvents.length === 0 ? (
                  <div className="text-center p-4">No events found</div>
                ) : (
                  filteredAllEvents.map((event) => (
                    <SidebarMenuItem key={event.id}>
                      <SidebarMenuButton
                        asChild
                        onClick={() => {
                          setSelectedEvent(event);
                          setUpdateShowEventModal(true);
                        }}
                      >
                        <a href="#">
                          <Calendar />
                          <span>{event.name}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
