 import {LOGIN, LOGOUT} from './action-types'

 export const LogIn = () =>({
   type:LOGIN
 })

 export const LogOut = () =>({
  type:LOGOUT
})


 export default {
   LogIn,
   LogOut
 }
