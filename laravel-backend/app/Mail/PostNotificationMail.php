<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PostNotificationMail extends Mailable
{
    use Queueable, SerializesModels;
    public $maildata;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($maildata)
    {
        $this->maildata = $maildata;
 
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {   
        $data['post_data'] = $this->maildata;
        return $this->subject('Post Publish Notification!')->view('postnotificationmail', $data);
    }
}
