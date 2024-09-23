const apikey ='023a1219abf541e68e575563d0404e40'


const blogContainer=document.getElementById("blog-Container");

const searchField = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')


async function fetchRandomNews(){
    try{
const apiUrl=`https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}&pageSize=10&apikey=${apikey}`;
const responce = await fetch(apiUrl)
const data = await responce.json();
return data.articles;

    }
    catch(error){

    }console.error("Error Fetching random news",error)
    return[]
}

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
            console.log("Error Fetching News by query", error);
           
            blogContainer.innerHTML = "<p>Error fetching news. Please try again later.</p>";
        }
    } else {
       
        alert("Please enter a search term.");
    }
});


async function fetchNewsQuery(query){
    const apiUrl=`https://newsapi.org/v2/everything?q=${query}`;
    const responce = await fetch(apiUrl)
    const data = await responce.json();
    return data.articles;
    
}


function displayBlogs(articles){
    blogContainer.innerHTML=""
    articles.forEach((article)=>{
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        const truncatedTitle = article.title.length >30? article.title.slice(0,30) + "......": article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        const truncatedDes = article.description.length >120? article.description.slice(0,120) + "......": article.description;
        title.textContent = truncatedDes;

        description.textContent=article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click', ()=>{
            window.open(article.url,"_blank")
        })
        blogContainer.appendChild(blogCard);

    });
}


(async () =>{
    try{
        const articles = await fetchRandomNews();
displayBlogs(articles)   
 }
    catch(error){
        console.error("Error fetching random news",error);
    }
})();