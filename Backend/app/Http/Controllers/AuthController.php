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
            'profile_image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048', // Image validation
        ]);
    
        // Check for validation failure
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        // Handle the profile image upload if provided
        $profileImagePath = null;
        if ($request->hasFile('profile_image')) {
            $profileImage = $request->file('profile_image');
            $profileImagePath = $profileImage->store('profile_images', 'public'); // Store in the 'public' disk in 'storage/app/public/profile_images'
        }
    
        // Create the user
        $user = FreelancerJobPoster::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? 'freelancer', // Default role if not provided
            'profile_image' => $profileImagePath, // Save the profile image path
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
