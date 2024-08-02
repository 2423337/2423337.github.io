import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/Home.vue";
import ExamplePage from "../views/Example.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: HomePage,
	},
	{
		path: "/example",
		name: "Example",
		component: ExamplePage,
	},
];

const router = new VueRouter({
	routes,
});

export default router;
