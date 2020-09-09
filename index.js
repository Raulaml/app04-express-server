import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

const port = 5000;

app.use(bodyParser.json());//cosumir cosas
app.use(cors());

const tacos = [
    {
        id: 1,
        name: 'de asada',
        quantity: 5,
        pica: 'no'
    },
    {
        id: 2,
        name: 'al pastor',
        quantity: 4,
        pica: 'si'
    },
    {
        id: 3,
        name: 'cabeza',
        quantity: 6,
        pica: 'no'
    }
];

//Metodo GET o Obtener
app.get('/', (request, response) =>{
    response.send(tacos);
});

app.get('/:id', (request, response) =>{
    const {id} = request.params;
    const taco = tacos.find(taco => taco.id == id);
    response.send(taco);
});

/*app.get('/:name', (request, response) =>{
    const {name} = request.params;
    const taco = tacos.find(taco => taco.name == name);
    response.send(taco);
});*/

//agregar taco
//CREATE
app.post('/', (request, response) =>{
    const taco = request.body;
    const {name, quantity, pica} = request.body;
    taco.id = tacos.length + 1;
    tacos.push(taco);
    response.send(taco);
});

//UPDATE
app.put('/:id', (request, response) =>{
    //buscas lo que vas a actualizar
    const {id} = request.params;
    const taco = tacos.find(taco => taco.id == id);
//pides los cambios al body
    const {name, quantity, pica} = request.body;
    //aplicar los cambios
    taco.name = name;
    taco.quantity = quantity;
    taco.pica = pica;
    //mostrar cambios
    response.send(taco);
});

//DELETE
app.delete('/', (request, response) =>{
    const{id} = request.params;
    tacos.filter(taco => taco.id != id);
    response.send(tacos);
});

app.listen(port, ()=> console.log(`Server started at: http://localhost:${port}`));