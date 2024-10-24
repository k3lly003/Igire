import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar'; // assuming shadcn has a calendar component
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { X } from 'lucide-react'; // for close button

const ScheduleInterviewModal = ({ isOpen, onClose }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');

    const availableTimes = [
        '9:00 pm - 10:00 pm',
        '11:00 pm - 12:00 pm',
        '14:00 pm - 15:00 pm',
        '16:00 pm - 17:00 pm',
    ];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-xl bg-[#F8F8F8]">
                <DialogHeader className="flex items-center ">
                    <DialogTitle>Schedule Interview</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4 p-4">
                    <p className="text-sm">Scheduling interview for Joe Dan</p>
                    <div className='flex gap-5 bg-white px-6'>
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="rounded-md p-2"
                        />

                        <RadioGroup
                            value={selectedTime}
                            onValueChange={setSelectedTime}
                            className="flex flex-col gap-2 mt-3"
                        >
                            <span className='mb-3'>Schedule interview time</span>
                            {availableTimes.map((time) => (
                                <label
                                    key={time}
                                    className="flex items-center space-x-2"
                                >
                                    <RadioGroupItem value={time} />
                                    <span>{time}</span>
                                </label>
                            ))}
                        </RadioGroup>
                    </div>
                    <Button
                        onClick={() => {
                            alert(`Interview scheduled on ${selectedDate} at ${selectedTime}`);
                            onClose();
                        }}
                        disabled={!selectedTime}
                        className="mt-4 text-white bg-green-500 hover:bg-green-700"
                    >
                        Schedule
                    </Button>
                </div>

                <Button
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={onClose}
                >
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default ScheduleInterviewModal;
