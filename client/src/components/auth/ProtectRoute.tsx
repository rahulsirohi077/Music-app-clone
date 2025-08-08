import { Navigate, Outlet } from 'react-router-dom'
import { ProtectRouteProps } from '../../types'

const ProtectRoute = ({children,user,redirect='/login'}:ProtectRouteProps) => {
  if(!user){
    return <Navigate to={redirect}/>
  }
  return children ? children : <Outlet/>
}

export default ProtectRoute