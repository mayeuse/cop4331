import { capitalize, lacksRequiredProperty } from '@/utils/utils.ts';

test('Capitalize', () => {
  it('Capitalizes words properly', () => {
    expect(capitalize('test')).toEqual('Test')
  })
  it('Keeps capitalized words capitalized', () => {
    expect(capitalize('Test')).toEqual('Test')
  })
  it('Only capitalizes the first character', () => {
    expect(capitalize('foo bar')).toEqual('Foo bar')
  })
})


test('lacksRequiredProperty', () => {
  it('Returns false on having all properties', () => {
    expect(lacksRequiredProperty({x: 1, y: 2, z: 3}, 'x', 'y', 'z')).toBeFalsy()
    expect(lacksRequiredProperty({x: 1, y: 2, z: 3, a: 4}, 'x', 'y', 'z', 'a')).toBeFalsy()
  })
  
  it('Returns false on having more than the required properties', () => {
    expect(lacksRequiredProperty({x: 1, y: 2, z: 3}, 'x', 'y')).toBeFalsy()
    expect(lacksRequiredProperty({x: 1, y: 2, z: 3, a: 4}, 'x', 'y', 'z')).toBeFalsy()
  })
  
  it('Returns lacked params on not having all properties', () => {
    expect(lacksRequiredProperty<{x: any, y: any, z: any}>({x: 1, y: 2}, 'x', 'y', 'z')).toContain('z')
    expect(lacksRequiredProperty<{x: any, y: any, z: any, a: any}>({x: 1, y: 2, z: 3}, 'x', 'y', 'z', 'a')).toContain('a')
  })
})

test('assertHasRequiredProperty', () => {
  it('Not throw on having all properties', () => {
    expect(() => lacksRequiredProperty({x: 1, y: 2, z: 3}, 'x', 'y', 'z')).toHaveReturned()
    expect(() => lacksRequiredProperty({x: 1, y: 2, z: 3, a: 4}, 'x', 'y', 'z', 'a')).toHaveReturned()
  })
  
  it('Not throw on having more than the required properties', () => {
    expect(() => lacksRequiredProperty({x: 1, y: 2, z: 3}, 'x', 'y')).toHaveReturned()
    expect(() => lacksRequiredProperty({x: 1, y: 2, z: 3, a: 4}, 'x', 'y', 'z')).toHaveReturned()
  })
  
  it('Returns false on not having all properties', () => {
    expect(() => lacksRequiredProperty<{x: any, y: any, z: any}>({x: 1, y: 2}, 'x', 'y', 'z')).toThrow()
    expect(() => lacksRequiredProperty<{x: any, y: any, z: any, a: any}>({x: 1, y: 2, z: 3}, 'x', 'y', 'z', 'a')).toThrow()
  })
})