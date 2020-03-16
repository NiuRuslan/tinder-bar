const router = require('express').Router();
const Person = require('../models/modelPerson'); // A.I. подключил модель монгоДБ


getChatName = (a, b) => {
  if (a > b) {
    return (a + '+' + b)
  } else {
    return (b + '+' + a)
  }
}

router.post('/',async (req,res)=>{
const {ID1, ID2} = req.body;
const chat = getChatName(ID1,ID2)

const results = await Promise.all(
  [ID1, ID2].map(x => Person.findOne({_id:x}))
);
const user = results[0];

const check = user.chats.some(el=>el.chat===chat)
if(check){
return res.send()
} else {
  await Promise.all(
    [ID2, ID1].map((x,index) => Person.updateOne({_id:x},{$push: { chats:{chat:chat,nickname:results[index].nickname,date:new Date()}}}))
  )
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
