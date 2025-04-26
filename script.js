const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");

const performSearch = () => {
    const searchTerm = searchBar.value;

    if (!searchTerm) {
        alert("Du måste ange någon text att söka efter!");
        return;
    }

    fetch(`http://83.253.85.183:8080/search?search_term="${encodeURIComponent(searchTerm)}"`)
        .then(response => response.json())
        .then(data => {
			// Clear previous results
            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = ""; 
			
			const matchesDiv = document.getElementById("matches");
			matchesDiv.innerHTML = "";

			const results_title = document.createElement("h2");
				results_title.textContent = `Motioner som innehåller \"${searchTerm}\"`;
				resultsDiv.appendChild(results_title);

            if (data.length === 0) {
                resultsDiv.innerHTML = "<p style='color:grey';><i>Hittar inga motioner som innehåller texten \""+searchTerm+"\"</i></p>";
            } else {
				
                const ul = document.createElement("ul");
                data.forEach(item => {
                    const li = document.createElement("li");
                    li.textContent = item;
					li.classList.add("clickable");
					
                    // Add click event listener for each result
                    li.addEventListener("click", () => {
                        fetchMatches(searchTerm, item);
                    });

					
                    ul.appendChild(li);
                });
                resultsDiv.appendChild(ul);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("Någonting gick fel...");
        });
};


const fetchMatches = (searchTerm, selectedResult) => {
    const matchesDiv = document.getElementById("matches");
	
	matchesDiv.innerHTML = "";
	/*
    // Add a title for the matches section if not already present
    if (!matchesDiv.querySelector("h2")) {
        const title = document.createElement("h2");
        title.textContent = "Matchande rader i motionen "+selectedResult;
        matchesDiv.appendChild(title);
    }*/
	
	 // Add a title for the matches section
    const title = document.createElement("h2");
    title.textContent = `Sökträffar i ${selectedResult}`;
    matchesDiv.appendChild(title);

    // Make the API call to fetch matches
    fetch(`http://83.253.85.183:8080/matches?search_term="${encodeURIComponent(searchTerm)}"&file="${encodeURIComponent(selectedResult)}"`)
        .then(response => response.json())
        .then(data => {
            const ul = document.createElement("ul");

            if (data.length === 0) {
                const noMatches = document.createElement("p");
                noMatches.textContent = `No matches found for "${selectedResult}".`;
                matchesDiv.appendChild(noMatches);
            } else {
                data.forEach(match => {
                    const li = document.createElement("li");
                    li.textContent = '"'+match+'"';
                    ul.appendChild(li);
                });
                matchesDiv.appendChild(ul);
            }
        })
        .catch(error => {
            console.error("Error fetching matches:", error);
            alert("Någonting gick fel...");
        });
};


// Add click event listener for the button
searchButton.addEventListener("click", performSearch);

// Add keypress event listener for the Enter key
searchBar.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        performSearch();
    }
});