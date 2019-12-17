export const globals = {
  databaseParams:
    process.env.NODE_ENV === "production"
      ? {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME
        }
      : {
          host: "127.0.0.1",
          user: "root",
          password: "",
          database: "coe_ips"
        },
  school: {
    ACAD_YEAR: 2019
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
