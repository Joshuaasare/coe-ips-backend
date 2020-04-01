import isObject from 'lodash/isObject';
import { Database } from '../dbWrapper/Database';

export async function checkIfUserExists(
  dbInstance: Database,
  query: string,
  values: Array<string | number | boolean>
): Promise<boolean> {
  const rows = await dbInstance.runPreparedSelectQuery(query, values);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return !((rows as Record<string, any>).length === 0);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function arrayHasData(data?: Array<any>): number {
  return data && data.length;
}

/**
 * isEmpty function that will return false for primitive values
 * like numbers and strings, unlike the lodash version
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEmpty(val: any): boolean {
  return (
    val === null ||
    val === '' ||
    (Array.isArray(val) && !val.length) ||
    (isObject(val) && !Object.keys(val).length)
  );
}
