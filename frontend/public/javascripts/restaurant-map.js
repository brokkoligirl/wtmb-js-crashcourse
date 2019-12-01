
const mymap = 
    L.map('mapid').setView([restaurant.latitude, restaurant.longitude], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
        .addTo(mymap);

const marker = 
    L.marker([restaurant.latitude, restaurant.longitude]).addTo(mymap);

const popupText = `<b>${restaurant.formattedAddress.split(',')[0]}</b><br>
    ${restaurant.streetName} ${restaurant.streetNumber}, <br>
    ${restaurant.zipcode} ${restaurant.state}`

marker.bindPopup(popupText).openPopup();