<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => 'inamawMana'
        ]);

        $this->call([
            
            ClientSeeder::class,
            LeadSourceSeeder::class,
            LeadSeeder::class,
            ContactSeeder::class,
            CustomFieldSeeder::class,
            CustomFieldValueSeeder::class,
            ActivityLogSeeder::class,
        ]);
    }
}
