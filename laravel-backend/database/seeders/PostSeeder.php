<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User\Post;
use Illuminate\Support\Str;
class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Post::factory()->count(100)->create();
    }


}
