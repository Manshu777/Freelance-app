<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StudentController extends Controller
{
    // Display a listing of students
    public function index()
    {
        return Student::all();
    }

    // Store a newly created student with image upload
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:students',
            'phone' => 'nullable',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('students', 'public');
        }

        $student = Student::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'image' => $imagePath,
        ]);

        return response()->json($student, 201);
    }

    // Show a specific student
    public function show($id)
    {
        return Student::findOrFail($id);
    }

    // Update a student's data with optional image upload
    public function update(Request $request, $id)
    {
        $student = Student::findOrFail($id);

        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:students,email,' . $id,
            'phone' => 'nullable',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($student->image) {
                Storage::disk('public')->delete($student->image);
            }

            $student->image = $request->file('image')->store('students', 'public');
        }

        $student->update($request->only(['name', 'email', 'phone', 'image']));

        return response()->json($student);
    }

    // Remove a student and their image
    public function destroy($id)
    {
        $student = Student::findOrFail($id);

        if ($student->image) {
            Storage::disk('public')->delete($student->image);
        }

        $student->delete();

        return response()->json(['message' => 'Student deleted successfully']);
    }
}
