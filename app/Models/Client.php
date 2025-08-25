<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Client extends Model
{
    use HasFactory, SoftDeletes, LogsActivity;

    protected $fillable = [
        'name', 
        'email', 
        'mobile_no', 
        'phone', 
        'address', 
        'notes', 
        'assigned_to'
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
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['name', 'email', 'phone', 'mobile_no', 'address', 'assigned_to'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }
}
