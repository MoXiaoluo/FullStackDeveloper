import { http } from "@/utils/http";
import { IUser } from "@/types/type";

export const logonApi = async (data: IUser) => {
  return await http.post("/auth/logon", data);
};
