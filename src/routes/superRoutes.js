import { useSelector } from 'react-redux'
import { useLocation, Navigate } from 'react-router-dom'
import role from '../cofig/role'

const SuperRoutes = ({ children }) => {
  const { userInfo } = useSelector((state) => state.userLogin)

  let location = useLocation()


  if (userInfo?.role !== role.SUPER_ROLE) {
    return <Navigate to='/' state={{ from: location }} replace />
  }

  return children
}

export default SuperRoutes
