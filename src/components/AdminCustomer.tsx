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
    const [customerEdit, setCustomerEdit] = useState<ExisitingCustomer>(new ExisitingCustomer("", "", "", "", ""))
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
            console.log(JSON.stringify(customer))
            setCustomer(new ExisitingCustomer(customer._id, customer.name, customer.lastname, customer.email, customer.phone))
            console.log(typeof (customerID) + "is this")
            console.log("this is custmomer id" + customer._id)

            setIsLoading(false)
            setCustomerEdit(new ExisitingCustomer(customer._id, customer.name, customer.lastname, customer.email, customer.phone))
        } catch (error) {
            console.log(error)
        }
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerEdit({ ...customerEdit, [e.target.name]: e.target.value })
        console.log(JSON.stringify("customer edit is " + JSON.stringify(customerEdit)))
    }

    const onSubmit = async () => {
        try {
            const res = await putCustomer<EditCustomer>(`${API_URL}${EDIT_CUSTOMER}${customerEdit._id}`, 
            {
                //ignore this for now
                "id": customerEdit._id,
                "name": customerEdit.name,
                "lastname": customerEdit.lastname,
                "email": customerEdit.email,
                "phone": customerEdit.phone
              }

            )
            console.log("this is res data putcust" + res.data)
        }
        catch (Err) {
            console.log(Err)
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
                {!customer ? <ClipLoader /> :
                    <Fade in={open}>

                        <Box sx={style}>

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
