function ShowHelloMessage() {
    var name = document.getElementById("myname");
    document.getElementById("hellomessage").innerHTML = "Hello, " + name.value;
}

document.getElementById("mybutton").onclick = ShowHelloMessage;

let parsedData = [];

const fileUrl = '/Database/Data.csv'

Papa.parse(fileUrl, {
    download: true,
    header: true,
    complete: function(results) {
        parsedData = results.data;
        console.log("CSV data loaded and stored.");
    },
    error: function(err, file) {
        console.error("Error parsing file:", err);
    }
});

const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');

searchButton.addEventListener('click', function() {
    const query = searchBar.value.toLowerCase();

    searchResults.textContent = "";

    if (!query) {
        searchResults.textContent = "Please enter a search term";
        return;
    }

    const filterdResults = parsedData.filter(item => {
        for (const key in item) {
            const value = String(item[key]).toLowerCase();
            if (value.includes(query)) {
                return true;
            }
        }
    });

    if (filterdResults.length > 0) {
        searchResults.textContent = JSON.stringify(filterdResults, null, 2);
    } else {
        searchResults.textContent = "No matching result found.";
    }
});