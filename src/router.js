import Vue from "vue";
import Router from "vue-router";
import Index from "./views/index.vue";
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";
import Goods from "./views/Goods.vue";
import CategoryList from "./views/CategoryList.vue";
import Cart from "./views/Cart.vue";
import Main from "./views/Main.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/main",
      name: "Main",
      component: Main,
      children: [
        {
          path: "/",
          name: "Index",
          component: Index
        },
        {
          path: "/categoryList",
          name: "CategoryList",
          component: CategoryList
        },
        {
          path: "/cart",
          name: "Cart",
          component: Cart
        }
      ]
    },

    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/goods",
      name: "Goods",
      component: Goods
    }

    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
