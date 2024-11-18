import { render } from '@testing-library/react';
import { UserContext } from '@/client_ts/Contexts.ts';
import { newGoalAction } from '@/client_ts/actions.ts';
import { GoalType } from '@/typings/database/userdata.ts';
import { ActionFunctionArgs, redirect } from 'react-router';

const dummyUser = JSON.parse('{"_id":"673a95d1082e50c57584d3f2","email":"fck@fff.com","badges":[],"exerciseLog":[{"type":"Fasdkn","calories":100,"date":"04/04/0004"}],"goals":{},"name":"Caleb Brandt","username":"namehere","password":"password"}')

test('Goal form submission', async () => {
  const initialNumberOfGoals = Object.keys(dummyUser.goals).length
  const action = newGoalAction(dummyUser)
  const dummydata: any = {
    get: (key: string) => dummydata[key],
    userId: dummyUser._id,
    goalType: GoalType.CALORIE,
    target: 300,
    units: 'kCal',
    interval: 'WEEKLY',
    auth: dummyUser._id
  }
  const dummyRequest: any = {
    method: 'POST',
    ok: true,
    formData: dummydata,
  }
  const response = await action({request: dummyRequest} as ActionFunctionArgs)!;
  expect(response).toBeTruthy()
  if (!response)
    return;
  
  it('authenticates properly', () => {
    expect(response.ok).toBeTruthy()
  })
  
  it('returns a redirect on success', () => {
    expect(response).toEqual(redirect('/dashboard/goals'))
  })
  
  it('adds new goal to local context', () => {
    expect(Object.keys(dummyUser.goals).length).toBe(initialNumberOfGoals + 1)
  })
  
  it('throws on invalid goal type', async () => {
    const otherDummy: any = {}
    Object.assign(otherDummy, dummyRequest)
    otherDummy.formData.goalType = ""
    expect(async () => {await action(otherDummy)}).toThrow()
  })
  
  it('redirects to login when not authenticated', async () => {
    const otherDummy: any = {}
    Object.assign(otherDummy, dummyRequest)
    otherDummy.formData.auth = ""
    expect(async () => {await action(otherDummy)}).toThrow()
  })
  
})