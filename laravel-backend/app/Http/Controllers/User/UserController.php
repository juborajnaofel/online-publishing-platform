<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\User\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;
use Illuminate\Support\Facades\Hash;
use App\Models\User\Membership;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function getUserData(){
        $user = auth()->user();
        if(!Cache::has('user_membership_'.auth()->user()->id)){
            $user['membership'] = Membership::where('user_id', auth()->user()->id)->orderBy('id', 'DESC')->first();
            Cache::put('user_membership_'.auth()->user()->id, $user['membership']);
        }else{
            $user['membership'] = Cache::get('user_membership_'.auth()->user()->id);
        }
        return response()->json($user, 200);
    }

    public function updateUserData(Request $request){
        try{
            $validatedUserdata = Validator::make($request->all(),[
                'name' => 'required',
                'email' => 'required',
            ]);
    
            if($validatedUserdata->fails()){
                return response()->json([ 
                    "success"=> false,
                    "msg" => "Validation failed!",
                    "error" => $validatedUserdata->errors()
                ]);
            }

            $user = User::find(auth()->user()->id);
            $user->name = $request->name;
            $user->email = $request->email;
            $user->save();

            return response()->json([ "success"=> true,"msg" => "Successfully updated", "data"=> $user],200);
        }catch(Exception $e){
            return response()->json([ "success"=> false,"msg" => "Server Error"],500);
        }
    }

    public function updateUserPassword(Request $request){
        try{
            $validatedUserdata = Validator::make($request->all(),[
                'old_password' => 'required',
                'new_password' => 'required',
            ]);
    
            if($validatedUserdata->fails()){
                return response()->json([ 
                    "success"=> false,
                    "msg" => "Validation failed!",
                    "error" => $validatedUserdata->errors()
                ]);
            }

            $user = User::find(auth()->user()->id);

            if(Hash::check($request->old_password, $user->password)){
                $user->password = Hash::make($request->new_password);
                $user->save();
                return response()->json([ "success"=> true,"msg" => "Successfully updated"],200);
            }
            return response()->json([ "success"=> false,"msg" => "Incorrect Password!"],401);
        }catch(Exception $e){
            return response()->json([ "success"=> false,"msg" => "Server Error"],500);
        }
    }

    public function switchUserMembership(Request $request){
        try{
            //stripe backend code should be here.
            
            if($request->type==='premium'){
                $validatedUserdata = Validator::make($request->all(),[
                    'card_number' => 'required',
                    'type' => 'required'
                ]);
        
                if($validatedUserdata->fails()){
                    return response()->json([ 
                        "success"=> false,
                        "msg" => "Validation failed!",
                        "error" => $validatedUserdata->errors()
                    ]);
                }

                $inputs = ['user_id'=> auth()->user()->id,'type' => "premium",'cost' => 0, 'expire_at' => date('Y-m-d', strtotime('+1 years'))];
                $membership = Membership::create($inputs);

                Cache::put('user_membership_'.auth()->user()->id, $membership);
                
                return response()->json([ 
                    "success"=> true,
                    "msg" => "Updated membership successfully",
                    "membership" => $membership
                ],201);  
            }
            $inputs = ['user_id'=> auth()->user()->id,'type' => 'free','cost' => 0, 'expire_at' => null];
            $membership = Membership::create($inputs);
            
            Cache::put('user_membership_'.auth()->user()->id, $membership);
            
            return response()->json([ 
                "success"=> true,
                "msg" => "Updated membership successfully",
                "membership" => $membership
            ],201);

        }catch(Exception $e){
            return response()->json([ "success"=> false,"msg" => "Server Error"],500);
        }
    }

    public function userPostsDraft(){
        try{
            if(!Cache::has('user_posts_draft_'.auth()->user()->id)){
                $posts = Post::where('user_id', auth()->user()->id)
                ->where('status', 'draft')
                ->orderBy('created_at', "DESC")
                ->get();

                Cache::add('user_posts_draft_'.auth()->user()->id, $posts);
            
            }else{
                $posts = Cache::get('user_posts_draft_'.auth()->user()->id);
            }
            return response()->json([ "success"=> true,
                                    "msg" => "User's drafts",
                                    "total_records"=> $posts->count(),
                                    "data" => $posts
                                ],200);
        }catch(Exception $e){
            return response()->json([ "success"=> false,"msg" => "Server Error"],500);
        }
    }    

    public function userPostsScheduled(){
        try{
            if(!Cache::has('user_posts_scheduled_'.auth()->user()->id)){
                $posts = Post::where('user_id', auth()->user()->id)
                ->where('status', 'scheduled')
                ->orderBy('scheduled_at', "DESC")
                ->get();

                Cache::add('user_posts_scheduled_'.auth()->user()->id, $posts);
            
            }else{
                $posts = Cache::get('user_posts_scheduled_'.auth()->user()->id);
            }
            return response()->json([ "success"=> true,
                                    "msg" => "User's drafts",
                                    "total_records"=> $posts->count(),
                                    "data" => $posts
                                ],200);
        }catch(Exception $e){
            return response()->json([ "success"=> false,"msg" => "Server Error"],500);
        }
    }   
    
    public function userPostsPublished(){
        try{
            if(!Cache::has('user_posts_published_'.auth()->user()->id)){

                $posts = Post::where('user_id', auth()->user()->id)
                ->where('status', 'published')
                ->orderBy('published_at', "DESC")
                ->get();
                Cache::add('user_posts_published_'.auth()->user()->id, $posts);
            
            }else{
                $posts = Cache::get('user_posts_published_'.auth()->user()->id);
            }

            return response()->json([ "success"=> true,
                                    "msg" => "User's Published",
                                    "total_records"=> $posts->count(),
                                    "data" => $posts
                                ],200);
        }catch(Exception $e){
            return response()->json([ "success"=> false,"msg" => "Server Error"],500);
        }
    }   

    public function userFeedLoad(){
        
        try{
            if(!Cache::has('user_posts_feed_'.auth()->user()->id)){
                // $posts = Post::where('status', 'published')
                // ->where('user_id',"!=",auth()->user()->id)
                // ->orderBy('created_at', "DESC")
                // ->get();

                $posts = Post::select('posts.*')
                ->selectRaw('COUNT(DISTINCT comments.id) as total_comments')
                ->selectRaw('COUNT(DISTINCT likes.id) as total_likes')
                ->leftJoin('comments', 'posts.id','=', 'comments.post_id')
                ->leftJoin('likes', 'posts.id','=', 'likes.post_id')
                ->where('posts.status', 'published')
                ->where('posts.user_id',"!=",auth()->user()->id)
                ->groupBy('posts.id')
                ->orderBy('posts.created_at', "DESC")
                ->get();

                Cache::put('user_posts_feed_'.auth()->user()->id, $posts);
            
            }else{
                $posts = Cache::get('user_posts_feed_'.auth()->user()->id);
            }
            return response()->json([ "success"=> true,
                                    "msg" => "User's drafts",
                                    "total_records"=> $posts->count(),
                                    "data" => $posts
                                ],200);
        }catch(Exception $e){
            return response()->json([ "success"=> false,"msg" => "Server Error"],500);
        }
    }   
}
