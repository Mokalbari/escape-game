// Fonctions fabrique pour créer des objets User et GameItem
const createUser = (name) => {
  return {
    name,
    enigme: "",
    key: true,
    code: "",
    codeChoice: "",
    card: false,
    hammer: false,
  };
};

// Fonction fabrique pour créer les éléments du jeu.
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
const gameItem = createGameItem(6, 2337, true, true);

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

// Module pour la fonction utilitaire sendDialog
const gameUtilities = (() => {
  const sendDialog = (name, str) => {
    DOMReference.dialogueContainer.classList.toggle("hidden");
    DOMReference.dialogueName.innerHTML = name;
    DOMReference.dialogueContent.innerHTML = str;
  };

  return {
    sendDialog,
  };
})();

// Création d'objets pour encapsuler la logique du jeu
// Stocker dans cet objet toutes les fonctions qui contiennent les scripts qui doivent être exécutés lorsqu'une zone est cliquée.
const gameActions = {
  enigme(user, gameItem) {
    if (user.key) {
      gameUtilities.sendDialog(
        user.name,
        `J'ai déjà répondu à l'énigme ! Il éxiste ${user.enigme} pierres d'infinités. Je peux me diriger vers la salle des costumes.`
      );
    } else if (user.enigme === gameItem.enigme) {
      user.key = true;
      gameUtilities.sendDialog(
        "Concierge",
        `C'est bien ça... La réponse est "${gameItem.enigme}" pierres d'infinités. Voici la clé de la salle des costumes. Ne touchez rien s'il vous plait.`
      );
    } else {
      if (!user.enigme) {
        gameUtilities.sendDialog(
          "Concierge",
          `Pour pouvoir accéder à la salle des costumes, vous devez répondre à une question ; <br />Combien existe-t-il de pierres d'infinités ?
          <input id="pierre-question" type="text">
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
        `Je vais fouiller ces tiroirs. Une carte ! Le code marqué est ${gameItem.code}`
      );
      user.code = gameItem.code;
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
        `L'alarme est connectée à la vitrine. Si j'ouvre la vitrine sans la désactiver je risque de rencontrer Batman dans de mauvaises circonstances.
    <input id="alarm-question" type="text">
    <button id="submit-alarm">Tester le code</button>`
      );
    } else if (gameItem.alarm && user.codeChoice) {
      gameUtilities.sendDialog(
        "Système de sécurité",
        `Mauvais saisi incorrect.     
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
        "Bon je sais toujours où est le marteau, je n'suis pas encore amnésique."
      );
    } else {
      gameUtilities.sendDialog(
        user.name,
        "Ah ! Un marteau ! Ce n'est pas Mijolnir mais il peut être utile..."
      );
      user.hammer = true;
    }
  },

  glass(user, gameItem) {
    if (user.hammer && !gameItem.alarm) {
      gameUtilities.sendDialog(
        user.name,
        "Tra-vail terminééé ♪! Cassons cette vitre tel un grand méchant et filons en douce !"
      );
    } else if (!user.hammer && gameItem.alarm) {
      gameUtilities.sendDialog(
        user.name,
        "Si je pouvais récupérer le costume de Captain Amerloque, je serais certainement le héros de cette soirée !"
      );
    } else if (user.hammer && gameItem.alarm) {
      gameUtilities.sendDialog(
        user.name,
        "Si je casse la vitre avec l'alarme encore activée, je vais finir en zonzon entre le Pinguoin et Double-Face..."
      );
    } else if (!user.hammer && !gameItem.alarm) {
      gameUtilities.sendDialog(
        user.name,
        "A-larme désactivée ♪ ! Il faut maintenant trouver le moyen d'ouvrir la porte."
      );
    }
  },

  paintingSpiderman() {
    gameUtilities.sendDialog(
      user.name,
      "Notre bon Spider-Man, beaucoup trop musclé pour ce qu'il est..."
    );
  },

  paintingSpicyGirls() {
    gameUtilities.sendDialog(
      user.name,
      "Elles étaient pas 3 à un moment ? Ou mes yeux me jouent des tours ?"
    );
  },

  paintingSuperPasNet() {
    gameUtilities.sendDialog(
      user.name,
      "Super pas-net, le seul super héro qu'on ne peut pas voir correctement, il est peut-être pas beau ?"
    );
  },

  paintingAvainJers() {
    gameUtilities.sendDialog(
      user.name,
      "Mes préferés ! Les Avain-Jers, merci Diswen pour ce cadeau !"
    );
  },

  paintingLuckyLuc() {
    gameUtilities.sendDialog(
      user.name,
      "Lucky Luc ? Mais ?! Qu'est ce qu'il fiche ici ?!"
    );
  },

  paintingSuperEgirl() {
    gameUtilities.sendDialog(
      user.name,
      "J'ai jamais pu entendre son super 'Eeeeh' qui fait la renommée de Super E-Girl"
    );
  },

  paintingSuper4D() {
    gameUtilities.sendDialog(
      user.name,
      "Il paraît les pouvoirs de Super4D vienennt de ses 25 personnalitées ; elles prennent tant de place que Super4D peut passer les dimentions !"
    );
  },

  bench() {
    gameUtilities.sendDialog(
      user.name,
      "Je ne peux pas perdre mon temps à m'assoir sur les bancs ! Vous ne m'aurez pas, complotisateurs !"
    );
  },

  computer() {
    gameUtilities.sendDialog(
      user.name,
      "Loading system... ./user/document/museum/password/4567 ... Hmmmm. Ca peut m-être utile pour désactiver l'alarme ? Je garde ça en tête."
    );
  },

  frame() {
    gameUtilities.sendDialog(
      user.name,
      "Ce cadre est exeptionnel, que cache t'il ? Hmmmm. Rien."
    );
  },

  drawers() {
    gameUtilities.sendDialog(
      user.name,
      "Pas rangée cette paperasse. Tiens... Il y a un mot d'écrit : 'J'aime le poulet'... Un indice ?"
    );
  },
};

// Map area des différentes salles navigables chargées dynamiquement en fonction des clicks
const rooms = {
  costumeRoom() {
    DOMReference.image.src = "../img/costume-room.webp";
    DOMReference.usemap.innerHTML = `
      <map name="image-map">
        <area target="" alt="Tenter de briser la vitre et devenir un méchant" title="Tenter de briser la vitre et devenir un méchant" href="#" id="glass" coords="533,141,1198,673" shape="rect">
        <area target="" alt="Trafiquoter l'alarme du musée" title="Trafiquoter l'alarme du musée" href="#" id="alarm" coords="1202,442,1285,562" shape="rect">
        <area target="" alt="Aller vers le bureau" title="Aller vers le bureau" href="#" id="doorToOffice" coords="104,122,507,840" shape="rect">
        <area target="" alt="Aller vers le mur des héros" title="Aller vers le mur des héros" href="#" id="doorToGalleryRoom" coords="1242,161,1680,809" shape="rect">
      </map>
    `;
  },

  galleryRoom() {
    DOMReference.image.src = "../img/art-gallery.webp";
    DOMReference.usemap.innerHTML = `
    <map name="image-map">
    <area id="paintingSpiderman" target="" alt="tableau spider man musclé" title="Regarder ce super tableau" href="#" coords="324,0,539,125,530,543,316,571,324,2" shape="poly">
    <area id="paintingSpicyGirls" target="" alt="tableau spyci girls" title="Regarder ce super tableau de fou" href="#" coords="569,168,710,266,704,529,568,540" shape="poly">
    <area id="paintingSuperPasNet" target="" alt="tableau super pas net" title="Regarder ce tableau de dingue" href="#" coords="754,281,824,335,824,523,751,526" shape="poly">
    <area id="paintingAvainJers" target="" alt="tableau les avengers" title="Regarder ce tableau EXEPTIONNEL" href="#" coords="854,260,1077,535" shape="rect">
    <area id="paintingLuckyLuc" target="" alt="tableau de lucky luck " title="Regarder ce tableau..." href="#" coords="1107,521,1161,532,1153,291,1104,326" shape="poly">
    <area id="paintingSuperEgirl" target="" alt="tableau super girl" title="Regarder ce tabl..." href="#" coords="1242,203,1169,269,1171,527,1251,530" shape="poly">
    <area id="paintingSuper4D" target="" alt="tableau super 4d" title="Regarder." href="#" coords="1481,563,1478,8,1289,165,1291,543,1367,552" shape="poly">
    <area id="bench" target="" alt="banc nul" title="Examiner ce banc banale" href="#" coords="1304,682,1453,753,1442,879,1313,879,1209,773,1207,682" shape="poly">
    <area id="hammer" target="" alt="marteau de la solution" title="Fouiller sournoisement" href="#" coords="539,703,588,692,628,817,585,834,550,747" shape="poly">
    <area id="doorToCostumeRoom" target="" alt="retour arrière" title="Revenir à la salle du costume" href="#" coords="4,991,1790,1021" shape="rect">
</map>
`;
  },
  officeRoom() {
    DOMReference.image.src = "../img/office2.webp";
    DOMReference.usemap.innerHTML = `
    <map name="image-map">
      <area id="computer" target="" alt="ordinateur" title="Allumer l'ordinateur" href="#" coords="1222,433,1036,601" shape="rect">
      <area id="card" target="" alt="range-documents" title="Ouvrir le range-documents" href="#" coords="1240,513,1365,634" shape="rect">
      <area id="drawers" target="" alt="tiroirs " title="Ouvrir les tiroirs " href="#" coords="950,639,1141,954" shape="rect">
      <area id="frame" target="" alt="grand cadre" title="Cliquez sur le grand cadre" href="#" coords="1073,151,1315,428" shape="rect">
     <area id="doorToCostumeRoom" target="" alt="Ouvrir la porte du bureau" title="porte du bureau" href="#" coords="361,780,708,136" shape="rect">
    </map>`;
  },
};

// Objet qui stocke les fonctions qui invoquent les fonctions de rooms.
const changeRoom = {
  doorToCostumeRoom(user) {
    if (user.key) {
      rooms.costumeRoom();
    } else {
      gameUtilities.sendDialog(
        user.name,
        "C'est fermé... Le concierge m'aiderait peut-être ?"
      );
    }
  },

  doorToGalleryRoom() {
    rooms.galleryRoom();
  },

  doorToOffice() {
    rooms.officeRoom();
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
      changeRoom.doorToCostumeRoom(user);
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

    case "doorToGalleryRoom":
      changeRoom.doorToGalleryRoom();
      break;

    case "paintingSpiderman":
      gameActions.paintingSpiderman();
      break;

    case "paintingSpicyGirls":
      gameActions.paintingSpicyGirls();
      break;

    case "paintingSuperPasNet":
      gameActions.paintingSuperPasNet();
      break;

    case "paintingAvainJers":
      gameActions.paintingAvainJers();
      break;

    case "paintingLuckyLuc":
      gameActions.paintingLuckyLuc();
      break;

    case "paintingSuperEgirl":
      gameActions.paintingSuperEgirl();
      break;

    case "paintingSuper4D":
      gameActions.paintingSuper4D();
      break;

    case "bench":
      gameActions.bench();
      break;

    case "card":
      gameActions.card(user, gameItem);
      break;

    case "computer":
      gameActions.computer();
      break;

    case "frame":
      gameActions.frame();
      break;

    case "drawers":
      gameActions.drawers();
      break;

    case "doorToOffice":
      changeRoom.doorToOffice();
      break;
  }
});

// Gestion des événements sur le formulaire
document.addEventListener("DOMContentLoaded", () => {
  const parentElement = document.body;

  parentElement.addEventListener("click", (event) => {
    if (event.target && event.target.id === "submit-enigme") {
      const inputElement = document.getElementById("pierre-question");
      if (inputElement) {
        user.enigme = +inputElement.value;
        console.log(user.enigme);
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
