import { html, LitElement, css } from 'lit-element'
import { auth } from '@things-factory/auth-base'

export class ChangePassword extends LitElement {
  static get styles() {
    return [
      css`
        div#pwdSetting {
          padding: 30px;
        }
        input {
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom-color: #32526a;
          border-bottom-width: 1px;
          width: 100%;
          height: 30px;
        }

        div.field {
          padding-bottom: 10px;
        }

        ::placeholder {
          font-size: 0.8rem;
        }

        span {
          color: #c0504d;
          text-align: left;
          font-size: 1em;
        }
      `
    ]
  }

  render() {
    return html`
      <div id="pwdSetting">
        <span>Change Password</span><br />

        <form id="changePass" @submit="${e => this._handleSubmit(e)}">
          <div class="field"><input type="password" name="current_pass" placeholder="Current Password" /></div>
          <div class="field"><input type="password" name="new_pass" placeholder="New Password" /></div>
          <div class="field"><input type="password" name="confirm_pass" placeholder="Confirm Password" /></div>
          <button class="ui button" type="submit">Change Password</button>
        </form>
      </div>
    `
  }

  async _encodeSha256(password) {
    const encoder = new TextEncoder()
    const encoded = encoder.encode(password)

    const buffer = await crypto.subtle.digest('SHA-256', encoded)
    return hexString(buffer)
  }

  async _handleSubmit(e) {
    e.preventDefault()

    const form = e.target

    const formData = new FormData(form)
    let json = {}

    //convert form into json
    for (const [key, value] of formData.entries()) {
      json[key] = value
    }

    auth.changePassword(json)

    form.reset()
  }
}
customElements.define('change-password', ChangePassword)
