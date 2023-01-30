import { Server } from "..";

const server = new Server();

server.use("/", (req, res, next) => {
    res.json(req.query);
});

server.get("/:id", (req, res, next) => {
    res.end(`Hello ${req.params.id}!`);
});

server.listen(2000);