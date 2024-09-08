import { http } from "@/utils/http";
import { IResponse, IUser } from "@/types/type";

export const logonApi = async (data: IUser) => {
  return await http.post<IResponse<{ access_token: string }>>(
    "/auth/logon",
    data
  );
};
