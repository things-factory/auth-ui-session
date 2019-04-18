import route from './src/route'
import bootstrap from './src/bootstrap'

export default {
  route,
  routes: [
    {
      tagname: 'auth-signup',
      pageName: 'signup'
    },
    {
      tagname: 'auth-signin',
      pageName: 'signin'
    },
    {
      tagname: 'auth-profile',
      pageName: 'profile'
    }
  ],
  bootstrap
}
