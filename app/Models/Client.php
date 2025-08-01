<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'email', 'mobile_no', 'phone', 'address', 'notes'
    ];

    protected $with = ['leads', 'contacts'];

    protected $casts = [
        'some_field' => 'array',
        'created_at' => 'datetime',
    ];

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

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_tp');
    }
}
