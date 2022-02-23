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

function exibirForm() {
  btnLocalizacao.children[0].classList.remove("bi-geo-alt");
  btnLocalizacao.children[0].classList.add("bi-arrow-left");
  btnLocalizacao.children[0].setAttribute("title", "Return");
  divForm.style.display = "flex";
}

function ocultarForm() {
  btnLocalizacao.children[0].classList.remove("bi-arrow-left");
  btnLocalizacao.children[0].classList.add("bi-geo-alt");
  btnLocalizacao.children[0].setAttribute("title", "Change location");
  divForm.style.display = "none";
}

btnLocalizacao.addEventListener("click", () => {
  if (divForm.style.display === "none") {
    exibirForm();
  } else {
    ocultarForm();
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

    if (!response.ok || data.temperature === "") {
      throw Error("City not found");
    }

    let nomeCidade = cidade.split("-");
    nomeCidade = nomeCidade.map((nome) => {
      nome = nome.toLowerCase();
      nome = nome.split("");
      nome[0] = nome[0].toUpperCase();
      return nome.join("");
    });
    nomeCidade = nomeCidade.join(" ");

    mostrarTempo(nomeCidade, data);
  } catch (err) {
    if (err.message === "City not found") {
      mostrarErro(err.message);
    } else {
      mostrarErro("An error has occurred");
    }
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

function mostrarErro(mensagem = "") {
  cid.innerText = "Error";

  // Carrega descricao da previsao
  descricao.innerText = mensagem;
}

// lida com a troca de localizacao via form
const form = document.getElementById("formLocalizacao");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let novaCidade = form["cidade"].value.toLowerCase();
  novaCidade = novaCidade.split(" ").join("-");
  carregarTempo(novaCidade);

  form["cidade"].value = "";
  ocultarForm();
});
