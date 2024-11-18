import { AuthCookie } from '@/client_ts/Contexts.ts';
import { json, LoaderFunctionArgs } from 'react-router-dom';
import { ENDPOINTS, UserDataRequest } from '@/typings';
import { redirect } from 'react-router';

export const dashboardLoader = (authCookieCtx: AuthCookie) => async ({ request }: LoaderFunctionArgs) => {
  if (authCookieCtx.getCookie() && authCookieCtx.getCookie().length === 24) {
    const packet = new UserDataRequest(authCookieCtx.getCookie()).serialize();
    console.log(`sending: ${packet}`)
    const response = await fetch(ENDPOINTS.Data.RetrieveUserData, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authentication': authCookieCtx.getCookie(),
      },
      body: packet
    })
    
    if (response.ok) {
      return json(response.body)
    }
  }
  return redirect('/login')
}