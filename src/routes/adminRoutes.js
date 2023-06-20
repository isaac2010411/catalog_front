import { useSelector } from 'react-redux'
import { useLocation, Navigate } from 'react-router-dom'
import role from '../cofig/role'

const AdminRoutes = ({ children }) => {
  const { userInfo } = useSelector((state) => state.userLogin)

  let location = useLocation()

  if (userInfo && ![role.ADMIN_ROLE, role.SUPER_ROLE].includes(userInfo.role)) {
    return <Navigate to='/' state={{ from: location }} replace />
  }

  return children
}

export default AdminRoutes
