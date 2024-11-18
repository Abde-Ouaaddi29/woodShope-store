<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $fillable = ['name', 'image', 'price', 'description', 'features', 'category_id'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function orderItem()
    {
        return $this->hasOne(OrderItems::class);
    }

}
