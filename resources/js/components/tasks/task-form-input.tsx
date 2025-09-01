import { TaskForm } from "@/types/tasks/ITasks";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import InputError from "../input-error";
import { Textarea } from "../ui/textarea";
import CalendarPopoverInput from "../shared/calendar-popover-input";
import SelectInput from "../shared/select-input";
import SaveButtons from "../shared/save-buttons";
import { CurrentUser } from "@/types/shared/assign-to";
import { User } from "@/types/clients/IClients";

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
    currentUser: CurrentUser;
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
    mode,
    currentUser
}: ITaskFormInputProps) => {

    // Determine if dropdown should be disabled
    const isDropdownDisabled = onProcessing || 
        (currentUser.role === 'admin' && users.length === 0) || 
        (currentUser.role !== 'admin');

    // Filter users based on role
    const availableUsers = currentUser.role === 'admin' ? users : users.filter(user => user.id === currentUser.id);


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
                <div>
                    <SelectInput<User> 
                    label="Assigned User"    
                    htmlFor="user_id"
                    value={onData.user_id?.toString() || ''}
                    onChange={(value) => onChange('user_id', value)}
                    placeholder={currentUser.role === 'admin' ? "Select assigned user" : "Assigned to yourself"}
                    data={availableUsers}
                    valueKey="id"
                    displayKey="first_name"
                    groupLabel={currentUser.role === 'admin' ? "Available Users" : "Current User"}
                    error={onErrors.user_id}
                    disabled={isDropdownDisabled}
                    required
                />
                {currentUser.role !== 'admin' && (
                    <div className="text-sm text-muted-foreground mt-1">
                        <span className="text-amber-600">Note:</span> As a regular user, you can only assign tasks to yourself.
                    </div>
                )}
                {currentUser.role === 'admin' && users.length === 0 && (
                    <div className="text-sm text-muted-foreground mt-1">
                        <span className="text-amber-600">Note:</span> No other users available for assignment. Create additional users first.
                    </div>
                )}
                </div>
                

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