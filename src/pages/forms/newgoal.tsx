import React, { useContext, useState } from "react";
import { Form } from "react-router-dom";
import { ActionFunctionArgs } from "react-router";
import { GoalType, GoalUnits } from "@/typings/database/userdata.ts";
import { useAuthCookie, USER_CONTEXT } from "@/index.tsx";
import { Intervals } from "@/typings";
import { capitalize } from "@/utils/utils.ts";

export const CSS = {
  Container: "goals-wrapper",
  Form: {
    Root: "goals-form",
    Type: "goals-type",
    Option: "goals-option",
    Target: "goals-target-section",
  },
};

const GoalForm = () => {
  const user = useContext(USER_CONTEXT);
  
  const goalTypesOptions = [];
  for (let type in GoalType) {
    goalTypesOptions.push(type);
    console.log(`Type: ${type}`)
  }
  const [ goalUnits, setGoalUnits ] = useState<string | string[]>(GoalUnits[GoalType[goalTypesOptions[0] as keyof typeof GoalType]]);
  
  const intervalsOptions = [];
  for (let interval in Intervals) {
    intervalsOptions.push(<option key={interval} className={ CSS.Form.Option } value={ interval }>{ capitalize(interval.toLowerCase()) }</option>);
    console.log(`Interval: ${interval}`)
  }
  
  return (
    <div className={ CSS.Container }>
      <Form id='goals-form' method='POST'>
        Type:
        <select name='goalType' className={ CSS.Form.Type } defaultValue={goalTypesOptions[0]}
                onChange={ e => setGoalUnits(GoalUnits[GoalType[e.target.value as keyof typeof GoalType]]) }>
          { goalTypesOptions.map(type => <option key={ type } className={ CSS.Form.Option } value={ type }>{ capitalize(type.toLowerCase()) }</option>) }
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
        Interval: <select>
          { intervalsOptions }
        </select>
        <input name='userId' type='hidden' value={ user.data?._id } />
        <input name='auth' type='hidden' value={ useAuthCookie()[0]["appley-auth"] } />
      </Form>
    </div>
  );
};

function unitOptions(units: string[]): React.JSX.Element {
  return <select name='units' className='goal-units'>
    { units.map(unit => <option value={ unit } key={unit}> unit </option>) }
  </select>;
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method === "POST") {
    // handle form
    
  }
}

export default GoalForm;