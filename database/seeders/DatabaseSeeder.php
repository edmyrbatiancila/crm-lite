<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            PermissionSeeder::class,
            UserSeeder::class,
            ClientSeeder::class,
            ProjectSeeder::class,
            NotificationSeeder::class,
            TaskSeeder::class,
            LeadSourceSeeder::class,
            LeadSeeder::class,
            ContactSeeder::class,
            CustomFieldSeeder::class,
            CustomFieldValueSeeder::class,
            ActivityLogSeeder::class,
        ]);
    }
}
