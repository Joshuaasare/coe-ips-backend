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
    ACAD_YEAR: 2019
  },

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  SALT_ROUNDS: 10
};

export const constants = {
  errors: {
    JSON_WEB_TOKEN_ERROR: "JsonWebTokenError"
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
