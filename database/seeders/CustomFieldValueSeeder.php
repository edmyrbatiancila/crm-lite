<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\CustomField;
use App\Models\CustomFieldValue;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomFieldValueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $client = Client::inRandomOrder()->first();
        $customField = CustomField::first();

        CustomFieldValue::create([
            'customizable_type' => get_class($client),
            'customizable_id' => $client->id,
            'custom_field_id' => $customField->id,
            'value' => '100+ employees',
        ]);
    }
}
