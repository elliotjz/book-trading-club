import Layout from './components/Layout'
import Home from './components/Home'
import DashboardPage from './containers/DashboardPage'
import LoginPage from './containers/LoginPage'
import RegisterPage from './containers/RegisterPage'
import Auth from './modules/Auth';


const routes = {
  // base component (wrapper for the whole application).
  component: Layout,
  childRoutes: [

    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, DashboardPage);
        } else {
          callback(null, Home);
        }
      }
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/register',
      component: RegisterPage
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();

        // change the current URL to /
        replace('/');
      }
    }

  ]
};

export default routes;



