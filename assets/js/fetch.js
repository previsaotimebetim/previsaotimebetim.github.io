const tempo = document.querySelector('#titulo');
const cidade = document.querySelector('#cidade')
const botao = document.querySelector('#botao');


const previsao = async (cidade) =>{
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
    };
    let response = ''
    console.log(cidade != undefined)
    if(cidade){
         response = await fetch(`https://api.hgbrasil.com/weather?format=json-cors&key=31434b6e&city_name=${cidade}`, options);
    }else{
         response = await fetch('https://api.hgbrasil.com/weather?format=json-cors&key=31434b6e&user_ip=remote', options);
    }

    const json = await response.json();
    tempo.innerHTML = `Temperatura atual  ${json.results.city} <br> ${json.results.temp}°C <p class=clima>${json.results.description}</p><p class=clima>Umidade ${json.results.humidity}%</p>`;
    for(let i = 1; i < json.results.forecast.length - 1; i++){
        const div = document.createElement('div');
        div.setAttribute('class', 'container');
        let condition = json.results.forecast[i].condition;
        if(condition === 'storm'){
            condition = 'tempestade.png';
        }
        else if(condition === 'clear_day' || condition === 'clear_night'){
            condition = 'limpo.png';
        }
        else if(condition === 'rain'){
            condition = 'chuva.png';
        }
        else if(condition === 'cloud' || condition === 'cloudly_day' || condition === 'cloudly_night'){
            condition = 'nublado.png';
        }
        else if(condition === 'fog'){
            condition = 'neblina.png';
        }
        else if(condition === 'hail'){
            condition = 'granizo.png';
        }
        else{
            condition = 'erro.png';
        }
        div.innerHTML = `<div> 
                <div class="card" onClick=alteraTitulo()> 
                    <h2>${json.results.forecast[i].weekday}</h2>
                    <p>${json.results.forecast[i].date}</p>
                    <p>${json.results.forecast[i].min}º/${json.results.forecast[i].max}º</p>
                    <img src="/assets/images/${condition}" alt="" width='64' heigth='64'>
                    <p>${json.results.forecast[i].description}</p>
                    <p class="att">Velocidade do Vento ${json.results.forecast[i].wind_speedy}<br>Probabilidade de Chuva ${json.results.forecast[i].rain_probability}%</p>
                 </div> 
            </div>`
        document.querySelector('main').appendChild(div);   
    }

}
previsao();


botao.addEventListener('click', async (e) =>{
    for(let i = 0; i < 8; i++){
        document.querySelector('.container').remove();
    }
    let search = cidade.value.replace('-', ',');
    previsao(search);
  
})
