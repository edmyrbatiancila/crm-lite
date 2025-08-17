<?php

namespace Database\Seeders;

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

            // Lead permissions
            'manage leads',
            'view leads',
            'create leads',
            'edit leads',
            'delete leads',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create admin role and assign all permissions
        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo($permissions);

        // Create user role with limited permissions
        $userRole = Role::create(['name' => 'user']);
        $userRole->givePermissionTo(['view clients', 'view leads']);
    }
}
