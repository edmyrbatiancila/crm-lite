<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Contact;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $client = Client::inRandomOrder()->first();

        Contact::create([
            'client_id' => $client->id,
            'name' => 'John Doe',
            'email' => 'johndoe@example.com',
            'phone' => '09123456789',
            'position' => 'Manager',
        ]);
    }
}
