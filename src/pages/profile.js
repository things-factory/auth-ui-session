import { html, css } from 'lit-element'
import { PageView } from '@things-factory/shell'
import { auth } from '@things-factory/auth-base'

export class AuthProfile extends PageView {
  static get properties() {
    return {
      email: String,
      login: String,
      name: String,
      locale: String,
      stomp_url: String,
      exclusive_role: String,
      super_user: Boolean,
      admin_flag: Boolean
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          text-align: center;
        }

        div {
          flex: 1;

          overflow-y: auto;
          text-align: center;
        }

        #token {
          display: inline-block;
          width: 50%;
          overflow-wrap: break-word;
          text-align: left;
          border: 1px solid tomato;
          padding: 2px;
        }
      `
    ]
  }

  firstUpdated() {
    auth.on('signin', accessToken => {
      this.setCredential()
    })
    auth.on('signout', () => {
      this.setCredential()
    })
    auth.on('profile', credential => {
      this.setCredential(credential)
    })

    this.setCredential(auth.credential)
  }

  setCredential(credential) {
    if (credential) {
      this.email = credential.email
      this.login = credential.login
      this.name = credential.name
      this.locale = credential.locale
      this.stomp_url = credential.stomp_url
      this.exclusive_role = credential.exclusive_role
      this.super_user = credential.super_user
      this.admin_flag = credential.admin_flag
    } else {
      this.email = ''
      this.login = ''
      this.name = ''
      this.locale = ''
      this.stomp_url = ''
      this.exclusive_role = ''
      this.super_user = false
      this.admin_flag = false
    }
  }

  get context() {
    return {
      title: 'Auth Profile'
    }
  }

  render() {
    return html`
      <div>
        <div>
          <p>Login: <b>${this.login}</b></p>
        </div>

        <div>
          <p>Name: <b>${this.name}</b></p>
        </div>

        <div>
          <p>Email: <b>${this.email}</b></p>
        </div>

        <div>
          <p>Locale: <b>${this.locale}</b></p>
        </div>

        <div>
          <p>Stomp URL: <b>${this.stomp_url}</b></p>
        </div>

        <div>
          <p>Exclusive Role: <b>${this.exclusive_role}</b></p>
        </div>

        <div>
          Super User
          <input type="checkbox" ?checked=${this.super_user} disabled></p>
        </div>

        <div>
          Admin Flag
          <input type="checkbox" ?checked=${this.admin_flag} disabled></p>
        </div>

        <button @click="${() => auth.signout()}">Sign Out</button>
      </div>
    `
  }
}

customElements.define('auth-profile', AuthProfile)
