const { registerStudentsService } = require("../services/auth");

const registerStudents = async (req, resp, next) => {
  try {
    const response = await registerStudentsService(req, next);
    if (response.emailExists) {
      return resp.status(409).send({ error: "User already exist" });
    }
    if (response.error) return resp.status(422).send({ error: response.error });
    console.log(response);
    return resp.status(200).send({ data: response });
  } catch (ex) {
    console.error(`Internal error`);
    console.log(ex.code);
    if (ex.code === "ER_DUP_ENTRY") {
      return resp.status(409).send({ error: "User already exist" });
    }

    return resp.status(422).send({ error: "Could not process request" });
  }
};

module.exports = {
  registerStudents
};
