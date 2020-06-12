<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Hashing\BcryptHasher;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    public function create(Request $request){
        $data = $request->all();
        $bcrypt = new BcryptHasher();
        $data['password'] = $bcrypt->make($data['password']);
        $user = User::create($data);
        if($user){
            return $user;
        } else{
            return json_encode([
                'message' => 'Falha ao criar usuário'
            ], 304);
        }
    }
}
