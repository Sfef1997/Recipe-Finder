

// Select the elements 
let searchBtn= document.querySelector(".search-btn")
let searchInput = document.querySelector(".search-input")
let recipBox = document.querySelector(".recip-box")
let mealItem = document.querySelector(".meal-item");
let container = document.querySelector(".container")

// Event listener for search button
searchBtn.addEventListener("click",getMealList);

function getMealList(){
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${(searchInput.value)}`)
    .then(response=> response.json())
    .then((data)=>{
        let content = ""
        if(data.meals){
            data.meals.forEach((meal)=>{
                 content += `
                <div class="meal-item  col d-flex text-center align-item-center flex-column p-1 gap-3 shadow p-3 mb-5 bg-body-tertiary rounded" data-id="${meal.idMeal}">
                    <div class="meal-img">
                      <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="" class="rounded">
                    </div>
                    </div>
                <div class="meal-name">
                        <h6> ${meal.strMeal}</h6>
                        <button class="recipe-btn rounded ">Get Recipe</button>
                    </div>
                </div>
                `
            })
            recipBox.innerHTML = content ;     
            let recipBtns = document.querySelectorAll(".recipe-btn")
                recipBtns.forEach((e)=>{
                    e.addEventListener("click",getMealRecipe)
                })
        }else{
            // if The Input unvalid
            let div = document.createElement("div")
            div.classList.add("show")
            div.innerHTML = `<h2>No Meal Found</h2>`
            recipBox.innerHTML = ""
            recipBox.appendChild(div)
        }    
    });
};


function getMealRecipe(e){
        let mealItem = e.target.parentElement.parentElement
        let mealId = mealItem.getAttribute("data-id")
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then((response => response.json() ))
        .then((data)=>{
            let mealInfo =data.meals[0]
            let recipeContent = `
                 <div class=" col d-flex text-center align-items-center flex-column p-1">
                 <div class="close-icon"> </div>
                 <h5 class="recip-title ">${mealInfo.strMeal} </h5>
                 <p class="recip-catagory m-0 ">${mealInfo.strCategory} </p>
                <div class="meal-name">
                        <h4> Instrouctions : </h4>
                        <p class = "p-1"> ${mealInfo.strInstructions}</p>
                    </div>
                       <div class="meal-img">
                        <img src="${mealInfo.strMealThumb}" alt="" class="rounded">
                    </div>
                </div>
            `
            let mainDiv = document.createElement("div");
            container.appendChild(mainDiv);
            mainDiv.className = "main";
            mainDiv.innerHTML = recipeContent;
            mainDiv.classList.add("show");
            let closeBtn = document.querySelector(".close-icon");
            closeBtn.addEventListener("click", () => {
                mainDiv.remove();
      });
    });
}


