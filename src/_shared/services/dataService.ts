import { Database } from "../dbWrapper/Database";

export async function getEntityRecordFromKey(
  entity: string,
  column: string,
  params: Array<string | number | boolean>,
  dbInstance: Database
): Promise<Array<Object>> {
  const query = `select * from ${entity} where ${column} = ?`;
  const rows = await dbInstance.runPreparedSelectQuery(query, params);
  return rows;
}

export async function getAllRecords(entity: string, dbInstance: Database) {
  const query = `select * from ${entity}`;
  const rows = await dbInstance.runPreparedSelectQuery(query, []);
  return rows;
}

//This type of query is used when we want to fetch the last insert Id
export async function insertEntityRecord(
  entity: string,
  columns: string,
  escapes: string,
  params: Array<Array<string | number | boolean>>,
  dbInstance: Database
): Promise<any> {
  const query = `insert into ${entity} (${columns}) values (${escapes})`;
  const rows = await dbInstance.runPreparedQuery(query, params);
  return rows;
}

export async function updateEntityRecord(
  query: string,
  params: Array<Array<string | number | boolean>>,
  dbInstance: Database
): Promise<any> {
  const rows = await dbInstance.runPreparedQuery(query, params);
  return rows;
}

export async function deleteEntityRecord(
  entity: string,
  column: string,
  params: Array<Array<string | number | boolean>>,
  dbInstance: Database
): Promise<any> {
  const query = `delete from ${entity} where ${column} = ?`;
  const rows = await dbInstance.runPreparedQuery(query, params);
  return rows;
}
