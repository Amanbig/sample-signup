import express from "express";
import pg from "pg";
const app = express();
app.use(express.static("./public"));
app.use(express.urlencoded({urlencoded:true}));
app.get("/",(req,res)=>{
    res.sendFile("C:/Users/amanp/Programming/Web/sample-signup/index.html");
})
const client = new pg.Client({
    user:"postgres",
    password:"1234",
    database:"signup"
})
client.connect()
.then(()=>{
    console.log("Connected");
})
app.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;
        const queryFind = 'SELECT * FROM public.sign WHERE "Name" = $1 and "Password" = $2';
        const result1 = await client.query(queryFind, [username, password]);
        console.log(result1.rowCount);
        if(result1.rowCount==0){
            const queryText = 'INSERT INTO public.sign ("Name", "Password") VALUES ($1, $2)';
            const result = await client.query(queryText, [username, password]);
        }
        res.status(200).sendFile('C:/Users/amanp/Programming/Web/sample-signup/success.html');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000,()=>{
    console.log("Server running");
})