const tempAtual = document.getElementById("temp-atual");
const iconeClima = document.getElementById("icone-do-clima");
const descrLegenda = document.querySelector("figcaption");

const url = "https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.63&units=metric&appid=40f26b4f913835de7bfb4e9141e3de3d";

async function apiFetch() {
  try {
    const resposta = await fetch(url);
    if (resposta.ok) {
      const dados = await resposta.json();
      console.log(dados);
      mostrarResultados(dados);
    } else {
      throw new Error(await resposta.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function mostrarResultados(dados) {
  tempAtual.textContent = `${dados.main.temp} °C`;
  iconeClima.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
  );
  iconeClima.setAttribute("alt", dados.weather[0].description);
  descrLegenda.textContent = dados.weather[0].description;
}

apiFetch();