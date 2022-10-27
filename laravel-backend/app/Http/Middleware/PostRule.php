<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User\Post;
use App\Models\User\Membership;
use Illuminate\Support\Facades\DB;
class PostRule
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $count = Post::where('user_id', auth()->user()->id)
                    ->where(DB::raw('DATE(published_at)'),DB::raw('CURDATE()'))
                    ->count();
        $membership = Membership::where('user_id', auth()->user()->id)->orderBy('id', 'DESC')->first();
        if($membership === null){
            if($count >= 2){
                return response()->json(["success"=>false, "msg"=>"Not allowed! As a free member your post limit is only 2 posts per day"],401);
            }
        }else{
            if(($membership->type === 'free') && ($count >= 2)){
                return response()->json(["success"=>false, "msg"=>"Not allowed! As a free member your post limit is only 2 posts per day"],401);
            }
        }
        return $next($request);
    }
}
