

import axios, { AxiosError } from "axios";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { Customer } from './index'
import { ParsedUrlQuery} from 'querystring'
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { BSONError } from 'bson';
import { getCustomer } from "../api/customers/[id]";
//import { notFound } from "next/navigation";



type Props = {
    customer?: Customer
}

interface Params extends ParsedUrlQuery {
    id: string
}

export const getStaticPaths: GetStaticPaths = async (context) => {
    // const result = await axios.get('http://127.0.0.1:8000/api/customers')

    // const paths = result.data.customers.map((customer: Customer) => {
    //     return { params: { id: customer.id.toString() } }
    // })

    return {
        paths: [],
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
    const params = context.params!
    
    try {

    //const result = await axios.get<{customer: Customer}>(`http://127.0.0.1:8000/api/customers/${params.id}`)
    // const mongoClient = await clientPromise

    // const data = await mongoClient
    // .db()
    // .collection('customers')
    // .findOne({ "_id": new ObjectId(params.id) }) as Customer

    const data = await getCustomer(params.id)

    console.log('!!!',data)

    if (!data) {
        return {
            notFound: true,
            revalidate: 60
        }
    }
    
    
    return {
        props: {
            customer: JSON.parse(JSON.stringify(data)),
        },
        revalidate: 60,
    }

    } catch (err) {
        if (err instanceof BSONError){
                return {
                    notFound: true,
                }
        }
        throw err;
    }
};

const Customers: NextPage<Props> = (props) => {
    const router = useRouter()
    if (router.isFallback) {
        return <p>Loading...</p>
    }
    return <h1>{props.customer ? "Customers is " + props.customer.name : null}</h1>
}

export default Customers