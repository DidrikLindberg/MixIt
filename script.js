document.addEventListener('DOMContentLoaded', async function() {
  // Define variables
  var cocktailImg = document.getElementById('cocktail-img');


// define nextButton variable
var nextButton = document.getElementById('next-button');


// add event listener to the next cocktail button
nextButton.addEventListener('click', async function() {
  await getRandomCocktail();
});

  // Call the function to get a random cocktail when the page loads
  await getRandomCocktail();



  // Define function to get a random cocktail
  async function getRandomCocktail() {
    try {
      // Make request to the API to get a random cocktail
      const cocktailResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const cocktailData = await cocktailResponse.json();

      // Get the cocktail name and update the HTML
      const cocktailName = cocktailData.drinks[0].strDrink;
      document.getElementById('cocktail-name').innerHTML = cocktailName;

      // Get the cocktail description and update the HTML
      const cocktailDesc = cocktailData.drinks[0].strInstructions;
      document.getElementById('cocktail-desc').innerHTML = cocktailDesc;

      // Get the cocktail ingredients and update the HTML
      const ingredients = getIngredientsList(cocktailData);
      document.getElementById('cocktail-ingredients').innerHTML = '<ul>' + ingredients + '</ul>';

      // Get the cocktail image and update the HTML
      const cocktailImgUrl = cocktailData.drinks[0].strDrinkThumb;
      cocktailImg.setAttribute('src', cocktailImgUrl);

    } catch (error) {
      console.log(error);
    }
  }

  
  // Define function to get a list of ingredients for a cocktail
  function getIngredientsList(data) {
    let ingredientsList = '';
    for (let i = 1; i <= 15; i++) {
      const ingredient = data.drinks[0]['strIngredient' + i];
      const measure = data.drinks[0]['strMeasure' + i];
      if (ingredient && measure) {
        ingredientsList += '<li>' + measure + ' ' + ingredient + '</li>';
      } else if (ingredient) {
        ingredientsList += '<li>' + ingredient + '</li>';
      } else {
        break;
      }
    }
    return ingredientsList;
  }
});
