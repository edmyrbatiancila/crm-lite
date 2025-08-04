<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Lead;
use App\Models\LeadSource;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LeadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clients = Client::select('id', 'name')->first()->get();
        $leadSources = LeadSource::pluck('id')->toArray();
        $assignedUser = User::first();

        foreach ($clients as $client) {
            Lead::create([
                'client_id' => $client->id,
                'lead_source_id' => $leadSources[array_rand($leadSources)],
                'assigned_to' => $assignedUser->id,
                'status' => 'new',
                'notes' => 'Initial lead note for client ' . $client->name,
            ]);
        }
    }
}
