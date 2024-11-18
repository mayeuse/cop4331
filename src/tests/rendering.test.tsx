import { fireEvent, render } from '@testing-library/react';
import ForgotPassBody from '@/pages/forgotpassword.tsx';


const dummyUser = JSON.parse('{"_id":"673a95d1082e50c57584d3f2","email":"me@me.com","badges":[],"exerciseLog":[{"type":"Fasdkn","calories":100,"date":"04/04/0004"}],"goals":{},"name":"Caleb Brandt","username":"namehere","password":"password"}')

test('', () => {
  it('', () => {
  
  })
})

// test('Forgot Password Rendering', () => {
//   const renderResult = render(<ForgotPassBody/>);
//   (document.getElementsByName('email')[0] as HTMLInputElement).value = 'e@e.com';
//   let formData;
//   (document.getElementById('forgotpasswordform') as HTMLFormElement).onsubmit = (e) => (formData = new FormData(e.target as HTMLFormElement))
//   fireEvent(document.getElementById('forgotpassword-submitbutton')!, new SubmitEvent('click', {}))
//
//   it('sends form data', () => {
//     expect(formData!).toContain<{email: string}>({email: 'e@e.com'})
//   })
// })