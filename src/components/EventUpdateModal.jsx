import React, { useContext, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import GlobalContext from "@/context/GlobalContext";
import dayjs from "dayjs";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function CustomDialog() {
    const { setShowEventModal, daySelected, calEventDispatch, selectedEvent, showUpdateEventModal, setUpdateShowEventModal, calEvent, selectDayEvents } = useContext(GlobalContext);
    const [eventName, setEventName] = useState(selectedEvent?.name || "");
    const [description, setDescription] = useState(selectedEvent?.description || "");
    const [startTime, setStartTime] = useState(dayjs(selectedEvent?.startTime));
    const [endTime, setEndTime] = useState(dayjs(selectedEvent?.endTime));

    function handleSubmit(e) {
        e.preventDefault();
        // Format startTime and endTime
        const formattedStartTime = startTime.format('YYYY-MM-DD-HH:mm:ss');
        const formattedEndTime = endTime.format('YYYY-MM-DD-HH:mm:ss');

        // Update the event object
        const updatedEvent = {
            id: selectedEvent.id, // Ensure we keep the correct event ID
            name: eventName,
            description,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
            day: daySelected, // Assign the selected day
        };
        // Dispatch the updated event to the global context
        calEventDispatch({ type: "UPDATE_EVENT", payload: updatedEvent });
        // Close the dialog after update
        selectDayEvents(daySelected);
        setUpdateShowEventModal(false);
    }

    function handleDelete() {
        calEventDispatch({ type: "DELETE_EVENT", payload: selectedEvent.id });
        selectDayEvents(daySelected);
        setUpdateShowEventModal(false);
    }

    return (
        <Dialog open={showUpdateEventModal} onOpenChange={() => setUpdateShowEventModal(false)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{selectedEvent ? "Update Event" : "Add Event"}</DialogTitle>
                    <DialogDescription>
                        {selectedEvent ? "Edit the details of your event" : "Create a new event"}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="eventName">Event Name</label>
                            <Input
                                id="eventName"
                                type="text"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="m-2">
                            <label htmlFor="startTime" className="m-2">Start Time</label>
                            <Input
                                id="startTime"
                                type="datetime-local"
                                value={startTime.format('YYYY-MM-DDTHH:mm')}
                                onChange={(e) => setStartTime(dayjs(e.target.value))}
                                required
                            />
                        </div>
                        <div className="m-2">
                            <label htmlFor="endTime" className="m-3">End Time</label>
                            <Input
                                id="endTime"
                                type="datetime-local"
                                value={endTime.format('YYYY-MM-DDTHH:mm')}
                                onChange={(e) => setEndTime(dayjs(e.target.value))}
                                required
                            />
                        </div>
                        <Button type="submit">{selectedEvent ? "Update Event" : "Save Event"}</Button>
                    </form>
                    {selectedEvent && (
                        <Button variant="danger" onClick={handleDelete}>
                            Delete Event
                        </Button>
                    )}
                </div>
                {/* <DialogFooter>
                    <Button onClick={() => setShowEventModal(false)}>Close</Button>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    );
}
