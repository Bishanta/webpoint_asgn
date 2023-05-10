export interface NewsDataType {
    objectID: number
    title: string
    points: number
    author: string
    created_at: string
    num_comments: number
    url: string
}

export interface NewsParamType {
    tags: string,
    hitsPerPage: number,
    page: number,
    query: string
}