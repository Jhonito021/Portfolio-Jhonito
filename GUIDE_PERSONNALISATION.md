# 🚀 Guide de Personnalisation Rapide

## 📝 Étapes essentielles pour personnaliser votre portfolio

### 1. **Informations personnelles** (5 minutes)
Modifiez le fichier `index.html` :
- Remplacez "Votre Nom" par votre nom complet
- Changez la description dans la section hero
- Mettez à jour les informations de contact

### 2. **Photo de profil** (2 minutes)
- Ajoutez votre photo dans `assets/images/profile.jpg`
- Format recommandé : carré, 300x300px minimum
- Assurez-vous que l'image est professionnelle

### 3. **Configuration du formulaire** (3 minutes)
Modifiez `php/contact.php` :
```php
$to_email = "votre.vrai.email@gmail.com"; // Votre email
```

### 4. **Vos projets** (10-15 minutes)
Remplacez les projets d'exemple dans `index.html` par vos vrais projets :
- Ajoutez vos captures d'écran dans `assets/images/`
- Mettez à jour les descriptions
- Ajoutez les liens vers GitHub et les démos

### 5. **Compétences techniques** (5 minutes)
Dans la section "Mes compétences", ajoutez/modifiez :
- Vos vraies compétences
- Les technologies que vous maîtrisez
- Supprimez celles que vous ne connaissez pas

### 6. **Réseaux sociaux** (3 minutes)
Mettez à jour les liens vers :
- LinkedIn
- GitHub
- Twitter (optionnel)
- Votre site personnel

### 7. **CV** (5 minutes)
- Remplacez `assets/cv.pdf` par votre vrai CV
- Format PDF recommandé
- Taille maximale : 2MB

## 🎨 Personnalisation avancée

### Changer les couleurs
Modifiez dans `assets/css/style.css` :
```css
:root {
    --primary-color: #votre-couleur;
    --secondary-color: #votre-couleur-secondaire;
}
```

### Ajouter de nouvelles sections
1. Créez la section dans `index.html`
2. Ajoutez les styles dans `style.css`
3. Mettez à jour la navigation

### Modifier les animations
Les animations sont dans `assets/js/script.js`

## 📱 Test et déploiement

### Test local
1. Ouvrez `index.html` dans votre navigateur
2. Testez le formulaire de contact
3. Vérifiez la responsivité sur mobile

### Déploiement
- **Netlify** : Drag & drop du dossier
- **GitHub Pages** : Push sur un repository
- **Serveur mutualisé** : Upload via FTP

## ⚡ Optimisations recommandées

### Images
- Compressez vos images (moins de 500KB)
- Utilisez des formats modernes (WebP)
- Optimisez pour le web

### Performance
- Le site est déjà optimisé avec :
  - Compression GZIP
  - Cache des fichiers statiques
  - Minification CSS/JS (optionnel)

### SEO
- Ajoutez vos mots-clés dans les balises meta
- Optimisez les titres et descriptions
- Ajoutez des données structurées (optionnel)

## 🔧 Dépannage

### Le formulaire ne fonctionne pas
- Vérifiez que PHP est activé sur votre serveur
- Testez avec un serveur local (XAMPP/WAMP)
- Vérifiez les permissions des fichiers

### Les images ne s'affichent pas
- Vérifiez les chemins des images
- Assurez-vous que les fichiers existent
- Testez avec des images de test

### Problèmes de responsive
- Testez sur différents appareils
- Utilisez les outils de développement du navigateur
- Vérifiez les media queries dans le CSS

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez la console du navigateur (F12)
2. Testez sur un serveur local
3. Consultez la documentation du README.md

---

**Votre portfolio sera prêt en moins de 30 minutes !** 🎉 