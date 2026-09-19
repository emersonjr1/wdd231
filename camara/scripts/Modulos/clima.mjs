const API_KEY = "40f26b4f913835de7bfb4e9141e3de3d";  
const LAT = "-22.7253";
const LON = "-47.6492";

const URL_CLIMA = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric&lang=pt_br`;
const URL_PREVISAO = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric&lang=pt_br`;

function exibirClimaAtual(dados) {
    const container = document.getElementById("climaAtual");
    if (!container) return;

    const temp = Math.round(dados.main.temp);
    const desc = dados.weather[0].description;
    const icone = dados.weather[0].icon;

    container.innerHTML = `
        <div class="clima-detalhes">
            <img src="https://openweathermap.org/img/wn/${icone}.png" alt="${desc}" width="50" height="50">
            <div>
                <p style="font-size: 1.8rem; font-weight: bold; margin: 0;">${temp}°C</p>
                <p style="text-transform: capitalize; margin: 0;">${desc}</p>
            </div>
        </div>
    `;
}

function exibirPrevisao(dados) {
    const container = document.getElementById("previsaoClima");
    if (!container) return;

    container.innerHTML = "";

    const previsoesDiarias = dados.list
        .filter(item => item.dt_txt.includes("12:00:00"))
        .slice(0, 3);

    previsoesDiarias.forEach(item => {
        const data = new Date(item.dt * 1000);
        const diaSemana = data.toLocaleDateString("pt-BR", { weekday: "short" });
        const temp = Math.round(item.main.temp);

        const el = document.createElement("div");
        el.className = "previsao-item";
        el.innerHTML = `
            <strong>${diaSemana.toUpperCase()}</strong>
            <p>${temp}°C</p>
        `;
        container.appendChild(el);
    });
}

export async function carregarClima() {
    try {
        const respClima = await fetch(URL_CLIMA);
        if (respClima.ok) {
            const dadosClima = await respClima.json();
            exibirClimaAtual(dadosClima);
        }

        const respPrevisao = await fetch(URL_PREVISAO);
        if (respPrevisao.ok) {
            const dadosPrevisao = await respPrevisao.json();
            exibirPrevisao(dadosPrevisao);
        }
    } catch (erro) {
        console.error("Erro ao carregar dados do tempo:", erro);
    }
}