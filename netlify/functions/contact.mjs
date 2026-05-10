const WEB3 = 'https://api.web3forms.com/submit'

const jsonHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
}

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: jsonHeaders, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: jsonHeaders,
      body: JSON.stringify({ success: false, message: 'Method not allowed' }),
    }
  }

  const key =
    process.env.WEB3FORMS_ACCESS_KEY?.trim() ||
    process.env.VITE_WEB3FORMS_ACCESS_KEY?.trim()

  if (!key) {
    return {
      statusCode: 500,
      headers: jsonHeaders,
      body: JSON.stringify({
        success: false,
        message:
          'Missing WEB3FORMS_ACCESS_KEY on Netlify (Functions env). Add it in Site env vars.',
      }),
    }
  }

  let payload
  try {
    payload = JSON.parse(event.body || '{}')
  } catch {
    return {
      statusCode: 400,
      headers: jsonHeaders,
      body: JSON.stringify({ success: false, message: 'Invalid JSON body' }),
    }
  }

  const forward = { ...payload, access_key: key }

  const h = event.headers || {}
  const referer = h.referer || h.Referer
  const origin = h.origin || h.Origin
  /** Helps Web3Forms associate submissions with your site when the POST is server-side. */
  const wfHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
  if (referer) wfHeaders.Referer = referer
  if (origin) wfHeaders.Origin = origin

  const res = await fetch(WEB3, {
    method: 'POST',
    headers: wfHeaders,
    body: JSON.stringify(forward),
  })

  const text = await res.text()
  let data
  try {
    data = JSON.parse(text)
  } catch {
    data = {
      success: false,
      message: text?.slice(0, 200) || 'Unexpected response from mail provider',
    }
  }

  return {
    statusCode: res.ok ? 200 : res.status,
    headers: jsonHeaders,
    body: JSON.stringify(data),
  }
}
