import { BenefitReaction } from "./Benefit";
export interface Userdata {
  id: string;
  created_at?: string;
  likes: BenefitReaction[];
  later: BenefitReaction[];
  interest?: string[];
  "not-likes": BenefitReaction[];
}
