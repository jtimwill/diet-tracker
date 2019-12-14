# DietTracker

## Project Description
This is a simple user interface for my Diet API project. The structure of
this project is based on what I learned in the following course: https://codewithmosh.com/p/mastering-react

 The basic technology stack is:
* React (UI Library)
* Bootstrap (front-end component library)
* Joi-browser (user-input validation)
* React-router-dom (routing)

Additional resources that helped me:
* https://stackoverflow.com/questions/10123953/sort-javascript-object-array-by-date
* https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
* https://www.learnenough.com/css-and-layout-tutorial
* https://reacttraining.com/react-router/web/example/auth-workflow
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
* https://www.w3schools.com/howto/howto_css_loader.asp
* https://stackoverflow.com/questions/8549529/what-is-the-difference-between-screen-and-only-screen-in-media-queries
* https://www.learnenough.com/css-and-layout-tutorial?single_page=1#sec-details-mobile-dropdown
* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions#Defining_transitions
* https://www.w3schools.com/jsref/met_win_confirm.asp
* https://gist.github.com/primaryobjects/aacf6fa49823afb2f6ff065790a5b402
* https://reacttraining.com/react-router/web/example/query-parameters
* https://github.com/jerairrest/react-chartjs-2
* https://stackoverflow.com/questions/44154939/load-local-images-in-react-js


## Project Setup
1. Install Node.js: https://nodejs.org/
2. Download project files
3. ``` $ cd diet-tracker ``` # navigate to the project's root directory
4. ``` $ npm i ``` # install the packages listed in package.json
5. ``` $ npm start ``` # start server
6. Done. If you have also set up the corresponding Diet API project, you can navigate to http://localhost:3000/ to test the full project.

## Routes and Components
### Login/Logout
|URL|Corresponding Component|
|---|---|
/login|Login|
/logout|Logout|

### Users Resource
|URL|Corresponding Component|
|---|---|
/users/index|UserIndex|
/users/new|UserNew|
/users/me/edit|UserEdit|
/users/me/show|UserShow|

### Diets Resource
|URL|Corresponding Component|
|---|---|
/diets/index|DietIndex|
/diets/new|DietNew|
/diets/:id/edit|DietEdit|

### Ingredients Resource
|URL|Corresponding Component|
|---|---|
/ingredients/index|IngredientIndex|
/ingredients/new|IngredientNew|
/ingredients/:id/edit|IngredientEdit|

### Meal Ingredient Resource
|URL|Corresponding Component|
|---|---|
/meals/:mealId/meal-ingredients/:id/edit|MealIngredientEdit|
/meals/:mealId/meal-ingredients|MealIngredientNew|

### Meals Resource
|URL|Corresponding Component|
|---|---|
/meals/index|MealIndex|
/meals/new|MealNew|
/meals/:id/edit|MealEdit|
/meals/:id/show|MealShow|

### Misc Components
|URL|Corresponding Component|
|---|---|
/|HomePage|
/not-found|NotFound|
