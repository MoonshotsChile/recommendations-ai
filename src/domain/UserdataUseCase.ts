import { API_URL } from "../config/constants";
import { Benefit } from "./entity/Benefit";
import { Userdata } from "./entity/Userdata";

export class UserdataUseCase {

    list(queryParams = ''): Promise<Response>  {
        return fetch(`${API_URL}//${queryParams}`)
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
        return fetch(`${API_URL}/userdata/${id}/${reaction}`, {
            headers: {'Content-Type': 'application/json'},
            method: 'PUT',
            body: JSON.stringify(benefits)
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
}
