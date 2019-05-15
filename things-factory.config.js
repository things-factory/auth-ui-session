import route from './client/route'
import bootstrap from './client/bootstrap'

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
