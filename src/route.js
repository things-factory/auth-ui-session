export default function route(page) {
  switch (page) {
    case 'signup':
      import('./pages/signup.js')
      return true

    case 'signin':
      import('./pages/signin.js')
      return true

    case 'profile':
      import('./pages/profile.js')
      return true
  }
}
