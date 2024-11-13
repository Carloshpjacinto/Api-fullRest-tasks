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

        if(url == "/tasks" && method == "GET"){

            res.writeHead(200, {"Content-type": "application/json"});
            res.end(JSON.stringify(tasks))

        }else if(url == "/tasks" && method == "POST"){

            const {nameTask, completed} = JSON.parse(body)

            const newTask = {id: v4(), nameTask, completed};

            tasks.push(newTask)

            res.writeHead(201, {"Content-type": "application/json"})
            res.end(JSON.stringify(newTask))
        }
    })
})

server.listen(port, () => {

    console.log(`Server running on port ${port}`)
})
