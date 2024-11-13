<?php

namespace App\Http\Controllers;

use App\Models\UserRegestration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UserRegestrationController extends Controller
{
    /**
     * Display a listing of all user registrations.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Return all user registrations
        return response()->json(UserRegestration::all());
    }

    /**
     * Store a newly created user registration.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate incoming request
        $request->validate([
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'User_Name' => 'required|unique:user_regestrations',
            'Full_Name' => 'required',
            'Email' => 'required|email|unique:user_regestrations',
            'Contact' => 'nullable|string',
            'Date-Of-Birth' => 'nullable|string', // Expecting string or date format
            'role' => 'nullable|string',
            'gender' => 'nullable|string',
            'password' => 'required|string|min:6',
        ]);

        // Handle image upload if available
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('User_pictures', 'public');
        }

        // Generate a random token (for API or authentication purposes)
        $token = Str::random(128);

        // Create a new user registration record in the database
        $userRegestration = UserRegestration::create([
            'image' => $imagePath,
            'User_Name' => $request->User_Name,
            'Full_Name' => $request->Full_Name,
            'Email' => $request->Email,
            'Contact' => $request->Contact,
            'Date-Of-Birth' => $request->Date_Of_Birth, // Use Date-Of-Birth field
            'role' => $request->role,
            'gender' => $request->gender,
            'password' => bcrypt($request->password), // Hash the password
        ]);

        // Return the created user and token
        return response()->json([
            'user_regestration' => $userRegestration,
            'token' => $token,
        ], 201);
    }

    /**
     * Update an existing user registration.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Find the user registration record by ID
        $userRegestration = UserRegestration::findOrFail($id);

        // Validate incoming request
        $request->validate([
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'User_Name' => 'required|unique:user_regestrations,User_Name,' . $id,
            'Full_Name' => 'required',
            'Email' => 'required|email|unique:user_regestrations,Email,' . $id,
            'Contact' => 'nullable|string|unique:user_regestrations,Contact,' . $id,
            'Date-Of-Birth' => 'nullable|string', // Optional Date-Of-Birth field
            'role' => 'nullable|string',
            'gender' => 'nullable|string',
            'password' => 'nullable|string|min:6', // Optional password field
        ]);

        // Handle image upload if new image is provided
        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($userRegestration->image) {
                Storage::disk('public')->delete($userRegestration->image);
            }
            // Store new image
            $userRegestration->image = $request->file('image')->store('User_pictures', 'public');
        }

        // Update the user registration with the new data
        $userRegestration->update([
            'User_Name' => $request->User_Name,
            'Full_Name' => $request->Full_Name,
            'Email' => $request->Email,
            'Contact' => $request->Contact,
            'Date-Of-Birth' => $request->Date_Of_Birth,
            'role' => $request->role,
            'gender' => $request->gender,
            'password' => $request->password ? bcrypt($request->password) : $userRegestration->password, // Update password only if new one is provided
        ]);

        // Return the updated user registration
        return response()->json($userRegestration);
    }

    /**
     * Remove the specified user registration from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Find the user registration record by ID
        $userRegestration = UserRegestration::findOrFail($id);

        // Delete image if it exists
        if ($userRegestration->image) {
            Storage::disk('public')->delete($userRegestration->image);
        }

        // Delete the user registration record
        $userRegestration->delete();

        // Return a success message
        return response()->json(['message' => 'User deleted successfully']);
    }
}
