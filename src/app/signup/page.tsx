
import Image from "next/image"
import Link from "next/link"
import styles from "../page.module.scss"
import { api } from "@/services/app"
import { redirect } from "next/navigation"

export default function Signup() {

    async function handleRegister(formData: FormData) {
        "use server"
        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")

        if (name === "" || email === "" || password === "") {
            console.log("PREENCHA TODOS OS CAMPOS")
            return;
        }

        try {
            await api.post("/users", {
                name: name,
                email: email,
                password: password
            })

        } catch (err) {
            console.log("error")
            console.log(err)
        }

        redirect("/")
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
                    <h1>Criando sua conta</h1>
                    <form action={handleRegister}>
                        <input
                            type="text"
                            name="name"
                            placeholder='Digite seu nome...'
                            required
                            className={styles.input} />
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

                        <button type='submit' className={styles.text}>Cadastrar</button>

                    </form>
                    <Link href='/' className={styles.text}>
                        Já possui uma conta? Faça Login.
                    </Link>
                </section>
            </div >
        </>
    )
}