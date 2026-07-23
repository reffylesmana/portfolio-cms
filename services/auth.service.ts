import { adminRepository } from "@/repositories/admin.repository";
import { passwordUtils } from "@/utils/password";
import { jwtUtils } from "@/utils/jwt";

export const authService = {
  async findAdminByUsername(username: string) {
    return adminRepository.findByUsername(username);
  },

  async login(username: string, password: string) {
    const admin = await adminRepository.findByUsername(username);

    if (!admin) {
      throw new Error("Invalid username or password");
    }

    const isValidPassword = await passwordUtils.verify(
      password,
      admin.password
    );

    if (!isValidPassword) {
      throw new Error("Invalid username or password");
    }

    const token = await jwtUtils.sign({
      adminId: admin.id,
    });

return {
  success: true,
  token,
  admin: {
    id: admin.id,
    username: admin.username,
  },
};
  },
};