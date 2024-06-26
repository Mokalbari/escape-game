//TODO remplacer les updateInventory par le combo
// Fonctions fabrique pour créer des objets User et GameItem
const user = {
  name: "&nbsp;",
  enigme: "",
  key: false,
  code: "",
  codeChoice: "",
  card: false,
  hammer: false,
  inventory: [],
  clean: false,
  dress: false,
  jacket: false,
};
// Fonction fabrique pour créer les éléments du jeu.
const gameItem = {
  enigme: 6,
  code: 2337,
  alarm: true,
  glass: true,

  deactivateAlarm(inputCode) {
    if (inputCode === this.code) {
      this.alarm = false;
      return true;
    }
    return false;
  },
};

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
  const userInventory = document.querySelector("#userIventory");
  const exitButton = document.querySelector("#exitButton");
  const dialogInventory = document.querySelector("#dialogue__inventory");
  const inventoryContent = document.querySelector("#inventoryContent");

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
    userInventory,
    exitButton,
    dialogInventory,
    inventoryContent,
  };
})();

const inventoryTriggerCombo = (newItem) => {
  // Function to add item to user inventory
  const pushToUserInventory = (item) => {
    user.inventory.push(item);
  };

  // Function to display the last item inside the inventory content div
  const displayItemInsideDiv = () => {
    DOMReference.inventoryContent.textContent = user.inventory.slice(-1);
  };

  // Function to update the inventory list
  const updateInventory = () => {
    DOMReference.userInventory.innerHTML = "";
    user.inventory.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      DOMReference.userInventory.appendChild(li);
    });
  };

  // Function to trigger the animation
  const triggerAnimation = () => {
    const dialogInventory = DOMReference.dialogInventory;
    dialogInventory.classList.remove("hidden");
    dialogInventory.classList.remove("animate");
    void dialogInventory.offsetWidth;
    dialogInventory.classList.add("animate");
    setTimeout(() => {
      dialogInventory.classList.remove("animate");
      dialogInventory.classList.add("hidden");
    }, 3000);
  };

  // Execute the functions
  pushToUserInventory(newItem);
  displayItemInsideDiv();
  updateInventory();
  triggerAnimation();
};
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
      inventoryTriggerCombo("Clé vers la salle des costumes");
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
      inventoryTriggerCombo(`Carte avec un code : ${gameItem.code}`);
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
      inventoryTriggerCombo("Marteau");
    }
  },

  glass(user, gameItem) {
    if (user.hammer && !gameItem.alarm) {
      gameUtilities.sendDialog(
        user.name,
        "Tra-vail terminééé ♪! Cassons cette vitre tel un grand méchant et filons en douce !"
      );

      // Afficher la boîte de dialogue initiale

      document
        .getElementById("newOverlay")
        .classList.add("overlay__end__visible");
      // Afficher la boîte de dialogue après avoir cassé la vitre
      document.getElementById("newOverlay").style.display = "block";
      document
        .getElementById("newOverlay")
        .classList.add("overlay__end__visible");
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
  bed() {
    gameUtilities.sendDialog(
      user.name,
      `Ce serait dommage ne pas profiter de cette langueur pour faire une grâce mat', pioncer, ou secouer cette feignasse... Allez debout ${user.name} !`
    );
  },
  window() {
    gameUtilities.sendDialog(
      user.name,
      "Un beau dimanche qui s'annonce, personne dans les rues, encore moins au musée..."
    );
  },
  ground() {
    gameUtilities.sendDialog(
      user.name,
      "Aaaaarg... C'est d'un bazar sans nom... Je le jure, je rangerai... La semaine prochaine ?"
    );
  },
  sink() {
    if (user.clean) {
      gameUtilities.sendDialog(
        user.name,
        "Je me suis déjà mis un coup d'eau... Je tourne en rond."
      );
    } else {
      gameUtilities.sendDialog(
        user.name,
        "Petite toilette qui va faire du bien ♪"
      );
      user.clean = true;
    }
  },

  laundry() {
    if (user.dress) {
      gameUtilities.sendDialog(
        user.name,
        "Je ne pourrais pas trouver de vêtements moins sales que ceux que j'ai sur moi... Malheureusement..."
      );
    } else {
      gameUtilities.sendDialog(
        user.name,
        "Bon, à défaut de ne pas avoir de linges propres...j'en ai peut être de moins sales ?"
      );
      user.dress = true;
      inventoryTriggerCombo("T-shirt douteux");
    }
  },

  wardrobe() {
    if (user.jacket) {
      gameUtilities.sendDialog(
        user.name,
        "Peut-être que j'ai d'autres vestes moins froissées ? Peut-être celle...CI !...Ha, elle à des trous..."
      );
    } else {
      gameUtilities.sendDialog(
        user.name,
        "Une veste... propre ? Celle-ci ira, je pense."
      );
      inventoryTriggerCombo("Une veste questionnable");
      user.jacket = true;
      user.dress = true;
    }
  },
  wc() {
    gameUtilities.sendDialog(
      user.name,
      "J'espère que les syndicats feront vite pour faire déboucher la colonne des toilettes..."
    );
  },
  mirror() {
    if (user.name === "&nbsp;") {
      gameUtilities.sendDialog(
        user.name,
        `Mon rêve cette est était tellement étrange que j'en ai oublier mon nom... Comment je m'appelle déjà ?
    <input id="name-question" type="text">
    <button id="submit-name">Ah oui ! Je m'appelle comme ça !</button>`
      );
    } else {
      gameUtilities.sendDialog(
        user.name,
        "Il faut vraiment que j'arrête les somnifères que Jessy m'a filé, ca me fait faire des nuits vraiment bizarres..."
      );
    }
  },

  computer() {
    gameUtilities.sendDialog(
      user.name,
      "Loading system... ./user/document/museum/password/4567... Hmmmm. Ca peut m'être utile pour désactiver l'alarme ? Je garde ça en tête."
    );
    inventoryTriggerCombo("Code de l'ordinateur : 4567");
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
      "Pas rangée cette paperasse ! On dirait mon appartement. Non quand même pas. Tiens... Il y a un mot d'écrit : 'J'aime le poulet'... Un indice ?"
    );
    inventoryTriggerCombo("Note : 'J'aime le poulet");
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

  bedRoom() {
    DOMReference.image.src = "../img/bedroom.webp";
    DOMReference.usemap.innerHTML = `
    <map name="image-map">
    <area id="bed" target="" alt="Se recoucher" title="Se recoucher" href="" coords="700,893,865,690,854,590,406,563,59,714,59,833,151,788,265,804,289,878" shape="poly">
    <area id="sink" target="" alt="Se débarbouiller" title="Se débarbouiller" href="" coords="1508,641,1560,644,1595,630,1584,552,1509,588,1451,593,1459,626" shape="poly">
    <area id="mirror" target="" alt="S'admirer dans le miroir" title="S'admirer dans le miroir" href="" coords="1674,419,1774,445,1771,214,1674,218" shape="poly">
    <area id="wc" target="" alt="Déposer les amis à la piscine" title="Déposer les amis à la piscine" href="" coords="1114,546,1079,527,1080,486,1161,478,1164,589,1112,581" shape="poly">
    <area id="doorInOutside" target="" alt="Sortir de l'appartement" title="Sortir de l'appartement" href="" coords="515,177,685,190,686,571,515,565,511,421" shape="poly">
    <area id="laundry" target="" alt="Chercher du linge presque propre" title="Chercher du linge presque propre" href="" coords="290,931,197,980,70,956,31,920,56,847,151,795,251,806,281,861" shape="poly">
    <area id="wardrobe" target="" alt="Attraper la veste la moins froissée" title="Attraper la veste la moins froissée" href="" coords="1198,231,1199,611,1237,652,1240,223" shape="poly">
    <area id="window" target="" alt="Regarder par la fenêtre" title="Regarder par la fenêtre" href="" coords="1430,519,1620,557,1633,93,1416,136" shape="poly">
    <area id="ground" target="" alt="Se consterner devant l'état de l'appartement" title="Se consterner devant l'état de l'appartement" href="" coords="889,657,712,921,328,923,178,1011,1551,1015,1186,630,1035,625,1001,660" shape="poly">
</map>
`;
  },

  lobbyRoom() {
    DOMReference.image.src = "../img/lobby.png";
    DOMReference.usemap.innerHTML = `
      <map name="lobby-map" id="mapContainer">
        <area
          target=""
          alt="Parler au concierge"
          title="Parler au concierge"
          href="#"
          coords="323,269,697,617"
          shape="rect"
          id="enigme"
        />
        <area
          target=""
          alt="Aller à la salle des costumes"
          title="Aller à la salle des costumes"
          href="#"
          coords="1349,312,1669,666"
          shape="rect"
          id="doorToCostumeRoom"
        />
        <area
          target=""
          alt="Aller aux toilettes"
          title="Aller aux toilettes"
          href="#"
          coords="1053,350,1045,722,1249,647,1243,404,1162,385"
          shape="poly"
          id="doorToToilets"
        />
      </map>`;
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

  doorToLobbyRoom() {
    if (user.name !== "&nbsp;" && user.clean && user.dress) {
      rooms.lobbyRoom();
    } else {
      gameUtilities.sendDialog(
        user.name,
        "Je ne vais pas partir comme ça... Il faut que je me lave le visage, que je me regarde dans le miroir et que j'enfile quelque chose."
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
    case "mirror":
      gameActions.mirror();
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

    case "bed":
      gameActions.bed();
      break;

    case "wc":
      gameActions.wc();
      break;

    case "sink":
      gameActions.sink();
      break;

    case "doorToLobbyRoom":
      changeRoom.doorToLobbyRoom();
      break;

    case "laundry":
      gameActions.laundry();
      break;

    case "wardrobe":
      gameActions.wardrobe();
      break;

    case "window":
      gameActions.window();
      break;

    case "ground":
      gameActions.ground();
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
    } else if (event.target && event.target.id === "submit-name") {
      const inputElement = document.getElementById("name-question");
      if (inputElement) {
        user.name = inputElement.value;
        if (user.name.toLowerCase() === "abdou") {
          alert("Hey ! Salut Chicken Lord !");
        } else if (user.name.toLocaleLowerCase() === "poulet") {
          alert("On t'a reconnu Abdou !");
        }
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

DOMReference.exitButton.addEventListener("click", () => {
  window.location.href = "../index.html";
});
