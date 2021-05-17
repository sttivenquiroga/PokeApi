// consumir api
const API = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";

const getData = (api) => {
  return fetch(api)
    .then((response) => response.json())
    .then((json) => {
      paginacion(json), personajes(json.results);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};
const personajes = (data) => {
  data.forEach((pj) => {
    let html = "";
    let detailUrl = pj.url;
    document.getElementById("datosPj").innerHTML = "";
    return fetch(detailUrl)
      .then((response) => response.json())
      .then((json) => {
        dibujarData(json, html);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  });
};

const dibujarData = (pj, html) => {
  html += `<div class="col-sm-4 contCard">     
   <div class="card text-white bg-dark" style="width: 18rem;">
    <img src="${pj.sprites.front_default}" class="card-img-top" alt="${pj.name}">      
    <div class="card-body">      
        <h5 class="card-title"><strong>Nombre: </strong>${pj.name}</h5>      
        <p class="card-text"><strong>Experiencia: </strong>${pj.base_experience}</p>
        <p class="card-text"><strong>Altura: </strong>${pj.heigth}</p>      
        <p class="card-text"><strong>Peso: </strong>${pj.weight}</p>
    </div>      
    </div>     
  </div>`;
  document.getElementById("datosPj").innerHTML += html;
};

const paginacion = (data) => {
  let html = "";
  html += `<li class="page-item ${
    data.previous ? "" : "disabled"
  }"><a class="page-link" onclick="getData('${data.previous}')">Prev</a></li>`;
  html += `<li class="page-item ${
    data.next ? "" : "disabled"
  }"><a class="page-link" onclick="getData('${data.next}')">Next</a></li>`;
  document.getElementById("paginacion").innerHTML = html;
};

// Traer los datos
getData(API);
