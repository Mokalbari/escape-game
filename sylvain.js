const userObjects = [""];
const objectForWin = [{ id:1, name:code},{id:2, name:key},{id:3, name:marteau}];
const messageWrongObject = "cet objet est juste là pour la déco ! ";
// document.addEventListener('DOMContentLoaded' , function () {
//     let hasKey = false;

function messageWinObject () {
    if(allWinObjects == true) {
        return ("");
    } else {
        return (messageWrongObject);
    }
};
function addUserObject () {
     userObjects.push(objectForWin.id);
}; 

function handleObjectClick(event) {
        objectForWin = event.target;
    if(key = true) {addUserObject()}else{alert(messageWrongObject)};
    switch (objectForWin.id) {
        case 'key':
            alert('tu as trouvé une clé !')
            hasKey = true;
            objectForWin.style.display = 'none';
        break;
        case 'code': 
            alert('tu as trouvé un code ')
            hasKey = true;
            objectForWin.style.display = 'none';
        break;
        case 'marteau' : 
            alert('tu as trouvé un marteau !')
            hasKey = true;
            objectForWin.style.display = 'none';
        break;
        default : 
            alert(messageWrongObject);
        }
    };
    function allWinObjects () {
        if (userObjects === objectForWin) {
            alert("bravo tu peux maintenant aller débloqué la porte !")
            return (openDoors);
        }
    };
    
    function openDoors() {
        if(allWinObjects = true) {
            document.getElementById('door')
            openDoors.classList.add('open');
        }
    };
    openDoors();