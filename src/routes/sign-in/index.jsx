'use client'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Text,
  useToast,
  Checkbox,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks'
import { useLoginMutation } from '../../redux/features/authApiSlice'
import { setAuth } from '../../redux/features/authSlice'
import Spinner from '../../components/Spinner'
import logo from '/unikrew-logo.png'

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
})

export default function SignIn() {
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useAppDispatch()
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      login(values)
        .unwrap()
        .then(() => {
          dispatch(setAuth())
          toast({
            title: 'Signed In Successfully',
            description: 'Welcome to HR Portal',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          navigate('/dashboard/home')
        })
        .catch((error) => {
          console.log(error)
          if (error.data) {
            // Iterate through error fields and display corresponding toast messages
            Object.keys(error.data).forEach((field) => {
              const errorMessage = error.data[field]
              console.log(errorMessage)
              // toast({
              //   title: 'Signed In Successfully',
              //   description: {errorMessage},
              //   status: 'success',
              //   duration: 5000,
              //   isClosable: true,
              // });
            })
          } else {
            // Display a generic error message
            console.log('Invalid Email or Password!')
          }
        })
    },
  })

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Flex justify={'center'} mb={6}>
            <Image src={logo} alt="logo" boxSize="100px" />
          </Flex>
          <Heading fontSize={'2xl'} >
            Login
          </Heading>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email" isInvalid={!!formik.errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="name@company.com"
                />
                {formik.errors.email && (
                  <Text color="red.500" fontSize="sm">
                    {formik.errors.email}
                  </Text>
                )}
              </FormControl>
              <FormControl id="password" isInvalid={!!formik.errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  placeholder="••••••••"
                />
                {formik.errors.password && (
                  <Text color="red.500" fontSize="sm">
                    {formik.errors.password}
                  </Text>
                )}
              </FormControl>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link to={'/password-reset'}><Text color={'blue.500'}>Forgot password?</Text></Link>
              </Stack>
              <Button
                type="submit"
                colorScheme="blue"
                variant="solid"
                isLoading={isLoading}
                bgColor={'#0a1a33'}
              >
                {isLoading ? <Spinner /> : 'Log in'}
              </Button>
              <Text textAlign={'center'}>
                Don’t have an account?{' '}
                <Button variant="link" colorScheme="blue" onClick={() => navigate('/')}>
                  Sign up here
                </Button>
              </Text>
            </Stack>
          </form>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://media.licdn.com/dms/image/v2/C4D1BAQG3hQrqEO28cw/company-background_10000/company-background_10000/0/1642756752569/unikrewproduction_cover?e=2147483647&v=beta&t=7iDfcAZPnDrsddVfJmdU7HVBCwBW2IGncINzGvu1YgU'
          }
        />
      </Flex>
    </Stack>
  )
}
