import { HttpStatusCode } from "axios";
import { SendResponse } from "../utils/helpers";
import AuthService from "../services/auth.service";

class AuthControllerClass {
  async login(req: any, res: any) {
    try {
      const { email, password } = req.body;
      const payload = { email, password };

      const developer = await AuthService.login(payload);
      return SendResponse({
        res,
        data: developer,
        status: HttpStatusCode.Ok,
        message: "Login Success..!!",
      });
    } catch (error) {
      return SendResponse({
        res,
        status: HttpStatusCode.InternalServerError,
        message: "Error: " + (error as Error).message,
      });
    }
  }

  async register(req: any, res: any) {
    try {
      const { email, password } = req.body;
      const payload = { email, password };

      const developer = await AuthService.register(payload);
      return SendResponse({
        res,
        data: developer,
        status: HttpStatusCode.Ok,
        message: "Registered Successfully..!!",
      });
    } catch (error) {
      return SendResponse({
        res,
        status: HttpStatusCode.InternalServerError,
        message: "Error: " + (error as Error).message,
      });
    }
  }
}

const AuthController = new AuthControllerClass();
export default AuthController;
