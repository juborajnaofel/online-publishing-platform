<?php

namespace Database\Seeders;

use App\Models\User\Like;
use Illuminate\Database\Seeder;

class LikeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Like::factory()->count(1000)->create();
    }
}
