<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeadSource extends Model
{
    public function leads()
    {
        return $this->hasMany(Lead::class);
    }
}
