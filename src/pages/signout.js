import { html, css } from 'lit-element'
import { PageView } from '@things-factory/shell'
import { auth } from '@things-factory/auth-base'

export class AuthSignOut extends PageView {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          text-align: center;
        }
      `
    ]
  }

  render() {
    return html`
      <h3>Sign Out</h3>
      <a href=${auth.fullpage(auth.signinPage)}>Sign In</a>
    `
  }
}

customElements.define('auth-signout', AuthSignOut)
