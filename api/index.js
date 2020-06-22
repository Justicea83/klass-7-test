import express from 'express';
import bodyParser from 'body-parser';
import * as constants from './utils/app-contants';
import Url from "./db/models/Url";
import {validateUrl} from "./utils/validators";
import {getRandomString} from "./utils/generator";
import cors from 'cors';
// Set up the express app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//force create the urls table
Url.sync({ force: false });
// get all todos
app.get(`${constants.URLS_ENDPOINT}/:url`, async (req, res) => {
    //find the shortened url
    let url = await Url.findAll({
        where:{
            shortened_url: req.params.url
        }
    });

    if(url.length > 0){
        console.log(url[0].original_url);
        return res.status(200).send({
            success: 'true',
            message: 'todos retrieved successfully',
            url: url[0]
        })
    }
    return res.status(404).send({
        success: 'true',
        message: 'todos retrieved successfully',
    })
});

app.get(`${constants.URLS_ENDPOINT}`, async (req, res) => {
    //find the shortened url
    const urls = await Url.findAll();


    return res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        urls
    })
});

app.post(constants.URLS_ENDPOINT,async (req, res) => {
    if(!req.body.original_url) {
        return res.status(422).send({
            success: 'false',
            message: 'original_url field is required'
        });
    }

    if(!validateUrl(req.body.original_url)){
        return res.status(422).send({
            success: 'false',
            message: 'Invalid Url'
        });
    }
    let checkIfExists = await Url.findAll({
        where:{
            original_url: req.body.original_url.trim()
        }
    });
    if(checkIfExists.length > 0){
        return res.status(402).send({
            success: 'false',
            message: 'url already exists',
            url : checkIfExists[0]
        });
    }
    let randStr = await getRandomString();
    let url = await Url.create({
        shortened_url: randStr,
        original_url: req.body.original_url
    });
    return res.status(201).send({
        success: 'true',
        message: 'todo added successfully',
        url: {
            shortened_url: `http://localhost:3000/${url.shortened_url}`,
            id: url.id
        }
    })
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});