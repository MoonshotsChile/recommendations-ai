import React from "react";
import { Benefit } from "../../domain/entity/Benefit";
import { Userdata } from "../../domain/entity/Userdata";

export const groupData = (userData: Userdata[]) => {
  const likesAll = userData.reduce((out: Benefit[], user: Userdata) => {
    return [...out, ...cleanDuplicatesBenefits(user.likes)];
  }, []);
  const latersAll = userData.reduce((out: Benefit[], user: Userdata) => {
    return [...out, ...cleanDuplicatesBenefits(user.later)];
  }, []);
  const noLikesAll = userData.reduce((out: Benefit[], user: Userdata) => {
    return [...out, ...cleanDuplicatesBenefits(user["not-likes"])];
  }, []);
  const interestAll = userData.reduce((out: any, user: Userdata) => {
    return [...out, user.interest];
  }, []);
  return { likesAll, latersAll, noLikesAll, interestAll };
};

export const getCategoryBenefits = (objInteres: Benefit[]) => {
  return objInteres.reduce((out: any, obj: Benefit) => {
    const result = out.filter((o: any) => o.category === obj.category);
    if (result.length === 0) {
      const cantCategory = objInteres.filter(
        (l: any) => l.category === obj.category
      ).length;
      return [
        ...out,
        {
          category: obj.category,
          cant: cantCategory > 0 ? cantCategory : 0,
        },
      ];
    }
    return out;
  }, []);
};
export const getInterest = (interest: string[]) => {
  const group = interest.reduce((out: any, intere: any) => {
    const resultInterest = intere.reduce((outInterest: any, intere: string) => {
      return [...outInterest, intere];
    }, []);

    return [...out, ...resultInterest];
  }, []);

  const resultFinal = group.reduce((outInterest: any[], i: string) => {
    let result = [];
    if (outInterest.length > 0)
      result = outInterest.filter((o: any) => o.name === i);

    if (result.length === 0) {
      const cant = group.filter((o: string) => o === i);
      return [...outInterest, { name: i, cant: cant.length }];
    }
    return outInterest;
  }, []);
  return resultFinal;
};
export const cleanDuplicatesBenefits = (benefits: Benefit[]) => {
  const cleans = benefits.reduce((out: Benefit[] = [], benefit: Benefit) => {
    if (out.length > 0) {
      const exists = out.filter((b) => b.id === benefit.id);
      if (exists.length > 0) return out;
      else return [...out, { ...benefit }];
    } else return [...out, { ...benefit }];
  }, []);
  return cleans;
};
