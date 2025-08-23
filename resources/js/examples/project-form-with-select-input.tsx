// Updated project-form-inputs.tsx showing how to use SelectInput

import { ProjectForm, UserProject, ClientProject } from "@/types/projects/IProject";
import InputError from "../input-error";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import SelectInput from "../shared/select-input";

interface IProjectFormInputsProps {
    errors: Partial<Record<keyof ProjectForm, string>>;
    data: ProjectForm;
    setData: (field: keyof ProjectForm, value: any) => void;
    users: UserProject[];
    clients: ClientProject[];
    onSubmit: (e: React.FormEvent) => void;
    processing: boolean;
}

const ProjectFormInputs = ({
    errors,
    data,
    setData,
    users,
    clients,
    onSubmit,
    processing
}: IProjectFormInputsProps) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name as keyof ProjectForm, value);
    };

    const projectStatuses = [
        { value: "open", label: "Open" },
        { value: "in_progress", label: "In Progress" },
        { value: "blocked", label: "Blocked" },
        { value: "cancelled", label: "Cancelled" },
        { value: "completed", label: "Completed" }
    ];

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
            {/* Project Title */}
            <div className="grid gap-2">
                <Label htmlFor="projectTitle">Title of the Project</Label>
                <Input 
                    type="text"
                    id="projectTitle"
                    name="title"
                    value={data.title}
                    onChange={handleInputChange}
                    placeholder="Project Name"
                    className="shadow-md"
                    autoFocus
                />
                <InputError message={errors.title} />
            </div>

            {/* Project Description */}
            <div className="grid gap-2">
                <Label htmlFor="projectDescription">Description of the Project</Label>
                <Textarea
                    id="projectDescription"
                    name="description"
                    value={data.description}
                    onChange={handleInputChange}
                    placeholder="Project Description"
                    className="shadow-md"
                />
                <InputError message={errors.description} />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* User Selection using SelectInput */}
                <SelectInput<UserProject>
                    label="Assign To User"
                    htmlFor="user_id"
                    value={data.user_id?.toString() || ''}
                    onChange={(value) => setData('user_id', Number(value))}
                    placeholder="Select a user"
                    data={users}
                    valueKey="id"
                    displayKey="first_name"
                    groupLabel="Available Users"
                    error={errors.user_id}
                    required={true}
                />

                {/* Client Selection using SelectInput */}
                <SelectInput<ClientProject>
                    label="Select Client"
                    htmlFor="client_id"
                    value={data.client_id?.toString() || ''}
                    onChange={(value) => setData('client_id', Number(value))}
                    placeholder="Choose a client"
                    data={clients}
                    valueKey="id"
                    displayKey="name"
                    groupLabel="Existing Clients"
                    error={errors.client_id}
                    required={true}
                />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Deadline Date */}
                <div className="grid gap-2">
                    <Label htmlFor="deadline">Deadline</Label>
                    <Input 
                        type="date"
                        id="deadline"
                        name="deadline_at"
                        value={data.deadline_at}
                        onChange={handleInputChange}
                        className="shadow-md"
                    />
                    <InputError message={errors.deadline_at} />
                </div>

                {/* Project Status using SelectInput */}
                <SelectInput
                    label="Project Status"
                    htmlFor="status"
                    value={data.status}
                    onChange={(value) => setData('status', value)}
                    placeholder="Select project status"
                    data={projectStatuses}
                    valueKey="value"
                    displayKey="label"
                    groupLabel="Status Options"
                    error={errors.status}
                    required={true}
                />
            </div>
        </form>
    );
}

export default ProjectFormInputs;
