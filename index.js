
const apiKey = 'bBT5mDiaS3VpyeH7rWGbhBFRa9VGpr1XZzxtjC77';
const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
const currentDate = new Date().toISOString().slice(0, 10);
function getCurrentImageOfTheDay() {
	const url = `https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${apiKey}`;

	fetch(url)
		.then(response => response.json())
		.then(data => {
			
			const currentImageContainer=document.getElementById('current-image-container');
            currentImageContainer.innerHTML=`
            <h1>NASA PICTURE OF THE DAY</h1>
            <img src="${data.url}" alt="${data.title}">
            <h3>${data.title}</h3>
            <p>${data.explanation}</p>
            `
		})
		.catch(error => console.error(error));
}

function getImageOfTheDay(date) {
	const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;

	fetch(url)
		.then(response => response.json())
		.then(data => {
			const currentImageContainer=document.getElementById('current-image-container');
            currentImageContainer.innerHTML=`
            <h1>NASA PICTURE OF THE DAY</h1>
            <img src="${data.url}" alt="${data.title}">
            <h3>${data.title}</h3>
            <p>${data.explanation}</p>
            `
			saveSearch(date);
			addSearchToHistory();
		})
		.catch(error => console.error(error));
}

function saveSearch(date) {
	searchHistory.push(date);
	localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

function addSearchToHistory() {
	const searchHistoryList = document.getElementById('search-history');
	searchHistoryList.innerHTML = '';
	searchHistory.forEach(search => {
		
        const li = document.createElement('li');
		const a=document.createElement('a');
        a.textContent=search;
        a.setAttribute('href',`? date=${search}`);
        li.appendChild(a);
        
		searchHistoryList.appendChild(li);
	});
    


	searchHistoryList.addEventListener('click', event => {
		if (event.target.tagName === 'A') {
			const date = event.target.textContent;
			window.location.href=`?date=${date}`;
            getImageOfTheDay(date);
			document.getElementById('current-image-container').innerHTML = '';
			document.getElementById('search-input').value = date;
		}
	});
}


getCurrentImageOfTheDay();

const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', event => {
	event.preventDefault();
	const date = document.getElementById('search-input').value;
	getImageOfTheDay(date);
	document.getElementById('current-image-container').innerHTML = '';
});