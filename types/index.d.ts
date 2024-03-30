export interface Quote {
    id: string
    text: string
    user: User
    createdAt: Date
}

export interface User {
    id: string
    username: string
}