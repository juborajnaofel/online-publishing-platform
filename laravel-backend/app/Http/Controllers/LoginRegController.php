<?php

namespace App\Http\Controllers;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginRegController extends Controller
{
    public function login(Request $request){
        $validated = $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);


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
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);

        try{
            $inputs = ['name' => $request->name,'email' => $request->email, 'password' => Hash::make($request->password)];
            User::create($inputs);
            return response()->json([ "success"=> true,"msg" => "Registration successfully done"]);
        }catch(Exception $e){
            return response()->json([ "success"=> true,"msg" => "Something went wrong!"]);
        }
    }
}
