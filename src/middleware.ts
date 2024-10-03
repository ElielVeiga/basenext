import { NextRequest, NextResponse } from "next/server";
import { getUrl } from "./lib/get-url";

export function middleware(request:NextRequest){
    const token = request.cookies.get('authjs.session-token') //pega o teken da autenticação dentro dos cookies do usuario 
    const pathname = request.nextUrl.pathname //pega o pathname de dentro do next 

    if(pathname === '/auth' && token){
        return NextResponse.redirect(new URL(getUrl('/app')))
    } //se a pagina for de autenticação e o usuario possuir token redirecionar ele para o /app

    if(pathname.includes('/app') && !token){
        return NextResponse.redirect(new URL(getUrl('/auth')))
    } //se a pagina incluir o /app e o usuario não possuir autenticação redirecionar para /auth
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}