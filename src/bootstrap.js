import { store, showSnackbar, i18next } from '@things-factory/shell'

export default function bootstrap() {
  function onProfileChanged(e) {}

  function onAuthenticatedChanged(e) {
    var auth = e.detail
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

  function onAuthErrorChanged(e) {
    store.dispatch(showSnackbar(e.detail))
  }

  document.addEventListener('profile-changed', onProfileChanged)
  document.addEventListener('authenticated-changed', onAuthenticatedChanged)
  document.addEventListener('auth-error-changed', onAuthErrorChanged)
}
