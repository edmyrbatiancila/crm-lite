<?php

namespace Database\Seeders;

use App\Models\LeadSource;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LeadSourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sources = [
            [
                'name' => 'Website', 
                'description' => 'Lead came from website contact form'
            ],
            [
                'name' => 'Facebook Ads', 
                'description' => 'Lead generated from Facebook advertisement'
            ],
            [
                'name' => 'Referral', 
                'description' => 'Referred by an existing customer or partner'
            ],
            [
                'name' => 'Email Campaign', 
                'description' => 'Collected through an email campaign'
            ],
            [
                'name' => 'Cold Call', 
                'description' => 'Generated via cold calling or manual outreach'
            ],
            [
                'name' => 'Walk-In', 
                'description' => 'Client came directly to office or store'
            ],
        ];

        foreach ($sources as $source) {
            LeadSource::create($source);
        }
    }
}
