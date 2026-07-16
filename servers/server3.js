import express from 'express'
const app = express()
const PORT = 5003
app.get('/', (req, res) => {
    res.status(200).send("Success Server3");
})
app.listen(PORT, () => {
    console.log("Server 3")
})