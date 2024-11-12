<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('freelancers_job_posters', function (Blueprint $table) {
            $table->date('dob')->nullable()->after('skills'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('freelancers_job_posters', function (Blueprint $table) {
            $table->date('dob')->nullable()->after('skills'); 
        });
    }
};
