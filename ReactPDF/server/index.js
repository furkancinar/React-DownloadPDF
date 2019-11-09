const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');
const express = require('express');

const pdfTemplate = require('./documents');

const app = express();

const port = process.env.port || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


//POST - PDF generation and fetching of the data

app.post('/create-pdf',(req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
       if(err){
           return Promise.reject();
       }
        
       res.send(Promise.resolve());
    });
});

app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})



// Get - Send the generated PDF to the client

app.listen(port, () => console.log('Listening on port ${port}'));