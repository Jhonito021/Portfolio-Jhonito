<?php
// Configuration
$whatsapp_number = "261341234567"; // ← Remplacez par VOTRE numéro WhatsApp sans "+" ni espace

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

    if (strlen($message) < 10) {
        $errors[] = "Le message doit contenir au moins 10 caractères";
    }

    if (strlen($message) > 1000) {
        $errors[] = "Le message ne peut pas dépasser 1000 caractères";
    }

    // Protection anti-spam (honeypot)
    if (isset($_POST['website']) && !empty($_POST['website'])) {
        // C'est probablement un bot
        http_response_code(200);
        echo json_encode(array('success' => true, 'message' => 'Message envoyé'));
        exit;
    }

    // Si pas d'erreurs, rediriger vers WhatsApp
    if (empty($errors)) {
        $whatsapp_message = rawurlencode(
            "Bonjour, je vous contacte depuis votre portfolio.\n".
            "Nom : $name\n".
            "Email : $email\n".
            "Sujet : $subject\n".
            "Message : $message"
        );

        $whatsapp_url = "https://wa.me/$whatsapp_number?text=$whatsapp_message";

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Redirection vers WhatsApp',
            'redirect' => $whatsapp_url
        ]);
    } else {
        // Erreurs de validation
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Erreurs de validation :',
            'errors' => $errors
        ]);
    }
} else {
    // Méthode non autorisée
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Méthode non autorisée'
    ]);
}
?>
