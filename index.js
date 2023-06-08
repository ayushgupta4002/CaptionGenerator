const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const http = require('http');
const predictRouter = require('./routes/predict');
const cors = require('cors')
const app = express();
app.use(express.json());
// We added bodyParser so that we can access `body` in `req` later
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
const dotenv = require('dotenv');
dotenv.config()

const OPENAI_API_KEY=process.env.OPENAI_KEY;
const { Configuration, OpenAIApi }= require('openai') ;
const configuration = new Configuration({

    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(cors());

app.get('/hello', function (req, res) {
    res.send("hello")
});
app.use('/predict', predictRouter);

app.get('/', function (req, res) {
    res.json({
        message:"working well"
    })
})


app.post("/chat",(req,res) => {
    console.log("test1")
    const question= req.body.prompt;
    console.log(question);
    openai.createCompletion({
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 4000,
        temperature: 0,
      }).then((response)=>{
        res.send(
            response.data.choices[0].text)
        console.log(response.data.choices[0].text);
      });
   
});
  



const port = process.env.PORT || '5000';

app.set('port', port);
const server = http.createServer(app);
server.listen(port);
server.on('listening', () => {
    console.log('Listening on =>' + (port));
});