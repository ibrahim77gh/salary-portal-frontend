import { BrowserRouter, Route, Routes } from "react-router-dom"

import SignUp from "./routes/sign-up"
import SignIn from "./routes/sign-in"
import SidebarWithHeader from "./routes/sidebar"
import TableData from "./routes/TableData"
import SalarySlip from "./routes/Salary-Slip"
import Home from "./routes/Home/Home"
import PasswordReset from "./routes/password-reset"
import ActivateEmail from "./routes/activate-email"
import PasswordResetConfirm from "./routes/pasword-reset-confirm"
import { PrivateRoutes } from "./components/utils"

import { useRetrieveEmployeeQuery } from "./redux/features/salaryApiSlice"

function App() {

  // eslint-disable-next-line no-unused-vars
  const { data: employees, isFetching, refetch } = useRetrieveEmployeeQuery();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp/>}></Route>
        <Route path="/login" element={<SignIn/>}></Route>
        <Route path="/password-reset" element={<PasswordReset/>}></Route>
        <Route
          path="/activate/:uid/:token"
          element={<ActivateEmail />}
        ></Route>
        <Route
          path="/password/reset/confirm/:uid/:token"
          element={<PasswordResetConfirm />}
        ></Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<SidebarWithHeader/>}>
            <Route path="home" element={<Home />} />
            <Route path="employee" element={<TableData data={employees} />} />
            <Route path="salary-slip" element={<SalarySlip />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
