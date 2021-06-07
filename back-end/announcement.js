const express = require("express");
const mongoose = require('mongoose');

const router = express.Router();

const announcementSchema = new mongoose.Schema({
    pathArray:Array,
    title:String,
    name:String, 
    content:String,
    numOfVisited:Number,

    created: {
        type: Date,
        default: Date.now
      },
})

announcementSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

announcementSchema.set('toJSON', {
  virtuals: true
});

const Announcement = mongoose.model('Announcement', announcementSchema)

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer');
const { setEncoding } = require("readline-sync");
const upload = multer({
  dest: '../public/images/',
  limits: {
    fileSize: 1000000000
  },
  
});

router.get('/all', async(req, res) => {
  try{
    let items = await Announcement.find()
    res.send(items)
  }catch(error){
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/:id', async(req, res) => {
  try{
    let item = await Announcement.findOne({
      _id: req.params.id
    })

    item.numOfVisited += 1
    await item.save()
    res.send(item)
  }catch(error){
    console.log(error)
    res.sendStatus(500)
  } 
})

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
router.post('/photos', upload.array('photo'), async (req, res) => {
  // Just a safety check
  if (!req.files) {
    return res.sendStatus(400);
  }

  let photoPathArray = [];

  for(let i=0; i<req.files.length; i++) {
    photoPathArray.push('/images/' + req.files[i].filename);
  }

  res.send(photoPathArray);
});

router.post('/', async (req, res) => {
  try{
    console.log(req.body)
    const item = new Announcement({
      title: req.body.title,
      name: req.body.name,
      content: req.body.content,
      numOfVisited: 0,
      pathArray: req.body.pathArray
    })
    await item.save();
    res.sendStatus(200)
  }catch(error){
    console.log(error);
    res.sendStatus(500);
  }
})

router.put('/:id', async (req, res) => {
  try {
      let item = await Announcement.findOne({_id: req.params.id});
      let editedPathArray = []
      for(let i=0; i<req.body.pathArray.length; i++){
        editedPathArray.push(req.body.pathArray[i])
      }
      item.pathArray = editedPathArray;
      item.title = req.body.title;
      item.name = req.body.name;
      item.content = req.body.content;
      item.save();
      res.send(item);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
}); 


router.delete('/:id', async(req, res) => {
  try {
    await Announcement.deleteOne({_id: req.params.id });
    res.sendStatus(200);
  }catch (error){
    console.log(error)
    res.sendStatus(500)
  }
})

module.exports = {
  routes: router,
  model: Announcement,
};