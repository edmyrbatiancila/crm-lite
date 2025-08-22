import { ProjectForm } from "@/types/projects/IProject";
import InputError from "../input-error";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { parseDate } from "chrono-node";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

interface IProjectFormInputsProps {
    errors: Partial<Record<keyof ProjectForm, string>>;
    
}

function formatDate(date: Date | undefined) {
    if (!date) {
        return ""
    }
    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

const ProjectFormInputs = ({
    errors
}: IProjectFormInputsProps) => {

    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>("Select a deadline date");
    const [date, setDate] = useState<Date | undefined>(
        parseDate(value) || undefined
    )
    const [month, setMonth] = useState<Date | undefined>(date);

    return (
        <form action="" className="flex flex-col gap-6">
            <div className="grid gap-2">
                <Label htmlFor="projectTitle">Title of the Project</Label>
                <Input 
                    type="text"
                    id="projectTitle"
                    name="title"
                    // value={}
                    // onChange={ onInputTxtAreaChange }
                    onChange={(e) => {
                        setValue(e.target.value)
                        const date = parseDate(e.target.value)
                        if (date) {
                        setDate(date)
                        setMonth(date)
                        }
                    }}
                    placeholder="Project Name"
                    className="shadow-md"
                    autoFocus
                />
                <InputError message={ errors.title } />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="projectDescription">Description of the Project</Label>
                <Textarea
                    id="projectDescription"
                    name="description"
                    // value={}
                    // onChange={ onInputTxtAreaChange }
                    placeholder="Project Description"
                    className="shadow-md"
                />
                <InputError message={ errors.description } />
            </div>

            <div className="grid gap-2">
                    <Label htmlFor="deadline">Deadline</Label>
                    <div className="relative flex gap-2">
                        <Input 
                            id="deadline"
                            value={value}
                            placeholder="Select deadline date"
                            className="bg-background pr-10"
                            onChange={(e) => {
                                setValue(e.target.value)
                                const date = parseDate(e.target.value)
                                if (date) {
                                    setDate(date)
                                    setMonth(date)
                                }
                            }}
                        />
                        <Popover open={ open } onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    id="date-picker"
                                    variant="ghost"
                                    className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                                >
                                    <CalendarIcon className="size-3.5" />
                                    <span className="sr-only">Select deadline</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent 
                                className="w-auto overflow-hidden p-0" 
                                align="end"
                            >
                                <Calendar 
                                    mode="single"
                                    selected={date}
                                    captionLayout="dropdown"
                                    month={month}
                                    onMonthChange={setMonth}
                                    onSelect={(date) => {
                                        setDate(date)
                                        setValue(formatDate(date))
                                        setOpen(false)
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                        <InputError message={errors.deadline_at} />
                    </div>
                </div>

            <div className="grid lg:grid-cols-2 gap-6">
                
            </div>
        </form>
    );
}

export default ProjectFormInputs;