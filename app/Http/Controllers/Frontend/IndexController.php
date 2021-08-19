<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contact;
use App\Models\ScreamModel;

class IndexController extends Controller
{
    public function index(){
        return view('frontend.pages.scream-files.index');
    }

    public function play() {
        return view('frontend.pages.play');
    }

    public function contactSubmit(Request $request){
        $request->validate([
            'fullname' => 'required',
            'email' => 'required',
            'mobile' => 'required',
            'address' => 'required',
        ]);

        $contact = new Contact();
        $contact->name = $request->fullname;
        $contact->email = $request->email;
        $contact->number = $request->mobile;
        $contact->address = $request->address;
        $contact->score = $request->score;
        $contact->save();


        return 1;
    }

    public function formSubmit(Request $request){

        $request->validate([
            'name' => 'required',
            'email' => 'required|unique:scream_models',
            'number' => 'required',
        ]);

        $alreadyExist = ScreamModel::where('email', $request->email)->first();
        
        if($alreadyExist){
            return response()->json();
            // return redirect()->back()->with('message','You have already submitted your recording');
        }else{
            $contact = new ScreamModel();
            $contact->name = $request->name;
            $contact->email = $request->email;
            $contact->number = round($request->number);
            $contact->decibels = $request->decibel;
            if ($request->has('audioFile'))
            {
                $contact->audio = $request->file('audioFile')->store(config('constants.uploads.audio'));
            }
            $contact->save();
    
            return $contact->slug;
        }

    }

    public function thankYou($slug){
        $contact = ScreamModel::where('slug', $slug)->first();
        return view('frontend.pages.scream-files.thank-you')->with([
            'contact'=>$contact
        ]);
    }

}
