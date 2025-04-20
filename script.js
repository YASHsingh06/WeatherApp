// console.log("hello");
const API_KEY="a228506c908f1fbf13d46f799b68e1f7";

const yourWeatherTab=document.querySelector("[data-userWeather]");
const searchWeatherTab=document.querySelector("[data-searchWeather]");
const searchForm=document.querySelector("[data-searchForm]");
const grantLocationAccess=document.querySelector(".grant-location-container button");

let currTab=yourWeatherTab;
    

    
    

yourWeatherTab.addEventListener("click",()=>{
    if(!yourWeatherTab.classList.contains("tab-active")){
        // make tab active
        currTab.classList.remove("tab-active");
        yourWeatherTab.classList.add("tab-active");
        currTab=yourWeatherTab;

        //remove search bar 
        let searchForm=document.querySelector("[data-searchForm]");
        searchForm.classList.remove("active2"); 
        
        // display weather 

        getLocation();
        
        let userInfoWeather=document.querySelector(".user-info-weather");
        userInfoWeather.classList.add("active");
        
       
        // let data=  getLocation();
        // console.log(data);


    }
});

searchWeatherTab.addEventListener("click",()=>{
    if(!searchWeatherTab.classList.contains("tab-active")){
        
        currTab.classList.remove("tab-active");
        let userInfoWeather=document.querySelector(".user-info-weather");
        userInfoWeather.classList.remove("active");
        
        searchWeatherTab.classList.add("tab-active");
        currTab=searchWeatherTab;
        let searchForm=document.querySelector("[data-searchForm]");
        searchForm.classList.add("active2");

        
        let grantLocation=document.querySelector(".grant-location-container");
        grantLocation.classList.remove("active2");

        const loading=document.querySelector(".loading-container");
        loading.classList.remove("active2");
    } 
});



async function getWeather(lat,lon){
    

    const loading=document.querySelector(".loading-container");
    loading.classList.add("active2");

    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    let data= await response.json();
    console.log(data);
    updateWeatherUI(data);
    

}

 function getLocation(){
    if(navigator.geolocation){
     return navigator.geolocation.getCurrentPosition(showPosition,handleGrantLocation);
    }
    else{
        alert("please enable location"); 
        

    }
}
function handleGrantLocation(){
  let userInfoWeather=document.querySelector(".user-info-weather");
    userInfoWeather.classList.remove("active");
    let grantLocation=document.querySelector(".grant-location-container");
    grantLocation.classList.add("active2");
}
function showPosition(pos){
    let lon=pos.coords.longitude;
    let lat=pos.coords.latitude;
    // let x=document.querySelector("[data-parameter-container]");
    // x.style.display="flex";
    let grantLocation = document.querySelector(".grant-location-container");
    grantLocation.classList.remove("active2");
   return  getWeather(lat,lon);
    
}
function updateWeatherUI(data){
    console.log(data);
    const loading=document.querySelector(".loading-container");
    loading.classList.remove("active2");
    let city=document.querySelector("[data-city-name]");
    let climate=document.querySelector("[data-weather-desc]");
    let temp=document.querySelector("[data-temp]");
    let windspeed=document.querySelector("[data-wind]");
    let humidity=document.querySelector("[data-humidity]");
    let clouds=document.querySelector("[data-clouds]");

    city.textContent = data.name;
    climate.textContent = data.weather[0].main;
    temp.textContent = `${data.main.temp}°C`;
    windspeed.textContent = `${data.wind.speed} m/s`;
    humidity.textContent = `${data.main.humidity}%`;
    clouds.textContent = `${data.clouds.all}%`;
    
}



searchForm.addEventListener("submit",searchCity);

async function searchCity(e){
    e.preventDefault();

    const loading=document.querySelector(".loading-container");
    loading.classList.add("active2");

    const city=document.querySelector("#inputValue").value.trim();
    let userInfoWeather=document.querySelector(".user-info-weather");

    const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    let data= await response.json();
    console.log(data);
   if(data.cod==200){
    updateWeatherUI(data);
    // display weather 
    userInfoWeather.classList.add("active");
   }
   else{
        alert("wrong city name");
        userInfoWeather.classList.remove("active");

   }
    

     
   
        
}