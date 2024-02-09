import { Button, FormControl, FormLabel, Input, VStack, useToast } from "@chakra-ui/react"
import * as Yup from "yup"
import { addEmployee } from "../redux-toolkit/empSlice"
import { useDispatch } from "react-redux"
import { useFormik } from "formik"
import { useState } from "react"
const InsertEmployee = () => {
    const dispatch = useDispatch()
    const toast = useToast()
    const [image, setImage] = useState(null)
    const formik = useFormik({
        initialValues: {
            name: "",
            salary: "",
            designation: "",
            address: "",
            avatar: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            salary: Yup.number().required(),
            designation: Yup.string().required(),
            address: Yup.string().required(),
        }),
        onSubmit: values => {
            if(image===null){
                values.avatar = "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png" 
            }
            else{
                values.avatar = image;
            }
            toast({
                title: 'Employee Inserted',
                description: `${values.name} is registered`,
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            dispatch(addEmployee(values))
            formik.resetForm()
        }
    })
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }


    return (


        <>

            <form id="myform" name="myform" onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input isInvalid={formik.touched.name && formik.errors.name ? true : false} onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} id="name" type='name' />
                    {formik.touched.name && formik.errors.name ? (
                        <p className="text-danger">{formik.errors.name}</p>
                    ) : null}
                </FormControl>
                <FormControl>
                    <FormLabel>Salary</FormLabel>
                    <Input isInvalid={formik.touched.salary && formik.errors.salary ? true : false} onBlur={formik.handleBlur} value={formik.values.salary} onChange={formik.handleChange} id="salary" type='number' />
                    {formik.touched.salary && formik.errors.salary ? (
                        <p className="text-danger">{formik.errors.salary}</p>
                    ) : null}
                </FormControl>
                <FormControl>
                    <FormLabel>Designation</FormLabel>
                    <Input isInvalid={formik.touched.designation && formik.errors.designation ? true : false} onBlur={formik.handleBlur} value={formik.values.designation} onChange={formik.handleChange} id="designation" type='text' />
                    {formik.touched.designation && formik.errors.designation ? (
                        <p className="text-danger">{formik.errors.designation}</p>
                    ) : null}
                </FormControl>
                <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Input isInvalid={formik.touched.address && formik.errors.address ? true : false} onBlur={formik.handleBlur} value={formik.values.address} onChange={formik.handleChange} id="address" type='text' />
                    {formik.touched.address && formik.errors.address ? (
                        <p className="text-danger">{formik.errors.address}</p>
                    ) : null}
                </FormControl>
                <FormControl>
                    <FormLabel>Upload your image</FormLabel>
                    <input id="avatar" onChange={onImageChange} className="form-control" type='file' accept="image/png, image/jpeg" />
                </FormControl>

                <VStack>
                    <Button marginTop={5} type="submit" colorScheme='teal' size='md'>
                        Submit
                    </Button>
                </VStack>

            </form>

        </>
    )
}

export default InsertEmployee
