// Fonctions fabrique pour créer des objets User et GameItem
const createUser = (name) => {
  return {
    name,
    enigme: "",
    key: false,
    code: "",
    codeChoice: "",
    card: false,
    hammer: false,
  };
};

const createGameItem = (enigme, code, alarm, glass) => {
  return {
    enigme,
    code,
    alarm,
    glass,
    deactivateAlarm(inputCode) {
      if (inputCode === this.code) {
        this.alarm = false;
        return true;
      }
      return false;
    },
  };
};

// Création des instances
const user = createUser("Michel");
const gameItem = createGameItem("poulet", 2337, true, true);

// Module pour les références DOM
const DOMReference = (() => {
  const body = document.querySelector("body");
  const image = document.querySelector("#playing-image");
  const usemap = document.querySelector("#mapContainer");
  const dialogueContainer = document.querySelector("#dialogue__container");
  const dialogueName = document.querySelector("#dialogue__name");
  const dialogueContent = document.querySelector("#dialogue__content");
  const closeButton = document.querySelector("#closeButton");
  const dropdownBtn = document.querySelector(".dropdown-btn");
  const dropdownMenu = document.querySelector(".dropdown-menu-content");

  return {
    body,
    image,
    usemap,
    dialogueContainer,
    dialogueName,
    dialogueContent,
    closeButton,
    dropdownBtn,
    dropdownMenu,
  };
})();

// Module pour les fonctions utilitaires
const GameUtilities = (() => {
  const sendDialog = (name, str) => {
    DOMReference.dialogueContainer.classList.toggle("hidden");
    DOMReference.dialogueName.textContent = name;
    DOMReference.dialogueContent.innerHTML = str;
  };

  const checkMatchingCombination = (user, answer) => user === answer;

  const askUserChoice = (value) => prompt(value);

  const toLowerCase = (str) => str.toLowerCase();

  return {
    sendDialog,
    checkMatchingCombination,
    askUserChoice,
    toLowerCase,
  };
})();

// Création d'objets pour encapsuler la logique du jeu
const GameActions = {
  enigme(user, gameItem) {
    if (user.key) {
      GameUtilities.sendDialog(
        user.name,
        `J'ai déjà répondu à l'énigme ! L'animal favori d'Abdou est le ${user.enigme}. Je peux me diriger vers la porte.`
      );
    } else if (GameUtilities.toLowerCase(user.enigme) === "poulet") {
      user.key = true;
      GameUtilities.sendDialog(
        "Concierge",
        `C'est bien ça... La réponse est "${gameItem.enigme}". Voici la clé de la salle des costumes. Ne touchez rien s'il vous plait.`
      );
    } else {
      if (!user.enigme) {
        GameUtilities.sendDialog(
          "Concierge",
          `Pour pouvoir accéder à la salle des costumes, vous devez répondre à une question ; <br />Quel est l'animal favori d'Abdou ?
          <input id="animal-question" type="text">
          <button id="submit-answer">Envoyer</button>`
        );
      } else {
        GameUtilities.sendDialog(
          "Concierge",
          `Non. La réponse n'est pas ${user.enigme}. Vous pouver réessayer.`
        );
      }
      user.enigme = "";
    }
  },

  card(user, value) {
    if (user.card) {
      GameUtilities.sendDialog(
        user.name,
        `J'ai déjà pris cette carte. Le code est ${user.code}`
      );
    } else {
      GameUtilities.sendDialog(
        user.name,
        "Ah ! Une carte ! Je vais noter le code dans mon inventaire."
      );
      user.code = value;
      user.card = true;
    }
  },

  alarm(user, gameItem) {
    if (!gameItem.alarm) {
      GameUtilities.sendDialog(user.name, "J'ai déjà désactivé l'alarme.");
    } else {
      GameUtilities.sendDialog(
        user.name,
        "Une alarme. Si j'ai le bon code je peux peut-être la désactiver."
      );
      user.codeChoice = GameUtilities.askUserChoice(
        "Entrez le code de l'alarme"
      );
      if (gameItem.deactivateAlarm(+user.codeChoice)) {
        GameUtilities.sendDialog(
          "Système de sécurité",
          "L'alarme a été désactivée."
        );
      } else {
        GameUtilities.sendDialog("Système de sécurité", "Mauvais code saisi.");
      }
    }
  },

  hammer(user) {
    if (user.hammer) {
      GameUtilities.sendDialog(
        user.name,
        "J'ai déjà ce marteau. Peut-être que je peux m'en servir d'une manière ou d'une autre..."
      );
    } else {
      GameUtilities.sendDialog(
        user.name,
        "Ah ! Un marteau ! Intéressant... Je peux peut-être m'en servir."
      );
      user.hammer = true;
    }
  },

  glass(user, gameItem) {
    if (user.hammer && !gameItem.alarm) {
      GameUtilities.sendDialog(
        user.name,
        "Parfait ! J'ai désactivé l'alarme. Cassons cette vitre et prenons ce costume !"
      );
    } else if (!user.hammer && gameItem.alarm) {
      GameUtilities.sendDialog(
        user.name,
        "Le costume ! Il est magnifique. Comment puis-je y accéder ?"
      );
    } else if (user.hammer && gameItem.alarm) {
      GameUtilities.sendDialog(
        user.name,
        "J'ai un marteau mais le système d'alarme est toujours activé. Si je casse la vitre je risque d'attirer l'attention."
      );
    } else if (!user.hammer && !gameItem.alarm) {
      GameUtilities.sendDialog(
        user.name,
        "J'ai désactivé l'alarme. Maintenant comment puis-je ouvrir cette porte ?"
      );
    }
  },
};

const Rooms = {
  costumeRoom() {
    DOMReference.image.src = "../img/costume-room.webp";
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

const ChangeRoom = {
  doorToCostumeRoom(user) {
    if (user.key) {
      Rooms.costumeRoom();
    } else {
      GameUtilities.sendDialog(
        user.name,
        "Il me manque la clé. Peut-être je pourrais aller parler au concierge ?"
      );
    }
  },
};

// Gestion des événements
DOMReference.body.addEventListener("click", (event) => {
  const target = event.target.id;
  switch (target) {
    case "enigme":
      GameActions.enigme(user, gameItem);
      break;
    case "doorToCostumeRoom":
      ChangeRoom.doorToCostumeRoom(user);
      break;
    case "hammer":
      GameActions.hammer(user);
      break;
    case "glass":
      GameActions.glass(user, gameItem);
      break;
    case "alarm":
      GameActions.alarm(user, gameItem);
      break;
    case "closeButton":
      DOMReference.dialogueContainer.classList.toggle("hidden");
      break;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const parentElement = document.body;

  parentElement.addEventListener("click", (event) => {
    if (event.target && event.target.id === "submit-answer") {
      const inputElement = document.getElementById("animal-question");
      if (inputElement) {
        user.enigme = inputElement.value;
        DOMReference.dialogueContainer.classList.toggle("hidden");
      }
    }
  });
});

// START Menu Burger
DOMReference.dropdownBtn.addEventListener("click", () => {
  DOMReference.dropdownMenu.classList.toggle("visible");
  DOMReference.dropdownBtn.classList.toggle("bx-x");
  DOMReference.dropdownBtn.classList.toggle("bx-menu");
});
