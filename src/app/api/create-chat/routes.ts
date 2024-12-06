// /api/create-chat

import { NextResponse } from "next/server"

//quando for chamado um comando post para esse enpoint acima vai rodar o código abaixo
export async function post(res:Response, req: Request) {
    try {
        const body = await req.json()
        const {file_key, file_name} = body
    } catch (error) {
        console.error(error)
        return NextResponse.json({error: "internal server error"}, {status: 500})
    }
}