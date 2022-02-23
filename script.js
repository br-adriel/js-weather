const btnLocalizacao = document.getElementById("btnLocalizacao");
const divForm = document.querySelector(".bloco-form");

btnLocalizacao.addEventListener("click", () => {
  if (divForm.style.display === "none") {
    btnLocalizacao.children[0].classList.remove("bi-geo-alt");
    btnLocalizacao.children[0].classList.add("bi-arrow-left");
    btnLocalizacao.children[0].setAttribute("title", "Return");

    divForm.style.display = "flex";
  } else {
    btnLocalizacao.children[0].classList.remove("bi-arrow-left");
    btnLocalizacao.children[0].classList.add("bi-geo-alt");
    btnLocalizacao.children[0].setAttribute("title", "Change location");

    divForm.style.display = "none";
  }
});
