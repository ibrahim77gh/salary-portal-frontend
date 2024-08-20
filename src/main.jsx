import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CustomProvider from './redux/provider.jsx'
import Setup from './components/utils/Setup.jsx'
import { ChakraProvider } from '@chakra-ui/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CustomProvider>
      <ChakraProvider>
        <Setup></Setup>
        <App />
      </ChakraProvider>
    </CustomProvider>
  </StrictMode>,
)
