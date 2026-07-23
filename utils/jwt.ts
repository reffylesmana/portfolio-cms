import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export const jwtUtils = {
  async sign(payload: { adminId: string }) {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);
  },

  async verify(token: string) {
    const { payload } = await jwtVerify(token, secret);

    return payload;
  },
};