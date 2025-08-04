<?php

namespace Database\Seeders;

use App\Models\ActivityLog;
use App\Models\Client;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ActivityLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $client = Client::inRandomOrder()->first();
        $user = User::first();

        ActivityLog::create([
            'loggable_type' => get_class($client),
            'loggable_id' => $client->id,
            'action' => 'created',
            'description' => 'Client record was created.',
            'user_id' => $user->id,
        ]);
    }
}
