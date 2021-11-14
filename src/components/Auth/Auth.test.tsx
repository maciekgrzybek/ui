import { render, screen } from '@testing-library/react'
import Auth from './Auth'
import { createClient } from '@supabase/supabase-js'
import { clientUrl, clientKey } from '../../test-utils/clientDetails'

const supabase = createClient(clientUrl, clientKey)

describe('#Auth', () => {
  describe('email auth view', () => {
    describe('sign in', () => {
      it('renders Sign In view', () => {
        render(<Auth supabaseClient={supabase} />)

        screen.getByRole('textbox', { name: 'Email address' })
        screen.getByLabelText('Password')
        screen.getByRole('checkbox', { name: 'Remember me' })
        screen.getByRole('link', { name: 'Forgot your password?' })
      })
      describe('with correct details', () => {
        it('allows to sign in', () => {})
      })

      describe('with incorrect details', () => {
        it('shows error message when incorrect email is passed', () => {})
        it('shows error message when email receive an error from the API', () => {})
      })

      describe('view switch', () => {
        it('allows to switch to Forgotten Password view', () => {})
        it('allows to switch to Magic Link view', () => {})
        it('allows to switch to Sign Up view', () => {})
      })

      it.todo('allows to use Remember me option')
      it.todo('redirects to URL, when "redirectTo" props is passed')
    })

    describe('sign up', () => {
      it('renders Sign Up view', () => {})

      describe('with correct details', () => {
        it('allows to sign up', () => {})
      })

      describe('with incorrect details', () => {
        it('shows error message when incorrect email is passed', () => {})
        it('shows error message when email receive an error from the API', () => {})
      })

      describe('view switch', () => {
        it('allows to switch to Sign In view', () => {})
      })

      it.todo('allows to use Remember me option')
      it.todo('redirects to URL, when "redirectTo" props is passed')
    })
  })

  describe('social provided auth view', () => {
    it('renders social providers buttons', () => {})
    it('renders large social providers buttons', () => {})
    it('renders social providers buttons with their colours', () => {})
    it('does not render unsupported providers', () => {})
    it('calls the providers oauth', () => {})
  })

  describe('magic link auth view', () => {
    it('renders magic link view', () => {})
    it('shows an error when invalid email is passed', () => {})
    it('allows to switch to regular Email Auth view', () => {})
  })

  describe('update password view', () => {
    it('renders update password view', () => {})
    it('allows to change the password', () => {})
    it('does not allow to change the password when user is logged in', () => {})
  })

  describe('forgotten password view', () => {
    it('renders forgotten password view', () => {})
    it('allows to reset the password', () => {})
    it('renders error when user cannot be found', () => {})
  })
})
