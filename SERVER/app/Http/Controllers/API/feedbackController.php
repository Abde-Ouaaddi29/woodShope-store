<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Feedback::query();

        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }

        $feedback = $query->get();

        return response()->json($feedback);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {

            $request->validate([
                "email" => "required|email",
                "name" => "required|string",
                "message" => "required|string",
            ]);

            $feedback = Feedback::create([
                "email" =>  $request->email,
                "name" =>  $request->name,
                "message" => $request->message,
            ]);

        // Return a successful response with the created feedback
        return response()->json([
            "message" => "The feedback was stored successfully",
            "data" => $feedback, // Optionally return the created feedback
        ], 201); 
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $feedback = Feedback::findOrFail($id);

        $this->authorize('update',  $feedback);

        $feedback->update(["status" => "posted"]);

        return response()->json([
            "message" => "it is updated successefully",
            "data" =>  $feedback,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $feedback = Feedback::findOrFail($id);

        $this->authorize('delete',  $feedback);

        Feedback::destroy($id);
        return response()->json([
            "message" => "it is deleted"
        ]);
    }
}
