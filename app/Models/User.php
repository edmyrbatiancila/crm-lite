<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Authorization helper methods for specific resources
     */
    public function canManageUsers(): bool
    {
        return $this->hasAnyPermission(['manage users', 'edit users', 'delete users']);
    }

    public function canManageClients(): bool
    {
        return $this->hasAnyPermission(['manage clients', 'edit clients', 'delete clients']);
    }

    public function canManageProjects(): bool
    {
        return $this->hasAnyPermission(['manage projects', 'edit projects', 'delete projects']);
    }

    public function canManageTasks(): bool
    {
        return $this->hasAnyPermission(['manage tasks', 'edit tasks', 'delete tasks']);
    }

    public function canManageLeads(): bool
    {
        return $this->hasAnyPermission(['manage leads', 'edit leads', 'delete leads']);
    }
}
