<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Product::with('category');

        if ($request->has('category_id')) {
            $query->where('category_id', $request->input('category_id'));
        }

        if ($request->has('priceMin') && $request->has('priceMax')) {
            $query->whereBetween('price', [$request->input('priceMin'), $request->input('priceMax')]);
        }

        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->input('name') . '%');
        }

        if ($request->has('sort')) {
            switch ($request->input('sort')) {
                case 'created_at':
                    $query->orderBy('created_at', 'asc'); 
                    break;
                case 'priceAsc':
                    $query->orderBy('price', 'asc'); 
                    break;
                case 'priceDesc':
                    $query->orderBy('price', 'desc'); 
                    break;
                default:
                    break;
            }
        }
        

        // $query->inRandomOrder();

        $products = $query->get();
        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $this->authorize('create', Product::class);

        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'required|string',
            'features' => 'required|string',
            'price' => 'required|numeric|min:0|max:999999.99',
            'category_id' => 'required|exists:categories,id',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/images2', $imageName);

            $product = new Product();
            $product->name = $request->name;
            $product->image = 'storage/images2/' . $imageName;
            $product->description = $request->description;
            $product->features = $request->features;
            $product->price = $request->price;
            $product->category_id = $request->category_id;
            $product->save();

            return response()->json([
                'message' => 'Product created successfully',
                'data' =>  $product
            ], 201);
        } else {
            return response()->json(['message' => 'Image upload failed'], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::with('category')->findOrFail($id);
        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($id);

        $this->authorize('update', $product);
        
        $request->validate([
            'name' => 'sometimes|string|max:255',
            // 'image' => 'sometimes|image',
            'desc' => 'sometimes|string',
            'features' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0|max:999999.99',
            'category_id' => 'sometimes|exists:categories,id',
        ]);

        $product->update($request->all());

        return response()->json([
            'message' => 'Product updated successfully',
            'data' => $product->fresh()
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);

        $this->authorize('delete', $product);

        Product::destroy($id);
        return response()->json(["message" => "the prouduct was deleted !"]);
    }
}
