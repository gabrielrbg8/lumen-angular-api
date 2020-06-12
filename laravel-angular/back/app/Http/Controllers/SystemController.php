<?php

namespace App\Http\Controllers;

use App\Edition;
use App\System;
use App\User;
use Exception;
use Illuminate\Http\Request;

class SystemController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function search(Request $request)
    {

        $consulta = System::where(function ($query) use ($request) {

            if (!empty($request->input('email'))) {
                $email = $request->email;
                $query->orWhere('email', "like", "%{$email}%");
            }


            if (!empty($request->input('initials'))) {
                $initials = $request->initials;
                $query->orWhere('initials', "like", "%{$initials}%");
            }


            if (!empty($request->input('description'))) {
                $description = $request->description;
                $query->orWhere('description', "like", "%{$description}%");
            }
        })->paginate(20);

        if (!$consulta->first()) {
            return json_encode([
                'message' => 'Nenhum sistema foi encontrado. Favor revisar os critérios da sua pesquisa!',
                'error' => 'error'
            ], 304);
        } else {
            return json_encode([
                'data' =>  $consulta,
            ], 200);
        }
    }
    public function create(Request $request)
    {
        try {

            $this->validate($request, [
                'email' => 'email|unique:systems',
                'initials' => 'required|max:10|unique:systems',
                'description' => 'required|max:100'
            ]);

            $system = System::create($request->all());
            if ($system)
                return response()->json([
                    'data' =>  $system,
                    'message' => 'Operação realizada com sucesso.',
                    'status_code' => 200,
                ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Falha ao criar sistema',
                'status_code' => 304,
            ]);
        }
    }

    public function view($id)
    {
        $system = System::find($id);

        if ($system) {
            return json_encode([
                'data' =>  $system,

            ], 200);       
         } else {
            return json_encode([
                'data' => 'Sistema não encontrado.',
            ], 404);
        }
    }

    public function getLastModification($id)
    {

        $edition = Edition::where(['system_id' => $id])->orderBy('created_at', 'DESC')->first();
        $lastEdition = [];
        if ($edition != null) {
            if ($edition->justification != null && $edition->created_at != null) {
                $user = User::find($edition->user_id);
                $lastEdition['justification'] = $edition->justification;
                $lastEdition['user'] = strtoupper($user->name);
                $lastEdition['date'] = date("d/m/Y H:i:s", strtotime($edition->created_at));

                return json_encode([
                    'data' =>  $lastEdition,
                    'message' => 'Operação realizada com sucesso.',
                ], 200);
            }
        } else {
            $edition = 'Nenhuma alteração foi feita nesse sistema.';
            return json_encode([
                'data' => $edition,
            ], 200);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $system = System::findOrFail($id);
          

            if ($system->update($request->all()))
                return json_encode([
                    'data' =>  $system,
                    'message' => 'Operação realizada com sucesso.',
                ], 200);
        } catch (Exception $e) {
            return json_encode([
                'message' => 'Falha ao atualizar sistema.',
            ], 304);
        }
    }
}
