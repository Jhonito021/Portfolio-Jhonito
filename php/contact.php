<?php
// Configuration
$to_email = "jhonito021@gmail.com"; 
$subject_prefix = "Portfolio - ";

// Headers pour éviter le spam
$headers = array(
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: noreply@votreportfolio.com',
    'Reply-To: noreply@votreportfolio.com',
    'X-Mailer: PHP/' . phpversion()
);

// Fonction pour nettoyer les données
function clean_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Fonction pour valider l'email
function is_valid_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Fonction pour envoyer l'email
function send_email($name, $email, $subject, $message) {
    global $to_email, $subject_prefix, $headers;
    
    $html_message = "
    <html>
    <head>
        <title>Nouveau message du portfolio</title>
    </head>
    <body>
        <h2>Nouveau message reçu via votre portfolio</h2>
        <table>
            <tr>
                <td><strong>Nom :</strong></td>
                <td>" . htmlspecialchars($name) . "</td>
            </tr>
            <tr>
                <td><strong>Email :</strong></td>
                <td>" . htmlspecialchars($email) . "</td>
            </tr>
            <tr>
                <td><strong>Sujet :</strong></td>
                <td>" . htmlspecialchars($subject) . "</td>
            </tr>
            <tr>
                <td><strong>Message :</strong></td>
                <td>" . nl2br(htmlspecialchars($message)) . "</td>
            </tr>
        </table>
        <hr>
        <p><small>Message envoyé depuis votre portfolio web</small></p>
    </body>
    </html>
    ";
    
    $full_subject = $subject_prefix . clean_input($subject);
    
    return mail($to_email, $full_subject, $html_message, implode("\r\n", $headers));
}

// Traitement de la requête
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupération et nettoyage des données
    $name = isset($_POST['name']) ? clean_input($_POST['name']) : '';
    $email = isset($_POST['email']) ? clean_input($_POST['email']) : '';
    $subject = isset($_POST['subject']) ? clean_input($_POST['subject']) : '';
    $message = isset($_POST['message']) ? clean_input($_POST['message']) : '';
    
    // Validation des données
    $errors = array();
    
    if (empty($name)) {
        $errors[] = "Le nom est requis";
    }
    
    if (empty($email)) {
        $errors[] = "L'email est requis";
    } elseif (!is_valid_email($email)) {
        $errors[] = "L'email n'est pas valide";
    }
    
    if (empty($subject)) {
        $errors[] = "Le sujet est requis";
    }
    
    if (empty($message)) {
        $errors[] = "Le message est requis";
    }
    
    // Protection anti-spam basique
    if (strlen($message) < 10) {
        $errors[] = "Le message doit contenir au moins 10 caractères";
    }
    
    if (strlen($message) > 1000) {
        $errors[] = "Le message ne peut pas dépasser 1000 caractères";
    }
    
    // Vérification du honeypot (si vous en ajoutez un)
    if (isset($_POST['website']) && !empty($_POST['website'])) {
        // C'est probablement un bot, on ignore
        http_response_code(200);
        echo json_encode(array('success' => true, 'message' => 'Message envoyé'));
        exit;
    }
    
    // Si pas d'erreurs, envoi de l'email
    if (empty($errors)) {
        if (send_email($name, $email, $subject, $message)) {
            // Succès
            http_response_code(200);
            echo json_encode(array(
                'success' => true,
                'message' => 'Votre message a été envoyé avec succès !'
            ));
        } else {
            // Erreur d'envoi
            http_response_code(500);
            echo json_encode(array(
                'success' => false,
                'message' => 'Erreur lors de l\'envoi du message. Veuillez réessayer.'
            ));
        }
    } else {
        // Erreurs de validation
        http_response_code(400);
        echo json_encode(array(
            'success' => false,
            'message' => 'Erreurs de validation :',
            'errors' => $errors
        ));
    }
} else {
    // Méthode non autorisée
    http_response_code(405);
    echo json_encode(array(
        'success' => false,
        'message' => 'Méthode non autorisée'
    ));
}

// Fonction pour logger les tentatives d'envoi (optionnel)
function log_contact_attempt($name, $email, $subject, $success, $errors = array()) {
    $log_file = 'contact_log.txt';
    $timestamp = date('Y-m-d H:i:s');
    $status = $success ? 'SUCCESS' : 'FAILED';
    $error_msg = !empty($errors) ? ' - Errors: ' . implode(', ', $errors) : '';
    
    $log_entry = "[$timestamp] $status - $name ($email) - $subject$error_msg\n";
    
    file_put_contents($log_file, $log_entry, FILE_APPEND | LOCK_EX);
}
?> 