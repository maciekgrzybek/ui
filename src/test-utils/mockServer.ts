import { setupServer } from 'msw/node'

import type { SetupServerApi } from 'msw/node'

type Input = Parameters<typeof setupServer>

type Output = {
  mockServer: SetupServerApi
}

export const setupMockServer = (...handlers: Input): Output => {
  const mockServer = setupServer(...handlers)

  beforeAll(() =>
    mockServer.listen({
      onUnhandledRequest: 'error',
    })
  )

  beforeEach(() => {
    mockServer.resetHandlers()
  })

  afterAll(() => mockServer.close())

  return { mockServer }
}
