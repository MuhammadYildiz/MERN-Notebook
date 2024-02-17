const express = require('express');
const authControl = require("../middleWare/authControl")
const { createNotes,getAllNotes, getNoteById ,updateNote,deleteNote} = require('../controllers/noteControl');
const router = express.Router();
router.use(authControl)
/* Get All Notes */
router.get("/", getAllNotes)
/* Get Note with ID */
router.get("/:id",getNoteById)
/* Create Notes */
router.post("/", createNotes)
module.exports = router;
/* Update notes */
router.patch("/:id", updateNote)
/* Delete notes */
router.delete("/:id", deleteNote)
module.exports = router;