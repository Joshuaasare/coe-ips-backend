import { Database } from "../dbWrapper/Database";
import isObject from "lodash/isObject";
import { IRequestWithUser } from "../middlewares";
import { Response } from "express";

export async function checkIfUserExists(
  dbInstance: Database,
  query: string,
  values: Array<string | number | boolean>
): Promise<boolean> {
  const rows: Array<any> = await dbInstance.runPreparedSelectQuery(
    query,
    values
  );
  return !(rows.length === 0);
}

export function arrayHasData(data?: Array<any>) {
  return data && data.length;
}

/**
 * isEmpty function that will return false for primitive values
 * like numbers and strings, unlike the lodash version
 */
export function isEmpty(val: any) {
  return (
    val === null ||
    val === "" ||
    (Array.isArray(val) && !val.length) ||
    (isObject(val) && !Object.keys(val).length)
  );
}
