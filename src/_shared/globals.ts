export const globals = {
  databaseParams:
    process.env.NODE_ENV === "production"
      ? {
          host: "34.69.157.249",
          user: "root",
          password: "Gari and ajalo",
          database: "coe_ips"
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
