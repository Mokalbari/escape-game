const modalUser = () => {
  const modal = document.getElementById("userModal");
  const btn = document.getElementById("openModalBtn");
  const span = document.getElementsByClassName("close")[0];
  const saveBtn = document.getElementById("savePseudoBtn");
  const input = document.getElementById("userPseudoInput");

  let pseudo = "";

  btn.onclick = function () {
    modal.style.display = "block";
  };
  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  saveBtn.onclick = function () {
    pseudo = input.value;
    console.log("Pseudo enregistré:", pseudo);

    if (!input.value) {
      alert("tu n'as pas entré de pseudo");
    } else if (input.value === "poulet" || input.value === "Poulet") {
      alert("on t'as reconnue abdou ! ");
      modal.style.display = "none";
    } else if (input.value === "abdou" || input.value === "Abdou") {
      alert(`hey c'est toi mon poulet ?`);
      modal.style.display = "none";
    } else {
      alert(`salut ${pseudo} tu es près a entrer dans le jeu !`);
      modal.style.display = "none";
    }
  };

  submitBtn.KeyboardEventInit = (event) => {
    const submitBtn = document.addEventListener("submit");
    input.addEventListener("keypress", (event) => {
      if (event.KeyChar === 13) {
        pseudo = input.value;
      }
    });
  };
};
modalUser();
