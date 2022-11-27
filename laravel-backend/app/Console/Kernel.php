<?php

namespace App\Console;

use App\Jobs\SendEmailJob;
use App\Mail\PostNotificationMail;
use App\Models\User\Post;
use Exception;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();
        $schedule->call(function () {
            $current_date = date('Y-m-d');
            $current_time = date('H:i:s');
            $data = DB::table('posts')
            ->select("*")
            ->where('scheduled_at','!=', NULL)
            ->whereDate('scheduled_at','<=', $current_date)
            ->having(DB::raw('TIME(scheduled_at)'),'<',$current_time)
            ->get();

            // var_dump(count($data));
            // var_dump($current_date);
            // var_dump($current_time);
             if(count($data)>=1){
                $res = DB::table('posts')
                ->where('scheduled_at','!=', NULL)
                ->whereDate('scheduled_at','<=', $current_date)
                ->having(DB::raw('TIME(scheduled_at)'),'<',$current_time)
                ->update([
                    'status' => 'published',
                    'scheduled_at' => null,
                    'published_at'=> date('Y-m-d H:i:s')
                 ]);
                if($res){
                    foreach($data as $d){
                        dispatch(new SendEmailJob($d));
                        Cache::forget('user_posts_feed_'.$d->user_id);
                        Cache::forget('user_posts_draft_'.$d->user_id);
                        Cache::forget('user_posts_published_'.$d->user_id);
                        Cache::forget('user_posts_scheduled_'.$d->user_id);
                        Cache::put('post_'.$d->id, $d);
                    }
                }
             }
        })->everyMinute();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
