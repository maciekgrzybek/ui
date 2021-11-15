import { rest, RestHandler } from 'msw'
import { clientUrl } from '../clientDetails'
import { createLoginResponse } from '../data-creators/auth'

type Response = {}

const authUrl = `${clientUrl}/auth/v1/token`
export const loginSuccessfulResponse = (
  returnData: Partial<Response> = {}
): RestHandler =>
  rest.post<Response>(authUrl, (req, res, ctx) =>
    res(
      ctx.json({
        ...createLoginResponse(),
        ...returnData,
      })
    )
  )

export const loginUnsuccessfulResponse = (
  returnData: Partial<Response> = {}
): RestHandler =>
  rest.post<Response>(authUrl, (req, res, ctx) =>
    res(
      ctx.status(400),
      ctx.json({
        error: 'invalid_grant',
        error_description: 'Invalid login credentials',
        ...returnData,
      })
    )
  )
