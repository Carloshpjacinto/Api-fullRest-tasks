import http from 'http'
import { v4 } from 'uuid';

const port = 3000

const tasks = [

    {
        id: v4(),
        nameTask: "Estudar",
        completed: false
    }
]

const server = http.createServer((req, res) => {

    const {method, url} = req;

    let body = ""

    req.on("data", chunk => {

        body += chunk.toString();
    })

    req.on("end", () => {

        const id = url.split("/")[2]

        if(url == "/tasks" && method == "GET"){

            res.writeHead(200, {"Content-type": "application/json"});
            res.end(JSON.stringify(tasks))

        }else if(url == "/tasks" && method == "POST"){

            const {nameTask, completed} = JSON.parse(body)

            const newTask = {id: v4(), nameTask, completed};

            tasks.push(newTask)

            res.writeHead(201, {"Content-type": "application/json"})
            res.end(JSON.stringify(newTask))

        }else if(url.startsWith("/tasks/") && method == "PUT"){

            const {completed} = JSON.parse(body)
            const taskUpdate = tasks.find((tasks) => tasks.id == id)

            if(taskUpdate){

                taskUpdate.completed = completed

                res.writeHead(200, {"Content-type": "application/json"});
                res.end(JSON.stringify(taskUpdate));

            }else{

                res.writeHead(404, {"Content-type": "application/json"});
                res.end(JSON.stringify({menssage: "Grade not found"}))
            }

        }else if(url.startsWith("/tasks/") && method == "DELETE"){

            const verificationId = tasks.findIndex((task) => task.id == id)

            if(verificationId){

                tasks.splice(verificationId, 1);

                res.writeHead(204);
                res.end()

            }else{

                res.writeHead(404, {"Content-type": "application/json"});
                res.end(JSON.stringify({message: "Grade not found"}));
            }

        }else{

            res.writeHead(404, {"Content-type": "application/json"})
            res.end(JSON.stringify({message: "Route not found"}))
        }
    })
})

server.listen(port, () => {

    console.log(`Server running on port ${port}`)
})
