const express = require("express");
const mongoose = require('mongoose');

const router = express.Router();

const jungfrauInfo = new mongoose.Schema({
    path: String,
    title: String,
    description: String,
  });

  jungfrauInfo.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

  jungfrauInfo.set('toJSON', {
  virtuals: true
});


const JungInfo = mongoose.model('JungInfo', jungfrauInfo);

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../public/images/',
  limits: {
    fileSize: 1000000000
  },
  
});

router.get('/all', async(req,res) =>{
    try {
        let jungInfos = await JungInfo.find();
        res.send(jungInfos)
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
})

router.post('/', upload.single('photo'), async (req, res) =>{
  // check parameters
  if (!req.file)
    return res.status(400).send({
      message: "Must upload a file."
    });

    const item = new JungInfo({
        path: "/images/" + req.file.filename,
        title: req.body.title,
        description: req.body.description,
      });

      try {
        await item.save();
        return res.sendStatus(200);
      } catch (error) {
        console.log(error);
        return res.sendStatus(500);
      }
});

router.put('/:id', upload.single('photo'), async (req, res)=> {

    // check parameters
    if (!req.file)
    return res.status(400).send({
      message: "Must upload a file."
    });

    let item = await JungInfo.findOne({_id: req.params.id})
    item.path = "/images/" + req.file.filename,
    item.title = req.body.title,
    item.description = req.body.description

    try{
      await item.save()
    }catch(error) {
      console.log(error)
      res.sendStatus(500)
    }
});



module.exports = {
    model: JungInfo,
    routes: router,
  }
  
