import { getSupabaseTokenFromRequest } from './getSupabaseTokenFromRequest'

export const getUserIdFromRequest = async (context: any) => {
  const token = getSupabaseTokenFromRequest(context?.req)
  return token?.sub
}
