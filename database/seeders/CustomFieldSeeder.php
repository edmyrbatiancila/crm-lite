<?php

namespace Database\Seeders;

use App\Models\CustomField;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomFieldSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CustomField::create([
            'label' => 'Company Size',
            'name' => 'company_size',
            'type' => 'text',
            'is_required' => false,
        ]);

        CustomField::create([
            'label' => 'Interested Product',
            'name' => 'interested_product',
            'type' => 'select',
            'options' => json_encode(['CRM', 'POS', 'Accounting']),
            'is_required' => true,
        ]);
    }
}
