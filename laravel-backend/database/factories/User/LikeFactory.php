<?php

namespace Database\Factories\User;

use App\Models\User;
use App\Models\User\Comment;
use App\Models\User\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

class LikeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id'=> User::all()->random()->id,
            'post_id' => Post::all()->random()->id,
        ];
    }
}
