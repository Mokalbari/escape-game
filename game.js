// Config globale
// L'objet user doit évoluer ses conditions lorsqu'il peut posséder un objet.
const user = {
  name: "Michel",
  enigme: "",
  key: false,
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
  dialogueContainer: document.querySelector("#dialogue__container"),
  dialogueName: document.querySelector("#dialogue__name"),
  dialogueContent: document.querySelector("#dialogue__content"),
  closeButton: document.querySelector("#closeButton"),
};

// Fonctions utilitaires
const f = {
  sendDialog: (name, str) => {
    DOMReference.dialogueContainer.classList.toggle("hidden");
    DOMReference.dialogueName.textContent = name;
    DOMReference.dialogueContent.innerHTML = str;
  },
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
        user.name,
        `J'ai déjà répondu à l'énigme ! L'animal favori d'Abdou est le ${user.enigme}. Je peux me diriger vers la porte.`
      );
    } else if (user.enigme.toLowerCase() === "poulet") {
      user.key = true;
      f.sendDialog(
        "Concierge",
        "C'est bien ça... Le poulet. :| Voici la clé de la salle des costumes. Ne touchez rien s'il vous plait."
      );
    } else {
      f.sendDialog(
        "Concierge",
        `Pour pouvoir accéder à la salle des costumes, vous devez répondre à une question ; <br />Quel est l'animal favori d'Abdou ?
        <input id="animal-question" type="text">
        <button id="submit-answer">Envoyer</button>
        `
      );
    }
  },

  card: (value) => {
    if (user.card) {
      f.sendDialog(
        user.name,
        `J'ai déjà pris cette carte. Le code est ${user.code}`
      );
    } else {
      f.sendDialog(
        user.name,
        "Ah ! Une carte ! Je vais noter le code dans mon inventaire."
      );
      user.code = value;
      user.card = true;
    }
  },

  alarm: () => {
    if (!gameItem.alarm) {
      sendDialog(user.name, "J'ai déjà désactiver l'alarme.");
    } else {
      f.sendDialog(
        user.name,
        "Une alarme. Si j'ai le bon code je peux peut-être la désactiver."
      );
      user.codeChoice = f.askUserChoice("Entrez le code de l'alarme");
      if (f.checkMatchingCombination(+user.codeChoice, gameItem.code)) {
        f.sendDialog("Système de sécurité", "L'alarme a été désactivée.");
        gameItem.alarm = false;
      } else {
        f.sendDialog("Système de sécurité", "Mauvais code saisi.");
      }
    }
  },

  hammer: () => {
    if (user.hammer) {
      f.sendDialog(
        user.name,
        "J'ai déjà ce marteau. Peut-être que je peux m'en servir d'une manière ou d'une autre..."
      );
    } else {
      f.sendDialog(
        user.name,
        "Ah ! Un marteau ! Intéressant... Je peux peut-être m'en servir."
      );
      user.hammer = true;
    }
  },

  glass: () => {
    if (user.hammer && !gameItem.alarm) {
      f.sendDialog(
        user.name,
        "Parfait ! J'ai désactivé l'alarme. Cassons cette vitre et prenons ce costume !"
      );
    } else if (!user.hammer && gameItem.alarm) {
      f.sendDialog(
        user.name,
        "Le costume ! Il est magnifique. Comment puis-je y accéder ?"
      );
    } else if (user.hammer && gameItem.alarm) {
      f.sendDialog(
        user.name,
        "J'ai un marteau mais le système d'alarme est toujours activé. Si je casse la vitre je risque d'attirer l'attention."
      );
    } else if (!user.hammer && !gameItem.alarm) {
      f.sendDialog(
        user.name,
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
          user.name,
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
    case "closeButton":
      DOMReference.dialogueContainer.classList.toggle("hidden");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const parentElement = document.body; // Adjust this to the correct parent element

  parentElement.addEventListener("click", (event) => {
    if (event.target && event.target.id === "submit-answer") {
      const inputElement = document.getElementById("animal-question");
      if (inputElement) {
        user.enigme = inputElement.value;
        DOMReference.dialogueContainer.classList.toggle("hidden"); // Add further processing of the user input here
      }
    }
  });
});
