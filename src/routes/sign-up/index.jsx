'use client'

import {
    Button,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
    useToast,
} from '@chakra-ui/react'
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRegisterMutation } from "../../redux/features/authApiSlice";
import Spinner from "../../components/Spinner";
import logo from '/unikrew-logo.png'

export default function SignUp() {
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();
    const toast = useToast();

    const validationSchema = Yup.object({
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('Last Name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        re_password: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            re_password: '',
        },
        validationSchema,
        onSubmit: (values) => {
            register(values)
                .unwrap()
                .then(() => {
                    toast({
                        title: 'Account Created Successfully',
                        description: 'Please check your email to activate your account!',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    });
                    navigate('/login');
                })
                .catch((error) => {
                    console.log(error);
                    toast({
                        title: 'This account already exists',
                        description: 'Please try again!',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    })
                });
        },
    });

    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Flex justify={'center'} mb={6}>
                        <Image src={logo} alt="logo" boxSize="100px" />
                    </Flex>
                    <Heading fontSize={'2xl'}>Sign up for an account</Heading>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl id="first_name" isInvalid={formik.errors.first_name}>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                type="text"
                                name="first_name"
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.first_name && (
                                <Text color="red.500">{formik.errors.first_name}</Text>
                            )}
                        </FormControl>

                        <FormControl id="last_name" isInvalid={formik.errors.last_name}>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                type="text"
                                name="last_name"
                                value={formik.values.last_name}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.last_name && (
                                <Text color="red.500">{formik.errors.last_name}</Text>
                            )}
                        </FormControl>

                        <FormControl id="email" isInvalid={formik.errors.email}>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.email && (
                                <Text color="red.500">{formik.errors.email}</Text>
                            )}
                        </FormControl>

                        <FormControl id="password" isInvalid={formik.errors.password}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.password && (
                                <Text color="red.500">{formik.errors.password}</Text>
                            )}
                        </FormControl>

                        <FormControl id="re_password" isInvalid={formik.errors.re_password}>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input
                                type="password"
                                name="re_password"
                                value={formik.values.re_password}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.re_password && (
                                <Text color="red.500">{formik.errors.re_password}</Text>
                            )}
                        </FormControl>

                        <Stack mt={5} spacing={6}>

                            <Button
                                type="submit"
                                colorScheme="blue"
                                variant={'solid'}
                                isLoading={isLoading}
                                spinner={<Spinner />}
                                bgColor={'#0a1a33'}
                            >
                                Sign Up
                            </Button>
                            <Text>Already have an account?<Link to={'/login'}> Sign In</Link></Text>
                        </Stack>
                    </form>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt={'Signup Image'}
                    objectFit={'cover'}
                    src={
                        'https://media.licdn.com/dms/image/v2/C4D1BAQG3hQrqEO28cw/company-background_10000/company-background_10000/0/1642756752569/unikrewproduction_cover?e=2147483647&v=beta&t=7iDfcAZPnDrsddVfJmdU7HVBCwBW2IGncINzGvu1YgU'
                    }
                />
            </Flex>
        </Stack>
    )
}
