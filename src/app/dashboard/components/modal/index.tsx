'use client'
import styles from './styles.module.scss'
import { X } from 'lucide-react'
import { use } from 'react'
import { OrderContext } from '@/providers/order'
import { parse } from 'path'
import { calculateTotalOrder } from '@/lib/helper'
import Image from 'next/image'
export function ModalOrder() {
    const { onRequestClose, order, finishOrder } = use(OrderContext);

    async function handleFinishOrder() {
        await finishOrder(order[0].order_id)
    }


    return (
        <dialog className={styles.dialogContainer}>
            <section className={styles.dialogContent}>
                <button
                    onClick={onRequestClose} className={styles.dialogBack}>
                    <X size={24} color='#ff3f4b' />
                </button>

                <article className={styles.container}>
                    <h2>Detalhes do pedido</h2>

                    <span className={styles.table}>
                        Mesa <b>{order[0].order.table}</b>
                    </span>

                    {order[0].order?.name && (
                        <span className={styles.name}>
                            <b>{order[0].order.name}</b>
                        </span>
                    )}

                    {order.map(item => (
                        <section className={styles.item} key={item.id}>
                            {/* <Image
                                src={item.product.banner}
                                width={80}
                                height={80}
                                alt="Foto do produto" /> */}
                            <span>
                                Qtd: {item.amount} - <b>{item.product.name}</b> - R$ {parseFloat(item.product.price) * item.amount}
                            </span>
                            <span className={styles.description}>
                                {item.product.description}
                            </span>
                        </section>
                    ))}

                    <h3 className={styles.total}>Valor total da Mesa: R$ {calculateTotalOrder(order)}</h3>



                    <button onClick={handleFinishOrder} className={styles.buttonOrder}>
                        Concluir pedido
                    </button>
                </article>
            </section>
        </dialog>
    )
}