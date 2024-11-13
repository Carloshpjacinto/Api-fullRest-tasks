import http from 'http'
import { v4 } from 'uuid';

const port = 3000

const tasks = [

    {
        id: v4(),
        nameTasks: "Estudar",
        completed: false
    }
]

const server = http.createServer((req, res) => {

    const {method, url} = req;

    if(url == "/tasks" && method == "GET"){

        res.writeHead(200, {"Content-type": "application/json"});
        res.end(JSON.stringify(tasks))
    }
})

server.listen(port, () => {

    console.log(`Server running on port ${port}`)
})
