


/**
 * @param obj The object to test.
 * @param requiredParams The parameters that the object must have.
 * @return false if params are lacked, else an array containing the parameters that obj does not have.
 */
export function lacksRequiredProperty<T extends object>(obj: Partial<T>, ...requiredParams: (keyof T)[]): (keyof T)[] | false {
    const paramsLacked: (keyof T)[] = [];
    for (let x of requiredParams) {
        if (!(x in obj)) {
            paramsLacked.push(x);
        }
    }

    if (paramsLacked.length === 0)
        return false;

    return paramsLacked;
}

/**
 * Throws error if the object doesn't have the required properties
 * @param obj Object to test
 * @param requiredParams List of properties the object must have
 */
export function assertHasProperties<T extends object>(obj: Partial<T>, ...requiredParams: (keyof T)[]): void {
    const propsLacked = lacksRequiredProperty(obj, ...requiredParams);
    if (propsLacked) {
        throw 'Object lacks required properties: ['
            + propsLacked.map(prop => `'${String(prop)}'`).join(", ")
            + ']'
    }
}