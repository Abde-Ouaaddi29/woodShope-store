<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $query = Category::with('product');
        $categories = $query->get();
        return response()->json($categories, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            "name" => "sometimes|string|unique:categories,name",
            'desc' => 'required|string',
            'image' => 'required|image'
        ]);


        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');

            $category = Category::create([
                'name' => $request->name,
                'desc' => $request->desc,
                'image' => 'storage/' . $path
            ]);

            return response()->json([
                'message' => 'Category created successfully',
                'data' =>  $category
            ], 201);
        } else {
            return response()->json([
                'message' => 'Image upload failed',
            ], 422);
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
    public function update(Request $request, string $id): JsonResponse
    {
        $category = Category::findOrFail($id);

        $request->validate([
            'name' => 'required|string|unique:categories,name|max:255',
            'desc' => 'required|string',
            'image' => 'required|image'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');

            $categorie = $category->update([
                'name' => $request->name,
                'desc' => $request->desc,
                'image' => 'storage/' . $path
            ]);

            return response()->json([
                'message' => 'Category updated successfully',
                'data' =>  $categorie
            ], 201);
        } else {
            return response()->json([
                'message' => 'Image upload failed',
            ], 422);
        }
        
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        Category::destroy($id);
        return response()->json([
            "message" => "category is deleted !"
        ]);
    }
}
