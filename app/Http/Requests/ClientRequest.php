<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ClientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        $clientId = $this->route('client'); // assuming route model binding e.g. /clients/{client}
        $currentUser = auth()->user();

        $assignedToRules = ['nullable', Rule::exists('users', 'id')];
        
        // If user is admin, assigned_to is required and cannot be themselves
        if ($currentUser && $currentUser->role === 'admin') {
            $assignedToRules = [
                'required', 
                Rule::exists('users', 'id'),
                'not_in:' . $currentUser->id, // Admin cannot assign to themselves
            ];
        }

        return [
            'name'              => 'required|string|max:255',
            'email'       => [
                'required',
                'email',
                'max:255',
                Rule::unique('clients', 'email')->ignore($clientId),
            ],
            'mobile_no'         => 'required|string|max:11',
            'phone'             => 'nullable|string|max:20',
            'address'           => 'required|string|max:500',
            'notes'             => 'nullable|string|max:500',
            'assigned_to'       => $assignedToRules
        ];
    }

    public function messages(): array
    {
        return [
            'assigned_to.exists' => 'The selected user for assignment does not exist.',
            'assigned_to.required' => 'Please select a user to assign this client to.',
            'assigned_to.not_in' => 'Admins cannot assign clients to themselves.',
        ];
    }
}
