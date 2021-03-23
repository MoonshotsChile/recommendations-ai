import { Benefit } from "./Benefit";
export interface Userdata {
  id: string;
  likes: Benefit[];
  later: Benefit[];
  "not-likes": Benefit[];
}
