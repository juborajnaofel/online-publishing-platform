<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User\Membership;
class ScheduleRule
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
        $membership = Membership::where('user_id', auth()->user()->id)->orderBy('id', 'DESC')->first();
        if($membership === null){
            return response()->json(["success"=>false, "msg"=>"You cannot schedule! Only premium members can"],401);
        }else{
            if($membership->type === 'free'){
                return response()->json(["success"=>false, "msg"=>"You cannot schedule! Only premium members can"],401);
            }
        }
        return $next($request);
    }
}
