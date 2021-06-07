const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');


// connect to the database
mongoose.connect('mongodb://localhost:27017/questionList', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'session',
    keys: ['secretValue'],
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// import the users module and setup its API path
const users = require("./users.js");
app.use("/api/users", users.routes);

const jungfrauInfos = require("./jungfrauInfo.js")
app.use("/api/jungfrauInfo", jungfrauInfos.routes)

const jungfrauPackage = require("./jungfrauPackage.js")
app.use("/api/jungfrauPackage", jungfrauPackage.routes)

const announcement = require('./announcement.js')
app.use('/api/announcements',announcement.routes)

const questionSchema = new mongoose.Schema({
	name: String,
  title: String,
	question: String,
  answer: String,
  numOfVisited: Number,
  password: Number,
  adminPassword: Number,
  isAnswerExisit: Boolean,
  
  created: {
    type: Date,
    default: Date.now
  },

});

questionSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

questionSchema.set('toJSON', {
  virtuals: true
});

const Question = mongoose.model('Question', questionSchema);

app.get('/api/questions', async (req, res) => {
  try {
    let questions = await Question.find();
    res.send(questions);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/questions/:id', async (req, res, next) => {
  try {
    let question = await Question.findOne({
      _id: req.params.id
    })
    res.send(question);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.post('/api/questions', async (req, res) => {
    const question = new Question({
    name: req.body.name,
    title: req.body.title,
    question: req.body.question,
    date: req.body.date,
    numOfVisited: 0,
    isAnswerExisit: false,
    password: req.body.password,
    adminPassword: 12345,
    order: req.body.order,
    answer: ''	    
  });
  try {
    await question.save();
    res.send(question);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/questions/:id', async (req, res) => {
  try {
    await Question.deleteOne({_id: req.params.id });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/questions/:id', async (req, res) => {
  try {
    let question = await Question.findOne({_id: req.params.id});
    question.title = req.body.title;
    question.name = req.body.name;
    question.question = req.body.question
    question.save();
    res.send(question);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});  

app.put('/api/questions/numOfVisited/:id', async (req, res) => {
  try {
    let question = await Question.findOne({_id: req.params.id});
    question.numOfVisited = req.body.numOfvisited;
    question.save();
    res.send(question);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});  

app.put('/api/questions/answer/:id', async (req, res) => {
  try {
    let question = await Question.findOne({_id: req.params.id});
    question.isAnswerExisit = req.body.isAnswerExisit;
    question.answer = req.body.answer;
    question.save();
    res.send(question);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});  

//endpoints for tourReview sections

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../public/images/',
  limits: {
    fileSize: 1000000000
  },
  
});


const tourReviewSchema = new mongoose.Schema({
  name: String,
  title: String,
  review: String,
  pathArray: Array,
  numOfVisited: Number,
  password: Number,
  adminPassword: Number,

  created: {
    type: Date,
    default: Date.now
  }

});

tourReviewSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

  tourReviewSchema.set('toJSON', {
  virtuals: true
});

const TourReview = mongoose.model('TourReview', tourReviewSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.array('photo'), async (req, res) => {
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

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/tourReviews' , async (req, res) => {

    const item = new TourReview({
      name: req.body.name,
      title: req.body.title,
      review: req.body.review,
      pathArray: req.body.pathArray,
      numOfVisited: 0,
      password: req.body.password,
      adminPassword: 12345
    });
    try {
      await item.save();
      
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

// Get a list of all of the items in the museum.
app.get('/api/tourReviews', async (req, res) => {
  try {
    let reviews = await TourReview.find();
    res.send(reviews);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/tourReviews/:id', async (req, res, next) => {
  try {

    let review = await TourReview.findOne({
      _id: req.params.id
    })
    
    review.numOfVisited += 1;
    await review.save()
    res.send(review);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/tourReviews/:id', async (req, res) => {
  try {
      let review = await TourReview.findOne({_id: req.params.id});
      let editedPathArray = []
      for(let i=0; i<req.body.pathArray.length; i++){
        editedPathArray.push(req.body.pathArray[i])
      }
      review.pathArray = editedPathArray;
      review.title = req.body.title;
      review.name = req.body.name;
      review.review = req.body.review;
      review.save();
      res.send(review);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
}); 

app.delete('/api/tourReviews/:id', async (req, res) => {
  try {
    await TourReview.deleteOne({_id: req.params.id });
    res.sendStatus(200);
  }catch (error){
    console.log(error)
    res.sendStatus(500)
  }
})

app.listen(3000, () => console.log('Server listening on port 3000!'));