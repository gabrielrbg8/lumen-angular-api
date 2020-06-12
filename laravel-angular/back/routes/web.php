<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/


$router->group(['prefix' => 'auth'], function () use ($router) {
   $router->post('login', 'AuthController@login');
   $router->post('refresh', 'AuthController@refresh');

});

$router->group(['middleware' => ['auth']], function() use ($router){
   $router->post('auth/me', 'AuthController@me');
   $router->post('auth/logout', 'AuthController@logout');
});

$router->group(['prefix' => 'api/user', 'middleware' => ['auth']], function () use ($router) {
   $router->post('create', 'UserController@create');
});


$router->group(['prefix' => 'api/system', 'middleware' => ['auth']], function () use ($router) {
   $router->post('create', 'SystemController@create');
   $router->post('search', 'SystemController@search');
   $router->get('view/{id}', 'SystemController@view');
   $router->get('last-modification/{id}', 'SystemController@getLastModification');
   $router->put('update/{id}', 'SystemController@update');

});