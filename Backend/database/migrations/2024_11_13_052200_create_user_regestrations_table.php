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
        Schema::create('user_regestrations', function (Blueprint $table) {
            $table->id();
            $table->string('image')->nullable();
            $table->string('User_Name'); // unique
            $table->string('Full_Name');
            $table->string('Email')->unique();
            $table->string('Contact')->nullable();
            $table->string('Date-Of-Birth')->nullable();
            $table->string('role')->nullable();
            $table->string('gender')->nullable();
            $table->string('Password')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_rigestrations');
    }
};
