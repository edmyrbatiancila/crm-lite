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
        User::factory(10)->create();
        User::factory()->create([
            'first_name' => 'Admin',
            'last_name' => 'Nistrator',
            'email' => 'admin@gmail.com',
            'password' => 'inamawMana',
            'role' => RoleEnum::ADMIN->value // Set the role column
        ])->syncRoles([RoleEnum::ADMIN]);
    }
}
