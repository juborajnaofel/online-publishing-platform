<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\User\Membership;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class LoginRegController extends Controller
{
    public function login(Request $request){
        try{
            $validatedUserdata = Validator::make($request->all(),[
                'email' => 'required',
                'password' => 'required',
            ]);
    
            if($validatedUserdata->fails()){
                return response()->json([ 
                    "success"=> false,
                    "msg" => "Validation failed!",
                    "error" => $validatedUserdata->errors()
                ]);
            }


            $getUser = User::where("email", $request->email)->first();
            if($getUser != NULL){
                if(Hash::check($request->password,$getUser->password)){
                    return response()->json([ 
                        "success"=> true,
                        "msg" => "Login successfully done",
                        "token" => $getUser->createToken("API TOKEN")->plainTextToken,
                        "userdata" =>$getUser,
                        "membership" => Membership::where('user_id', $getUser->id)->orderBy('id', 'DESC')->first()
                    ],200);
                }
                return response()->json([ "success"=> false,"msg" => "Incorrect Password!"],401);
            }
    
            return response()->json([ "success"=> false,"msg" => "Email not found!"],404);
        }catch(Exception $e){
            return response()->json([ "success"=> false,"msg" => "Something went wrong!"],500);
        }

    }

    public function register(Request $request){
        try{
            $validatedUserdata = Validator::make($request->all(),[
                'name' => 'required',
                'email' => 'required',
                'password' => 'required',
            ]);
    
            if($validatedUserdata->fails()){
                return response()->json([ 
                    "success"=> false,
                    "msg" => "Validation failed!",
                    "error" => $validatedUserdata->errors()
                ]);
            }


            $inputs = ['name' => $request->name,'email' => $request->email, 'password' => Hash::make($request->password)];
            $user = User::create($inputs);
            return response()->json([ 
                "success"=> true,
                "msg" => "Registration successfully done",
                "token" => $user->createToken("API TOKEN")->plainTextToken,
                "userdata" => $user,
                "membership" => null
            ],201);

        }catch(Exception $e){
            return response()->json([ "success"=> false,"msg" => "Something went wrong!"],500);
        }
    }

    public function logout(){
        try{
            DB::table('personal_access_tokens')->where('tokenable_id', auth()->user()->id)->delete();
            return response()->json([ "success"=> true,"msg" => "Successfully loged out"],200);
        }catch(Exception $e){
            return response()->json([ "success"=> false,"msg" => "Something went wrong!"],500);
        }
    }
}
