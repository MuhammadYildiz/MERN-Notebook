
const Notes = require('../models/noteModel');
const mongoose = require('mongoose')
/* Get All Notes */
const getAllNotes = async (req, res, next) => {
    let allNotes;
    try {
        allNotes = await Notes.find()
        return res.status(200).json(allNotes)
    } catch (error) {
        return res.status(400).json({ Error: error.message })
    }
}
/* Get note with ID */
const getNoteById = async (req, res, next) => {
    let note;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Note ID is undefined" })
    }
    try {
        note = await Notes.findById(id)
        if (!note) {
            return res.status(400).json({ message: "Note not found by ID" })
        }
        return res.status(200).json(note)

    } catch (error) {
        return res.status(400).json({ Error: error.message })
    }

}
/* Create Notes */
const createNotes = async (req, res, next) => {
    const { title, desc } = req.body;
    let emptySpace = [];
    if (!title) {
        emptySpace.push("title")
    }
    if (emptySpace.length > 0) {
        return res.status(400).json({ Error: "Please enter a Title!", emptySpace })
    }
    if (!desc) {
        emptySpace.push("desc")
    }
    if (emptySpace.length > 0) {
        return res.status(400).json({ Error: "Please enter a Description", emptySpace })
    }
    let notes;
    try {
        const user_id = req.User._id;
        notes = await Notes.create({
            title,
            desc,
        
        })
        return res.status(200).json(notes)
    } catch (error) {
        return res.status(400).json({ Error: error.message })
    }
}
/* Update Notes */
const updateNote = async (req, res, next) => {
    let updateNote;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Note ID is undefined" })
    }
    try {
        updateNote = await Notes.findOneAndUpdate({ _id: id }, {
            ...req.body
        }, { new: true })
        if (!updateNote) {
            return res.status(404).json({ message: "Note not found to update" })
        }
        return res.status(200).json(updateNote)
    } catch (error) {
        return res.status(400).json({ Error: error.message })
    }
}
/* Delete Notes */
const deleteNote = async (req, res, next) => {
    let deleteNote;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Note ID is undefined" })
    }
    try {
        deleteNote = await Notes.findByIdAndDelete({ _id: id })
        if (!deleteNote) {
            return res.status(404).json({ message: "Note not found to delete" })
        }
        return res.status(200).json(deleteNote)
    } catch (error) {
        return res.status(400).json({ Error: error.message })
    }
}
module.exports = {
    getAllNotes,
    getNoteById,
    createNotes,
    updateNote,
    deleteNote,
}