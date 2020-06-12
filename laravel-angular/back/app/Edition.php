<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Edition extends Model{

    protected $table = 'editions';

    protected $fillable = [
        'justification', 'last_justification', 'user_id', 'system_id'
    ];


}