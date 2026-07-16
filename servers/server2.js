import express from 'express'
const app = express()
const PORT = 5002
app.get('/', (req, res) => {
    res.status(200).send("Success Server2");
})
app.listen(PORT, () => {
    console.log("Server 2")
})