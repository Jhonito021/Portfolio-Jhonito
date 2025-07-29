<?php
/**
 * Configuration du Portfolio Web
 * Modifiez ces valeurs selon vos besoins
 */

// Informations personnelles
$config = array(
    // Informations de base
    'name' => 'Solonotiavina Jhonito',
    'title' => 'Développeur web passionné',
    'description' => 'Je crée des expériences web modernes et innovantes avec une passion pour le code propre et l\'interface utilisateur intuitive.',
    
    // Contact
    'email' => 'jhonito021@gmail.com',
    'phone' => '+261 38 51 014 00',
    'location' => 'Antananrivo, Madagascar',
    
    // Réseaux sociaux
    'social' => array(
        'linkedin' => 'https://linkedin.com/in/votre-profil',
        'github' => 'https://github.com/votre-username',
        'twitter' => 'https://twitter.com/votre-username',
        'portfolio' => 'https://votre-portfolio.com'
    ),
    
    // Compétences techniques
    'skills' => array(
        array('name' => 'HTML5', 'icon' => 'fab fa-html5'),
        array('name' => 'CSS3', 'icon' => 'fab fa-css3-alt'),
        array('name' => 'JavaScript', 'icon' => 'fab fa-js-square'),
        array('name' => 'PHP', 'icon' => 'fab fa-php'),
        array('name' => 'SQL', 'icon' => 'fas fa-database'),
        array('name' => 'React', 'icon' => 'fab fa-react'),
        array('name' => 'Node.js', 'icon' => 'fab fa-node-js'),
        array('name' => 'Git', 'icon' => 'fab fa-git-alt')
    ),
    
    // Formation
    'education' => array(
        array(
            'period' => '2020-2023',
            'title' => 'Formation en développement web',
            'school' => 'École ou centre de formation'
        ),
        array(
            'period' => '2018-2020',
            'title' => 'Baccalauréat en informatique',
            'school' => 'Université ou école'
        )
    ),
    
    // Projets
    'projects' => array(
        array(
            'name' => 'Site E-commerce',
            'description' => 'Développement d\'un site e-commerce complet avec panier d\'achat et système de paiement.',
            'image' => 'assets/images/project1.jpg',
            'technologies' => array('HTML', 'CSS', 'JavaScript', 'PHP'),
            'github' => 'https://github.com/votre-username/projet-ecommerce',
            'demo' => 'https://demo-projet.com'
        ),
        array(
            'name' => 'Application de Gestion',
            'description' => 'Application web pour la gestion de tâches et de projets avec interface responsive.',
            'image' => 'assets/images/project2.jpg',
            'technologies' => array('React', 'Node.js', 'MongoDB'),
            'github' => 'https://github.com/votre-username/app-gestion',
            'demo' => 'https://app-gestion.com'
        ),
        array(
            'name' => 'Portfolio Personnel',
            'description' => 'Portfolio web moderne et responsive pour présenter mes projets et compétences.',
            'image' => 'assets/images/project3.jpg',
            'technologies' => array('HTML', 'CSS', 'JavaScript'),
            'github' => 'https://github.com/votre-username/portfolio',
            'demo' => 'https://votre-portfolio.com'
        )
    ),
    
    // Configuration du formulaire de contact
    'contact' => array(
        'email' => 'votre.email@example.com',
        'subject_prefix' => 'Portfolio - '
    ),
    
    // Configuration du site
    'site' => array(
        'title' => 'Mon Portfolio - Développeur Web',
        'description' => 'Portfolio personnel présentant mes projets et compétences en développement web',
        'keywords' => 'développeur web, portfolio, projets, compétences, HTML, CSS, JavaScript, PHP',
        'author' => 'Votre Nom',
        'language' => 'fr'
    )
);

// Fonction pour récupérer la configuration
function getConfig($key = null) {
    global $config;
    
    if ($key === null) {
        return $config;
    }
    
    $keys = explode('.', $key);
    $value = $config;
    
    foreach ($keys as $k) {
        if (isset($value[$k])) {
            $value = $value[$k];
        } else {
            return null;
        }
    }
    
    return $value;
}

// Fonction pour afficher les compétences
function displaySkills() {
    $skills = getConfig('skills');
    foreach ($skills as $skill) {
        echo '<div class="skill-item">';
        echo '<i class="' . $skill['icon'] . '"></i>';
        echo '<span>' . $skill['name'] . '</span>';
        echo '</div>';
    }
}

// Fonction pour afficher les projets
function displayProjects() {
    $projects = getConfig('projects');
    foreach ($projects as $project) {
        echo '<div class="project-card">';
        echo '<div class="project-image">';
        echo '<img src="' . $project['image'] . '" alt="' . $project['name'] . '">';
        echo '</div>';
        echo '<div class="project-content">';
        echo '<h3>' . $project['name'] . '</h3>';
        echo '<p>' . $project['description'] . '</p>';
        echo '<div class="project-tech">';
        foreach ($project['technologies'] as $tech) {
            echo '<span class="tech-tag">' . $tech . '</span>';
        }
        echo '</div>';
        echo '<div class="project-links">';
        echo '<a href="' . $project['github'] . '" class="project-link"><i class="fab fa-github"></i> Code</a>';
        echo '<a href="' . $project['demo'] . '" class="project-link"><i class="fas fa-external-link-alt"></i> Demo</a>';
        echo '</div>';
        echo '</div>';
        echo '</div>';
    }
}
?> 