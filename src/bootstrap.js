import { html } from 'lit-html'
import { auth, store, showSnackbar, i18next, loadPage, APPEND_APP_TOOL, TOOL_POSITION } from '@things-factory/shell'
import { ADD_MORENDA } from '@things-factory/more-base'

import '@material/mwc-icon'

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

  /* add user app-tool */
  store.dispatch({
    type: APPEND_APP_TOOL,
    tool: {
      template: html`
        <mwc-icon @click=${e => store.dispatch(loadPage('profile'))}>account_circle</mwc-icon>
      `,
      position: TOOL_POSITION.RIGHT_END
    }
  })

  /* add user morenda */
  store.dispatch({
    type: ADD_MORENDA,
    morenda: {
      name: 'Singout',
      action: () => {
        auth.signout()
      }
    }
  })
}
