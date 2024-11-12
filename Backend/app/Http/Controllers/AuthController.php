<?php

namespace App\Http\Controllers;

use App\Models\FreelancerJobPoster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // Register a new user (Signup)
    public function register(Request $request)
    {
        // Validation for the request input
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:freelancers_job_posters',
            'password' => 'required|string|min:8',
            'profile_image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'gender' => 'nullable|string|max:10',
            'username' => 'required|string|max:255|unique:freelancers_job_posters',
            'fullname' => 'nullable|string|max:255',
            'achievement' => 'nullable|array', // expecting an array of achievements
            'subhead' => 'nullable|string|max:255',
            'skills' => 'nullable|array', // assuming skills are an array
            'dob' => 'nullable|date',
        ]);
    
        // Check for validation failure
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        // Handle the profile image upload if provided
        $profileImagePath = null;
        if ($request->hasFile('profile_image')) {
            $profileImage = $request->file('profile_image');
            $profileImagePath = $profileImage->store('profile_images', 'public');
        }
    
        // Create the user
        $user = FreelancerJobPoster::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? 'freelancer',
            'profile_image' => $profileImagePath,
            'gender' => $request->gender,
            'username' => $request->username,
            'fullname' => $request->fullname,
            'achievement' => json_encode($request->achievement), // store as JSON if it's an array
            'subhead' => $request->subhead,
            'skills' => json_encode($request->skills), // store as JSON if it's an array
            'dob' => $request->dob,
        ]);
    
        return response()->json(['message' => 'User registered successfully', 'data' => $user], 201);
    }
    

    // Login a user
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
    
        // Authenticate the user based on the credentials
        $user = FreelancerJobPoster::where('email', $credentials['email'])->first();
    
        if ($user && Hash::check($credentials['password'], $user->password)) {
            // Create a token for the user
            $token = $user->createToken('FreelancerJobPosterApp')->plainTextToken;
    
            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
            ]);
        }
    
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}
