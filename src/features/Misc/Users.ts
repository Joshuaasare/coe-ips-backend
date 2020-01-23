import { Request, Response } from "express";
import { Database } from "../../_shared/dbWrapper/Database";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const dbInstance = new Database();
  const query = "select * from student where acad_year = 2019";
  const results = await dbInstance.runPreparedSelectQuery(query);
  res.json(results);
};

export const testAuthourized = async (req: Request, res: Response) => {
  return res.send("Congrats! You are authorized");
};

export const testAuthenticated = async (req: Request, res: Response) => {
  return res.status(200).send({ data: "You are authorized" });
};
