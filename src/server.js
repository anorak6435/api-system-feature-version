const express = require('express');
const bodyParser = require('body-parser')
const app = express();
var cors = require('cors')
const mongoose = require('mongoose');
const FeatureModel = require('./models/featureModel');
const SystemModel = require('./models/systemModel');
const VersionModel = require('./models/versionModel');




// CONFIG
// ---------------------

const port = 8081;
const dbURI = 'mongodb://127.0.0.1:27017/VSF';

// ---------------------


// Middleware

// connect to the mongo database
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(`Error connecting to MongoDB: ${err}`));


// handle all of the requests
app.use(cors())

// parse application/json
app.use(bodyParser.urlencoded());
app.use(bodyParser.json())




// CRUD
// ---------------------

// FEATURE
// ---------------------

// CREATE
app.post('/feature', (req, res) => {
    FeatureModel.create(req.body);
    res.status(200).send("OK")
});


// READ
// ALL
app.get('/feature', async (req, res) => {
    try {
        const features = await FeatureModel.find({}).exec();
        res.json(features);
    } catch (err) {
        res.status(500).json({'message': err.message});
    }
});

// ONE
app.get('/feature/:id', async (req, res) => {
  try {
    const feature = await FeatureModel.findOne({_id: req.params.id});
    
    if (!feature) {
      return res.status(404).json({message: "Feature model not found!"});
    }
    res.json(feature);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});


// UPDATE
app.put('/feature/:id', async (req, res) => {
  console.log("we update the feature value: (PUT)");

  const {
    body,
    params: { id },
  } = req;

  try {
    let feature = await FeatureModel.updateOne({_id: id}, body);
    console.log(feature);

    if (!feature) {
      return res.status(404).json({message: "Feature not found!"});
    }
    let updatedFeature = await FeatureModel.findById(id).exec();

    res.status(200).json(updatedFeature);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
  
});

// DELETE
app.delete('/feature/:id', async (req, res) => {
  const {
    params: { id },
  } = req;
  console.log("DELETING NOW!")
  FeatureModel.deleteOne({_id: id}).exec();
  res.status(200).send("OK")
});

// ---------------------

// SYSTEM

// ---------------------
app.post('/system', (req, res) => {
    SystemModel.create(req.body);
    res.status(200).send("OK")
});

// READ
// ALL
app.get('/system', async (req, res) => {
    try {
        const systems = await SystemModel.find({}).exec();
        res.json(systems);
    } catch (err) {
        res.status(500).json({'message': err.message});
    }
});

// ONE
app.get('/system/:id', async (req, res) => {
  try {
    const system = await SystemModel.findOne({_id: req.params.id});
    
    if (!system) {
      return res.status(404).json({message: "System model not found!"});
    }
    res.json(system);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

// UPDATE
app.put('/system/:id', async (req, res) => {
  console.log("we update the system value: (PUT)");

  const {
    body,
    params: { id },
  } = req;

  try {
    let system = await SystemModel.updateOne({_id: id}, body);
    console.log(system);

    if (!system) {
      return res.status(404).json({message: "Feature not found!"});
    }
    let updatedSystem = await SystemModel.findById(id).exec();

    res.status(200).json(updatedSystem);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
  
});

// DELETE
app.delete('/system/:id', async (req, res) => {
  const {
    params: { id },
  } = req;
  console.log("DELETING NOW!")
  SystemModel.deleteOne({_id: id}).exec();
  res.status(200).send("OK")
});


// ---------------------

// VERSION
// ---------------------
app.post('/version', (req, res) => {
    VersionModel.create(req.body);
    res.status(200).send("OK")
});

// READ
// ALL
app.get('/version', async (req, res) => {
    try {
        const systems = await VersionModel.find({}).exec();
        res.json(systems);
    } catch (err) {
        res.status(500).json({'message': err.message});
    }
});

// ONE
app.get('/version/:id', async (req, res) => {
  try {
    const system = await VersionModel.findOne({_id: req.params.id});
    
    if (!system) {
      return res.status(404).json({message: "System model not found!"});
    }
    res.json(system);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

// UPDATE
app.put('/version/:id', async (req, res) => {
  console.log("we update the system value: (PUT)");

  const {
    body,
    params: { id },
  } = req;

  try {
    let system = await VersionModel.updateOne({_id: id}, body);
    console.log(system);

    if (!system) {
      return res.status(404).json({message: "Version not found!"});
    }
    let updatedSystem = await VersionModel.findById(id).exec();

    res.status(200).json(updatedSystem);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
  
});

// DELETE
app.delete('/version/:id', async (req, res) => {
  const {
    params: { id },
  } = req;
  console.log("DELETING NOW!")
  VersionModel.deleteOne({_id: id}).exec();
  res.status(200).send("OK")
});
// ---------------------


app.listen(port, () => {
  console.log(`System Feature Version API listening on port ${port}`)
});
