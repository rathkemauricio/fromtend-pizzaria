import styles from './page.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '@/services/app'
import { redirect } from 'next/navigation'
import axios from 'axios'
import { cookies } from 'next/headers'

export default function Page() {
  async function handleLogin(formData: FormData) {
    "use server"
    const email = formData.get("email")
    const password = formData.get("password")

    if (email === "" || password === "") {
      return;
    }
    try {
      const response = await api.post("/session", {
        email,
        password
      })

      if (!response.data.token) {
        return;
      }

      console.log(response.data)

      const expressTime = 60 * 60 * 24 * 30 * 1000;
      const cookieStore = await cookies();
      cookieStore.set("session", response.data.token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"
      });

    } catch (err) {
      console.log("error")
      console.log(err)
    }
    redirect("/dashboard")
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image
          src='/logo.svg'
          width={476}
          height={106}
          alt='Loogo Pizzaria'
        />

        <section className={styles.login}>
          <form action={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder='Digite seu email...'
              required
              className={styles.input} />
            <input
              type="password"
              name="password"
              placeholder='********'
              required
              className={styles.input} />

            <button type='submit' className={styles.text}>Acessar</button>

          </form>
          <Link href='/signup' className={styles.text}>
            Não possui uma conta? Cadastre-se.
          </Link>
        </section>
      </div >
    </>
  )
}