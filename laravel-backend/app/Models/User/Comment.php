<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = [
        'post_id',
        'comment',
        'parent_comment_id',
    ];

    public function posts()
    {
        return $this->belongsTo(Post::class);
    }


}
