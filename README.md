# Online-publishing-platform
This project is created by <b>I.E.U. Juboraj Naofel</b>.
Technologies used: laravel9, ReactJS, Bootstrap5
<br>
<br>
<br>
<hr>
<p align="center"><b>In order to test this project you should go through these steps below</b></p>
<hr>
<br>
<br>
<h1>For laravel backend</h1>

Inside .env file,
- ADMIN_MAIL_ADDRESS="sample@email.com" To receive email for new published posts, 
- provide SMTP credentials
- DB credentials
- RADIS credentials

<h4>Then in a terminal run these commands:</h4>

- cd laravel-backend
- composer update
- php artisan key:generate
- php artisan migrate
- php artisan db:seed
- php artisan serve

<h4>Then in a separate terminal run the scheduler:</h4>

- php artisan schedule:work

<h4>Then in a separate terminal run the queue:</h4>

- php artisan queue:work


<h1>For react frontend</h1>

- In your front-end aplication configure your laravel-backend api base url in the object <b>const BackendApi = { baseurl: "http://127.0.0.1:8000"}</b>, which is in the file <b>"front-end/config/BackendApi.js"</b>. If your laravel base url is "http://127.0.0.1:8000" then no configuration needed.

<h4>Then in a separate terminal run the frontend:</h4>

- cd front-end
- npm install
- npm start





