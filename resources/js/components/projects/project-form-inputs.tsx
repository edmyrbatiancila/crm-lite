import { ClientProject, ProjectForm, UserProject } from "@/types/projects/IProject";
import InputError from "../input-error";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import SelectInput from "../shared/select-input";
import CalendarPopoverInput from "../shared/calendar-popover-input";
import SaveButtons from "../shared/save-buttons";

interface IProjectFormInputsProps {
    errors: Partial<Record<keyof ProjectForm, string>>;
    onData: ProjectForm;
    onSelectChange: (name: keyof ProjectForm, value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    users: UserProject[];
    processing: boolean;
    clients: ClientProject[];
    projectStatuses: { value: string; label: string }[];
    mode: string;
}

const ProjectFormInputs = ({
    errors,
    onData,
    onSelectChange,
    onSubmit,
    users,
    processing,
    clients,
    projectStatuses,
    mode
}: IProjectFormInputsProps) => {

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div className="grid gap-2">
                <Label htmlFor="projectTitle">Title of the Project</Label>
                <Input 
                    type="text"
                    id="projectTitle"
                    name="title"
                    value={onData.title}
                    onChange={(e) => onSelectChange('title', e.target.value)}
                    placeholder="Project Name"
                    className="shadow-md"
                    autoFocus
                    disabled={ processing }
                />
                <InputError message={ errors.title } />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="projectDescription">Description of the Project</Label>
                <Textarea
                    id="projectDescription"
                    name="description"
                    value={onData.description}
                    onChange={(e) => onSelectChange('description', e.target.value)}
                    placeholder="Project Description"
                    className="shadow-md"
                    disabled={ processing }
                />
                <InputError message={ errors.description } />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <CalendarPopoverInput
                    htmlFor="deadline"
                    label="Deadline"
                    placeholder="Select deadline date"
                    value={onData.deadline_at}
                    onChange={(value) => onSelectChange('deadline_at', value)}
                    error={errors.deadline_at}
                    required
                    disabled={processing}
                />
                    <SelectInput<UserProject> 
                        label="Assigned User"    
                        htmlFor="user_id"
                        value={onData.user_id?.toString() || ''}
                        onChange={ (value) => onSelectChange('user_id', value) }
                        placeholder="Select existing user"
                        data={ users }
                        valueKey="id"
                        displayKey="first_name"
                        groupLabel="Available Users"
                        error={ errors.user_id }
                        required={ true }
                        disabled={ processing }
                    />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <SelectInput<ClientProject>
                    label="Select Client"
                    htmlFor="client_id"
                    value={onData.client_id?.toString() || ''}
                    onChange={(value) => onSelectChange('client_id', value)}
                    placeholder="Select existing client"
                    data={clients}
                    valueKey="id"
                    displayKey="name"
                    groupLabel="Available Clients"
                    error={errors.client_id}
                    required={true}
                    disabled={processing}
                />

                <SelectInput
                    label="Project Status"
                    htmlFor="status"
                    value={onData.status || ''}
                    onChange={(value) => onSelectChange('status', value)}
                    placeholder="Select project status"
                    data={projectStatuses}
                    valueKey="value"
                    displayKey="label"
                    groupLabel="Status Options"
                    error={errors.status}
                    required={true}
                    disabled={processing}
                />
            </div>

            <SaveButtons
                onProcessing={processing}
                onMode={mode}
                btnTitleCreate="Create Project"
                btnTitleEdit="Update Project"
            />
        </form>
    );
}

export default ProjectFormInputs;