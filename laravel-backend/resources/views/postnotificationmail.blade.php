<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Post Created</title>
</head>
<body>
    <p>Dear Admin,</p>
    <br>
    <br>
    <h2>A post has been published by a user!</h2>
    <p>User ID:{{$post_data->user_id}}</p>
    <p>Post ID:{{$post_data->id}}</p>
    <p>Created at:{{$post_data->created_at}}</p>
    <p>Published at:{{$post_data->published_at}}</p>
    <hr>
    <h3>{{$post_data->title}}</h3>
    <p>{{$post_data->description}}</p>
    
</body>
</html>