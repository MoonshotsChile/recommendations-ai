import { API_URL } from "../config/constants";

export class BenefitsUseCase {
    BENEFITS_NUM = 500

    list() {
        return fetch(`${API_URL}/benefits`)
    }

    find(id: number) {
        return fetch(`${API_URL}/benefits/${id}`)
    }

    random() {
        const index = Math.floor(Math.random() * this.BENEFITS_NUM)
        return fetch(`${API_URL}/benefits?_start=${(index - 1)}&_end=${index}`)
    }
}
