// Config globale
// L'objet user doit évoluer ses conditions lorsqu'il peut posséder un objet.
const user = {
  enigme: "",
  key: true,
  code: "",
  codeChoice: "",
  card: false,
  hammer: false,
};

const gameItem = {
  enigme: "poulet",
  code: 2337,
  alarm: true,
  glass: true,
};

// DOM REFERENCE
const DOMReference = {
  body: document.querySelector("body"),
  image: document.querySelector("#playing-image"),
  usemap: document.querySelector("#mapContainer"),
};

// Fonctions utilitaires
const f = {
  sendDialog: (str) => alert(str),
  checkMatchingCombination: (user, answer) => user === answer,
  askUserChoice: (value) => prompt(value),
  toLowerCase: (str) => str.toLowerCase(),
};

// ENIGMES DU JEU
// Hall d'entrée

const realGameItem = {
  enigme: () => {
    if (user.key) {
      f.sendDialog(
        `J'ai déjà répondu à l'énigme ! L'animal favori d'Abdou est le ${user.enigme}. Je peux me diriger vers la porte.`
      );
    } else {
      f.sendDialog(
        "Pour pouvoir accéder à la salle des costumes, vous devez répondre à une question énigme ; Quel est l'animal favori d'Abdou ?"
      );
      user.enigme = f.toLowerCase(f.askUserChoice("Quel est votre choix ?"));

      if (f.checkMatchingCombination(user.enigme, gameItem.enigme)) {
        f.sendDialog(
          "Oui ! C'est un excellent choix ! Voici la clé pour ouvrir la porte du musée."
        );
        user.key = true;
      } else {
        f.sendDialog("Non... Indice : son bruit rime avec code code code !");
      }
    }
  },

  card: (value) => {
    if (user.card) {
      f.sendDialog(`J'ai déjà pris cette carte. Le code est ${user.code}`);
    } else {
      f.sendDialog(
        "Ah ! Une carte ! Je vais noter le code dans mon inventaire."
      );
      user.code = value;
      user.card = true;
    }
  },

  alarm: () => {
    if (!gameItem.alarm) {
      sendDialog("J'ai déjà désactiver l'alarme.");
    } else {
      f.sendDialog(
        "Une alarme. Si j'ai le bon code je peux peut-être la désactiver."
      );
      user.codeChoice = f.askUserChoice("Entrez le code de l'alarme");
      if (f.checkMatchingCombination(+user.codeChoice, gameItem.code)) {
        f.sendDialog("L'alarme a été désactivée.");
        gameItem.alarm = false;
      } else {
        f.sendDialog("Mauvais code saisi.");
      }
    }
  },

  alarm: () => {
    if (!gameItem.alarm) {
      sendDialog("J'ai déjà désactiver l'alarme.");
    } else {
      f.sendDialog(
        "Une alarme. Si j'ai le bon code je peux peut-être la désactiver."
      );
      user.codeChoice = f.askUserChoice("Entrez le code de l'alarme");
      if (f.checkMatchingCombination(+user.codeChoice, gameItem.code)) {
        f.sendDialog("L'alarme a été désactivée.");
        gameItem.alarm = false;
      } else {
        f.sendDialog("Mauvais code saisi.");
      }
    }
  },

  hammer: () => {
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
  },

  glass: () => {
    if (user.hammer && !gameItem.alarm) {
      f.sendDialog(
        "Parfait ! J'ai désactivé l'alarme. Cassons cette vitre et prenons ce costume !"
      );
    } else if (!user.hammer && gameItem.alarm) {
      f.sendDialog(
        "Le costume ! Il est magnifique. Comment puis-je y accéder ?"
      );
    } else if (user.hammer && gameItem.alarm) {
      f.sendDialog(
        "J'ai un marteau mais le système d'alarme est toujours activé. Si je casse la vitre je risque d'attirer l'attention."
      );
    } else if (!user.hammer && !gameItem.alarm) {
      f.sendDialog(
        "J'ai désactivé l'alarme. Maintenant comment puis-je ouvrir cette porte ?"
      );
    }
  },
};

const falseGameItem = {};

const rooms = {
  costumeRoom: () => {
    DOMReference.image.src = "./img/costume-room.webp";
    DOMReference.usemap.innerHTML = `
    <map name="image-map">
      <area target="" alt="Tenter d'ouvrir le présentoir à costume." title="Tenter d'ouvrir le présentoir à costume." href="#" id="glass" coords="533,141,1198,673" shape="rect">
      <area target="" alt="Manipuler l'alarme" title="Manipuler l'alarme" href="#" id="alarm" coords="1202,442,1285,562" shape="rect">
      <area target="" alt="Aller vers une pièce (gauche)" title="Aller vers une pièce (gauche)" href="#" id="doorToLeft" coords="104,122,507,840" shape="rect">
      <area target="" alt="Aller vers une pièce (droite)" title="Aller vers une pièce (droite)" href="#" id="doorToRight" coords="1242,161,1680,809" shape="rect">
  </map>
  `;
  },
};

const changeRoom = {
  doorToCostumeRoom: () => {
    user.key
      ? rooms.costumeRoom()
      : f.sendDialog(
          "Il me manque la clé. Peut-être je pourrais aller parler au concierge ?"
        );
  },
};

DOMReference.body.addEventListener("click", (event) => {
  target = event.target.id;
  switch (target) {
    case "enigme":
      realGameItem.enigme();
      break;
    case "doorToCostumeRoom":
      changeRoom.doorToCostumeRoom();
      break;
    case "hammer":
      realGameItem.hammer();
      break;
    case "glass":
      realGameItem.glass();
      break;
    case "alarm":
      realGameItem.alarm();
      break;
  }
});
