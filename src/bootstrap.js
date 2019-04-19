import { auth, store, showSnackbar, i18next } from '@things-factory/shell'

export default function bootstrap() {
  function onProfile(profile) {}

  function onAuthentication(on) {
    store.dispatch(
      showSnackbar(
        i18next.t('text.you.are.now.in', {
          state: {
            text: i18next.t(on ? 'text.signed in' : 'text.signed out')
          }
        })
      )
    )
  }

  function onError(e) {
    store.dispatch(showSnackbar(e))
  }

  auth.on('profile', onProfile)
  auth.on('signin', () => {
    onAuthentication(true)
  })
  auth.on('signout', () => {
    onAuthentication(false)
  })
  auth.on('error', onError)
}
