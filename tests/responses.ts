import { HttpResponse, type JsonBodyType } from 'msw'

const CORS_HEADERS = { 'Access-Control-Allow-Origin': '*' }

const PREFLIGHT_HEADERS = {
  ...CORS_HEADERS,
  'Access-Control-Allow-Methods': 'GET,POST,DELETE,PUT',
  'Access-Control-Allow-Headers': 'content-type',
}

export function apiResponse(body: JsonBodyType, status = 200) {
  return HttpResponse.json(body, { status, headers: CORS_HEADERS })
}

export function apiErrorResponse(status: number) {
  return new HttpResponse(null, { status, headers: CORS_HEADERS })
}

export function preflightResponse() {
  return new HttpResponse(null, { status: 204, headers: PREFLIGHT_HEADERS })
}
