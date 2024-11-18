import { UserContext, UserDataContext } from '@/client_ts/Contexts.ts';
import { render } from '@testing-library/react';
import { CookiesProvider, useCookies } from 'react-cookie';
import React from 'react';

test('User context', () => {
  it('can be assigned to', () => {
    if (!UserContext.getData()) {
      UserContext.setData({} as UserDataContext)
      expect(UserContext.getData()).toBeTruthy()
    } else {
      UserContext.setData(null)
      expect(UserContext.getData()).toBeFalsy()
    }
  })
})

test('auth cookie', () => {
  function testCookies(): React.JSX.Element {
    const [cookie, setcookie, removecookie] = useCookies(['test-cookie']) // because it has to be in a renderer
    
    expect(cookie['test-cookie']).toBeFalsy()
    
    it('can be set', () => {
      setcookie('test-cookie', "hi")
      expect(cookie['test-cookie']).toBeTruthy()
    })
    
    it('can be removed', () => {
      setcookie('test-cookie', "sada")
      removecookie('test-cookie')
      expect(cookie['test-cookie']).toBeFalsy()
    })
    
    return <></>
  }
  
  render(<CookiesProvider><div>{testCookies()}</div></CookiesProvider>)
})

