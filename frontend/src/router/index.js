import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';
import HomeView from '@/views/HomeView.vue';
import LoginPage from '@/views/LoginPage.vue';
import SignUpPage from '@/views/SignUpPage.vue';
import RecipeListPage from '@/views/RecipeListPage.vue';
import RecipeDetail from '@/views/RecipeDetail.vue';
import ProfilePage from '@/views/ProfilePage.vue';
import GroceriesView from '@/views/GroceriesListPage.vue';
import FavoriteListPage from '@/views/FavoriteListPage.vue';
import EditProfile from '@/views/EditProfile.vue';
import EditPassword from '@/views/EditPassword.vue';
import AdminDashboard from '@/views/AdminDashboard.vue';
import HelpPage from '../views/Help.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/signup',
    name: 'SignUpPage',
    component: SignUpPage
  },
  {
    path: '/recipes',
    name: 'RecipeListPage',
    component: RecipeListPage
  },
  {
    path: '/recipes/:id',
    name: 'RecipeDetail',
    component: RecipeDetail,
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: ProfilePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/groceries',
    name: 'Groceries',
    component: GroceriesView,
    meta: { requiresAuth: true }
  },
  {
    path: '/favorite',
    name: 'FavoriteListPage',
    component: FavoriteListPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit-profile',
    name: 'EditProfile',
    component: EditProfile,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit-password',
    name: 'EditPassword',
    component: EditPassword,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, isAdmin: true }
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
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  const userRole = store.getters.userRole;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'LoginPage' });
    } else if (to.matched.some(record => record.meta.isAdmin) && userRole !== 'ADMIN') {
      alert('Access denied. Admins only.'); // Tambahkan pesan peringatan
      next({ name: 'home' });
    } else {
      next();
    }
  } else if ((to.name === 'LoginPage' || to.name === 'SignUpPage') && isAuthenticated) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
