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
divForm.style.display = "none";

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

// Carrega footer dinamicamente
const footer = document.getElementById("footer-p");
footer.innerText = `Adriel Faria, ${DATA_HOJE.getFullYear()}`;

// Funcao responsavel por carregar informacaoes de tempo
async function carregarTempo(cidade) {
  try {
    const url = `https://goweather.herokuapp.com/weather/${cidade}`;
    const response = await fetch(url);
    const data = await response.json();
    mostrarTempo(cidade, data);
  } catch (err) {
    console.log(err);
  }
}

function formatarValor(valor = "") {
  let aux = valor.split(" ")[0];

  if (aux === "") {
    return "--";
  }

  aux = aux.split("");
  if (aux[0] === "+") {
    aux.shift();
  }
  return aux.join("");
}

// Funcao responsavel por mostrar as informacaoes
const cid = document.getElementById("cidade");
const descricao = document.getElementById("descricao");
const temperaturas = [...document.querySelectorAll(".temp")];
const ventos = [...document.querySelectorAll(".veloc-vento")];

function mostrarTempo(cidade, data) {
  // Carrega nome da cidade
  cid.innerText = cidade;

  // Carrega descricao da previsao
  descricao.innerText = data.description;

  // Carrega temperaturas
  temperaturas[0].innerText = formatarValor(data.temperature);

  const tempsDias = data.forecast.map((dia) => formatarValor(dia.temperature));
  for (let i = 1; i < temperaturas.length; i++) {
    temperaturas[i].innerText = tempsDias[i - 1];
  }

  // Carrega velocidade dos ventos
  ventos[0].innerText = formatarValor(data.wind);

  const ventoDias = data.forecast.map((dia) => formatarValor(dia.wind));
  for (let i = 1; i < ventos.length; i++) {
    ventos[i].innerText = ventoDias[i - 1];
  }
}
