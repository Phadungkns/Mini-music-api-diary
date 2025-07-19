const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const Music = require('./music');

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());


//Connect DB
const db = "mongodb+srv://admin:12345678910@cluster0.g1f3kfq.mongodb.net/music?retryWrites=true&w=majority";
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

    app.post('/music/add', (req, res) => {
        let music = new Music(req.body);
        music.createdAt = new Date().toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok' });//บอกเวลา
        music.save()
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.send(err);
            });
    });
    
    app.get('/music/get', (req, res) => {
        Music.find()
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.send(err);
            });
    });

    // Get a student by sid
app.get('/music/find', (req, res) => {
    const sid = req.query.sid;
    Music.find({ sid: sid })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// Update a student by sid
app.patch('/music/update', (req, res) => {
    const sid = req.query.sid;
    Music.findOneAndUpdate({ sid: sid }, { $set: req.body })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// Delete a student by sid
app.delete('/music/delete', (req, res) => {
    const sid = req.query.sid;
    Music.findOneAndDelete({ sid: sid })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})