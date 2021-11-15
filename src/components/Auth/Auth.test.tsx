import { fireEvent, render as rtlRender, screen } from '@testing-library/react'
import Auth from './Auth'
import { createClient } from '@supabase/supabase-js'
import {
  clientUrl,
  clientKey,
  correctEmailAddress,
  correctPassword,
} from '../../test-utils/clientDetails'
import { setupMockServer } from '../../test-utils/mockServer'
import {
  loginSuccessfulResponse,
  loginUnsuccessfulResponse,
} from '../../test-utils/handlers/auth'
import userEvent from '@testing-library/user-event'
import type { FC } from 'react'

const { mockServer } = setupMockServer()

const Container: FC = ({ children }) => {
  const { user } = Auth.useUser()
  if (user) return <p>Signed in</p>
  return <>{children}</>
}

const supabase = createClient(clientUrl, clientKey)

const render = () => {
  return rtlRender(
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container>
        <Auth supabaseClient={supabase} />
      </Container>
    </Auth.UserContextProvider>
  )
}

beforeEach(() => {
  // Unfortunately I can't find a better way to clean up the auth state
  supabase.auth.signOut()
})

describe('#Auth', () => {
  describe('email auth view', () => {
    describe('sign in', () => {
      describe('without any details', () => {
        it('renders Sign In view', () => {
          render()

          screen.getByRole('textbox', { name: 'Email address' })
          screen.getByLabelText('Password')
          screen.getByRole('checkbox', { name: 'Remember me' })
          screen.getByRole('link', { name: 'Forgot your password?' })
        })

        it('does not allow to submit the form and shows the correct error message', async () => {
          render()

          const form = screen.getByRole('form')
          fireEvent.submit(form)

          expect(
            await screen.findByText(
              'You must provide either an email, phone number or a third-party provider.'
            )
          )
        })
      })

      describe('with correct details', () => {
        it('allows to sign in', async () => {
          mockServer.use(loginSuccessfulResponse())
          render()

          const emailInput = screen.getByRole('textbox', {
            name: 'Email address',
          })
          const passwordInput = screen.getByLabelText('Password')
          const form = screen.getByRole('form')

          userEvent.type(emailInput, correctEmailAddress)
          userEvent.type(passwordInput, correctPassword)
          fireEvent.submit(form)

          expect(await screen.findByText('Signed in')).toBeInTheDocument()
        })
      })

      describe('with incorrect details', () => {
        it('shows error message when incorrect email or password is passed', async () => {
          mockServer.use(loginUnsuccessfulResponse())

          render()

          const emailInput = screen.getByRole('textbox', {
            name: 'Email address',
          })
          const passwordInput = screen.getByLabelText('Password')
          const form = screen.getByRole('form')

          userEvent.type(emailInput, 'incorrect@test.com')
          userEvent.type(passwordInput, 'incorrectPassword')
          fireEvent.submit(form)

          expect(await screen.findByText('Invalid login credentials'))
        })
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
