export interface Quote {
    id: string
    text: string
    user: User
    createdAt: Date
    cover: string
}

export interface User {
    id: string
    username: string
}