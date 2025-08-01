<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    public function customFieldValues()
    {
        return $this->morphMany(CustomFieldValue::class, 'customizable');
    }

    public function leadSource()
    {
        return $this->belongsTo(LeadSource::class);
    }
}
