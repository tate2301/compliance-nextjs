import axios from "axios"

export async function POST(request: Request) {
    const {email, password} = await request.json()

    if(!email || !password) {
        return Response.json({message: "Missing credentials"}, {status: 400})
    }   

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/authentication/login`, {email, password})

    return Response.json(response.data, {status: response.status})
}