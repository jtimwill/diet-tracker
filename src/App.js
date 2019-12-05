import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import NavBar from './components/navBar';
import Footer from './components/footer';
import HomePage from './components/homePage';
import ProtectedRoute from './components/protectedRoute';
import NotFound from './components/notFound';
import Login from './components/login';
import Logout from './components/logout';
import UserIndex from './components/users/userIndex';
import UserNew from './components/users/userNew';
import UserEdit from './components/users/userEdit';
import UserShow from './components/users/userShow';
import DietIndex from './components/diets/dietIndex';
import DietNew from './components/diets/dietNew';
import DietEdit from './components/diets/dietEdit';
import IngredientIndex from './components/ingredients/ingredientIndex';
import IngredientNew from './components/ingredients/ingredientNew';
import IngredientEdit from './components/ingredients/ingredientEdit';
import MealIngredientNew from './components/meal_ingredients/mealIngredientNew';
import MealIngredientEdit from './components/meal_ingredients/mealIngredientEdit';
import MealIndex from './components/meals/mealIndex';
import MealNew from './components/meals/mealNew';
import MealEdit from './components/meals/mealEdit';
import MealShow from './components/meals/mealShow';


class App extends Component {
  render() {
    return (
      <div className="custom-base-container">
        <NavBar className="custom-navbar"/>
        <main className="custom-container">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute
              path="/users/index"
              component={UserIndex}
              redirect_path="/users/me/show"
              admin_required={true}
            />
            <Route path="/users/new" component={UserNew} />
            <ProtectedRoute
              path="/users/me/edit"
              component={UserEdit}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/users/me/show"
              component={UserShow}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/diets/index"
              component={DietIndex}
              redirect_path="/login"
              admin_required={false}
            />
            <ProtectedRoute
              path="/diets/new"
              component={DietNew}
              redirect_path="/diets/index"
              admin_required={true}
            />
            <ProtectedRoute
              path="/diets/:id/edit"
              component={DietEdit}
              redirect_path="/diets/index"
              admin_required={true}
            />
            <ProtectedRoute
              path="/ingredients/index"
              component={IngredientIndex}
              redirect_path="/login"
              admin_required={false}
            />
            <ProtectedRoute
              path="/ingredients/new"
              component={IngredientNew}
              redirect_path="/ingredients/index"
              admin_required={true}
            />
            <ProtectedRoute
              path="/ingredients/:id/edit"
              component={IngredientEdit}
              redirect_path="/ingredients/index"
              admin_required={true}
            />
            <ProtectedRoute
              path="/meals/:mealId/meal-ingredients/:id/edit"
              component={MealIngredientEdit}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/meals/:mealId/meal-ingredients"
              component={MealIngredientNew}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/meals/index"
              component={MealIndex}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/meals/new"
              component={MealNew}
              redirect_path="/meals/index"
            />
            <ProtectedRoute
              path="/meals/:id/edit"
              component={MealEdit}
              redirect_path="/meals/index"
            />
            <ProtectedRoute
              path="/meals/:id/show"
              component={MealShow}
              redirect_path="/meals/index"
            />
            <Route path="/not-found" component={NotFound} />;
            <Route path="/" component={HomePage} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
