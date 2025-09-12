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
        $this->command->info('🎭 Starting RoleSeeder...');
        
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
        $this->command->info('🧹 Cleared permission cache');

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

        $this->command->info("📝 Creating " . count($permissions) . " permissions...");
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }
        $this->command->info("✅ Permissions created");

        // Create admin role and assign all permissions
        $adminRole = Role::firstOrCreate(['name' => RoleEnum::ADMIN]);
        $adminRole->syncPermissions($permissions);
        $this->command->info("👑 Admin role created with " . count($permissions) . " permissions");

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
        $this->command->info("👤 User role created with limited permissions");
        $this->command->info("🎉 RoleSeeder completed successfully");
    }
}
