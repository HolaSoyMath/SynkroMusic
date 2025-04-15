import Link from "next/link";

export default function HomeTemplate(){
  return(
    <div>
      <h1>Teste tela home</h1>
      <Link href={"/login"}>
        Redirecionar Login
      </Link>
    </div>
  )
}