 import {LOGIN, LOGOUT} from './action-types'

 export const LogIn = (id,nickname,profildId) =>({
   type:LOGIN,
   id,
   nickname,
   profildId,
 })

 export const LogOut = () =>({
  type:LOGOUT
})


 export default {
   LogIn,
   LogOut
 }
