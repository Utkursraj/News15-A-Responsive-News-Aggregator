async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.articles || []; // Return an empty array if articles is undefined
    } catch (error) {
        console.error("Error fetching random news", error);
        return []; // Ensure it returns an empty array on error
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    if (!articles || articles.length === 0) {
        blogContainer.innerHTML = "<p>No articles found.</p>"; // Handle no articles case
        return;
    }
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage || "default-image-url"; // Fallback to a default image
        img.alt = article.title;
        const title = document.createElement("h2");
        title.textContent = article.title.length > 30 ? article.title.slice(0, 30) + "..." : article.title;
        const description = document.createElement("p");
        description.textContent = article.description.length > 120 ? article.description.slice(0, 120) + "..." : article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click', () => {
            window.open(article.url, "_blank");
        });
        blogContainer.appendChild(blogCard);
    });
}
