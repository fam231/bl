const express = require('express')

const PORT = process.env.PORT || 3001

const app = express()

app.listen(PORT, () => {
    console.log(`server running op port ${PORT}`)
})

//Роуты
let lists = {
    baseList: [{ElementName:"Апельсин",bay_state: false},{ElementName:"Мандарин",bay_state: false},{ElementName:"Яблоко",bay_state: false }],
    allList:[
        {name: "works", mas_elements: [{ElementName:"Сходить",bay_state: false},{ElementName:"Заказать",bay_state: false},{ElementName:"Забить",bay_state: false }]},
        {name:  "byus", mas_elements: [{ElementName:"Апельсин",bay_state: false},{ElementName:"Мандарин",bay_state: false},{ElementName:"Яблоко",bay_state: false }]},
        {name:  "date", mas_elements: [{ElementName:"11",bay_state: false},{ElementName:"12",bay_state: true},{ElementName:"13",bay_state: false }]}
    ]
}

app.get('/lists', (req, res)=>{
    res.json(
        lists
    )
})