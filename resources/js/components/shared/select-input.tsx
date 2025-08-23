import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import InputError from "../input-error";

interface ISelectInputProps<T = Record<string, unknown>> {
    label: string;
    htmlFor: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    data: T[];
    valueKey: keyof T; // The key to use as the value (e.g., 'id')
    displayKey: keyof T; // The key to use for display (e.g., 'first_name', 'name')
    groupLabel?: string; // Optional group label
    error?: string; // Error message
    required?: boolean; // Whether the field is required
    disabled?: boolean; // Whether the select is disabled
    className?: string; // Additional CSS classes
}

const SelectInput = <T,>({ 
    label, 
    htmlFor, 
    value, 
    onChange, 
    placeholder, 
    data, 
    valueKey, 
    displayKey,
    groupLabel = "Options",
    error,
    required = false,
    disabled = false,
    className = ""
}: ISelectInputProps<T>) => {
    return (
        <div className="grid gap-2">
            <Label htmlFor={htmlFor}>
                {label}
                {required && <span className="text-red-600 ml-1">*</span>}
            </Label>
            <Select
                value={value}
                onValueChange={onChange}
                disabled={disabled}
            >
                <SelectTrigger className={`shadow-md ${className}`}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>{groupLabel}</SelectLabel>
                        {data.map((item, index) => (
                            <SelectItem 
                                key={index} 
                                value={String(item[valueKey])}
                            >
                                {String(item[displayKey])}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <InputError message={error} />
        </div>
    );
}

export default SelectInput;