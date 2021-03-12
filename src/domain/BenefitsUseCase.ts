import { API_URL } from "../config/constants";

export class BenefitsUseCase {
    BENEFITS_NUM = 500

    list() {
        console.log(fetch(`${API_URL}/benefits`));
        
        return fetch(`${API_URL}/benefits`)
    }

    find(id: number) {
        return fetch(`${API_URL}/benefits/${id}`)
    }

    random() {
        const index = Math.floor(Math.random() * this.BENEFITS_NUM)
        console.log(API_URL);
        
        console.log(`${API_URL}/benefits?_start=${(index - 1)}&_end=${index}`)
        return fetch(`${API_URL}/benefits?_start=${(index - 1)}&_end=${index}`)
    }

    custom(start: number, end: number) {
        
        console.log(`${API_URL}/benefits?_start=${(start - 1)}&_end=${end}`)
        return fetch(`${API_URL}/benefits?_start=${(start - 1)}&_end=${end}`)
    }
}
