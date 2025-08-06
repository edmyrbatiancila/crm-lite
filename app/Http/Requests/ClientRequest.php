<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
        return [
            'name'              => 'required|string|max:255',
            'email'             => 'required|email|unique:clients,email|max:255',
            'mobile_no'         => 'required|string|max:11',
            'phone'             => 'nullable|string|max:20',
            'address'           => 'required|string|max:500',
            'notes'             => 'nullable|string|max:500',
            'assigned_to'       => 'nullable|exists:users,id'
        ];
    }

    public function messages(): array
    {
        return [
            'assigned_to.id.exists' => 'The selected user for assignment does not exist.',
        ];
    }
}
