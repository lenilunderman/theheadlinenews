require('dotenv').config();
const testkey = process.env.API_KEY;

const postContainer = document.getElementById('article-class')
const loader = document.querySelector('.lds-ellipsis')
const filter = document.getElementById('search')

//const proxyurl = "https://cors-anywhere.herokuapp.com/";
const API_KEY2 = '360ceee9e5eeb957b4a961455e0c3563'

let page_size = 5
let page = 1

// create the function to grab the data from the api
async function getAllPosts() {
  // fetch the data from the api and put inside a promise
  const fetchAPI = await fetch(`https://gnews.io/api/v4/top-headlines?token=${testkey}&lang=en`)

  // transform the data in json
  const apiJson = fetchAPI.json()
  // return the data
  return apiJson
}

// create the function to display the information on the screen media pt-4 article
function viewAllPosts(){
  // create a function that grab the information from the function as promise " take some time to resolve"
  const allPosts = getAllPosts()
  // resolve the promise with '.then'
    .then(data => data.articles.map( post => {
      
      // the html stuff goes here...
      //let  = new Date(post.publishedAt)
      const postEl = document.createElement('article')
      postEl.classList.add('article')
      postEl.classList.add('box')
      postEl.innerHTML = `
      <div class="media-content px-4 pb-4">
      <div class="content">
        <p class="title-post">
          <strong><a href="${post.url}" target="_blank"> ${post.title} </a> </strong>
          <br>
        </p>
        <p class="title-description"> ${post.description} </p>
        <p class="has-text-right has-date-color">
          <small class=""> ${new Date(post.publishedAt).toDateString()}</small>
        </p>
      </div>
      </div>
      
      `
      // append the information inside the node and display on the screen.
      postContainer.appendChild(postEl)
    }))

}

function showLoadingPage(){
  // make the loader visiable
  loader.classList.add('show')
  // set a time to make it invisiable again and load more news.
  setTimeout(() => {
    //make it invisible
    loader.classList.remove('show')
    setTimeout(() => {
      // display more pages
      // page++ 
      viewAllPosts()

    }, 400);
    
  }, 1000);
  
}

function searchPost(e){
  const term = e.target.value.toUpperCase()
  const posts = document.querySelectorAll('.box')
  // console.log('term', term);
  // loop the posts.
  posts.forEach( post => {
    const title = post.querySelector('.title-post').innerText.toUpperCase();
    const body = post.querySelector('.title-description').innerText.toUpperCase();
    // check the terms and if they are the same match it
    if(title.indexOf(term) > -1 || body.indexOf(term) > -1){
      post.style.display = 'flex';
    }
    else{
      // hide the post
      post.style.display = 'none';
    }
  }) 
}

// Adding the scrolling effect.
window.addEventListener('scroll', () => {
  // destructor javascripts 
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if(scrollTop + clientHeight >= scrollHeight - 5){
    // show the loader ...
    showLoadingPage()
  }

})

viewAllPosts()

// add event listening for the input search bar with the function as a callback.
filter.addEventListener('input', searchPost);