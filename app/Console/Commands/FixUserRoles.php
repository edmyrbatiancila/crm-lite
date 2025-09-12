<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Enums\RoleEnum;
use Illuminate\Console\Command;
use Spatie\Permission\Models\Role;

class FixUserRoles extends Command
{
    protected $signature = 'fix:user-roles';
    protected $description = 'Fix users who do not have any roles assigned';

    public function handle()
    {
        $this->info("🔧 Fixing users without roles...");
        $this->info("===================================");
        
        try {
            // Ensure roles exist
            $adminRole = Role::firstOrCreate(['name' => RoleEnum::ADMIN->value]);
            $userRole = Role::firstOrCreate(['name' => RoleEnum::USER->value]);
            
            $this->info("✅ Roles verified: admin and user");
            
            // Find users without any roles
            $usersWithoutRoles = User::whereDoesntHave('roles')->get();
            
            $this->info("🔍 Found " . $usersWithoutRoles->count() . " users without roles");
            
            if ($usersWithoutRoles->isEmpty()) {
                $this->info("🎉 All users already have roles assigned!");
                return 0;
            }
            
            $fixedCount = 0;
            
            foreach ($usersWithoutRoles as $user) {
                // Assign user role to all users without roles (except admin email)
                if ($user->email === 'admin@gmail.com') {
                    $user->assignRole(RoleEnum::ADMIN);
                    $this->info("👑 Assigned admin role to: {$user->email}");
                } else {
                    $user->assignRole(RoleEnum::USER);
                    $this->info("👤 Assigned user role to: {$user->email}");
                }
                $fixedCount++;
            }
            
            // Clear cache
            app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
            
            $this->info("🧹 Cleared permission cache");
            $this->info("🎉 Fixed {$fixedCount} users successfully!");
            
            // Verify the fix
            $this->info("\n📊 Current role distribution:");
            $adminCount = User::role(RoleEnum::ADMIN)->count();
            $userCount = User::role(RoleEnum::USER)->count();
            $noRoleCount = User::whereDoesntHave('roles')->count();
            
            $this->info("   Admin users: {$adminCount}");
            $this->info("   Regular users: {$userCount}");
            $this->info("   Users without roles: {$noRoleCount}");
            
            return 0;
            
        } catch (\Exception $e) {
            $this->error("❌ Error fixing user roles: " . $e->getMessage());
            return 1;
        }
    }
}
