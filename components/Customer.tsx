import Button from "@mui/material/Button";
import Info from "@mui/icons-material/Info";
import PersonIcon from '@mui/icons-material/Person'
import Tooltip from '@mui/material/Tooltip'
import { Customer } from "@/pages/customers";

const Customer = ({customer}: { customer: Customer }) => {
    return (
        <div key={customer._id?.toString()} style={{ marginBottom: 40 }}>
        <span style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap'
        }}>
        <Tooltip title={customer._id?.toString()}>
            <PersonIcon fontSize="small" style={{ marginRight:5, padding: 5 }} />
        </Tooltip>
        <p>{customer.name}</p>
        </span>
        <p>{customer.industry}</p>
        <Button variant="contained">View Orders</Button>
        <Info />
    </div>
    )
}

export default Customer