const url = `https://openapi.programming-hero.com/api/news/categories`
const loadApi =() => {
fetch(url)
.then(res => res.json())
.then(data => displayCatagory(data.data.news_category))
}
const displayCatagory = (cetagory) => {
    const cetagoryContainer = document.getElementById('cetagory-container');
    cetagory.forEach(cetagory => {
        cetagoryContainer.innerHTML += `<a onclick="loadCetagoryNewsApi('${cetagory.category_id}', '${cetagory.category_name}')" class="text-decoration-none fw-bold" href="#">${cetagory.category_name}</a>`
    });
}
const loadCetagoryNewsApi = (id, name) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data, name))
}
const displayNews = (newss, name) => {
    const categoryLenth =document.getElementById('category-lenth');
    categoryLenth.innerText = newss.length;
    const categoryName =document.getElementById('category-name');
    categoryName.innerText = name;
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    for(const news of newss){
        newsContainer.innerHTML += `
        <div class="card mb-3 mt-3">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                    </div>
                  </div>
                </div>
              </div>
        `
    }

}
loadCetagoryNewsApi('01', 'Breaking News')
loadApi()