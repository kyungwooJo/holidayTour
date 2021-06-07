const express = require("express");
const mongoose = require('mongoose');

const router = express.Router();

const jungfrauPackageSchema = new mongoose.Schema({
    pathForList: String,
    pathForDetail: Array,
    descriptionForList: String,
    descriptionForDetail: Array,
    coordinateList: Array
})

jungfrauPackageSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

  jungfrauPackageSchema.set('toJSON', {
  virtuals: true
});

const jungfrauPackage = mongoose.model('jungfrauPackage', jungfrauPackageSchema)

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer');
const { setEncoding } = require("readline-sync");
const upload = multer({
  dest: '../public/images/',
  limits: {
    fileSize: 500000000
  },
  
});

router.get('/all', async(req,res) => {
    try{
        let items = await jungfrauPackage.find()
        res.send(items)
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
})

router.get('/:id', async(req,res) => {
    try {

        let item = await jungfrauPackage.findOne({
          _id: req.params.id
        })
        res.send(item);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
})

router.post('/', upload.single('photo'), async (req, res) => {
  // check parameters

    if (!req.file)
        return res.status(400).send({
        message: "Must upload a file."
    });

    const item = new jungfrauPackage({
        pathForList: "/images/" + req.file.filename,
        descriptionForList: req.body.descriptionForList
    })

    try {
        await item.save();
        res.send(item);
      } catch (error) {
        console.log(error);
        return res.sendStatus(500);
      }
})

router.put('/:id', upload.single('photo'), async (req, res)=> {

    // check parameters
    if (!req.file)
    return res.status(400).send({
      message: "Must upload a file."
    });

    try{

      let item = await jungfrauPackage.findOne({_id: req.params.id})
      item.pathForDetail.push("/images/" + req.file.filename) 
      item.descriptionForDetail.push( req.body.description)
      await item.save()
      res.sendStatus(200)
    }catch(error) {
      console.log(error)
      res.sendStatus(500)
    }
});

router.put('/coordinate/:id', upload.single('photo'), async (req, res)=> {

  try{
    console.log(req.body.coordinate)
    let item = await jungfrauPackage.findOne({_id: req.params.id})
    item.coordinateList.push(req.body.coordinate)
    await item.save()
    res.sendStatus(200)
  }catch(error) {
    console.log(error)
    res.sendStatus(500)
  }
});

router.put('/package/:id', upload.single('photo'), async (req, res)=> {

  try{
    let item = await jungfrauPackage.findOne({_id: req.params.id})
    let editedList1 = item.pathForDetail
    let editedList2 = item.descriptionForDetail
    if(req.file){
    editedList1[req.body.postion] = "/images/" + req.file.filename
    }
    editedList2[req.body.postion] = req.body.description

    let size = editedList1.length;
    item.pathForDetail = []
    item.descriptionForDetail = []
    for( let i = 0; i < size; i++){
    item.pathForDetail.push(editedList1[i]) 
    item.descriptionForDetail.push(editedList2[i])
    }

    await item.save()

  }catch(error) {
    console.log(error)
    res.sendStatus(500)
  }
});

router.delete('/:id', async (req, res) => {
    try {
        await jungfrauPackage.deleteOne({_id: req.params.id });
        res.sendStatus(200);
      }catch (error){
        console.log(error)
        res.sendStatus(500)
      }   
})

module.exports = {
    model: jungfrauPackage,
    routes: router,
  }
  
