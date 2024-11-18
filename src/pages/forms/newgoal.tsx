import React, { useContext, useState } from 'react';
import { Form } from 'react-router-dom';
import { GoalType, GoalUnits } from '@/typings/database/userdata.ts';
import { Intervals } from '@/typings';
import { capitalize } from '@/utils/utils.ts';
import styles from '../index.module.css';
import { useAuthCookie, UserContext } from '@/client_ts/Contexts.ts';

const CSS = {
  Container: 'goals-wrapper',
  Form: {
    Root: 'goals-form',
    Type: 'goals-type',
    Option: 'goals-option',
    Target: 'goals-target-section',
    Units: 'goals-unit-span',
    UnitElements: 'goals-unit-element',
  },
};

const intervalsOptions =
  Object.keys(Intervals)
        .map(interval =>
          <option key={ interval } className={ CSS.Form.Option } value={ interval }>
            { capitalize(interval.toLowerCase()) }
          </option>,
        );
const goalTypesOptions = Object.keys(GoalType)

const goalTypesOptionsElements =
  goalTypesOptions.map(type =>
    <option key={ type } className={ CSS.Form.Option } value={ type }>{ capitalize(type.toLowerCase()) }</option>)

const GoalForm = () => {
  const user = useContext(UserContext);
  const [ goalUnits, setGoalUnits ] = useState<string | string[]>(GoalUnits[GoalType[goalTypesOptions[0] as keyof typeof GoalType]]);
  
  if (!user.data)
    console.log("No user data!")
  
  const authCookie = useAuthCookie().getCookie()
  
  return (
    <div className={ styles.wrapper }>
      <div>
        <h2>Add Weekly Goal</h2>
        <Form id='goals-form' method='POST'>
          Type:
          <select name='goalType' className={`${CSS.Form.Target} ${styles.sminputboxsq}`} defaultValue={ goalTypesOptions[0] }
                  onChange={ e => setGoalUnits(GoalUnits[GoalType[e.target.value as keyof typeof GoalType]]) }>
            { goalTypesOptionsElements }
          </select>
          <br />
          Target: 
          <span className={`${CSS.Form.Target}`}>
            <input className={styles.smallinputbox} type='number' />
            <span className={CSS.Form.Units}>
              {
                Array.isArray(goalUnits)
                  ? unitOptions(goalUnits)
                  : <input name='units' type='text' className={`${CSS.Form.Target} ${styles.sminputboxsq}`} value={ goalUnits } readOnly />
              }
            </span>
          </span>
          <br />
          Interval:
          <select className="styles.sminputboxsq" name='interval'>
              { intervalsOptions }
          </select>
          <div className="text-center">
              <button className={ styles.submitbox } type="submit">Submit</button>
          </div>
          <input name='userId' type='hidden' value={ user.data?._id } />
          <input name='auth' type='hidden' value={ authCookie } />
        </Form>
      </div>
    </div>
  );
};

function unitOptions(units: string[]): React.JSX.Element {
  return <select name='units' className='goal-units'>
    { units.map(unit => <option className={CSS.Form.UnitElements} value={ unit } key={ unit }> { unit } </option>) }
  </select>;
}

export default GoalForm;