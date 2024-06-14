import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RecipeList from '../views/RecipeListPage.vue'
import RecipeDetail from '../views/RecipeDetail.vue'
import FavoritePage from '../views/Favorite.vue'
import MealPlanning from '../views/Meal.vue'
import LoginPage from '../views/LoginPage.vue'
import SignUp from '../views/SignUpPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import EditProfile from '../views/EditProfile.vue'
import EditPassword from '../views/EditPassword.vue'
import AboutUs from '../views/AboutUs.vue'
import HelpPage from '../views/Help.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/RecipeList',
    name: 'RecipeList',
    component: RecipeList
  },

  {
    path: '/RecipeDetail',
    name: 'RecipeDetail',
    component: RecipeDetail
  },

  {
    path: '/FavoritePage',
    name: 'FavoritePage',
    component: FavoritePage
  },

  {
    path: '/MealPlanning',
    name: 'MealPlanning',
    component: MealPlanning
  },

  {
    path: '/LoginPage',
    name: 'LoginPage',
    component: LoginPage,
    meta: { requiresGuest: true }
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp,
    meta: { requiresGuest: true }
  },
  {
    path: '/ProfilePage',
    name: 'ProfilePage',
    component: ProfilePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/EditProfile',
    name: 'EditProfile',
    component: EditProfile,
    meta: { requiresAuth: true }
  },
  {
    path: '/EditPassword',
    name: 'EditPassword',
    component: EditPassword,
    meta: { requiresAuth: true }
  },
  {
    path: '/AboutUs',
    name: 'AboutUs',
    component: AboutUs
  },
  {
    path: '/Help',
    name: 'Help',
    component: HelpPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
  
  if (to.matched.some(record => record.meta.requiresGuest) && isAuthenticated) {
    next({ name: 'home' });
  } else if ((to.name === 'LoginPage' || to.name === 'SignUp') && isAuthenticated) {
    next({ name: 'home' });
  } else if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'LoginPage' });
  } else {
    next();
  }
});

export default router
