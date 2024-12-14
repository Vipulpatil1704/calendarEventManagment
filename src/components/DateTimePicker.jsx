
import React from 'react';
import { DateTimePicker as ShadcnDateTimePicker } from '@/components/ui/date-time-picker';
import { TimePicker } from '@/components/ui/time-picker';

export function DateTimePicker({ value, onChange }) {
    return (
        <div>
            <label htmlFor="dateTime">Date and Time</label>
            <div style={{ display: 'flex', gap: '10px' }}>
                <ShadcnDateTimePicker
                    value={value}
                    onChange={(date) => onChange(date)}
                    required
                    style={{ flex: 1 }}
                />
                <TimePicker
                    value={value}
                    onChange={(time) => onChange(time)}
                />
            </div>
        </div>
    );
}

