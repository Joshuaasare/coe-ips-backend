import { Database } from "../dbWrapper/Database";

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
