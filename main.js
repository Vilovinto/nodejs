const express = require('express');
const {userService} = require("./services/user_service");
const {userRepository} = require("./repositories/user_repository");


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/users', async (req,res)=>{
    const data = await userService.getAll();
    res.json(data)
})

app.get('/users/:id', async (req,res)=>{
    const id = req.params.id;
    const data = await userRepository.getById(id);
    res.json(data)
})

app.post('/users', async (req, res) => {
    const user = req.body;
    const data = await userService.create(user);
    res.json(data)
})

app.put('/users/:id', async (req,res)=>{
    const user = req.body;
    const {id} = req.params;
    const data = await userService.updateById(id, user);
    res.json(data)
})

app.delete('/users/:id', async (req,res)=>{
    const {id} = req.params;
    await userService.deleteById(id)
    res.end()
})

app.listen(5000, () =>{
    console.log('server running on 5000 port');
})

