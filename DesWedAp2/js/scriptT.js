document.addEventListener("DOMContentLoaded", function() {
    loadAthletesT('all');

});

document.querySelector('#filter').addEventListener("keyup", function(e) {
    filter(e.target.value.toLowerCase());
});

function loadAthletesT(endpoint) {
    const apiUrl = `https://botafogo-atletas.mange.li/2024-1/${endpoint}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('athletes', JSON.stringify(data));
            renderAthletes(data)
        })
        .catch(error => console.error('Erro ao obter dados:', error));
}

function filter(name) {
    let athletes = JSON.parse(localStorage.getItem('athletes') ??  '[]');
    let newData = athletes.filter(e => e.nome.toLowerCase().indexOf(name.toLowerCase()) > -1);
    console.log(athletes, name, newData); 
    renderAthletes(newData);
}

function renderAthletes(athletesData) {
    const athletesContainer = document.getElementById('athletes-containerT');
    athletesContainer.innerHTML = '';

    athletesData.forEach(athlete => {
        const card = document.createElement('div');
        card.className = 'athlete-card';
        card.innerHTML = `
                            <img src="${athlete.imagem}"></img>
                            <p>${athlete.nome}</p>
                            <button class="sobre" type="button" onclick="showAthleteDetails(${athlete.id})">Sobre</button>
                            `;
        athletesContainer.appendChild(card);
    });
}




function showAthleteDetails(athleteId) {
    const apiUrl = `https://botafogo-atletas.mange.li/2024-1/${athleteId}`;
    document.querySelector('#filter').classList.add('hide');
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => renderAthleteDetails(data))
        .catch(error => console.error('Erro ao obter dados:', error));
}


function renderAthleteDetails(detailsData) {
    const detailsContainer = document.getElementById('athletes-containerT');
    detailsContainer.innerHTML = `<div class="details-card">
                                    <div>
                                        <h2>Detalhes do Atleta</h2>
                                        <img src="${detailsData.imagem}"> </img>   
                                    </div>
                                    <div>
                                        <h2>${detailsData.nome}</h2>
                                        <span>${detailsData.detalhes}</span>
                                        <span><b>Elenco:</b> ${detailsData.elenco}</span>
                                        <span><b>Posição:</b> ${detailsData.posicao}</span>
                                        <span><b>Naturalidade:</b> ${detailsData.naturalidade}</span>
                                        <span><b>Nascimento:</b> ${detailsData.nascimento} </span>
                                        <span><b>Altura:</b> ${detailsData.altura} </span>
                                        <span><b>Número de jogos:</b> ${detailsData.n_jogos} </span>
                                        <span><b>Entrou em ${detailsData.no_botafogo_desde}</b></span>
                                        <a href="${detailsData.url_detalhes}" target="_blanck">Página oficial</a>
                                    </div>
                                </div>`;
}



function logout() {
    // Lógica de logout (pode ser mais elaborada dependendo da autenticação)
    localStorage.setItem('authenticated', 'false');
    alert('Logout realizado com sucesso');
    window.location.href = 'login.html';  // Redireciona para a página inicial após o logout
}
