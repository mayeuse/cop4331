import { IUserContext } from '@/client_ts/Contexts.ts';
import { ActionFunctionArgs, redirect } from 'react-router';
import { AddGoalPacket, ENDPOINTS, ErrorCodes, ErrorPacket, Intervals } from '@/typings';
import { GoalType } from '@/typings/database/userdata.ts';

export const newGoalAction = (context: IUserContext) => async ({ request }: ActionFunctionArgs): Promise<Response | null> => {
  if (request.method === 'POST') {
    // handle form
    const data = await request.formData();
    console.log(data)
    let addGoalPacket = new AddGoalPacket(data.get('userId') as string, data.get('goalType') as GoalType, parseInt(data.get('target') as string), data.get('units') as string, data.get('interval') as (keyof typeof Intervals));
    console.log('after packet')
    
    const response = await fetch(ENDPOINTS.Forms.AddGoal, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authentication': data.get('auth') as string,
      },
      body: addGoalPacket.serialize(),
    });
    console.log('after response')
    
    if (!response.ok) {
      const error: ErrorPacket = await response.json()
      if (error.code === ErrorCodes.NOT_LOGGED_IN)
        return redirect('/login')
      else
        throw error.message
    }
    
    context.getData()!.goals[addGoalPacket.type] = addGoalPacket.toClientGoalData()
    
    return redirect('/dashboard/goals')
  }
  return null
}