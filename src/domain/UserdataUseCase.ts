import { API_URL } from "../config/constants";
import { Benefit, BenefitReaction } from "./entity/Benefit";
import { Userdata } from "./entity/Userdata";
import { getLocalStorage } from "../context-api/helpers/localstorage";

export class UserdataUseCase {


    list(queryParams = ''): Promise<Response>  {
        return fetch(`${API_URL}/userdata`)
    }

    find(id: string): Promise<Response> {
        return fetch(`${API_URL}/userdata/${id}`)
    }

    update(benefit: BenefitReaction): Promise<Response>  {
        return fetch(`${API_URL}/userdata/`, {
            headers: {'Content-Type': 'application/json'},
            method: 'PATCH',
            body: JSON.stringify(benefit)
        })
    }

    like(id: string, benefits: BenefitReaction[]): Promise<Response>  {
        return this.likeOrNot(id, benefits, 'likes')
    }

    notLike(id: string, benefits: BenefitReaction[]): Promise<Response>  {
        return this.likeOrNot(id, benefits, 'not-likes')
    }

    later(id: string, benefits: BenefitReaction[]): Promise<Response>  {
        return this.likeOrNot(id, benefits, 'later')
    }

    likeOrNot(id: string, benefits: BenefitReaction[], reaction: string): Promise<Response>  {
        return fetch(`${API_URL}/userdata/${id}/`, {
            headers: {'Content-Type': 'application/json'},
            method: 'PATCH',
            body: JSON.stringify({[reaction]: benefits})
        })
    }


    delete(id: string): Promise<Response>  {
        return fetch(`${API_URL}/userdata/${id}`, {
            method: 'DELETE'
        })
    }

    add(userdata: Userdata): Promise<Response>  {
        return fetch(`${API_URL}/userdata`, {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(userdata)
        })
    }

    saveLater = (userdata: Userdata, benefit: Benefit, saveContext: (param?: any)=>any|void) => {
        if (!userdata) {
            // @ts-ignore
            userdata = getLocalStorage('userdata')
        }
        if (userdata && benefit) {
            const benefitReaction = this.benefitToReaction(benefit)
            const later = [...userdata.later, ...[benefitReaction]]
            userdata.later = later
            saveContext({userdata})
            this.later(userdata.id!, later)
        }
    }

    saveLike = (userdata: Userdata, benefit: Benefit, saveContext: (param?: any)=>any|void) => {
        if (!userdata) { // @ts-ignore
            userdata = getLocalStorage('userdata')
        }
        if (userdata && benefit) {
            const benefitReaction = this.benefitToReaction(benefit)
            const likes = [...userdata.likes, ...[benefitReaction]]
            saveContext({userdata})
            this.like(userdata.id!, likes)
        }
    }

    saveNotLike = (userdata: Userdata, benefit: Benefit, saveContext: (param?: any)=>any|void) => {
        if (!userdata) { // @ts-ignore
            userdata = getLocalStorage('userdata')
        }
        if (userdata && benefit) {
            const benefitReaction = this.benefitToReaction(benefit)
            const later = [...userdata.later, ...[benefitReaction]]
            userdata.later = later
            saveContext({userdata})
            this.notLike(userdata.id!, later)
        }
    }

    cleanDuplicates = (benefits: Benefit[]) => {
        const cleans = benefits.reduce((out: Benefit[] = [], benefit: Benefit) => {
            if (out.length > 0) {
                const exists = out.filter((b) => b.id === benefit.id);
                if (exists.length > 0) return out;
                else return [...out, { ...benefit }];
            } else return [...out, { ...benefit }];
        }, []);
        return cleans;
    };

    private benefitToReaction = (benefit: Benefit): BenefitReaction => {
        return (
            {...benefit, ...{
                reactionData: {
                    datetime: new Date().toDateString()
                }
            }}
        )
    }
}
