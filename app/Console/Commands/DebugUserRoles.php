<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DebugUserRoles extends Command
{
    protected $signature = 'debug:user-roles {email?}';
    protected $description = 'Debug user roles and permissions';

    public function handle()
    {
        $email = $this->argument('email') ?? 'admin@gmail.com';
        
        $this->info("🔍 Debugging roles and permissions for: {$email}");
        $this->info("================================");
        
        // Check if user exists
        $user = User::where('email', $email)->first();
        if (!$user) {
            $this->error("❌ User not found: {$email}");
            return;
        }
        
        $this->info("✅ User found: {$user->first_name} {$user->last_name}");
        $this->info("User ID: {$user->id}");
        
        // Check user roles
        $roles = $user->getRoleNames();
        $this->info("\n🎭 User Roles:");
        if ($roles->isEmpty()) {
            $this->warn("   No roles assigned");
        } else {
            foreach ($roles as $role) {
                $this->info("   - {$role}");
            }
        }
        
        // Check user permissions
        $permissions = $user->getAllPermissions();
        $this->info("\n🔐 User Permissions:");
        if ($permissions->isEmpty()) {
            $this->warn("   No permissions assigned");
        } else {
            foreach ($permissions as $permission) {
                $this->info("   - {$permission->name}");
            }
        }
        
        // Check specific methods
        $this->info("\n🛠️ Permission Methods:");
        $this->info("   canManageUsers(): " . ($user->canManageUsers() ? '✅ true' : '❌ false'));
        $this->info("   canManageClients(): " . ($user->canManageClients() ? '✅ true' : '❌ false'));
        $this->info("   canManageProjects(): " . ($user->canManageProjects() ? '✅ true' : '❌ false'));
        $this->info("   canManageTasks(): " . ($user->canManageTasks() ? '✅ true' : '❌ false'));
        
        // Check all roles in system
        $this->info("\n🌐 All Roles in System:");
        $allRoles = Role::all();
        foreach ($allRoles as $role) {
            $this->info("   - {$role->name}");
        }
        
        // Check all permissions in system
        $this->info("\n🌐 All Permissions in System:");
        $allPermissions = Permission::all();
        foreach ($allPermissions as $permission) {
            $this->info("   - {$permission->name}");
        }
        
        // Check admin role permissions
        $adminRole = Role::where('name', 'admin')->first();
        if ($adminRole) {
            $this->info("\n👑 Admin Role Permissions:");
            $adminPermissions = $adminRole->permissions;
            foreach ($adminPermissions as $permission) {
                $this->info("   - {$permission->name}");
            }
        }
    }
}
