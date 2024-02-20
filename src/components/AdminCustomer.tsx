import { useState } from 'react'
import { get } from '../helperfunctions/get'
import { API_URL, EDIT_CUSTOMER, GET_CUSTOMER } from '../constants/constants'
import { CustomerResponse, EditCustomer, ExisitingCustomer } from '../models/Customer'
import ClipLoader from 'react-spinners/ClipLoader'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { putCustomer } from '../helperfunctions/putCustomer'
import { toast } from "react-toastify";
import { modalStyle } from '../styles/modalstyle'

interface ICustomerInfo {
    customerID: string
}

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
            const res = await get<CustomerResponse[]>(`${API_URL}${GET_CUSTOMER}${customerID}`)
            const customer = res.data[0]
            setCustomer(new ExisitingCustomer(customer._id, customer.name, customer.lastname, customer.email, customer.phone))
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value })
    }

    const onSubmit = async () => {
        try {
            await putCustomer<EditCustomer>(`${API_URL}${EDIT_CUSTOMER}${customer.id}`, 
            {
                "id": customer.id,
                "name": customer.name,
                "lastname": customer.lastname,
                "email": customer.email,
                "phone": customer.phone
              }
            )
            toast.success("Customer details updated successfully!")
        }
        catch (Err) {
            console.log(Err)
            toast.error("Customer details updated unsuccessfully!" + Err)
        }
        handleClose()
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
                {isLoading ? <ClipLoader /> :
                    <Fade in={open}>
                        <Box sx={modalStyle}>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                Details associated with your booking
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                <label className="input input-bordered flex items-center gap-2 mb-2">
                                    Name
                                    <input name="name" onChange={(e) => handleChange(e)} type="text" className="grow" placeholder={customer.name} />
                                </label>
                                <label className="input input-bordered flex items-center gap-2 mb-2">
                                    Lastname
                                    <input name="lastname" onChange={(e) => handleChange(e)} type="text" className="grow" placeholder={customer.lastname} />
                                </label>
                                <label className="input input-bordered flex items-center gap-2 mb-2">
                                    Telephone
                                    <input name="phone" onChange={(e) => handleChange(e)} type="text" className="grow" placeholder={customer.phone} />
                                </label>
                                <label className="input input-bordered flex items-center gap-2 mb-2">
                                    Email
                                    <input name="email" onChange={(e) => handleChange(e)} type="text" className="grow" placeholder={customer.email} />
                                </label>
                                <Button onClick={onSubmit} children={'Change'} size={'medium'} color={'primary'} />
                                <Button onClick={handleClose} children={'Cancel'} size={'medium'} color={'error'} />
                            </Typography>
                        </Box>
                    </Fade>
                }
            </Modal>
        </div>
    );
}

export default AdminCustomer
