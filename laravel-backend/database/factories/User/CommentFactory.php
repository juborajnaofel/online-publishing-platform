<?php

namespace Database\Factories\User;

use App\Models\User;
use App\Models\User\Comment;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'parent_comment_id' => null,
            'comment' => $this->faker->realText(50),
            'post_id' => User::all()->random()->id,
        ];
    }
}
