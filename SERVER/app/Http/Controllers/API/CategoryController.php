<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    use AuthorizesRequests;

    public function index(): JsonResponse
    {
        // $categories = Category::all();
        $query = Category::with('product');
        $categories = $query->get();

        if ($categories->count() > 0) {
            // return response()->json(['category' => $categories, 'userData' => auth()->user()->id]);
            return response()->json($categories);
        } else {
            return response()->json(['message' => 'No categories '], 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $this->authorize('create', Category::class);

        $request->validate([
            "name" => "required|string|unique:categories,name",
            'desc' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/images', $imageName);

            $category = new Category();
            $category->name = $request->name;
            $category->desc = $request->desc;
            $category->image = 'storage/images/' . $imageName;
            $category->save();

            return response()->json([
                'message' => 'Category created successfully',
                'data' =>  $category
            ], 201);
        } else {
            return response()->json(['message' => 'Image upload failed'], 400);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $categories = Category::with('Product')->findOrFail($id);
        return response()->json($categories);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $id): JsonResponse
    {
        // Find the category by ID
        $category = Category::find($id);
        $this->authorize('update', $category);

        // Check if the category exists
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        // Update the category with validated data
        $category->update($request->all());

        // Return the updated category as a response
        return response()->json($request->all(), 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $category = Category::findOrFail($id);

        $this->authorize('delete', $category);

        Category::destroy($id);
        return response()->json([
            "message" => "category is deleted !"
        ]);
    }
}
