const url = `https://openapi.programming-hero.com/api/news/categories`
const loadApi = () => {
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
let trending = [];
const loadCetagoryNewsApi = (id, name) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`
  fetch(url)
    .then(res => res.json())
    .then(data =>{
        trending =data.data;
      displayNews(data.data, name)
      })
    
      
}
const displayNews = (newss, name) => {
  const categoryLenth = document.getElementById('category-lenth');
  categoryLenth.innerText = newss.length;
  const categoryName = document.getElementById('category-name');
  categoryName.innerText = name;
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '';
  for (const news of newss) {
    const { image_url, title, details, author, total_view, _id} = news;
    const d = new Date(author.published_date);
    newsContainer.innerHTML += `
        <div class="card mb-3 mt-3">
                <div class="row g-0 justify-content-center">
                  <div class="col-md-4">
                    <img height="300px" src="${image_url}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8 d-flex flex-column">
                    <div class="card-body">
                      <h5 class="card-title">${title}</h5>
                      <p class="card-text">${details.slice(0, 200)}...</p>
                    </div>
                    <div class="card-footer p-0 d-flex justify-content-between">
                    <div class="d-flex align-items-center gap-3 ms-3">
                    <img width="30px" height="30px" src="${author.img}" class="rounded-circle" alt="...">
                    <div>
                    <p class="m-0">${author.name ? author.name : "No author"}</p>
                    <p class="m-0">${d.toDateString()}</p>
                    </div>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                    <i class="fa fab-light fa-eye"></i>
                    <p class="m-0">${total_view ? total_view : "No view"}</p>
                    </div>
                    <div class="d-flex align-items-center">
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star"></i>
                    </div>
                    <div class="d-flex align-items-center m-3">
                    <!-- Button trigger modal -->
                    <button onclick="loadSingleApi('${_id}')" type="button" class="btn btn-primary rounded-circle" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <i class="fa-solid fa-arrow-right"></i>
                      </button>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
        `
  }
}
const loadSingleApi = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/${id}`)
  .then(res => res.json())
  .then(data => displayNewsInfoModel(data.data[0]))
}
const displayNewsInfoModel = (news) => {
  const { image_url, title, details, author, total_view, others_info  } = news;
  const d = new Date(author.published_date);
  const modalBody =document.getElementById('modal-body');
  modalBody.innerHTML = `
  <div class="card mb-3 mt-3">
                <div class="row g-0 justify-content-center">
                  <div class="col-md-12">
                    <img height="300px" src="${image_url}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-12 d-flex flex-column">
                    <div class="card-body">
                      <h5 class="card-title">${title}<span class="badge text-bg-warning">${others_info.is_trending ? "trending":""}</span></h5>
                      <p class="card-text">${details}</p>
                    </div>
                    <div class="card-footer p-0 d-flex justify-content-between">
                    <div class="d-flex align-items-center gap-3 ms-3">
                    <img width="30px" height="30px" src="${author.img}" class="rounded-circle" alt="...">
                    <div>
                    <p class="m-0">$${author.name ? author.name : "No author"}</p>
                    <p class="m-0">${d.toDateString()}</p>
                    </div>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                    <i class="fa fab-light fa-eye"></i>
                    <p class="m-0">${total_view ? total_view : "No view"}</p>
                    </div>
                    <div class="d-flex align-items-center">
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star"></i>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
  `
}
const showTrending = () => {
  let trendingNews = trending.filter(news => news.others_info.is_trending === true);
  const categoryName = document.getElementById('category-name').innerText;
  displayNews(trendingNews, categoryName)
}
const TodayPick = () => {
  let trendingNews = trending.filter(news => news.others_info.is_todays_pick=== true);
  const categoryName = document.getElementById('category-name').innerText;
  displayNews(trendingNews, categoryName)
  console.log(trendingNews)
}
loadCetagoryNewsApi('01', 'Breaking News')
loadApi()