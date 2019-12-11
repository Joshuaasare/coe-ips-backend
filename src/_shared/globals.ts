export const globals = {
  databaseParams:
    process.env.NODE_ENV === "development"
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
