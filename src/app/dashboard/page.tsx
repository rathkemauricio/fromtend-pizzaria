import { Orders } from "./components/orders"
import { api } from "@/services/app"
import { getCookieServer } from "@/lib/cookieServer";
import { OrderProps } from "@/lib/order.type";
import { promises } from "dns";


async function getOrders(): Promise<OrderProps[] | []> {
    try {
        const token = await getCookieServer();

        const response = await api.get("/orders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data || [];

    } catch (error) {
        console.log(error);
        return [];
    }
}


export default async function Dashboard() {

    const orders = await getOrders();
    
    console.log(orders);
    
    return (
        <>
            <Orders orders={orders} />
        </>
    )
}