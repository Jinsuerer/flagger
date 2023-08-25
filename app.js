url = "https://restcountries.com/v3/all";

let getCountry = ""; 

window.addEventListener("load", () => {
  getUrl();
});
// window.onload=function(){
//     getUrl()
// }

const getUrl = async function () {
  try {
    const res = await fetch(url);

    if (res.sattus >= 200 && res.status <= 299) {
      // (!res.ok)
      throw new Error(`Something went wrong: ${res.status} `);
      renderError();
    }

    const data = await res.json();
    rendernew(data);

  } catch (error) {
    renderError(error);
  }

};


//? hata olmasi durumunda DOM'a mesaji bas
const renderError = (err) => {
  const h1 = document.querySelector("h1");
  h1.innerText = `<h3 class="text-danger">${err}</h3>`;
};

//? Tum ulkelerin isimlerini elde edip bunlari dropmenu'ye yaz
const rendernew = function (data) {
  const countryName = data.forEach((e) => {
    const { common } = e.name;
    const ListOne = document.getElementById("list_one");

    ListOne.innerHTML += `<option value="${common}">${common}</option>`;
    getCountry= data
  });
};


//? Dropdown menudeki ulke ismi degistiginde secilen ulkenin bilgilerini
//? Card olarak DOM'a bas


document.getElementById("input").addEventListener("change", () => { // optionlar var ise ( secenekler) tıkladığımız verilerin gelmesi için change yapısını kullanıyorum.
  const inputValue = document.getElementById("input").value;
  console.log(inputValue);
  if(inputValue){
    const selectedCountry = getCountry.filter((event)=>event.name.common===inputValue)

    renderCountry(selectedCountry[0]);
    document.getElementById("input").value=""
    
  } 
});

//? Ulke bilgilerini card olarak basan fonksiyon

const renderCountry = (c) => {

  const {
    name: { common },
    region,
    // flags: {png},
    languages,
    currencies,
    population,
    borders,
    maps,
    capital
  } = c; 

const countries = document.querySelector(".countries");
countries.innerHTML = `
<div class="card" >
<img src=" ${c.flags[1]}" class="imgClass" alt="flag" />
<div><h5 class="">${common}</h5></div>
<p><i class="fa-solid fa-earth-oceania"></i> Region:${region}</p>
<p> <i class="fas fa-lg fa-landmark"></i>Capitals:${capital}</p>
<p>  <i class="fas fa-lg fa-comments"></i>Languages:${Object.values(
  languages
)}</p>
<p>  <i class="fas fa-lg fa-money-bill-wave"></i> Currencies:${
  Object.values(currencies)[0].name
},${Object.values(currencies)[0].symbol}</p>
<p> <i class="fa-solid fa-people-group"></i></i>Population:${population.toLocaleString(
  "en-US"
)}</p>
<p>  <i class="fa-sharp fa-solid fa-road-barrier"></i>Borders:${
  borders ? borders : "None"
}</p>
<p><i class="fa-solid fa-map-location-dot"></i>Map:<a href=${maps.googleMaps} target='_blank'> Go to google map</a></p></div>`
};



