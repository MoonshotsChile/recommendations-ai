import { API_URL } from "../config/constants";
import { Benefit } from "./entity/Benefit";

export class UserdataUseCase {

    list(queryParams = ''): Promise<Response>  {
        return fetch(`${API_URL}//${queryParams}`)
    }

    find(id: string): Promise<Response> {
        return fetch(`${API_URL}/userdata/${id}`)
    }

    update(benefit: Benefit): Promise<Response>  {
        return fetch(`${API_URL}/userdata/`, {
            method: 'POST',
            body: JSON.stringify(benefit)
        })
    }

    delete(id: string): Promise<Response>  {
        return fetch(`${API_URL}/userdata/${id}`, {
            method: 'DELETE'
        })
    }

    add(id: string, benefit: Benefit): Promise<Response>  {
        return fetch(`${API_URL}/userdata/${id}`, {
            method: 'POST',
            body: JSON.stringify(benefit)
        })
    }
}
