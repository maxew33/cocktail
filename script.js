window.onload = createPage

// création des variables const
// qs = raccourci de document.querySelector
const qs = document.querySelector.bind(document),
    cocktailLettersContainer = qs('.cocktail-letters-container'),
    cocktailListContainer = qs('.cocktail-list-container'),
    recipe = qs('.recipe'),
    exitCross = qs('.exit-cross'),
    cocktailTitle = qs('.cocktail-title'),
    cocktailImg = qs('.cocktail-img'),
    cocktailIngredients = qs('.cocktail-ingredients'),
    cocktailInstructions = qs('.cocktail-instructions'),
    alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

let previousList = 'default' //variable tampon contenant la liste des cocktails précédente (default = message d'accueil)

// création de la page d'accueil
function createPage(){
    for(let i = 0; i < alphabet.length; i++){      
        
      //création de l'index alphabétique et des listes associées
      const cocktailLetter = document.createElement('div'),
            cocktailList = document.createElement('ul')        
            
            // on commence par s'occuper de l'index alphabétique
            cocktailLetter.textContent = alphabet[i]
            cocktailLetter.dataset.id = alphabet[i]
            cocktailLetter.className = 'cocktail-letter'
      
            //evt quand on apppuie sur la lettre => chgt couleur de la case de la lettre + apparition de la liste
            cocktailLetter.addEventListener('click', () => {
                previousList != 'default' ? qs(`.cocktail-letter[data-id="${previousList}"]`).classList.toggle('pushed') : null
                qs(`.cocktail-letter[data-id="${alphabet[i]}"]`).classList.toggle('pushed')
                qs(`.cocktail-list[data-id="${previousList}"]`).classList.toggle('shown')
                qs(`.cocktail-list[data-id="${alphabet[i]}"]`).classList.toggle('shown')

                previousList = alphabet[i]
            })
      
            // on s'occupe des listes de cocktails
            cocktailList.className = 'cocktail-list'
            cocktailList.dataset.id = alphabet[i]
      
              fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f='+ alphabet[i]).then( response => {
                total = response.json().then( data => {
                  
                   // cas où il n'y a pas de cocktails associés à la lettre
                    if(!data.drinks){
                        qs(`.cocktail-letter[data-id="${alphabet[i]}"]`).remove()
                    }

                    else{            
                        for(let j = 0; j < data.drinks.length; j++){
                          // création du nouveau cocktail
                            const newCocktail = document.createElement('li')
                            newCocktail.textContent = data.drinks[j].strDrink
                            newCocktail.className = 'cocktail-name'
                            newCocktail.addEventListener('click', () => {handleClick(data.drinks[j])})
                          
                          // on ajoute le nouveau cocktail à la liste      
                            cocktailList.appendChild(newCocktail)
                        }
                    }
                })
            })
            
            // insertion de l'index alphabétique et des listes associées dans leurs containers respectifs.
            cocktailLettersContainer.appendChild(cocktailLetter)   
            cocktailListContainer.appendChild(cocktailList) 
    }    
}

// quand on clique sur le nom d'un cocktail, la recette apparait
function handleClick(cocktail){
 
    //création de la page recette
    cocktailTitle.textContent = cocktail.strDrink

    cocktailImg.src = cocktail.strDrinkThumb
    cocktailImg.alt = cocktail.strDrink

    cocktailInstructions.textContent = cocktail.strInstructions
  
    // on efface la liste d'ingrédients pouvant déjà être présente pour ensuit y mettre la nouvelle  => 2 solutions : 
    //cocktailIngredients.innerHTML = "" => plus lente
    while(cocktailIngredients.firstChild){ cocktailIngredients.removeChild(cocktailIngredients.firstChild)}

    // On récupère les valeurs de l'objet cocktail pour le parcourir comme un tableau
  const cocktailArray = Object.values(cocktail)
        
  // cocktailArray[i] : liste l'ingrédient / cocktailArray[j] : donne la qté associée  
  for(let i = 17, j = 32; i < 32; i++, j++){
    if(cocktailArray[i]){
      const newIngredient = document.createElement('li')
      cocktailArray[j] ? newIngredient.textContent = cocktailArray[i] + ' : ' + cocktailArray[j] : newIngredient.textContent = cocktailArray[i]
      cocktailIngredients.appendChild(newIngredient)
    }
  } 
  
   /*
   autre solution pour boucler sur les ingrédients et mesures :  
    const ingredients = [],
          measures = []          
    for (let [key, value] of Object.entries(cocktail)){
      /strIngredient/.test(key) ? value ? ingredients.push(value) : null : null;
      /strMeasure/.test(key) ? value ? measures.push(value) : null : null;
    }
    */
  
    // apparition de la page
    recipe.classList.toggle('appear')
}

// quand on clique sur la croix la page disparait, retour sur la page d'accueil
exitCross.addEventListener('click', () => {
    recipe.classList.toggle('appear')
})



/* partie à améliorer !! créer une boucle pour créer l'array ingredients et measure
    const ingredients = [cocktail.strIngredient1, cocktail.strIngredient2, cocktail.strIngredient3, cocktail.strIngredient4, cocktail.strIngredient5, cocktail.strIngredient6, cocktail.strIngredient7, cocktail.strIngredient8, cocktail.strIngredient9, cocktail.strIngredient10, cocktail.strIngredient11, cocktail.strIngredient12, cocktail.strIngredient13, cocktail.strIngredient14, cocktail.strIngredient15],
    measure = [cocktail.strMeasure1, cocktail.strMeasure2, cocktail.strMeasure3, cocktail.strMeasure4, cocktail.strMeasure5, cocktail.strMeasure6, cocktail.strMeasure7, cocktail.strMeasure8, cocktail.strMeasure9, cocktail.strMeasure10, cocktail.strMeasure11, cocktail.strMeasure12, cocktail.strMeasure13, cocktail.strMeasure14, cocktail.strMeasure15]
    
    for(let i = 0; i < 15; i++){
        if(ingredients[i]){
            const newIngredient = document.createElement('li')
            measure[i] ? newIngredient.textContent = ingredients[i] + ' : ' + measure[i] : newIngredient.textContent = ingredients[i]
            cocktailIngredients.appendChild(newIngredient)
        }
    }*/
