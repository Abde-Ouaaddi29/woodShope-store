<?php

namespace App\Policies;

use App\Models\Admin;
use App\Models\Feedback;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class FeedbackPolicy
{
     /**
     * Determine whether the user can create models.
     */
    // public function Admin_creation(Admin $admin): bool
    // {
    //   return true;
    // }

    // public function User_creation(User $admin): bool
    // {
    //   return true;
    // }

    /**
     * Determine whether the user can update the model.
     */
    public function update(Admin $admin, Feedback $feedback): bool
    {
        return true;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Admin $admin, Feedback $feedback): bool
    {
        return true;
    }

    
}
