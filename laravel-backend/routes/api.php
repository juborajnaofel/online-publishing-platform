<?php
use App\Http\Controllers\LoginRegController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('/', function (){
    return response()->json([ "msg" => "Welcome! This is Online publishing platform's backend"]);
});
Route::post('/login', [LoginRegController::class, "login"]);
Route::post('/register', [LoginRegController::class, "register"]);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
