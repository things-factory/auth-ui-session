import { html, css } from 'lit-element'
import { PageView } from '@things-factory/shell'
import { auth } from '@things-factory/auth-base'

export class AuthSignin extends PageView {
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
      <h3>Sign In</h3>

      <form id="signin" @submit="${e => this.handleSubmit(e)}">
        <div class="field"><input type="text" name="email" placeholder="Login Id." /></div>
        <div class="field"><input type="password" name="password" placeholder="Password" /></div>
        <button class="ui button" type="submit">Sign In</button>
      </form>

      <a href=${auth.fullpage(auth.signupPage)}>Sign Up</a>
    `
  }

  get context() {
    return {
      fullbleed: true
    }
  }

  async handleSubmit(e) {
    e.preventDefault()
    const form = e.target

    const formData = new FormData(form)
    let json = {}

    for (const [key, value] of formData.entries()) {
      json[key] = value
    }

    await auth.signin(json)

    form.reset()
  }
}

customElements.define('auth-signin', AuthSignin)
