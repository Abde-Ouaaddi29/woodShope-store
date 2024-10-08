<?php

namespace App\Policies;

use App\Models\Admin;
use App\Models\Category;


class CategoryPolicy
{
    /**
     * Determine whether the user can create models.
     * here we specific the permission of role Admin or User (....)
     */
    public function create(Admin $admin): bool
    {
        return true; 
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(Admin $admin, Category $category): bool
    {
        return true; 
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Admin $admin, Category $category): bool
    {
        return true; 
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(Admin $admin, Category $category): bool
    {
        return true; 
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(Admin $admin, Category $category): bool
    {
        return true; 
    }
}
