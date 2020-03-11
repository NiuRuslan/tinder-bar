const router = require('express').Router();
const Person = require('../models/modelPerson'); // A.I. подключил модель монгоДБ


getChatName = (a, b) => {
  if (a > b) {
    return (a + '+' + b)
  } else {
    return (b + '+' + a)
  }
}

router.post('/', (req,res)=>{
const {ID1, ID2} = req.body;
const chat = getChatName(ID1,ID2)
console.log(chat)
const user =  Person.findOne({_id:ID1})
const user2 = Person.findOne({_id:ID2})
if(user.chats.includes(chat) && user2.chats.includes(chat)){
return res.send()
} else {
   Person.updateOne({_id:ID1},{$push: { chats:chat }})
   Person.updateOne({_id:ID2},{$push: { chats:chat }})
  res.send()
}
})
router.get('/:id',async (req,res)=>{
const id = req.params.id
const chats = (await Person.findOne({_id:id})).chats
  res.send({
    chats,
  })
  })


module.exports = router;
