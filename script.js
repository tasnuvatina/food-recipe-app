const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const allMenues =  document.getElementById("all-menues");
const ul = document.getElementById("ingredient-list");
let recipeImage = document.getElementById("recipe-image");
let recipeName = document.getElementById("recipe-name");
let ingredients = document.getElementById("ingredients");


//adding event handler to search menu by name
searchButton.addEventListener("click",()=>{
    allMenues.innerHTML="";
    let foodName = searchInput.value;
    getMenu(foodName);
})

//function to  get food name and image from api 
let getMenu= foodName=>{
    // console.log(foodName);
    let menuLink=`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`
    fetch(menuLink)
    .then(responce=>responce.json())
    .then(data=>{
        showMenu(data);
    })
}

//function to show all matched items in menu 
let showMenu= data =>{
    let menuItems =data.meals;
    menuItems.forEach(item => {
        // console.log(item.strIngredient1 );
        // console.log(item);
        // let bbb= strIngredient1+
        let mealName= item.strMeal;
        let menuImage =item.strMealThumb;
        let oneMenu=document.createElement("div");
        oneMenu.className="one-menu";
        var singleMenu=`<div class="image-menu-div">
                            <img class="image-menu" src="${menuImage}" alt="">
                        </div>
                        <div class="name-menu-div">
                            <h3 class="name-menu">${mealName}</h3>
                        </div>`

        oneMenu.innerHTML=singleMenu;
        allMenues.appendChild(oneMenu);

        //adding evend handler on specific menu to see the ingredients
        oneMenu.addEventListener("click",function(e){
            ul.innerHTML="";
            let menuLink=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`
            fetch(menuLink)
            .then(responce=>responce.json())
            .then(data=>{
                getImageAndHeader(data);
                getIngredientList(data);
            })
        })                 
    });      
}

//function to get image and header for specific(clicked) recipe
let getImageAndHeader=data =>{
    console.log(data.meals);
    recipeImage.src=data.meals[0].strMealThumb;
    recipeName.innerHTML=data.meals[0].strMeal;
    ingredients.innerText="Ingredients";
}

//function to get ingredients of specific(clicked) recipe and make a list
let getIngredientList= data =>{
    let mealObject = data.meals[0];
        // console.log(mealObject);

        let size = Object.keys(mealObject).length;
        for (let i = 1; i < size; i++) {
            let index=i+"";
            let newMeasure="strMeasure"+index;
            let newIngredient="strIngredient"+index;
            let eachIngredient=`${mealObject[newMeasure]} ${mealObject[newIngredient]}`;
            if(mealObject[newMeasure]!==""&& mealObject[newIngredient]!==""){
                 if ( eachIngredient!=="undefined undefined" && eachIngredient!==null) {
                    //  console.log(eachIngredient);
                     let li=document.createElement("li");
                     li.style.listStyle="none";
                     li.innerHTML=`<i class="fas fa-check-square"></i> ${eachIngredient}`;
                     
                     ul.appendChild(li);
                }
            }

        }
}