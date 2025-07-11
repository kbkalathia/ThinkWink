import UserModel from "../models/user.model";
import { ComparePassword, generateToken, HashPassword } from "../utils/helpers";

class AuthServiceClass {
  async login(data: { email: string; password: string }) {
    const user = await UserModel.findOne({ email: data.email });

    if (!user) {
      throw new Error("User not found..!!");
    }

    const isPasswordValid = await ComparePassword(data.password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = generateToken(payload);

    return {
      token,
      ...payload,
    };
  }

  async register(data: { email: string; password: string }) {
    const existingDeveloper = await UserModel.find({ email: data.email });

    if (existingDeveloper) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await HashPassword(data.password);

    await UserModel.create({
      email: data.email,
      password: hashedPassword,
    });

    return {
      success: true,
    };
  }
}

const AuthService = new AuthServiceClass();
export default AuthService;
