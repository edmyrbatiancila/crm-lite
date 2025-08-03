<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'name',
        'email',
        'phone',
        'position'
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function activityLog()
    {
        return $this->morphMany(ActivityLog::class, 'loggable');
    }

    public function customFieldValues()
    {
        return $this->morphMany(CustomFieldValue::class, 'customizable');
    }
}
