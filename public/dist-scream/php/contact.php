<?php

/**
* Contact Form Processing
*
* Send user's message to the corresponding mail id
*
* @author Sven Creations <svencreations@gmail.com>
* @version 1.0
*/

header("Access-Control-Allow-Origin: *");

require('class.simple_mail.php');

/*	Validate input data
@param string $data Form Input Data
*/
function process_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

/* Contact Configuration */
$yourMail = "jagan@tingmail.in";
$yourName = "Joyville Homes ";
$subject = "Joyville Homes  WEBSITE LEADS";
$message = '<html><body>';
$message .= '<table rules="all" style="border-color: #666;" cellpadding="10">';

if(!empty($_POST)){

    if(!empty($_POST["name"])) {
        $userName = process_input($_POST["name"]);
        $message .= "<tr><td><strong>Name:</strong> </td><td>" . $userName . "</td></tr>";
    } else {
        echo json_encode(array('error' => true, 'message' => 'Please enter your name'));
        exit;
    }

    if(isset($_POST["email"])) {
        $email = process_input($_POST["email"]);
        $message .= "<tr><td><strong>Email:</strong> </td><td>" . $email . "</td></tr>";
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(array('error' => true, 'message' => 'Please enter valid email address'));
            exit;
        }
    } else {
        echo json_encode(array('error' => true, 'message' => 'Please enter valid email address'));
        exit;
    }

    if(!empty($_POST["phone"])) {
        $phone = process_input($_POST["phone"]);
        $message .= "<tr><td><strong>Phone:</strong> </td><td>" . $phone . "</td></tr>";
        if(!preg_match('/^[0-9\-\(\)\/\+\s]*$/', $phone)) {
            echo json_encode(array('error' => true, 'message' => 'Please enter a valid phone number'));
            exit;
        }
    } else {
        echo json_encode(array('error' => true, 'message' => 'Please enter a valid phone number'));
        exit;
    }

    if(!empty($_POST["message"])) {
        $size = process_input($_POST["BHK"]);
        $message .= "<tr><td><strong>Message:</strong> </td><td>" . $message . "</td></tr>";
    }

    $message .= "</table>";
    $message .= "</body></html>";


    $mailer = SimpleMail::make()
    ->setTo($yourMail, $yourName)
    ->setFrom("jagan@tingmail.in", "Joyville Homes ") 
    ->setSubject($subject)
    ->setMessage($message)
    ->setHTML()
    ->send();

    if($mailer) {
        echo json_encode(array('error' => false, 'message' => 'Thanks for contacting us. We will get back to you soon'));
        exit;
    } else {
        echo json_encode(array('error' => true, 'message' => 'Problem connecting to the server. Please try again later'));
        exit;
    }
}
?>
