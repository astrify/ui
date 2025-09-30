<?php

namespace App\Http\Controllers\Astrify;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Inertia\Response;

class TableController extends Controller
{
    public function index(Request $request): Response
    {
        // Fetch users paginated (10 per page, for example)
        $users = User::select('id', 'name', 'email', 'created_at')
            ->orderBy('id', 'desc')
            ->paginate(10);

        return Inertia::render('table', [
            'users' => $users,  // Pass the paginator object to Inertia
        ]);
    }
}
