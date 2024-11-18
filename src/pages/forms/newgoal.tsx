import React, { useContext, useState } from 'react';
import styles from '../index.module.css';
import { GoalType, GoalUnits } from '@/typings/database/userdata.ts';
import { ENDPOINTS, Intervals } from '@/typings';
import { capitalize } from '@/utils/utils.ts';
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

const goalTypesOptions = Object.keys(GoalType);

const goalTypesOptionsElements =
  goalTypesOptions.map(type =>
    <option key={ type } className={ CSS.Form.Option } value={ type }>{ capitalize(type.toLowerCase()) }</option>);

const GoalForm = () => {
  const userData = UserContext.getData();
  const { getCookie } = useAuthCookie();
  const authCookie = getCookie();

  const [goalUnits, setGoalUnits] = useState<string | string[]>(
    GoalUnits[GoalType[goalTypesOptions[0] as keyof typeof GoalType]]
  );
  const [goalType, setGoalType] = useState(goalTypesOptions[0]);
  const [target, setTarget] = useState('');
  const [interval, setInterval] = useState('WEEKLY');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  if (!userData) {
    console.log("No user data!");
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');
    setError('');
  
    if (!target || !interval) {
      setError("All fields must be filled.");
      return;
    }
  
    try {
      const payload = {
        userId: authCookie,
        type: goalType.toLowerCase(),
        target: Number(target),
        interval: interval,
        units: goalUnits,
      };
  
      console.log("Payload being submitted:", payload);
  
      const response = await fetch(ENDPOINTS.Forms.AddGoal, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authentication': `Bearer ${authCookie}`,
        },
        body: JSON.stringify(payload),
      });
  
      const responseText = await response.text();
      console.log('Response Status:', response.status);
      console.log('Response Text:', responseText);
  
      if (response.ok) {
        setMessage('Goal added successfully!');
        setError('');
        setTarget('');
        setGoalType(goalTypesOptions[0]);
        setInterval('WEEKLY');
      } else {
        setError(responseText || "Failed to add goal.");
        setMessage('');
      }
    } catch (error) {
      console.error("Error adding goal:", error);
      setError("An unexpected error occurred.");
      setMessage('');
    }
  };
  
  const handleGoalTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    setGoalType(selectedType);
    setGoalUnits(GoalUnits[GoalType[selectedType as keyof typeof GoalType]]);
  };

  const unitOptions = (units: string[]): React.JSX.Element => {
    return (
      <select name="units" className="goal-units">
        {units.map(unit => (
          <option className={CSS.Form.UnitElements} value={unit} key={unit}>
            {unit}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <h2>Add Goal</h2>
        <form id="goal-form" onSubmit={handleSubmit}>
          <div className="w-3/4 text-center mx-auto">
            <label htmlFor="goalType">Goal Type:</label>
            <select
              name="goalType"
              className={`${CSS.Form.Target} ${styles.sminputboxsq}`}
              value={goalType}
              onChange={handleGoalTypeChange}
            >
              {goalTypesOptionsElements}
            </select>
          </div>

          <div className="w-3/4 text-center mx-auto">
            <label htmlFor="target">Target:</label>
            <input
              className={styles.inputbox}
              type="number"
              name="target"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Enter target value"
              min="0"
              required
            />
            <span className={CSS.Form.Units}>
              {Array.isArray(goalUnits) ? unitOptions(goalUnits) : <input value={goalUnits} readOnly />}
            </span>
          </div>

          <div className="w-3/4 text-center mx-auto">
            <label htmlFor="interval">Interval:</label>
            <select
              name="interval"
              className={`${styles.sminputboxsq}`}
              value={interval}
              onChange={(e) => setInterval(e.target.value)}
            >
              {intervalsOptions}
            </select>
          </div>

          <div className="text-center">
            <button
              className={`${styles.submitbox} w-1/4 py-1 rounded min-h-fit mt-2`}
              type="submit"
            >
              Submit
            </button>
          </div>

          {message && <span className={styles.success}>{message}</span>}
          {error && <span className={styles.error}>{error}</span>}
        </form>
      </div>
    </div>
  );
};

export default GoalForm;
