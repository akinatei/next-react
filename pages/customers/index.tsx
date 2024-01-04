
import axios from "axios";
import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { MongoClient, ObjectId } from "mongodb";
//import clientPromise from "@/lib/mongodb";
import clientPromise from '../../lib/mongodb';
import { getCustomers } from "../api/customers";
import { useQuery } from "@tanstack/react-query";
// six times slower
//import { Button } from "@mui/material";

//import Customer from "@/components/Customer";
import CustomerComponent from '../../components/Customer';
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

export type Order = {
    description: string;
    price: { $numberDecimal: string };
    _id: ObjectId;
}

export type Customer = {
    _id?: ObjectId,
    name: string,
    industry: string
    orders?: Order[]
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
    <Container>
    <Grid container spacing={5} sx={{ mt: 1 }}>
     {customers.map((customer: Customer) =>{
        return (
            <CustomerComponent key={customer._id?.toString()} customer={customer} />
        )
     })}
     </Grid>
     </Container>
    )
    }
    return null
}

export default Customers