import $api from "../http/index.js";
import { AxiosResponse } from "axios";

import { Iuser } from "../models/IUser.js";

export default class UserService {
  static fetchUserx(): Promise<AxiosResponse<Iuser[]>> {
    return $api.get<Iuser[]>("/users");
  }
}
