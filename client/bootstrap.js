import { html } from 'lit-html'
import { store, loadPage } from '@things-factory/shell'
import { auth } from '@things-factory/auth-base'
import { i18next } from '@things-factory/i18n-base'
import { TOOL_POSITION } from '@things-factory/layout-base'
import { APPEND_APP_TOOL } from '@things-factory/apptool-base'
import { ADD_MORENDA } from '@things-factory/more-base'
import { ADD_SETTING } from '@things-factory/setting-base'

import '@material/mwc-icon'
import './pages/change-password'

export default function bootstrap() {
  function onProfile(profile) {
    store.dispatch({
      type: ADD_SETTING,
      setting: {
        seq: 10,
        template: html`
          <div style="background-color: #e5e5e5;height: 50px;padding: 20px 0px 20px 0px;text-align: center;">
            <p style="margin:0"><b>${profile.name}</b></p>
            <p style="margin:0">${profile.email}</p>
          </div>
        `
      }
    })
  }

  function onAuthentication(on) {
    document.dispatchEvent(
      new CustomEvent('notify', {
        detail: {
          level: 'info',
          message: i18next.t('text.you.are.now.in', {
            state: {
              text: i18next.t(on ? 'text.signed in' : 'text.signed out')
            }
          })
        }
      })
    )
  }

  function onError(ex) {
    document.dispatchEvent(
      new CustomEvent('notify', {
        detail: {
          level: 'error',
          message: ex,
          ex
        }
      })
    )
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
        <a href="profile" style="color: inherit; text-decoration: none; display: flex;">
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
      name: 'Sign Out',
      action: () => {
        auth.signout()
      }
    }
  })

  store.dispatch({
    type: ADD_SETTING,
    setting: {
      seq: 30,
      template: html`
        <change-password></change-password>
      `
    }
  })
}
