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
const gameUtilities = (() => {
  const sendDialog = (name, str) => {
    DOMReference.dialogueContainer.classList.toggle("hidden");
    DOMReference.dialogueName.innerHTML = name;
    DOMReference.dialogueContent.innerHTML = str;
  };

  const toLowerCase = (str) => str.toLowerCase();

  return {
    sendDialog,
    toLowerCase,
  };
})();

// Création d'objets pour encapsuler la logique du jeu
const gameActions = {
  enigme(user, gameItem) {
    if (user.key) {
      gameUtilities.sendDialog(
        user.name,
        `J'ai déjà répondu à l'énigme ! L'animal favori d'Abdou est le ${user.enigme}. Je peux me diriger vers la porte.`
      );
    } else if (gameUtilities.toLowerCase(user.enigme) === "poulet") {
      user.key = true;
      gameUtilities.sendDialog(
        "Concierge",
        `C'est bien ça... La réponse est "${gameItem.enigme}". Voici la clé de la salle des costumes. Ne touchez rien s'il vous plait.`
      );
    } else {
      if (!user.enigme) {
        gameUtilities.sendDialog(
          "Concierge",
          `Pour pouvoir accéder à la salle des costumes, vous devez répondre à une question ; <br />Quel est l'animal favori d'Abdou ?
          <input id="animal-question" type="text">
          <button id="submit-enigme">Envoyer</button>`
        );
      } else {
        gameUtilities.sendDialog(
          "Concierge",
          `Non. La réponse n'est pas ${user.enigme}. Vous pouver réessayer.`
        );
      }
      user.enigme = "";
    }
  },

  card(user, value) {
    if (user.card) {
      gameUtilities.sendDialog(
        user.name,
        `J'ai déjà pris cette carte. Le code est ${user.code}`
      );
    } else {
      gameUtilities.sendDialog(
        user.name,
        "Ah ! Une carte ! Je vais noter le code dans mon inventaire."
      );
      user.code = value;
      user.card = true;
    }
  },

  alarm(user, gameItem) {
    if (!gameItem.alarm) {
      gameUtilities.sendDialog("Système de sécurité", "Alarme désactivée");
      return;
    }
    if (gameItem.alarm && !user.codeChoice) {
      gameUtilities.sendDialog(
        user.name,
        `L'alarme est connectée à la vitrine. Si j'ouvre la vitrine sans la désactiver je risque d'attirer l'attention.
    <input id="alarm-question" type="text">
    <button id="submit-alarm">Tester le code</button>`
      );
    } else if (gameItem.alarm && user.codeChoice) {
      gameUtilities.sendDialog(
        "Système de sécurité",
        `Mauvais code saisi.     
      <input id="alarm-question" type="text">
      <button id="submit-alarm">Tester le code</button>`
      );
      user.codeChoice = "";
    }
  },

  hammer(user) {
    if (user.hammer) {
      gameUtilities.sendDialog(
        user.name,
        "J'ai déjà ce marteau. Peut-être que je peux m'en servir d'une manière ou d'une autre..."
      );
    } else {
      gameUtilities.sendDialog(
        user.name,
        "Ah ! Un marteau ! Intéressant... Je peux peut-être m'en servir."
      );
      user.hammer = true;
    }
  },

  glass(user, gameItem) {
    if (user.hammer && !gameItem.alarm) {
      gameUtilities.sendDialog(
        user.name,
        "Parfait ! J'ai désactivé l'alarme. Cassons cette vitre et prenons ce costume !"
      );
    } else if (!user.hammer && gameItem.alarm) {
      gameUtilities.sendDialog(
        user.name,
        "Le costume ! Il est magnifique. Comment puis-je y accéder ?"
      );
    } else if (user.hammer && gameItem.alarm) {
      gameUtilities.sendDialog(
        user.name,
        "J'ai un marteau mais le système d'alarme est toujours activé. Si je casse la vitre je risque d'attirer l'attention."
      );
    } else if (!user.hammer && !gameItem.alarm) {
      gameUtilities.sendDialog(
        user.name,
        "J'ai désactivé l'alarme. Maintenant comment puis-je ouvrir cette porte ?"
      );
    }
  },
};

const rooms = {
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

const changeRoom = {
  doorToCostumeRoom(user) {
    if (user.key) {
      Rooms.costumeRoom();
    } else {
      gameUtilities.sendDialog(
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
      gameActions.enigme(user, gameItem);
      break;
    case "doorToCostumeRoom":
      ChangeRoom.doorToCostumeRoom(user);
      break;
    case "hammer":
      gameActions.hammer(user);
      break;
    case "glass":
      gameActions.glass(user, gameItem);
      break;
    case "alarm":
      gameActions.alarm(user, gameItem);
      break;
    case "closeButton":
      DOMReference.dialogueContainer.classList.toggle("hidden");
      break;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const parentElement = document.body;

  parentElement.addEventListener("click", (event) => {
    if (event.target && event.target.id === "submit-enigme") {
      const inputElement = document.getElementById("animal-question");
      if (inputElement) {
        user.enigme = inputElement.value;
        DOMReference.dialogueContainer.classList.toggle("hidden");
      }
    } else if (event.target && event.target.id === "submit-alarm") {
      const inputElement = document.getElementById("alarm-question");
      if (inputElement) {
        user.codeChoice = inputElement.value;
        console.log(user.codeChoice);
        gameItem.deactivateAlarm(+user.codeChoice);
        console.log(gameItem.alarm);
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
