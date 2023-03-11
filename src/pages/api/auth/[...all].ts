import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

/**
 * An API route that proxies requests to the supabase server
 *
 * This allows ANON KEY and the Supabase url to remain private
 * @param req
 * @param res
 */
const proxyHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return res.status(500).json({ error: 'Missing api keys' })
  }

  const pathToProxyTo = req?.url?.replace('/api/auth', '') ?? ''

  try {
    const proxyResponse = await axios.request({
      method: req.method,
      url: `${SUPABASE_URL}${pathToProxyTo}`,
      headers: {
        ...req.headers,
        apiKey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`, // TODO: Get from cookie
      },
      ...(req.body && { data: req.body }),
    })
    // Add all headers to response
    Object.entries(proxyResponse.headers).forEach(([key, value]) => {
      res.setHeader(key, value)
    })
    return res.status(proxyResponse.status).json(proxyResponse.data)
  } catch (error: any) {
    return res
      .status(error.response?.status ?? 500)
      .json({ error: error.response?.data?.message ?? error.message })
  }
}

export default proxyHandler
