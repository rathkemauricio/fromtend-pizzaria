import styles from './styles.module.scss'
import { Button } from '../components/button'
import { api } from '@/services/app'
import { getCookieServer } from '@/lib/cookieServer'
import { redirect } from 'next/navigation'

export default function Category() {

    async function handleRegisterCategory(formData: FormData) {
        "use server"

        const name = formData.get('name')
        if (name === '') return;

        const data = {
            name: name
        }

        const token = await getCookieServer();

        await api.post('/category', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .catch((err) => {
                console.log(err);
                return;
            })

        redirect('/dashboard')

    }


    return (
        <main className={styles.container}>
            <h1>Nova categoria</h1>

            <form
                action={handleRegisterCategory}
                className={styles.form}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nome da categoria"
                    required
                    className={styles.input}
                />
                <Button name='Cadastrar' />
            </form>
        </main>
    )
}