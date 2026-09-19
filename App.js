// ==========================================================================
// VALIDATION DU FORMULAIRE DE CONTACT
// ==========================================================================

const form = document.getElementById('form-contact');
const feedback = document.getElementById('form-feedback');

const champNom = document.getElementById('nom');
const champEmail = document.getElementById('email');
const champMessage = document.getElementById('message');

// Regex simple pour valider le format d'un email
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener('submit', function (event) {
  event.preventDefault(); // empêche le rechargement de la page (front uniquement)

  const erreurs = [];

  // --- Validation du nom ---
  if (champNom.value.trim() === '') {
    erreurs.push("Le nom est requis.");
  }

  // --- Validation de l'email ---
  if (champEmail.value.trim() === '') {
    erreurs.push("L'email est requis.");
  } else if (!regexEmail.test(champEmail.value.trim())) {
    erreurs.push("L'email n'est pas valide.");
  }

  // --- Validation du message ---
  if (champMessage.value.trim() === '') {
    erreurs.push("Le message est requis.");
  }

  // --- Affichage du feedback ---
  if (erreurs.length > 0) {
    afficherFeedback(erreurs.join(' '), 'erreur');
  } else {
    afficherFeedback("Merci ! Votre message a bien été envoyé.", 'succes');
    form.reset();
  }
});

/**
 * Affiche un message de feedback sous le formulaire
 * @param {string} texte - le message à afficher
 * @param {'succes'|'erreur'} type - le type de message (change la couleur)
 */
function afficherFeedback(texte, type) {
  feedback.textContent = texte;
  feedback.classList.remove('succes', 'erreur');
  feedback.classList.add(type);
}

// --- Effacer l'erreur dès que l'utilisateur recommence à corriger un champ ---
[champNom, champEmail, champMessage].forEach(function (champ) {
  champ.addEventListener('input', function () {
    feedback.textContent = '';
    feedback.classList.remove('succes', 'erreur');
  });
});
