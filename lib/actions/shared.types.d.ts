// Quotes
export interface CreateQuoteParams {
    text: string
    createdAt: Date
    userId: string
}

export interface GetQuoteParams {
    id: string
}

export interface GetUserQuotesParams {
    userId: string
}


// User
export interface CreateUserParams {
    username: string
}

export interface GetUserParams {
    id: string
}