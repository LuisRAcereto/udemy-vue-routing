// Below is import needed to enable routing in VueJS app.
// before run in shell: npm install --save vue-router
import { createRouter, createWebHistory } from 'vue-router';

// Need to import the components that are going to be called by the router
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import UsersFooter from './components/users/UsersFooter.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import NotFound from './components/nav/NotFound.vue';

const router = createRouter({
  // below is setting router to use the built-in browser history support
  history: createWebHistory(),
  routes: [
    // We can use the option to redirect to go to a different path
    { path: '/', redirect: '/teams' },
    // our-domain.com/teams => TeamsList
    // an alternative to redirect is using alias, but that will keep the URL
    // the same how it was entered in the URL
    // { path: '/teams', component: TeamsList, alias: '/' },
    {
      name: 'teams',
      path: '/teams',
      // meta can store any information that can be later accessed using something like
      // to.meta.needsAuth.
      // meta: { needsAuth: true },
      components: { default: TeamsList, footer: TeamsFooter },
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true,
        },
      ],
    },
    // our-domain.com/users => UsersList
    {
      path: '/users',
      components: { default: UsersList, footer: UsersFooter },
      beforeEnter(to, from, next) {
        console.log('users beforeEnter');
        console.log(to, from);
        next();
      },
    },
    // Router will pick the first result that matches.
    // example below would go first if needed otherwise it will
    // considered dynamic content :teamId
    // { path: '/teams/new, component: UsersList },
    { path: '/:notFound(.*)', component: NotFound },
  ],
  linkActiveClass: 'active',
  scrollBehavior(_, _2, savedPosition) {
    // console.log(to, from, savedPosition);
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  },
});

router.beforeEach(function (to, from, next) {
  console.log('Global beforeEach');
  console.log(to, from);
  // with next without arguments we allow navigation.
  // passed with falso to prevent navigation.
  // we can pass a string with path we want the app to navigate.
  // we can use an object specifying the route.
  next();
});

// This runs after navigation was confirmed, so it cannot change it.
router.afterEach(function (to, from) {
  // sending analytics data
  console.log('Globa afterEach');
  console.log(to, from);
});

export default router;
