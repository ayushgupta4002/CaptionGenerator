const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config()

const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${process.env.CLARIFAI_KEY}`);

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

const upload = multer({
    storage: multer.memoryStorage({}),
    limits: { fileSize: 2000000 },
    fileFilter: function (_req, file, cb) {
        checkFileType(file, cb);
    }
});


function predictImage(inputs) {
    return new Promise((resolve, reject) => {
        stub.PostModelOutputs(
            {
                // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
                model_id: "aaa03c23b3724a16a56b629203edc62c",
                inputs: inputs
            },
            metadata,
            (err, response) => {
                if (err) {
                    reject("Error: " + err);
                    return;
                }

                if (response.status.code !== 10000) {
                    reject("Received failed status: " + response.status.description + "\n" + response.status.details);
                    return;
                }

                let results = [];
                for (const c of response.outputs[0].data.concepts) {
                    results.push({
                        name: c.name,
                        value: c.value
                    })
                }
                resolve(results);
            }
        );
    })
}

router.post('/', async function (req, res, next) {
    try {
        const { imageUrl } = req.body;
        const inputs = [
            {
                data: {
                    image: {
                        url: imageUrl
                    }
                }
            }
        ];
        const results = await predictImage(inputs);



        var label1=results[0].name;
        var label2=results[1].name;
        var label3=results[2].name;
        var label4=results[3].name;
        var label5=results[4].name;
        console.log("var labels are");
        console.log(label1);
        console.log(label2);
        console.log(label3);
        console.log(label4);
        console.log(label5);

        const data = {
            prompt: `You are a creative social media manager, we have an image with these 5 elements in it found via Image recognition API.
            1,2,3,4,5 (${label1},${label2},${label3},${label4},${label5})
        
            Write a short and crisp Instagram caption and 10 hashtags for the above image. give 3 answers according to different moods like joy, excited , sad . Generate them in seperate lines`,
        };

        axios.post('https://caption-generator-three.vercel.app/chat', data)
        .then((response) => {
            console.log("response coming from keyword is");
            console.log(response.data);

            var caption=response.data;
            return res.send({
                caption
            })
        })
        
    } catch (err) {
        return res.status(400).send({
            error: err
        })
    }
});

router.post('/upload', upload.single('file'), async function (req, res, next) {
    try {
        const inputs = [
            {
                data: {
                    image: {
                        base64: req.file.buffer
                    }
                }
            }
        ]
        const results = await predictImage(inputs);

        console.log("labels are");
        console.log(results[0].name);
        console.log(results[1].name);
        console.log(results[2].name);
        console.log(results[3].name);
        console.log(results[4].name);

        var label1=results[0].name;
        var label2=results[1].name;
        var label3=results[2].name;
        var label4=results[3].name;
        var label5=results[4].name;
        console.log("var labels are");
        console.log(label1);
        console.log(label2);
        console.log(label3);
        console.log(label4);
        console.log(label5);

        const data = {
            prompt: `You are a creative social media manager, we have an image with these 5 elements in it found via Image recognition API.
            1,2,3,4,5 (${label1},${label2},${label3},${label4},${label5})
        
            Write a short and crisp Instagram caption and 10 hashtags for the above image. give 3 answers according to different moods like joy, excited , sad . Generate them in seperate lines`,
        };

        axios.post('https://caption-generator-three.vercel.app/chat', data)
        .then((response) => {
            console.log("response coming from keyword is");
            console.log(response.data);
            var caption=response.data;
            return res.send({
                caption
            })
    
        }).catch((err) => {
            console.error(err);
        }); 
        
    } catch (err) {
        res.status(400).send({
            error: err
        })
    }
})

module.exports = router;
