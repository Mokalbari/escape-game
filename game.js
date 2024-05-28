// Config globale
// L'objet user doit évoluer ses conditions lorsqu'il peut posséder un objet.
const user = {
  enigme: "",
  key: false,
  code: "",
  codeChoice: "",
  card: false,
  hammer: false,
};

/* l'objet gameItem doit faire évoluer ses conditions lorsque l'user peut intéragir 
avec un élément statique.*/
const gameItem = {
  enigme: "poulet",
  code: 2337,
  alarm: true,
  glace: true,
};

// Fonctions utilitaires
const f = {
  sendDialog: (str) => alert(str),
  checkIfUserHasWinningObject: (user, answer) => user === answer,
  askUserChoice: (value) => prompt(value),
  toLowerCase: (str) => str.toLowerCase(),
};

// Hall d'entrée
const enigme = () => {
  if (user.key) {
    f.sendDialog(
      `J'ai déjà répondu à l'énigme ! L'animal favori d'Abdou est le ${user.enigme}.`
    );
  } else {
    f.sendDialog("Quel est l'animal préféré d'Abdou ?");
    user.enigme = f.toLowerCase(f.askUserChoice("Quel est votre choix ?"));

    if (f.checkIfUserHasWinningObject(user.enigme, gameItem.enigme)) {
      f.sendDialog(
        "Oui ! C'est un excellent choix ! Voici la clé pour ouvrir la porte du musée."
      );
      !user.key;
    } else {
      f.sendDialog("Non... Indice : son bruit rime avec code code code !");
    }
  }
};

const doorToCostumeRoom = () => {
  user.key
    ? costumeRoom()
    : f.sendDialog(
        "Il me manque la clé. Peut-être je pourrais aller parler au concierge ?"
      );
};

// Salle des costumes
const costumeRoom = () => {};

const card = (value) => {
  if (user.card) {
    f.sendDialog(`J'ai déjà pris cette carte. Le code est ${user.code}`);
  } else {
    f.sendDialog("Ah ! Une carte ! Je vais noter le code.");
    user.code = value;
    !user.card;
  }
};

const alarm = () => {
  if (!gameItem.alarm) {
    sendDialog("J'ai déjà désactiver l'alarme.");
  } else {
    f.sendDialog(
      "Une alarme. Si j'ai le bon code je peux peut-être la désactiver."
    );
    user.codeChoice = f.askUserChoice("Entrez le code de l'alarme");
    if (f.checkIfUserHasWinningObject(+user.codeChoice, gameItem.code)) {
      f.sendDialog("L'alarme a été désactivée.");
      gameItem.alarm = false;
    } else {
      f.sendDialog("Mauvais code saisi.");
    }
  }
};

const hammer = () => {
  if (user.hammer) {
    f.sendDialog(
      "J'ai déjà ce marteau. Peut-être que je peux m'en servir d'une manière ou d'une autre..."
    );
  } else {
    f.sendDialog(
      "Ah ! Un marteau ! Intéressant... Je peux peut-être m'en servir."
    );
    user.hammer = true;
  }
};

const glass = () => {
  if (user.hammer && !gameItem.alarm) {
    f.sendDialog("Parfait ! J'ai désactivé l'alarme. Prenons ce costume !");
  } else if (!user.hammer && gameItem.alarm) {
    f.sendDialog("Le costume ! Il est magnifique. Comment je peux y accéder ?");
  } else if (user.hammer && gameItem.alarm) {
    f.sendDialog(
      "J'ai un marteau mais le système d'alarme est toujours activé. Si je casse la vitre je risque d'attirer l'attention."
    );
  } else if (!user.hammer && !gameItem.alarm) {
    f.sendDialog(
      "J'ai désactivé l'alarme. Maintenant comment puis-je ouvrir cette porte ?"
    );
  }
};
