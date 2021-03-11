export interface Benefit {
    id: number,
    uuid: string,
    created_at: string,
    updated_at: string,
    url: string,
    title: string,
    slug: string,
    description: string,
    covers: string[],
    tags: string[],
    category: string,
    options: {
        conditions: string,
        comments_enabled: boolean
    },
    video_url?: string,
    conditions: string,
    start_date: string,
    end_date: string,
    discount?: string,
    location_street?: string,
    latitude?: string,
    longitude?: string
}

export const benefitMock: Benefit = {
    category: "",
    conditions: "",
    covers: [],
    created_at: "",
    description: "",
    end_date: "",
    id: 0,
    options: {comments_enabled: false, conditions: ""},
    slug: "",
    start_date: "",
    tags: [],
    title: "",
    updated_at: "",
    url: "",
    uuid: ""
}
