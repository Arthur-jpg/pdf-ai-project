import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import {LogIn} from 'lucide-react'
import FileUploader from "@/components/FileUploader";

export default async function Home() {
  // temos que chegar se o usuário está logado -> clerk tem uma funcionalidade par isso
  const {userId} = await auth()
  const isAuth = !!userId 

  // let isAuth;

  // if (userId) {
  //     isAuth = true;
  // } else {
  //     isAuth = false;
  // }

  console.log(isAuth); // Mostra true ou false, dependendo do valor de userId

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Estude com EstudAi.io</h1>
            <UserButton afterSignOutUrl="/"/>
          </div>
          <div className="flex mt-2">
            {isAuth && <Button>Ir para Chats</Button>}

          </div>
          <p className="max-w-xl mt-1 text-lg ">
            Junte com milhões de estudantes, pesquisadores e profissionais para respostas instantâneas e melhor entendimento em pesquisas com AI
          </p>
          <div className="w-full mt-4">
            {isAuth ? (<FileUploader/>):(
              <Link href="/sign-in">
                <Button>Login para começar<LogIn className="w-4 h-4 ml-2"/>
                </Button>
              </Link> 
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
