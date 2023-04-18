// Define variables
var cocktailImg = document.getElementById('cocktail-img');
var cocktailName = document.getElementById('cocktail-name');
var cocktailDesc = document.getElementById('cocktail-desc');
var cocktailIngredients = document.getElementById('cocktail-ingredients');
var prevButton = document.getElementById('prev-button');
var nextButton = document.getElementById('next-button');

//create the img container that will hold the generated img
var imgContainer = document.createElement('div');
imgContainer.setAttribute('id', 'img-container');
cocktailImg.appendChild(imgContainer);


// Define event listeners for buttons
// create the button elements
var prevButton = document.createElement('button');
var nextButton = document.createElement('button');

prevButton.addEventListener('click', getPreviousCocktail);
nextButton.addEventListener('click', getNextCocktail);

// Call the function to get a random cocktail when the page loads
getRandomCocktail();

// Define function to get a random cocktail
async function getRandomCocktail() {
  try {
    // Make request to the API to get a random cocktail
    const cocktailResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const cocktailData = await cocktailResponse.json();
    
    // Update the HTML with the cocktail name, description, and ingredients
    cocktailName.innerHTML = cocktailData.drinks[0].strDrink;
    cocktailDesc.innerHTML = cocktailData.drinks[0].strInstructions;
    cocktailIngredients.innerHTML = '<ul>' + getIngredientsList(cocktailData.drinks[0]) + '</ul>';
    console.log(cocktailData);
    
    // Get a random image from the Unsplash API
    //declare the api key variable
    // Get an image from the Unsplash API with the query parameter set to the title of the cocktail
    const query = cocktailData.drinks[0].strDrink;
    const imageResponse = await fetch('https://api.unsplash.com/photos/random?query=cocktail ' + query + '&client_id=sT0es0ihMsCnFqKB9kCCqrBXmz-xhh0Xo5i3LgdWLYU');
    const imageData = await imageResponse.json()
    console.log(imageData);
    
    // Update the HTML with the cocktail image
    cocktailImg.setAttribute('src', imageData.urls.regular);
  } catch (error) {
    console.log(error);
  }
}

// Define function to get the previous cocktail
async function getPreviousCocktail() {
  // Make a request to the API to get the previous cocktail
  // Update the HTML with the new cocktail data
}

// Define function to get the next cocktail
async function getNextCocktail() {
  // Make a request to the API to get the next cocktail
  // Update the HTML with the new cocktail data
}

// Define function to get a list of ingredients for a cocktail
function getIngredientsList(cocktail) {
  let ingredientsList = '';
  for (let i = 1; i <= 15; i++) {
    if (cocktail['strIngredient' + i]) {
      ingredientsList += '<li>' + cocktail['strIngredient' + i] + ' - ' + cocktail['strMeasure' + i] + '</li>';
    } else {
      break;
    }
  }
  return ingredientsList;
}
