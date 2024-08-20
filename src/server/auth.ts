// server/auth.ts
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions"; // Adjust the path if necessary

export const auth = async () => {
  return await getServerSession(authOptions);
};
