const apiKey = '5Aw81MIiZSUT4S74tS2DrZ5HAkApQHu0biwJ7key';


function getImageOfTheDay(date) {
    const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const currentImageContainer = document.getElementById('current-image-container');
            currentImageContainer.innerHTML = `
                <img src="${data.url}" alt="${data.title}" class=
                "image"/>
                <h2 class="explanation">${data.title}</h2>
                <p class="explanation">${data.explanation}</p>
            `;
            
            
            saveSearch(date);
            addSearchToHistory(date);
        })
        .catch(error => console.error('Error:', error));
}


function saveSearch(date) {
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches));
}


function addSearchToHistory(date) {
    const searchHistory = document.getElementById('search-history');
    const listItem = document.createElement('li');
    listItem.textContent = date;
    listItem.addEventListener('click', () => {
        getImageOfTheDay(date);
    });
    searchHistory.appendChild(listItem);
}


function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}


function getCurrentImageOfTheDay() {
    const currentDate = getCurrentDate();
    getImageOfTheDay(currentDate);
}


const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const searchInput = document.getElementById('search-input');
    const selectedDate = searchInput.value;
    getImageOfTheDay(selectedDate);
});


getCurrentImageOfTheDay();






// {
//     "date": "2023-09-03",
//     "explanation": "Periodic comet 73P/Schwassmann-Wachmann 3 has broken up at least     twice. A cosmic souffle of ice and dust left over from the early solar system, this comet was first seen to split into several large pieces during the close-in part of its orbit in 1995.  However, in the 2006 passage, it disintegrated into dozens of fragments that stretched several degrees across the sky. Since comets are relatively fragile, stresses from heat, gravity and outgassing, for example, could be responsible for their tendency to break up in such a spectacular fashion when they near the hot Sun. The Hubble Space Telescope recorded, in 2006, the featured sharp view of prolific Fragment B, itself trailing a multitude of smaller pieces, each with its own cometary coma and tail. The picture spans over 3,000 kilometers at the comet's distance of 32 million kilometers from planet Earth.",
//     "hdurl": "https://apod.nasa.gov/apod/image/2309/fragb73p_hst_960.jpg",
//     "media_type": "image",
//     "service_version": "v1",
//     "title": "Comet Schwassmann-Wachmann 3 Fragments",
//     "url": "https://apod.nasa.gov/apod/image/2309/fragb73p_hst_960.jpg"
// }