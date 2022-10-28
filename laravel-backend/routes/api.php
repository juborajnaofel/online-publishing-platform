<?php
use App\Http\Controllers\LoginRegController;
use App\Http\Controllers\User\PostController;
use App\Http\Controllers\User\UserController;
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



Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/user', [UserController::class, "getUserData"]);
    Route::get('/home', [UserController::class, "userFeedLoad"]);



    Route::post('/user/update', [UserController::class, "updateUserData"]);
    Route::post('/user/update-password', [UserController::class, "updateUserPassword"]);
    Route::post('/user/update-membership', [UserController::class, "switchUserMembership"]);



    Route::post('/post/save-draft', [PostController::class, "save_draft"]);
    Route::post('/post/publish', [PostController::class, "publish_uncreated"])->middleware('postrule');
    Route::post('/post/schedule', [PostController::class, "schedule"])->middleware(['schedulerule','postrule']);
    Route::post('/post/publish-created/{id}', [PostController::class, "publish_created"])->middleware('postrule');
    Route::post('/post/delete/{id}', [PostController::class, "delete"]);
    Route::get('/posts/draft', [UserController::class, "userPostsDraft"]);
    Route::get('/posts/published', [UserController::class, "userPostsPublished"]);
    Route::get('/posts/scheduled', [UserController::class, "userPostsScheduled"]);
    Route::get('/view-a-post/{id}', [PostController::class, "view_any"]);

    


    Route::post('/logout', [LoginRegController::class, 'logout']);
});


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
