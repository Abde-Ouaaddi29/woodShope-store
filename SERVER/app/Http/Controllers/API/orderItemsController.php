<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\OrderItems;
use App\Models\Product;
use Illuminate\Http\Request;

class orderItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orderItems = OrderItems::all();
        return response()->json($orderItems);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       $product = Product::find($request->product_id);

       $cardItem = [
            'quantity' => $request->quantity,
            'price' => $product->price,
            'total' => $request->quantity * $product->price,
            'product_id' => $request->product_id,
        ];

        return response()->json($cardItem);
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
