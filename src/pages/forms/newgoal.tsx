import React, { useContext, useState } from 'react';
import { Form } from 'react-router-dom';
import { ActionFunctionArgs, redirect } from 'react-router';
import { GoalType, GoalUnits } from '@/typings/database/userdata.ts';
import { IUserContext, useAuthCookie, UserContext } from '@/index.tsx';
import { AddGoalPacket, ENDPOINTS, ErrorCodes, ErrorPacket, Intervals } from '@/typings';
import { capitalize } from '@/utils/utils.ts';

export const CSS = {
  Container: 'goals-wrapper',
  Form: {
    Root: 'goals-form',
    Type: 'goals-type',
    Option: 'goals-option',
    Target: 'goals-target-section',
  },
};

const GoalForm = () => {
  const user = useContext(UserContext);
  
  const goalTypesOptions = [];
  for (let type in GoalType) {
    goalTypesOptions.push(type);
    console.log(`Type: ${ type }`);
  }
  const [ goalUnits, setGoalUnits ] = useState<string | string[]>(GoalUnits[GoalType[goalTypesOptions[0] as keyof typeof GoalType]]);
  
  const intervalsOptions = [];
  for (let interval in Intervals) {
    intervalsOptions.push(<option key={ interval } className={ CSS.Form.Option }
                                  value={ interval }>{ capitalize(interval.toLowerCase()) }</option>);
    console.log(`Interval: ${ interval }`);
  }
  
  return (
    <div className={ CSS.Container }>
      <Form id='goals-form' method='POST'>
        Type:
        <select name='goalType' className={ CSS.Form.Type } defaultValue={ goalTypesOptions[0] }
                onChange={ e => setGoalUnits(GoalUnits[GoalType[e.target.value as keyof typeof GoalType]]) }>
          { goalTypesOptions.map(type => <option key={ type } className={ CSS.Form.Option }
                                                 value={ type }>{ capitalize(type.toLowerCase()) }</option>) }
        </select>
        <br />
        Target:
        <span className={ CSS.Form.Target }>
          <input name='target' type='number' />
          {
            Array.isArray(goalUnits)
              ? unitOptions(goalUnits)
              : <input name='units' type='text' value={ goalUnits } readOnly />
          }
        </span>
        <br />
        Interval:
        <select name='interval'>
          { intervalsOptions }
        </select>
        <button name='submit' type='submit'>SUBMIT</button>
        <input name='userId' type='hidden' value={ user.data?._id } />
        <input name='auth' type='hidden' value={ useAuthCookie()[0]['appley-auth'] } />
      </Form>
    </div>
  );
};

function unitOptions(units: string[]): React.JSX.Element {
  return <select name='units' className='goal-units'>
    { units.map(unit => <option value={ unit } key={ unit }> unit </option>) }
  </select>;
}

export const action = (context: IUserContext) => async ({ request }: ActionFunctionArgs): Promise<Response | null> => {
  if (request.method === 'POST') {
    // handle form
    const data = await request.formData();
    console.log(data)
    let addGoalPacket = new AddGoalPacket(data.get('userId') as string, data.get('goalType') as GoalType, parseInt(data.get('target') as string), data.get('units') as string, data.get('interval') as (keyof typeof Intervals));
    console.log("after packet")
    
    const response = await fetch(ENDPOINTS.Forms.AddGoal, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authentication': data.get('auth') as string,
      },
      body: addGoalPacket.serialize(),
    });
    console.log("after response")
    
    if (!response.ok) {
      const error: ErrorPacket = await response.json()
      if (error.code === ErrorCodes.NOT_LOGGED_IN)
        return redirect('/login')
      else
        throw error.message
    }
    
    context.data!.goals[addGoalPacket.type] = addGoalPacket.toClientGoalData()
    
    return redirect('/dashboard/goals')
  }
  return null
}

export default GoalForm;