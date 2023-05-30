const noteService = require('./note.service.js')

const logger = require('../../services/logger.service.js')

async function getNotes(req, res) {
    try {
        logger.debug('Getting Notes')
        const filterBy = {
            txt: req.query.txt || '',
        }
        const notes = await noteService.query(filterBy)
        res.json(notes)
    } catch (err) {
        logger.error('Failed to get notes', err)
        res.status(500).send({ err: 'Failed to get notes' })
    }
}

async function getNoteById(req, res) {
    try {
        const noteId = req.params.id
        const note = await noteService.getById(noteId)
        res.json(note)
    } catch (err) {
        logger.error('Failed to get note', err)
        res.status(500).send({ err: 'Failed to get note' })
    }
}

async function addNote(req, res) {
    try {
        const note = req.body
        delete note._id
        const addedNote = await noteService.add(note)
        console.log('addedNote: ', addedNote)
        res.json(addedNote)
    } catch (err) {
        logger.error('Failed to add note', err)
        res.status(500).send({ err: 'Failed to add note' })
    }
}

async function updateNote(req, res) {
    try {
        const note = req.body
        const updatedNote = await noteService.update(note)
        res.json(updatedNote)
    } catch (err) {
        logger.error('Failed to update note', err)
        res.status(500).send({ err: 'Failed to update note' })
    }
}

async function updateNoteByKey(req, res) {
    try {
        const { id } = req.params
        const { key, value } = req.body
        const updatedNote = await noteService.updateByKey(id, key, value)
        res.json(updatedNote)
    } catch (err) {
        logger.error('Failed to update note', err)
        res.status(500).send({ err: 'Failed to update note' })
    }
}

async function removeNote(req, res) {
    try {
        const noteId = req.params.id
        const removedId = await noteService.remove(noteId)
        res.send({removedId})
    } catch (err) {
        logger.error('Failed to remove note', err)
        res.status(500).send({ err: 'Failed to remove note' })
    }
}

async function addNoteMsg(req, res) {
    const { loggedinUser } = req
    try {
        const noteId = req.params.id
        const msg = {
            txt: req.body.txt,
            by: loggedinUser,
        }
        const savedMsg = await noteService.addNoteMsg(noteId, msg)
        res.json(savedMsg)
    } catch (err) {
        logger.error('Failed to update note', err)
        res.status(500).send({ err: 'Failed to update note' })
    }
}

async function removeNoteMsg(req, res) {
    const { loggedinUser } = req
    try {
        const noteId = req.params.id
        const { msgId } = req.params

        const removedId = await noteService.removeNoteMsg(noteId, msgId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove note msg', err)
        res.status(500).send({ err: 'Failed to remove note msg' })
    }
}

module.exports = {
    getNotes,
    getNoteById,
    addNote,
    updateNote,
    updateNoteByKey,
    removeNote,
    addNoteMsg,
    removeNoteMsg,
}
