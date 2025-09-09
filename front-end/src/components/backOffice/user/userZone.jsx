import './userZone.css'
 import { Outlet } from "react-router-dom";
const UserZone=()=>{
    return(
        <div className="userZone-layout">
          <Outlet/>

        </div>
    )
}
export default UserZone;