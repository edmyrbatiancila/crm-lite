// Example usage of SelectInput component in different scenarios

import SelectInput from "@/components/shared/select-input";
import { useState } from "react";

// Example 1: Using SelectInput for User Selection (like in Client form)
interface User {
    id: number;
    first_name: string;
    last_name: string;
}

interface Client {
    id: number;
    name: string;
}

interface ProjectStatus {
    value: string;
    label: string;
}

const SelectInputExamples = () => {
    const [selectedUserId, setSelectedUserId] = useState<string>('');
    const [selectedClientId, setSelectedClientId] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');

    // Mock data
    const users: User[] = [
        { id: 1, first_name: "John", last_name: "Doe" },
        { id: 2, first_name: "Jane", last_name: "Smith" },
        { id: 3, first_name: "Bob", last_name: "Johnson" }
    ];

    const clients: Client[] = [
        { id: 1, name: "ABC Company" },
        { id: 2, name: "XYZ Corp" },
        { id: 3, name: "Tech Solutions" }
    ];

    const projectStatuses: ProjectStatus[] = [
        { value: "open", label: "Open" },
        { value: "in_progress", label: "In Progress" },
        { value: "completed", label: "Completed" },
        { value: "cancelled", label: "Cancelled" }
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">SelectInput Component Usage Examples</h2>

            {/* Example 1: User Selection */}
            <SelectInput<User>
                label="Assign To User"
                htmlFor="user_id"
                value={selectedUserId}
                onChange={setSelectedUserId}
                placeholder="Select a user"
                data={users}
                valueKey="id"
                displayKey="first_name"
                groupLabel="Available Users"
                required={true}
            />

            {/* Example 2: Client Selection */}
            <SelectInput<Client>
                label="Select Client"
                htmlFor="client_id"
                value={selectedClientId}
                onChange={setSelectedClientId}
                placeholder="Choose a client"
                data={clients}
                valueKey="id"
                displayKey="name"
                groupLabel="Existing Clients"
                required={true}
            />

            {/* Example 3: Project Status Selection */}
            <SelectInput<ProjectStatus>
                label="Project Status"
                htmlFor="status"
                value={selectedStatus}
                onChange={setSelectedStatus}
                placeholder="Select project status"
                data={projectStatuses}
                valueKey="value"
                displayKey="label"
                groupLabel="Status Options"
                required={true}
            />

            {/* Example 4: With Error Message */}
            <SelectInput<User>
                label="Manager"
                htmlFor="manager_id"
                value=""
                onChange={() => {}}
                placeholder="Select a manager"
                data={users}
                valueKey="id"
                displayKey="first_name"
                groupLabel="Managers"
                error="Manager selection is required"
                required={true}
            />

            {/* Example 5: Disabled Select */}
            <SelectInput<Client>
                label="Previous Client"
                htmlFor="prev_client"
                value=""
                onChange={() => {}}
                placeholder="No client selected"
                data={clients}
                valueKey="id"
                displayKey="name"
                groupLabel="Clients"
                disabled={true}
            />
        </div>
    );
};

export default SelectInputExamples;
