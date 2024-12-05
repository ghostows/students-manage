const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(cors());

mongoose.connect('mongodb://localhost:27017/students');

const studentSchema = new mongoose.Schema({
    cef: String,
    nom: String,
    prenom: String,
    email: String,
    ville: String,
    etablissement: String
});
const Student = mongoose.model('Student', studentSchema);

app.post('/students', async (req, res) => {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    res.json(savedStudent);
});

app.get('/students', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

app.get('/students/:cef', async (req, res) => {
    const student = await Student.findOne({ cef: req.params.cef });
    res.json(student);
});

app.put('/students/:cef', async (req, res) => {
    const updatedStudent = await Student.findOneAndUpdate(
        { cef: req.params.cef },
        req.body,
        { new: true }
    );
    res.json(updatedStudent);
});

app.delete('/students/:cef', async (req, res) => {
    await Student.findOneAndDelete({ cef: req.params.cef });
    res.json({ message: 'Étudiant supprimé' });
});


app.listen(3000, () => {
    console.log(`Serveur démarré sur le port`);
});
