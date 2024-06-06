document.addEventListener("DOMContentLoaded", () => {
    // Gestion des événements
    const DOMReference = {
        body: document.body,
        dialogueContainer: document.querySelector("#dialogueContainer")
    };

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
        } else if (event.target && event.target.id === "submit-name") {
            const inputElement = document.getElementById("name-question");
            if (inputElement) {
                user.name = inputElement.value;
                DOMReference.dialogueContainer.classList.toggle("hidden");
            }
        }
    });

    // Discution d'introduction
    const dialogues = [
        { speaker: "Joueur 1", text: "Allô Jessy ?" },
        { speaker: "PNJ", text: "Ouai ca va ? Pas trop fatiguer de ta nuit courte ?" },
        { speaker: "Joueur 1", text: "J'avoue que j'ai vécu pire, je voulais un peu ranger chez moi j'ai pas pu prendre le temps, je vais le faire aujourd'hui du coup" },
        { speaker: "PNJ", text: "Aucune chance mon pote" },
        { speaker: "Joueur 1", text: "Qu'est ce qui se passe ?" },
        { speaker: "PNJ", text: "Ce soir y a une soirée costumée, et devine qui y sera ?" },
        { speaker: "Joueur 1", text: "Ludivine ?" },
        { speaker: "PNJ", text: "La seule, l'unique, la plus jolie de tout le campus ! Rien que ca ! J'ai déjà mon costume de Super Zero, tu sais le méchant dans l'.." },
        { speaker: "Joueur 1", text: "J AI PAS DE COSTUME" },
        { speaker: "PNJ", text: "Bah trouve une solution ! Tu veux vraiment rater ca ?" },
        { speaker: "Joueur 1", text: "Hors de question !.... Le musée ! Je vais leur.....euh Jessy, on se retrouve ce soir !" },
        { speaker: "PNJ", text: "Mais qu'est ce que tu *...." },
        { speaker: "Joueur 1", text: "Allé.. c'est dimanche apres midi, il y auras personne, c'est le meilleur moment pour aller leurs emprunter un costume super classe !" }
    ];

    let currentDialogueIndex = 0;
    const bubble1 = document.getElementById("bubble1");
    const bubble2 = document.getElementById("bubble2");
    const speaker1 = document.getElementById("speaker1");
    const text1 = document.getElementById("text1");
    const speaker2 = document.getElementById("speaker2");
    const text2 = document.getElementById("text2");
    const arrow = document.getElementById("flechedial");
    const overlay = document.getElementById("overlay");

    const updateDialogue = () => {
        console.log("Updating dialogue index: ", currentDialogueIndex);
        const dialogue = dialogues[currentDialogueIndex];
        if (currentDialogueIndex % 2 === 0) {
            bubble2.style.display = "none";
            bubble1.style.display = "block";
            speaker1.textContent = dialogue.speaker;
            text1.textContent = dialogue.text;
        } else {
            bubble1.style.display = "none";
            bubble2.style.display = "block";
            speaker2.textContent = dialogue.speaker;
            text2.textContent = dialogue.text;
        }
    };

    arrow.addEventListener("click", () => {
        console.log("Arrow clicked");
        currentDialogueIndex++;
        if (currentDialogueIndex < dialogues.length) {
            updateDialogue();
        } else {
            // Optionnel : Masquer les bulles ou faire autre chose à la fin des dialogues
            bubble1.style.display = "none";
            bubble2.style.display = "none";
            arrow.style.display = "none";
            overlay.style.display = "none";
            // Par exemple, vous pourriez afficher un message de fin ou déclencher une autre action.
        }
    });

    // Appel initial pour afficher le premier dialogue
    updateDialogue();
});
