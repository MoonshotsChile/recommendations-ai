import { API_URL } from "../config/constants";

export class NotificationsUseCase {
    MISIONS_NUM = 500

    list(queryParams = ''): Promise<Response>  {
        return fetch(`${API_URL}/notifications/${queryParams}`)
    }

    find(id: number): Promise<Response> {
        return fetch(`${API_URL}/notifications/${id}`)
    }

    random(): Promise<Response>  {
        const index = Math.floor(Math.random() * this.MISIONS_NUM)
        return fetch(`${API_URL}/notifications/?_start=${(index - 1)}&_end=${index}`)
    }

    randomStack(length = 1): Promise<Response>  {
        const index = Math.floor(Math.random() * this.MISIONS_NUM - 1) + 1
        return fetch(`${API_URL}/notifications/?_start=${(index - length)}&_end=${index}`)
    }


    custom(start: number, end: number): Promise<Response>  {
        return fetch(`${API_URL}/notifications/?_start=${(start - 1)}&_end=${end}`)
    }
}
