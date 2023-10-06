const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

const dbURI = 'mongodb+srv://van_user:van_userpwd2612@cluster0.mqlolxn.mongodb.net/db_tutorial';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('Connected to MongoDB...'))
  .catch((err) => console.error(err));

app.listen(3000);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const User_info = require('./models/User_info');

const userCredentialsSchema = new mongoose.Schema({
    User_name: String,
    Password: String,
  });
  
const UserCredentials = mongoose.model('User_authentication', userCredentialsSchema , 'User_credentials');

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/search', (req, res) => {
  const users=req.query.users;
  res.render('search',{users});
});

app.get('/search', (req, res) => {
  res.render('search');
});


// app.get('/home', (req, res) => {
//   res.render('home');
// });


app.post('/index', (req, res) => {
  const info = new User_info(req.body);

  info.save()
    .then((results) => {
      res.redirect('/index');
    })
    .catch((err) => {
      console.error(err);
    });
});

app.post('/home', async (req, res) => {
  try {
    const user = await UserCredentials.findOne({ User_name: req.body.User_name });

    if (!user) {
        console.log('USERNAME did not match');
        return res.render('index', { error: 'Invalid Username' });
    }

 

    const match = (req.body.Password === user.Password);
    console.log(match); 
    if (match) {
      const INDENTIFIER=req.body.User_name;
      return res.redirect(`/home?INDENTIFIER=${INDENTIFIER}`);

    } else {
        console.log('Password did not match');
      return res.render('index', { error: 'Invalid password' });
    }
  } catch (error) {
    console.error(error);
    res.render('index', { error: 'An error occurred during login' });
  }
});

app.get('/home', (req, res) => {
  const INDENTIFIER = req.query.INDENTIFIER; 
  res.render('home', { INDENTIFIER });
});

app.post('/search', async (req, res) => {
  try {
      const { TechStack, Experience } = req.body;
    console.log('blahhhhh');
     
      const users = await User_info.find({
          TechStack: { $in: TechStack }, 
          
          Experience: Experience
      });

      console.log('blahhhhh2');
      console.log(users);
      res.json(users);
      res.render('search', { users });
  } catch (error) {
    console.log('blahhhhh4');
      console.error(error);
      res.status(500).json({ error: 'An error occurred while searching for users' });
  }
});
app.use((req, res) => {
  res.render('404');
});