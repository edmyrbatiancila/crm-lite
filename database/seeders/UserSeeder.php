<?php

namespace Database\Seeders;

use App\Models\User;
use App\Enums\RoleEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create regular users first
        User::factory(10)->create();
        
        // Create admin user with proper error handling
        try {
            // Ensure the admin role exists before creating user
            $adminRole = \Spatie\Permission\Models\Role::firstOrCreate(['name' => RoleEnum::ADMIN->value]);
            
            // Create or find admin user
            $adminUser = User::updateOrCreate(
                ['email' => 'admin@gmail.com'], // Find by email
                [
                    'first_name' => 'Admin',
                    'last_name' => 'Nistrator',
                    'password' => bcrypt('admin123'), // Ensure password is hashed
                    'role' => RoleEnum::ADMIN->value
                ]
            );
            
            // Assign role to admin user with error handling
            if (!$adminUser->hasRole(RoleEnum::ADMIN)) {
                $adminUser->assignRole(RoleEnum::ADMIN);
                $this->command->info("✅ Admin role assigned to user: {$adminUser->email}");
            } else {
                $this->command->info("ℹ️ Admin user already has admin role: {$adminUser->email}");
            }
            
        } catch (\Exception $e) {
            $this->command->error("❌ Failed to create admin user: " . $e->getMessage());
            throw $e;
        }
    }
}
