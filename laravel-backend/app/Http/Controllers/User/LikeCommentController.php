<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User\Like;
use App\Models\User\Post;
use Illuminate\Support\Facades\Validator;
use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;

class LikeCommentController extends Controller
{
    public function like_toggle(Request $request){
        try{
            $validatedUserdata = Validator::make($request->all(),[
                'isLiked' => 'required',
                'post_id' => 'required'
            ]);
    
            if($validatedUserdata->fails()){
                return response()->json([ 
                    "success"=> false,
                    "msg" => "Validation failed!",
                    "error" => $validatedUserdata->errors()
                ]);
            }
            Cache::forget('post_'.$request->post_id);
            Cache::forget('user_posts_feed_'.auth()->user()->id);

            if($request->isLiked == true){
                Like::where('user_id', auth()->user()->id)->where('post_id', $request->post_id)->delete();


                return response()->json([ "success"=> true,"msg" => "unliked"],201);
            }
            Like::where('user_id', auth()->user()->id)->where('post_id', $request->post_id)->delete();
            $inputs = ['user_id'=> auth()->user()->id,'post_id'=> $request->post_id];
            $like = Like::create($inputs);
            $like->save();
            return response()->json([ "success"=> true,"msg" => "liked"],201);
            

        }catch(Exception $e){
            return response()->json([ "success"=> false,"msg" => "Server Error"],500);
        }
    }
}
