import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import InputError from "../input-error";

interface ICalendarPopoverInputProps {
    htmlFor: string;
    label: string;
    placeholder: string;
    required?: boolean;
    value: string;
    disabled?: boolean;
    onChange: (value: string) => void;
    error?: string;
    className?: string;
}

const CalendarPopoverInput = ({ 
    htmlFor, 
    label, 
    placeholder, 
    required = false,
    value,
    disabled = false,
    onChange,
    error,
    className = ""
}: ICalendarPopoverInputProps) => {
    
    const [open, setOpen] = useState<boolean>(false);
    const [date, setDate] = useState<Date | undefined>(
        value ? new Date(value) : undefined
    );

    // Format date for display (readable format)
    const formatDisplayDate = (date: Date | undefined) => {
        if (!date) return "";
        return date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    // Format date for backend (YYYY-MM-DD)
    const formatDate = (date: Date | undefined) => {
        if (!date) return "";
        return date.toISOString().split('T')[0];
    };

    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        if (selectedDate) {
            onChange(formatDate(selectedDate));
        } else {
            onChange("");
        }
        setOpen(false);
    };

    return (
        <div className="grid gap-2">
            <Label htmlFor={htmlFor}>
                {label}
                {required && <span className="text-red-500">*</span>}
            </Label>
            <div className="relative flex gap-2">
                <Input 
                    id={htmlFor}
                    value={formatDisplayDate(date)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`bg-background pr-10 ${className}`}
                    readOnly
                />

                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            id="date-picker"
                            variant="ghost"
                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                            disabled={disabled}
                        >
                            <CalendarIcon className="size-3.5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                    >
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateSelect}
                            disabled={(date) => date < new Date()}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            {error && <InputError message={error} />}
        </div>
    );
}

export default CalendarPopoverInput;