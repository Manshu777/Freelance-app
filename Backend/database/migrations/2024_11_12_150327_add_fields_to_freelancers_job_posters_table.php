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
            $table->string('gender')->nullable();
            $table->string('username')->unique();
            $table->string('fullname')->nullable();
            $table->json('achievement')->nullable();
            $table->string('subhead')->nullable(); // or title
            $table->json('skills')->nullable(); // assuming skills can be an array
                $table->date('dob')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('freelancers_job_posters', function (Blueprint $table) {
            $table->dropColumn(['gender', 'username', 'fullname', 'achievement', 'subhead', 'skills']);
        });
    }
};
