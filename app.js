const express = require('express');
const path = require('node:path');
const app = express();
const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");

const messages = [
    {
        text: "Hi, There!",
        user: "Amando",
        added: new Date(),
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    }
];

//App Level middleware used to parse data from form field into req.body for future use
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render('index', { title: "Mini Messageboard", messages: messages });
});

app.get("/new", (req, res) => {
    res.render('form')
});

app.get("/message/:user", (req, res)=>{
    const { user } = req.params;
    const message = messages.find(message => message.user === user);

    if(!user){
        res.status(404).send("Message not found");
        return
    }

    res.render('message', { ...message } );
});

app.post("/new", (req, res) => {
    const userName = req.body.user;
    const extractText = req.body.text

    messages.push({ text: extractText, user: userName, added: new Date() });
    res.redirect("/");
});


app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});