const apikey = '023a1219abf541e68e575563d0404e40';

const blogContainer = document.getElementById("blog-Container");
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Function to fetch random top news
async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news:", error);
        return [];
    }
}

// Event listener for the search button
searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    
    if (query !== "") {
        try {
            blogContainer.innerHTML = "<p>Searching...</p>";

            const articles = await fetchNewsQuery(query);

            if (articles.length > 0) {
                displayBlogs(articles);
            } else {
                blogContainer.innerHTML = "<p>No articles found for your search.</p>";
            }
        } catch (error) {
            console.log("Error fetching news by query:", error);
            blogContainer.innerHTML = "<p>Error fetching news. Please try again later.</p>";
        }
    } else {
        alert("Please enter a search term.");
    }
});

// Function to fetch news based on search query
async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news query:", error);
        return [];
    }
}

// Function to display the blogs in the DOM
function displayBlogs(articles) {
    blogContainer.innerHTML = ""; // Clear previous results
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        // Create and set image with fallback if missing
        const img = document.createElement("img");
        img.src = article.urlToImage ? article.urlToImage : 'fallback-image.jpg'; // Use a fallback image if none
        img.alt = article.title;

        // Create and set title
        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "..." : article.title;
        title.textContent = truncatedTitle;

        // Create and set description
        const description = document.createElement("p");
        const truncatedDescription = article.description && article.description.length > 120 ? article.description.slice(0, 120) + "..." : article.description;
        description.textContent = truncatedDescription ? truncatedDescription : "No description available.";

        // Append elements to blog card
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);

        // Add click event to open the article in a new tab
        blogCard.addEventListener('click', () => {
            window.open(article.url, "_blank");
        });

        // Append blog card to the container
        blogContainer.appendChild(blogCard);
    });
}

// Initial fetch to load random news
(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news:", error);
    }
})();
