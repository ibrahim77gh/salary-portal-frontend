import { BrowserRouter, Route, Routes } from "react-router-dom"

import SignUp from "./routes/sign-up"
import SignIn from "./routes/sign-in"
import SidebarWithHeader from "./routes/sidebar"
import RequireAuth from "./components/utils/RequireAuth"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp/>}></Route>
        <Route path="/login" element={<SignIn/>}></Route>
        {/* <Route element={<RequireAuth />}> */}
          <Route path="/dashboard" element={<SidebarWithHeader/>}></Route>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
