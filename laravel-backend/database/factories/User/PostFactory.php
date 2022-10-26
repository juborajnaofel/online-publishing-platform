<?php

namespace Database\Factories\User;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
class PostFactory extends Factory
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
            'title' => $this->faker->realText(30),
            'description' => $this->faker->realText(300),
            'status' => $this->getRandomStatus()
        ];
    }
    public function getRandomStatus(){
        $arr = array( "draft"=>"draft", "published"=>"published");
        $key = array_rand($arr);
        return $arr[$key];
    }
}
