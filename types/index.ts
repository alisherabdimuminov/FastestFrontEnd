export interface IResponse {
    status: "success" | "error"
    code: string
    data: string
}

export interface IEmployee {
    id: string
    username: string
    first_name: string
    last_name: string
    phone: string
    pwd: string
    role: "admin" | "emploee"
}

export interface ISpec {
    id: string
    name: string
}

export interface IQuestion {
    spec: ISpec
    question: string
    answer_a: string
    answer_b: string
    answer_c: string
    answer_d: string
    correct_answer: string
    score: string
}

export interface ITest {
    name: string
    employee: IEmployee
    spec: ISpec
    score: string
    passed_score: string
    status: string
}