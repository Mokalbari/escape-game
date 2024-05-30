// Define variables
let userCode;
let enigmeSalle1;

// Créer une variable de l'étape du jeu
let stepGame;

// Define object user with parameter "code"
let user = {
  enigme: enigmeSalle1,
  key: false,
  door: false,
  codeObject: false,
  code: userCode,
  alarm: false,
  hammer: false,
  glace: false,
};

// Define object gameItem with parameter "rightCode"
let gameItem = {
  enigme: "blanc",
  key: true,
  door: true,
  codeObject: true,
  rightCode: 2337,
  alarm: true,
  hammer: true,
  glace: true,
};

// Function enigme
function enigme() {
  do {
    enigmeSalle1 = prompt("Quelle est la couleur du cheval blanc d'Henry IV ?");
    if (enigmeSalle1 !== gameItem.enigme) {
      console.log("Hé non, retente ta chance");
    } else {
      console.log("Super, tu peux y aller !");
    }
  } while (enigmeSalle1 !== gameItem.enigme);
}

// Function Key
function key() {
  do {
    if (user.key === false) {
      console.log("Non la clé n'est pas là, cherche mieux que ça !");
    } else {
      console.log("Super, tu peux aller ouvrir la porte !");
      user.key === true;
      gameItem.key === false;
    }
  } while (user.key === false);
}

// Function Door
function door() {
  do {
    if (user.door === false) {
      console.log(
        "Tu n'as pas la clé pour ouvrir cette porte, retourne chercher dans la salle !"
      );
    } else {
      console.log("Super, enfin dans la salle des costumes !");
      user.door === true;
    }
  } while (user.door === false);
}

// Function code
function codeObject() {
  do {
    if (user.codeObject === false) {
      console.log(
        "Le code que tu recherches n'es pas là, retourne chercher dans la salle !"
      );
    } else {
      console.log(
        "Super, enfin dans tu as le code pour aller désamorcer l'alarme !"
      );
      user.codeObject === true;
      gameItem.codeObject === false;
    }
  } while (user.codeObject === false);
}

// Function to check the alarm code
function codeVerification() {
  do {
    // Ask user code
    userCode = parseInt(prompt("Entrez le code à 4 chiffres"));
    if (userCode !== gameItem.rightCode) {
      // Display message
      console.log("Hé non, retente ta chance");
    } else {
      // Display message
      console.log("Super, tu peux y aller !");
      user.alarm === true;
    }
  } while (userCode !== gameItem.rightCode);
}

codeVerification();

// Function to check the hammer
function hammer() {
  do {
    if (user.hammer === false) {
      console.log("Le marteau n'est pas là, cherches mieux que ça !");
    } else {
      console.log(
        "Super, tu peux aller briser la vitrine pour récupérer le costume"
      );
      user.hammer === true;
      gameItem.hammer === false;
    }
  } while (user.hammer === false);
}

// function to break the glaces
function breakGlaces() {
  do {
    if (user.hammer === false) {
      console.log(
        "Hé non, tu n'as pas le marteau pour casser la vitrine, trouves le !"
      );
    } else {
      console.log("Félicitation, tu as trouvé ton costume");
      user.glace === true;
    }
  } while (user.glace === false);
}
