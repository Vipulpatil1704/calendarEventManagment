

import React, { useContext, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import GlobalContext from "@/context/GlobalContext";
import { Form } from "./ui/form";
import dayjs from "dayjs";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function CustomDialog() {
    const { setShowEventModal, daySelected, calEventDispatch, selectedEvent, showEventModal, calEvent, selectDayEvents } = useContext(GlobalContext);
    const [eventName, setEventName] = useState("");
    const [description, setDescription] = useState("");
    const [startTime, setStartTime] = useState(dayjs());
    const [endTime, setEndTime] = useState(dayjs());

    function handleSubmit(e) {
        e.preventDefault();
        // Format startTime and endTime
        const formattedStartTime = startTime.format('YYYY-MM-DD-HH:mm:ss');
        const formattedEndTime = endTime.format('YYYY-MM-DD-HH:mm:ss');

        // Create a new event object
        const newEvent = {
            id: selectedEvent?.id || Date.now(), // Use existing id if editing, or generate a new one
            name: eventName,
            description,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
            day: daySelected, // Assign the selected day
        };
        // console.log(newEvent);
        // Dispatch the new event to the global context
        calEventDispatch({ type: "ADD_EVENT", payload: newEvent });
        // Reset the form and close the dialog
        setEventName("");
        setDescription("");
        setStartTime(dayjs());
        setEndTime(dayjs());
        selectDayEvents(daySelected);
        setShowEventModal(false);
    }

    return (
        <Dialog open={showEventModal} onOpenChange={() => setShowEventModal(false)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Event</DialogTitle>
                    {/* <DialogDescription>
            This is a sample dialog description.
          </DialogDescription> */}
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
                        <Button type="submit">Save Event</Button>
                    </form>
                </div>
                {/* <DialogFooter>
                    <button onClick={() => setShowEventModal(false)}>Close</button>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    );
}

