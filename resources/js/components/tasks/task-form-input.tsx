import { TaskForm } from "@/types/tasks/ITasks";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import InputError from "../input-error";
import { Textarea } from "../ui/textarea";
import CalendarPopoverInput from "../shared/calendar-popover-input";
import SelectInput from "../shared/select-input";
import SaveButtons from "../shared/save-buttons";

interface ITaskFormInputProps {
    onData: TaskForm;
    onErrors: Partial<Record<keyof TaskForm, string>>;
    onProcessing: boolean;
    onChange: (name: keyof TaskForm, value: string) => void;
    users: { id: number; first_name: string; last_name: string }[];
    clients: { id: number; name: string }[];
    projects: { id: number; title: string }[];
    taskStatuses: { value: string; label: string }[];
    onSubmit: (e: React.FormEvent) => void;
    mode: string;
}

const TaskFormInput = ({ 
    onData,
    onProcessing,
    onChange,
    onErrors,
    users,
    clients,
    projects,
    taskStatuses,
    onSubmit,
    mode
}: ITaskFormInputProps) => {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div className="grid gap-2">
                <Label htmlFor="taskTitle">
                    Title of the Task
                </Label>
                <Input 
                    type="text"
                    id="taskTitle"
                    name="title"
                    value={ onData.title }
                    onChange={ (e) => onChange('title', e.target.value) }
                    placeholder="Enter task title"
                    disabled={ onProcessing }
                    autoFocus
                />
                <InputError message={ onErrors.title } />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="taskDescription">
                    Description of the Task
                </Label>
                <Textarea
                    id="taskDescription"
                    name="description"
                    value={ onData.description }
                    onChange={ (e) => onChange('description', e.target.value) }
                    placeholder="Enter task description"
                    disabled={ onProcessing }
                />
                <InputError message={ onErrors.description } />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <CalendarPopoverInput
                    htmlFor="deadline"
                    label="Deadline"
                    placeholder="Select deadline date"
                    value={onData.deadline_at}
                    onChange={(value) => onChange('deadline_at', value)}
                    error={onErrors.deadline_at}
                    required
                    disabled={onProcessing}
                />

                <SelectInput 
                    label="Task Status"    
                    htmlFor="status"
                    value={onData.status}
                    onChange={(value) => onChange('status', value)}
                    placeholder="Select task status"
                    data={taskStatuses}
                    valueKey="value"
                    displayKey="label"
                    groupLabel="Available Statuses"
                    error={onErrors.status}
                    required
                    disabled={onProcessing}
                />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <SelectInput 
                    label="Assigned User"    
                    htmlFor="user_id"
                    value={onData.user_id?.toString() || ''}
                    onChange={(value) => onChange('user_id', value)}
                    placeholder="Select assigned user"
                    data={users}
                    valueKey="id"
                    displayKey="first_name"
                    groupLabel="Available Users"
                    error={onErrors.user_id}
                    required
                    disabled={onProcessing}
                />

                <SelectInput 
                    label="Client"    
                    htmlFor="client_id"
                    value={onData.client_id?.toString() || ''}
                    onChange={(value) => onChange('client_id', value)}
                    placeholder="Select client"
                    data={clients}
                    valueKey="id"
                    displayKey="name"
                    groupLabel="Available Clients"
                    error={onErrors.client_id}
                    required
                    disabled={onProcessing}
                />
            </div>

            <div className="grid gap-2">
                <SelectInput 
                    label="Project"    
                    htmlFor="project_id"
                    value={onData.project_id?.toString() || ''}
                    onChange={(value) => onChange('project_id', value)}
                    placeholder="Select project"
                    data={projects}
                    valueKey="id"
                    displayKey="title"
                    groupLabel="Available Projects"
                    error={onErrors.project_id}
                    required
                    disabled={onProcessing}
                />
            </div>

            <SaveButtons 
                onProcessing={onProcessing}
                onMode={mode}
                btnTitleCreate="Create Task"
                btnTitleEdit="Update Task"
            />
        </form>
    );
}

export default TaskFormInput;