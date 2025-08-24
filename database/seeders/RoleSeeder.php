<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create Permissions
        $permissions = [
            // User permissions
            'manage users',
            'view users',
            'create users',
            'edit users',
            'delete users',

            // Client permissions
            'manage clients',
            'view clients',
            'create clients',
            'edit clients',
            'delete clients',

            // Project permissions
            'manage projects',
            'view projects',
            'create projects',
            'edit projects',
            'delete projects',

            // Task permissions
            'manage tasks',
            'view tasks',
            'create tasks',
            'edit tasks',
            'delete tasks',

            // Lead permissions
            'manage leads',
            'view leads',
            'create leads',
            'edit leads',
            'delete leads',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create admin role and assign all permissions
        $adminRole = Role::firstOrCreate(['name' => RoleEnum::ADMIN]);
        $adminRole->syncPermissions($permissions);

        // Create user role with limited permissions
        $userRole = Role::firstOrCreate(['name' => RoleEnum::USER]);
        $userRole->syncPermissions([
            'view clients', 
            'create clients',
            'view projects',
            'create projects', 
            'view tasks',
            'create tasks',
            'view leads',
            'create leads'
        ]);
    }
}
