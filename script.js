const inputCountry = document.querySelector(".input-country");
const mainSection = document.querySelector(".section-1");
const body = document.body;
const flagsSection = document.querySelector(".flags-section");
const filter = document.querySelector('.filter')

const getData = async () => {
  const response = await fetch("./data.json");
  const data = await response.json();
  const copyData = data;
  console.log(copyData);

  function render(country) {
    if (!country) return;

  
    mainSection.insertAdjacentHTML(
      "beforeend",
      `
      <div class="one-country" style="width:250px;background:#2D3643;border-radius:10px;">
        <img style="width:100%" src="${country.flags.png}">
        <div style="padding:10px;color:white;">
          <h3>${country.name}</h3>
          <p><b>Population:</b> ${country.population}</p>
          <p><b>Region:</b> ${country.region}</p>
          <p><b>Capital:</b> ${country.capital}</p>
        </div>
      </div>
    `,
    );
  }
  copyData.forEach(el =>{
    render(el)
  })

  inputCountry.addEventListener("input", () => {
    mainSection.innerHTML ="";
    const value = inputCountry.value.toLowerCase();

    const country = copyData.find((e) => e.name.toLowerCase().includes(value));

    render(country);
  });

  document.addEventListener("click", (e) => {
    const card = e.target.closest(".one-country");
    if (!card) return;
    const value = inputCountry.value.toLowerCase();
    const country = copyData.find((el) =>
      el.name.toLowerCase().includes(value),
    );
    flagsSection.style.display = "none";


    body.insertAdjacentHTML(
      "beforeend",
      `
      <div style="margin-top:50px"> <button class="back-btn">← Back</button> <div class="container"> <div class="flag"> <img src="${country.flags.svg}" alt="">  </div> <div class="info"> <h1>${country.name}</h1> <div class="details"> <div> <p><span>Native Name:</span> ${country.nativeName}</p> <p><span>Population:</span> ${country.population}</p> <p><span>Region:</span> ${country.region}</p> <p><span>Sub Region:</span> ${country.subregion}</p> <p><span>Capital:</span> ${country.capital}</p> </div> <div> <p><span>Top Level Domain:</span> ${country.topLevelDomain[0]}</p> <p><span>Currencies:</span> ${country.currencies[0].name}</p> <p><span>Languages:</span>${country.languages.map((lang) => lang.name).join(",")}</p> </div> </div> <div class="borders">
<strong>Border Countries:</strong>
${country.borders
  .map((el) => {
    const borderCountry = copyData.find((border) => border.alpha3Code === el);
    return `<div class="border-btn">${borderCountry.name}</div>`;
  })
  .join("")}
</div>
    </div> </div> </div> </div>
    `,
    );
    document.addEventListener("click", () => {
      document.addEventListener("click", (e) => {
        if (e.target.classList.contains("back-btn")) {
          location.reload();
        }
      });
    });
  });

  filter.addEventListener('change', ()=>{
    mainSection.innerHTML = "";
    const regionFilter = data.filter(el => el.region.toLowerCase() === filter.value.toLowerCase())
    console.log(regionFilter);
    regionFilter.forEach(e =>{
      render(e)
    })
    
  })
};

getData();
