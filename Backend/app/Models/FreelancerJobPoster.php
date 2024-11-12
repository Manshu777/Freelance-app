<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
class FreelancerJobPoster extends Authenticatable
{
    use Notifiable, HasApiTokens;
    protected $table = 'freelancers_job_posters';

    protected $fillable = [
        'name', 'email', 'password', 'role','profile_image',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];
}
