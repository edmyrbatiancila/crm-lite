<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // This seeder is now redundant since RoleSeeder handles all permissions
        // Keep it for compatibility but don't create conflicting permissions
        
        // Ensure admin role has the manage users permission
        $adminRole = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'admin']);
        
        // Make sure the permission exists (should be created by RoleSeeder)
        $manageUsersPermission = \Spatie\Permission\Models\Permission::firstOrCreate(['name' => 'manage users']);
        
        if (!$adminRole->hasPermissionTo('manage users')) {
            $adminRole->givePermissionTo('manage users');
        }
    }
}
