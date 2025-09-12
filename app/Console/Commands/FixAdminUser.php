<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Enums\RoleEnum;
use Illuminate\Console\Command;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class FixAdminUser extends Command
{
    protected $signature = 'fix:admin-user {email=admin@gmail.com}';
    protected $description = 'Fix admin user roles and permissions';

    public function handle()
    {
        $email = $this->argument('email');
        
        $this->info("🔧 Fixing admin user: {$email}");
        $this->info("========================================");
        
        try {
            // Find admin user
            $user = User::where('email', $email)->first();
            if (!$user) {
                $this->error("❌ Admin user not found: {$email}");
                return 1;
            }
            
            $this->info("✅ Found user: {$user->first_name} {$user->last_name} (ID: {$user->id})");
            
            // Ensure admin role exists
            $adminRole = Role::firstOrCreate(['name' => RoleEnum::ADMIN->value]);
            $this->info("✅ Admin role exists: {$adminRole->name}");
            
            // Check current roles
            $currentRoles = $user->getRoleNames();
            $this->info("📋 Current roles: " . ($currentRoles->isEmpty() ? 'None' : $currentRoles->implode(', ')));
            
            // Assign admin role if not already assigned
            if (!$user->hasRole(RoleEnum::ADMIN)) {
                $user->assignRole(RoleEnum::ADMIN);
                $this->info("✅ Assigned admin role to user");
            } else {
                $this->info("ℹ️ User already has admin role");
            }
            
            // Clear permission cache
            app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
            $this->info("🧹 Cleared permission cache");
            
            // Verify final state
            $user->refresh();
            $finalRoles = $user->getRoleNames();
            $finalPermissions = $user->getAllPermissions()->pluck('name');
            
            $this->info("\n🎯 FINAL STATE:");
            $this->info("Roles: " . ($finalRoles->isEmpty() ? 'None' : $finalRoles->implode(', ')));
            $this->info("Permissions count: " . $finalPermissions->count());
            $this->info("Can manage users: " . ($user->canManageUsers() ? '✅ Yes' : '❌ No'));
            
            $this->info("\n🎉 Admin user fixed successfully!");
            
            return 0;
            
        } catch (\Exception $e) {
            $this->error("❌ Error fixing admin user: " . $e->getMessage());
            $this->error("Stack trace: " . $e->getTraceAsString());
            return 1;
        }
    }
}
