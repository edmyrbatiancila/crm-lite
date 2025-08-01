<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    public function customFieldValues()
    {
        return $this->morphMany(CustomFieldValue::class, 'customizable');
    }

    public function leads()
    {
        return $this->hasMany(Lead::class);
    }

    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function activityLogs()
    {
        return $this->morphMany(ActivityLog::class, 'loggable');
    }
}
