import { useEffect, useState } from 'react'
import { get } from '../helperfunctions/get'
import { API_URL, GET_CUSTOMER } from '../constants/constants'
import { CustomerResponse, ExisitingCustomer } from '../models/Customer'
import ClipLoader from 'react-spinners/ClipLoader'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface ICustomerInfo {
    customerID: string
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AdminCustomer = ({ customerID }: ICustomerInfo) => {
    const [isLoading, setIsLoading] = useState(false)
    const [customer, setCustomer] = useState<ExisitingCustomer>(new ExisitingCustomer("", "", "", "", ""))
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        fetchCustomer(customerID)
    }
    const handleClose = () => setOpen(false);


    const fetchCustomer = async (customerID: string) => {
        console.log(customerID)
        try {

            setIsLoading(true)

            console.log("im fetching")
            const res = await get<CustomerResponse[]>(`${API_URL}${GET_CUSTOMER}${customerID}`)
            console.log(JSON.stringify(res))
            const customer = res.data[0]
            setCustomer(new ExisitingCustomer(customer.id, customer.name, customer.lastname, customer.email, customer.phone))
            console.log("this is custmomer" + customer.email)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <Button onClick={handleOpen}>Open Customer</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                {!customer ? <ClipLoader /> :
                    <Fade in={open}>

                        <Box sx={style}>

                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                Name: {customer.name}
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                Lastname: {customer.lastname}
                                Telephone: {customer.phone}
                                Email: {customer.email}
                            </Typography>

                        </Box>

                    </Fade>
                }
            </Modal>
        </div>
    );
}

export default AdminCustomer
