<?php

namespace App\Http\Controllers;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class LoginRegController extends Controller
{
    public function login(Request $request){
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
                return response()->json([ "success"=> true,"msg" => "Login successfully done"]);
            }
            return response()->json([ "success"=> false,"msg" => "Incorrect Password!"]);
        }

        return response()->json([ "success"=> false,"msg" => "Email not found!"]);
    }

    public function register(Request $request){
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

        try{
            $inputs = ['name' => $request->name,'email' => $request->email, 'password' => Hash::make($request->password)];
            User::create($inputs);
            return response()->json([ "success"=> true,"msg" => "Registration successfully done"]);
        }catch(Exception $e){
            return response()->json([ "success"=> true,"msg" => "Something went wrong!"]);
        }
    }
}
