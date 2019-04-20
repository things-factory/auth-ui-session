import route from './src/route'
import bootstrap from './src/bootstrap'

export default {
  route,
  routes: [
    {
      tagname: 'auth-signup',
      page: 'signup'
    },
    {
      tagname: 'auth-signin',
      page: 'signin'
    },
    {
      tagname: 'auth-profile',
      page: 'profile'
    }
  ],
  bootstrap
}
