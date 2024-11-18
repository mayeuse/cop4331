import { GoalType } from '@/typings/database/userdata.ts';
import { Intervals } from '@/typings';

test('', () => {
  it('', () => {
  })
})

test('Enums', () => {
  it('Lists goal type names correctly', () => {
    expect(Object.keys(GoalType)).toEqual(['CALORIE', 'STEPCOUNT'] as (keyof typeof GoalType)[])
  })
  
  it('Lists interval names correctly', () => {
    expect(Object.keys(Intervals)).toEqual(['WEEKLY', 'MONTHLY', 'BIWEEKLY'] as (keyof typeof Intervals)[])
  })
})


