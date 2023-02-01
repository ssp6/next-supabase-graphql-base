import { nextAuthOptions } from '@/backend/auth/next-auth-config'
import { NextApiHandler } from 'next'
import NextAuth from 'next-auth'

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, nextAuthOptions)
export default authHandler
