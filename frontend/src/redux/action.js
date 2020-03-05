 import {LOGIN, LOGOUT} from './action-types'

 export const LogIn = (id,nickname) =>({
   type:LOGIN,
   id,
   nickname,
 })

 export const LogOut = () =>({
  type:LOGOUT
})


 export default {
   LogIn,
   LogOut
 }
