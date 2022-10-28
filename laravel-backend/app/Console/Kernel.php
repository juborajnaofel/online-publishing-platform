<?php

namespace App\Console;

use App\Jobs\SendEmailJob;
use App\Mail\PostNotificationMail;
use App\Models\User\Post;
use Exception;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
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
            $current = date('Y-m-d h:i:s');
            $data = DB::table('posts')
            ->select("*")
            ->where('scheduled_at','!=', null)
            ->where('scheduled_at', '<', $current)
            ->get();

            //  var_dump(count($data));
            //  var_dump($current);
             if(count($data)>=1){
                $res = DB::table('posts')
                ->where('scheduled_at','!=', null)
                ->where('scheduled_at', '<', $current)
                ->update([
                    'status' => 'published',
                    'scheduled_at' => null,
                    'published_at'=> $current
                 ]);

                foreach($data as $d){
                    dispatch(new SendEmailJob($d));
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
