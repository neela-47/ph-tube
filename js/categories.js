console.log('file added')

function getTimeString(time){
    const hour = parseInt(time/3600);
    let remindSecond = time % 3600;
    const minute = parseInt(remindSecond/60);
    remindSecond = remindSecond % 60;
    return `${hour} hr ${minute} min ${remindSecond} sec`;
};


// categories
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())
    .then (data => displayCategories(data.categories))
    .catch(error => console.log(error))
}
const displayCategories = (categories) => {
    console.log( categories);
    const categoryContainer = document.getElementById('categories-container')
    categories.forEach((item) => {
        console.log(item);
     
        const buttonContainer =document.createElement("div");
        buttonContainer.innerHTML =
        `
        <button onclick= "loadCategoryVideo(${item.category_id})" class = "btn">${item.category}</button>
        `
        categoryContainer.append(buttonContainer)
    }) 
   
}
loadCategories();


const loadCategoryVideo = (id) =>{
    fetch( `https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then (data => displayVideos(data.category))
    .catch(error => console.log(error))
}

// videos

const loadVideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res => res.json())
    .then (data => displayVideos(data.videos))
    .catch(error => console.log(error))
}
const displayVideos = (videos) =>{
    console.log(videos);
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML= "";

    if(videos.length==0)
    {
        videoContainer.classList.remove("grid");
        videoContainer.innerHTML=`
        <div class="h-[300px] flex flex-col justify-center items-center">
        <img src="../assets/Icon.png">
        <p class="font-bold text-2xl">No Content Here!!</p>
        </div>
        `;
        return;
    }
    else{
        videoContainer.classList.add("grid")
    }

    videos.forEach((item) => {
        console.log(item)
     const card = document.createElement('div');
     card.classList="card card-compact ";
     card.innerHTML=`
     <figure class=" h-[200px] relative">
    <img class="w-full h-full object-cover" src=${item.thumbnail}>
    ${item.others.posted_date?.length ==0? "" : `<span class="absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1"> ${getTimeString(item.others.posted_date)}</span>`}
    
  </figure>
  <div class="py-2 flex gap-2 items-center">
    <div>
   <img class="w-7 h-7 rounded-full" src="${item.authors[0].profile_picture}">
    </div>
    <div >
    <h2 class="font-bold">${item.title}</h2>
    
    <div class="flex gap-2 items-center">
    <p>${item.authors[0].profile_name}</p>
    ${item.authors[0].verified === true? '<img class="w-6" src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000">' : ''}
    </div>
    </div>
  </div>
     `  
     videoContainer.append(card)
    })
}
loadVideos ();