import { Navigate, Route, Routes } from "react-router-dom"

import { Employee } from "../../../pages/Employee/Employee"


export const RoutesApp = () => {
  return (
    <>
      <Routes >
        <Route path="home" element={<Employee />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </>
  )
}
