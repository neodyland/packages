import { Client } from "syutoku";

const client = new Client({
    baseURL: "https://httpbin.org",
});

const v = client.get("/status/400");

v.then(x => {
    const d = {
        ...x,
        request: null
    }
    console.log(d);
})