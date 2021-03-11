import { API_URL } from "../config/constants";

export class BenefitsUseCase {
    list() {
        return fetch(`${API_URL}/benefits`)
    }

    find(id: number) {
        return fetch(`${API_URL}/benefits/${id}`)
    }
}
