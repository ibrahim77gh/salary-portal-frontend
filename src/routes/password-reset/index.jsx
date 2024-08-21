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
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { useResetPasswordConfirmMutation } from '../../redux/features/authApiSlice'
import logo from '/unikrew-logo.png'
import Spinner from '../../components/Spinner'

const validationSchema = Yup.object({
  new_password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('New Password is required'),
  re_new_password: Yup.string()
    .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
    .required('Confirm New Password is required'),
})

export default function PasswordResetConfirm() {
  const navigate = useNavigate()
  const { uid, token } = useParams()
  const [resetPasswordConfirm, { isLoading }] = useResetPasswordConfirmMutation()
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      new_password: '',
      re_new_password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      resetPasswordConfirm({ uid, token, ...values })
        .unwrap()
        .then(() => {
          toast({
            title: 'Password Reset Successful',
            description: 'Your password was reset! You can now log in with your new password.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
          navigate('/login')
        })
        .catch((error) => {
          if (error.data) {
            Object.keys(error.data).forEach((field) => {
              const errorMessage = error.data[field]
              toast({
                title: 'Failed to reset password',
                description: errorMessage,
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
            })
          } else {
            toast({
              title: 'Failed to reset password',
              description: 'Please try again!',
              status: 'error',
              duration: 5000,
              isClosable: true,
            })
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
          <Heading fontSize={'2xl'}>
            Reset your Password
          </Heading>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="new_password" isInvalid={!!formik.errors.new_password}>
                <FormLabel>New Password</FormLabel>
                <Input
                  type="password"
                  name="new_password"
                  value={formik.values.new_password}
                  onChange={formik.handleChange}
                  placeholder="Enter new password"
                />
                {formik.errors.new_password && (
                  <Text color="red.500" fontSize="sm">
                    {formik.errors.new_password}
                  </Text>
                )}
              </FormControl>
              <FormControl id="re_new_password" isInvalid={!!formik.errors.re_new_password}>
                <FormLabel>Confirm New Password</FormLabel>
                <Input
                  type="password"
                  name="re_new_password"
                  value={formik.values.re_new_password}
                  onChange={formik.handleChange}
                  placeholder="Confirm new password"
                />
                {formik.errors.re_new_password && (
                  <Text color="red.500" fontSize="sm">
                    {formik.errors.re_new_password}
                  </Text>
                )}
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                variant="solid"
                isLoading={isLoading}
                bgColor={'#0a1a33'}
              >
                {isLoading ? <Spinner /> : 'Reset'}
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Reset Password Image'}
          objectFit={'cover'}
          src={
            'https://media.licdn.com/dms/image/v2/C4D1BAQG3hQrqEO28cw/company-background_10000/company-background_10000/0/1642756752569/unikrewproduction_cover?e=2147483647&v=beta&t=7iDfcAZPnDrsddVfJmdU7HVBCwBW2IGncINzGvu1YgU'
          }
        />
      </Flex>
    </Stack>
  )
}
