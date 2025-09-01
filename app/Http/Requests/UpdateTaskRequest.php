<?php

namespace App\Http\Requests;

use App\Enums\TaskStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateTaskRequest extends FormRequest
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
        $currentUser = Auth::user();
        
        // Define user_id validation rules based on role
        $userIdRules = ['required', Rule::exists('users', 'id')];
        
        // If user is not admin, they can only assign to themselves
        if ($currentUser && $currentUser->role !== 'admin') {
            $userIdRules[] = Rule::in([$currentUser->id]);
        }

        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'user_id' => $userIdRules,
            'client_id' => ['required', Rule::exists('clients', 'id')],
            'project_id' => ['required', Rule::exists('projects', 'id')],
            'status' => ['required', Rule::enum(TaskStatus::class)],
            'deadline_at' => ['required', 'date'],
        ];
    }

    /**
     * Get custom validation messages.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'user_id.in' => 'You can only assign tasks to yourself.',
            'user_id.required' => 'Please select a user to assign this task to.',
            'user_id.exists' => 'The selected user does not exist.',
        ];
    }
}
