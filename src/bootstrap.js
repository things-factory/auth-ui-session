import { html } from 'lit-html'
import { store, loadPage } from '@things-factory/shell'
import { auth } from '@things-factory/auth-base'
import { i18next } from '@things-factory/i18n-base'
import { showSnackbar, APPEND_APP_TOOL, TOOL_POSITION } from '@things-factory/layout-base'
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
        <a href="profile">
          <mwc-icon>account_circle</mwc-icon>
        </a>
      `,
      position: TOOL_POSITION.REAR
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
