//importando...
const http = require("http");
const path = require("path");
const fs = require("fs/promises");
const { writeFile } = require("fs");
const { parse } = require("path");


const PORT = 8000;//localhost:8000

const app = http.createServer(async (request, response) => {
    const method = request.method;//=> devuelve el metodo de la peticion
    const url = request.url;//=> devuelve la url de la peticion

   
    if (url === "/tasks") {
        const jsonPath = path.resolve("./data.json");//=> obteniendo ruta
        const jsonFile = await fs.readFile(jsonPath, "utf8");//=>leyendo JSON..


        if (request.method === "GET") {
            response.write(jsonFile);
            response.writeHead(200, { 'Content-Type': 'application/json' });
        }

        if (method === "POST") {

            request.on("data", (data) => {
                const newTask = JSON.parse(data.toString());
                const arr = JSON.parse(jsonFile);
                arr.push(newTask);
                fs.writeFile(jsonPath, JSON.stringify(arr));
            });

            response.writeHead(201, { 'Content-Type': 'application/json' });
        }
        
        if (method === "PUT") {
            request.on("data", async (data) => {
                const toUpdate = JSON.parse(data);
                const jsonObject = JSON.parse(jsonFile);
                const JSONFilter = jsonObject.find(object => object.id === toUpdate.id);
                JSONFilter.status = toUpdate.status
                const filtered = JSON.stringify(jsonObject);
                fs.writeFile(jsonPath, filtered);
            });
            response.writeHead(201, { 'Content-Type': 'application/json' });
        }

        if (method === "DELETE") {
            request.on("data", async (data) =>{
                const toDelete = JSON.parse(data)
                const jsonObject = JSON.parse(jsonFile)
                const JSONFilter = jsonObject.filter( object => object.id !== toDelete.id )
                console.log(JSONFilter);
                const filtered = JSON.stringify(JSONFilter)
                  fs.writeFile(jsonPath, filtered) 
              })
              response.writeHead(201, { 'Content-Type': 'application/json' });
        }
        else{
            response.writeHead("503") ;
        }

    }

    response.end();
});

app.listen(PORT);

//console.log("servidor corriendo");