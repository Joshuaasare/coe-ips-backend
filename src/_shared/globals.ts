export const globals = {
  databaseParams:
    process.env.NODE_ENV === "production"
      ? {
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          socketPath: `/cloudsql/${process.env.CONNECTION_NAME}`
        }
      : {
          host: "127.0.0.1",
          user: "root",
          password: "",
          database: "coe_ips"
        },
  school: {
    ACAD_YEAR: 2019,
    DEFAULT_COMPANY_CODE: 2425
  },

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  SALT_ROUNDS: 10,
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY
};

export const constants = {
  errors: {
    JSON_WEB_TOKEN_ERROR: "JsonWebTokenError",
    SQL_DUP_ENTRY: "ER_DUP_ENTRY"
  },
  user_type_id: {
    STUDENT: 1,
    COMPANY: 2,
    COORDINATOR: 3,
    ADMIN: 4
  }
};

export enum Methods {
  get = "get",
  post = "post",
  patch = "patch",
  del = "delete",
  put = "put"
}

export enum MetadataKeys {
  method = "Method",
  path = "Path",
  middleware = "middleware",
  validator = "validator"
}
