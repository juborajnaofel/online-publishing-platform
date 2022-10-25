<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUserData(){
        return auth()->user();
    }

    public function updateUserData(){
        return response()->json("User Updated!");
    }

    public function updateUserPassword(){
        
    }

    public function switchUserMembership(){
        
    }

    public function userPostsDraft(){

    }    

    public function userPostsScheduled(){

    }   
    
    public function userPostsPublished(){

    }   

    public function userFeedLoad(){

    }   
}
