const DATA_HOJE = new Date();

// Carrega dias das proximas previsoes
const semana = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const h4s = [...document.querySelectorAll(".grid-dias h4")];

for (let i = 1; i < 3; i++) {
  let dia = DATA_HOJE.getDay() + i + 1;
  if (dia > 6) {
    dia = dia - 7;
  }
  h4s[i].innerText = semana[dia];
}

// Visualização do form de localizacao
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
