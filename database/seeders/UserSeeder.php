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
        $this->command->info('👥 Starting UserSeeder...');
        
        try {
            // Ensure both roles exist before creating users
            $adminRole = \Spatie\Permission\Models\Role::firstOrCreate(['name' => RoleEnum::ADMIN->value]);
            $userRole = \Spatie\Permission\Models\Role::firstOrCreate(['name' => RoleEnum::USER->value]);
            $this->command->info("✅ Roles verified: admin and user");

            // Create admin user with proper error handling
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

            // Create regular users and ensure they get the user role
            $this->command->info("👤 Creating 10 regular users...");
            $regularUsers = User::factory(10)->create();
            
            // Ensure all regular users have the user role
            foreach ($regularUsers as $user) {
                if (!$user->hasRole(RoleEnum::USER)) {
                    $user->assignRole(RoleEnum::USER);
                    $this->command->info("✅ User role assigned to: {$user->email}");
                }
            }
            
            $this->command->info("🎉 UserSeeder completed successfully - " . (count($regularUsers) + 1) . " users created");
            
        } catch (\Exception $e) {
            $this->command->error("❌ Failed to create users: " . $e->getMessage());
            throw $e;
        }
    }
}
