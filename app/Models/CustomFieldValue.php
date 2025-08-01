<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomFieldValue extends Model
{
    public function customizable()
    {
        return $this->morphTo();
    }

    public function customField()
    {
        return $this->belongsTo(CustomField::class);
    }
}
