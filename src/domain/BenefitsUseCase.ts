import { API_URL } from "../config/constants";

export class BenefitsUseCase {
    BENEFITS_NUM = 500

    list(queryParams = ''): Promise<Response>  {
        return fetch(`${API_URL}/benefits/${queryParams}`)
    }

    find(id: string): Promise<Response> {
        return fetch(`${API_URL}/benefits/${id}`)
    }

    random(): Promise<Response>  {
        const index = Math.floor(Math.random() * this.BENEFITS_NUM)
        return fetch(`${API_URL}/benefits/?_start=${(index - 1)}&_end=${index}`)
    }

    randomStack(length = 1): Promise<Response>  {
        const index = Math.floor(Math.random() * this.BENEFITS_NUM - 1) + 1
        return fetch(`${API_URL}/benefits/?_start=${(index - length)}&_end=${index}`)
    }


    custom(start: number, end: number): Promise<Response>  {
        return fetch(`${API_URL}/benefits/?_start=${(start - 1)}&_end=${end}`)
    }
}
