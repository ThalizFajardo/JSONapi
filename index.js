//Para usar el .gitignore
//primero tines que inciar un repositorio

// importar las librerias que vamos a usar
// http, path, fs (leyendo archivos)

const http = require("http");
const path = require("path");
const fs = require("fs/promises");
const { writeFile } = require("fs");


const PORT = 8000;

const app = http.createServer(async (request, response) => {
    const method = request.method;
    const url = request.url;

    const getById = async (id) => {
        try {
            id = parseInt(id);
            const elements = await jsonFile;
            return jsonFile.find(json => json.id === id);
        } catch (error) {
            console.log(error);
        }
        console.log(jsonFile);
    }


    if (url === "/tasks") {
        const jsonPath = path.resolve("./data.json");
        const jsonFile = await fs.readFile(jsonPath, "utf8");


        if (request.method === "GET") {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(jsonFile);
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
            request.on("data", (data) => {
                const newTask = JSON.parse(data.toString());
                // const arr = JSON.parse(jsonFile);
                // arr.push(newTask);
                //fs.writeFile(jsonPath, JSON.stringify(arr));
                console.log(newTask);
            });
            response.writeHead(201, { 'Content-Type': 'application/json' });
        }



    }

    response.end();
});

app.listen(PORT);

//console.log("servidor corriendo");