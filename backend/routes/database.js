const router = require('express').Router();
const Person = require('../models/modelPerson'); // A.I. подключил модель монгоДБ

router.post('/',async (req,res)=>{
const {ID1, ID2} = req.body;
const chat = ID1+ID2;
// const user = await Person.findOne({_id:ID1})
// const user2 = await Person.findOne({_id:ID2})
// if(user.chats.includes(chat)&&user2.chats.includes(chat)){
// return res.send({
//   chat:chat,
// })
// } else {
//   await Person.updateOne({_id:ID1},{$push: { chats:chat }})
//   await Person.updateOne({_id:ID2},{$push: { chats:chat }})
//   res.send({
//     chat
//   })
// }
res.send({
  chat,
})
})
router.get('/:id',async (req,res)=>{
const id = req.params.id
const chats = (await Person.findOne({_id:id})).chats
  res.send({
    chats,
  })
  })


module.exports = router;
