const express = require('express');
const bodyParser = require('body-parser');
const connectToDatabase = require('./connection'); 
const cors=require("cors")
const app = express();
const port = 3000;

app.use(bodyParser.json());
const corsOptions = {
    origin: 'http://localhost:3001',
    methods: 'GET,POST', 
    allowedHeaders: ['Content-Type', 'Authorization'] 
};
app.use(cors(corsOptions));
app.post('/add-user', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required!' });
  }

  try {
    const { collection } = await connectToDatabase();

    const userExists = await collection.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    await collection.insertOne({ username, password });
    res.status(201).json({ message: 'User added successfully!' });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/check-user', async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username is required!' });
  }

  try {
    const { collection } = await connectToDatabase();

    const userExists = await collection.findOne({ username });
    if (userExists) {
      return res.status(200).json({ message: 'User exists!' });
    }

    res.status(404).json({ message: 'User does not exist!' });
  } catch (error) {
    console.error('Error checking user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/get-user',async (req,res)=>{
    try {
        const { collection } = await connectToDatabase();
    
        const userExists = await collection.find().toArray();
        if (userExists) {
          return res.status(200).json({ message: userExists });
        }
    
        res.status(404).json({ message: 'Fetchin error' });
      } catch (error) {
        console.error('Error checking user:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});