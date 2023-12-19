
import axios from "axios";
import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { MongoClient, ObjectId } from "mongodb";
//import clientPromise from "@/lib/mongodb";
import clientPromise from '../../lib/mongodb';
import { getCustomers } from "../api/customers";
import { useQuery } from "@tanstack/react-query";
// six times slower
//import { Button } from "@mui/material";

import Customer from "@/components/Customer";

export type Customer = {
    _id?: ObjectId,
    name: string,
    industry: string
}

type GetCustomerResponse = {
    customers: Customer[];
}

export const getStaticProps: GetStaticProps = async (context) => {
    
    const data = await getCustomers()
    return {
        props: {
            //customers: result.data.customers
            customers: data,
        },
        revalidate: 60,    
    }
}

const Customers: NextPage = ({ c }: InferGetStaticPropsType<typeof getStaticProps>) => {

    const { data: { data: { customers = [] } = {} } = {} } = useQuery({queryKey:['customers'], queryFn:() => {
        return axios('/api/customers')},
        initialData: c
        // initialData: {
        //     data: {
        //         customers: c,
        //     }
        // }
    })
    if (customers){
    return ( 
    <>
     <h1>Customers</h1>
     {customers.map((customer: Customer) =>{
        return (
            <Customer customer={customer} />
        )
     })}
     </>
    )
    }
    return null
}

export default Customers