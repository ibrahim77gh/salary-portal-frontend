import { useNavigate, useParams } from 'react-router-dom';
import { useActivationMutation } from '../../redux/features/authApiSlice';
import { useToast, Button, Flex, Center, Stack, useColorModeValue, Heading } from '@chakra-ui/react';

export default function ActivateEmail() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [activation, {isLoading}] = useActivationMutation();
  const toast = useToast();

  const activateAccount = () => {
    activation({ uid, token })
      .unwrap()
      .then(() => {
        toast({
          title: 'Account Activated Successfully',
          description: 'You can now login to your account!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: 'Failed to activate account',
          description: 'Please try again!',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        navigate('/login');
      });
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'sm'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={10}>
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Activate your account
          </Heading>
        </Center>
        <Stack spacing={6}>
          <Button
            onClick={activateAccount}
            isLoading={isLoading}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}>
            Activate
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
