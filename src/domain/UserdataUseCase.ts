import { API_URL } from "../config/constants";
import { Benefit } from "./entity/Benefit";
import { Userdata } from "./entity/Userdata";
import { getLocalStorage } from "../context-api/helpers/localstorage";

export class UserdataUseCase {


    list(queryParams = ''): Promise<Response>  {
        return fetch(`${API_URL}/userdata`)
    }

    find(id: string): Promise<Response> {
        return fetch(`${API_URL}/userdata/${id}`)
    }

    update(benefit: Benefit): Promise<Response>  {
        return fetch(`${API_URL}/userdata/`, {
            headers: {'Content-Type': 'application/json'},
            method: 'PATCH',
            body: JSON.stringify(benefit)
        })
    }

    like(id: string, benefits: Benefit[]): Promise<Response>  {
        return this.likeOrNot(id, benefits, 'likes')
    }

    notLike(id: string, benefits: Benefit[]): Promise<Response>  {
        return this.likeOrNot(id, benefits, 'not-likes')
    }

    later(id: string, benefits: Benefit[]): Promise<Response>  {
        return this.likeOrNot(id, benefits, 'later')
    }

    likeOrNot(id: string, benefits: Benefit[], reaction: string): Promise<Response>  {
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
            const later = [...userdata.later, ...[benefit]]
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
            const likes = [...userdata.likes, ...[benefit]]
            userdata.likes = likes
            saveContext({userdata})
            this.like(userdata.id!, likes)
        }
    }

    saveNotLike = (userdata: Userdata, benefit: Benefit, saveContext: (param?: any)=>any|void) => {
        if (!userdata) { // @ts-ignore
            userdata = getLocalStorage('userdata')
        }
        if (userdata && benefit) {
            const later = [...userdata.later, ...[benefit]]
            userdata.later = later
            saveContext({userdata})
            this.notLike(userdata.id!, later)
        }
    }
}
