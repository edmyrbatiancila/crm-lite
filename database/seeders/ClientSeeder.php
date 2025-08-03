<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Client::create([
            'name' => 'Acme Corp',
            'email' => 'contact@acme.com',
            'mobile_no' => '09123456780',
            'phone' => '1234-5678',
            'address' => '123 Main St, Metro Manila',
            'notes' => 'Important client, follow up monthly.',
            'assigned_to' => 1
        ]);
    }
}
