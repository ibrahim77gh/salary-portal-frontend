/* eslint-disable no-unused-vars */
import logo from "/unikrew-logo.png"
import { useEffect, useState } from "react"
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Badge
} from '@chakra-ui/react'
import {
  FiTrendingUp,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiUser,
  FiHome,
  FiUpload,
} from 'react-icons/fi'
import { Outlet, useNavigate } from "react-router-dom"
import { useRetrieveNotificationQuery, useMarkNotificationReadMutation } from "../../redux/features/salaryApiSlice"

const LinkItems = [
  { name: 'Home', icon: FiHome, route: '/dashboard/home' },
  { name: 'Employees', icon: FiUser, route: '/dashboard/employee' },
  { name: 'Salary Slips', icon: FiTrendingUp, route: '/dashboard/salary-slip' },
  { name: 'Uploads', icon: FiUpload, route: '/dashboard/uploads' },
  // { name: 'Favourites', icon: FiStar },
  // { name: 'Settings', icon: FiSettings },
]

// eslint-disable-next-line react/prop-types
const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" my={10} alignItems="center" mx="8" justifyContent="space-between">
        <img className="w-32 h-32 mr-2" src={logo} alt="logo"></img>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} route={link.route}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

// eslint-disable-next-line react/prop-types
const NavItem = ({ icon, route, children, ...rest }) => {

  const navigate = useNavigate()

  return (
    <Box
      as="a"
      onClick={() => { navigate(route) }}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

// eslint-disable-next-line react/prop-types
const MobileNav = ({ onOpen, ...rest }) => {
  const { data: notifications, isFetching, refetch } = useRetrieveNotificationQuery();
  const [markNotificationRead] = useMarkNotificationReadMutation()
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    if (!isFetching && notifications) {
      setUnreadCount(notifications.filter(notification => !notification.read).length)
    }
  }, [notifications])

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Menu>
          <MenuButton
            as={IconButton}
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={
              <Box position="relative">
                <FiBell />
                {unreadCount > 0 && (
                  <Badge
                    colorScheme="red"
                    position="absolute"
                    top="-2.5"
                    right="-2.5"
                    borderRadius="full"
                    fontSize="0.7em"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Box>
            }
            position="relative"
            onClick={() => { if (unreadCount > 0) { markNotificationRead() } }}
          >
          </MenuButton>
          <MenuList
            bg={useColorModeValue('white', 'gray.900')}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            maxHeight="300px"
            overflowY="auto">
            <Text fontWeight="bold" px="4" py="2">Notifications</Text>
            <MenuDivider />
            {isFetching ? (
              <Spinner size="lg" alignSelf="center" m="4" />
            ) : notifications.length === 0 ? (
              <Text px="4" py="2">No new notifications</Text>
            ) : (
              notifications.map(notification => (
                <MenuItem key={notification.id}>
                  <VStack align="flex-start" spacing="1px">
                    <Text fontSize="sm">{notification.message}</Text>
                    <Text fontSize="xs" color="gray.500">
                      {new Date(notification.created_at).toLocaleString()}
                    </Text>
                  </VStack>
                </MenuItem>
              ))
            )}
          </MenuList>
        </Menu>

        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
        {/* Content */}
      </Box>
    </Box>
  )
}

export default SidebarWithHeader
