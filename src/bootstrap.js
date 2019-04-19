import { auth, store, showSnackbar, i18next } from '@things-factory/shell'

export default function bootstrap() {
  function onProfile(profile) {}

  function onAuthentication() {
    store.dispatch(
      showSnackbar(
        i18next.t('text.you.are.now.in', {
          state: {
            text: i18next.t(auth.authenticated ? 'text.signed in' : 'text.signed out')
          }
        })
      )
    )
  }

  function onError(e) {
    store.dispatch(showSnackbar(e))
  }

  auth.on('profile', onProfile)
  auth.on('signin', onAuthentication)
  auth.on('signout', onAuthentication)
  auth.on('error', onError)
}
