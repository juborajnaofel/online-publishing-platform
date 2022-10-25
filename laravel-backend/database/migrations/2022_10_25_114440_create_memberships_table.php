<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;
class CreateMembershipsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('memberships', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained();
            $table->string('type');
            $table->string('cost');
            $table->timestamp('expire_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('memberships');
    }
}
