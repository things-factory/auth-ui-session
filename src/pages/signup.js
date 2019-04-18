import { html, css } from 'lit-element'
import { auth, PageView } from '@things-factory/shell'

export class AuthSignup extends PageView {
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
      <h3>Sign Up</h3>

      <form id="signin" @submit="${e => this.handleSubmit(e)}">
        <div class="field"><input type="text" name="login" placeholder="Login" /></div>
        <div class="field"><input type="text" name="name" placeholder="Name" /></div>
        <div class="field"><input type="email" name="email" placeholder="Email" /></div>
        <div class="field"><input type="password" name="password" placeholder="Password" /></div>
        <button class="ui button" type="submit">Sign Up</button>
      </form>

      <a href=${auth.fullpage(auth.signinPage)}>Sign In</a>
    `
  }

  async handleSubmit(e) {
    e.preventDefault()
    const form = e.target

    const formData = new FormData(form)
    let json = {}

    for (const [key, value] of formData.entries()) {
      json[key] = value
    }

    await auth.signup(json)

    form.reset()
  }
}

customElements.define('auth-signup', AuthSignup)
