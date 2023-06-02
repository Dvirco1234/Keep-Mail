const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = { searchTerm: '' }) {
    try {
        console.log('process.env.DB_KEY:', process.env.DB_KEY)
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('note')
        var notes = await collection.find(criteria).sort({ _id: 1 }).toArray()
        return notes
    } catch (err) {
        logger.error('cannot find notes', err)
        throw err
    }
}

async function getById(noteId) {
    try {
        const collection = await dbService.getCollection('note')
        const note = collection.findOne({ _id: ObjectId(noteId) })
        return note
    } catch (err) {
        logger.error(`while finding note ${noteId}`, err)
        throw err
    }
}

async function remove(noteId) {
    try {
        const collection = await dbService.getCollection('note')
        await collection.deleteOne({ _id: ObjectId(noteId) })
        return noteId
    } catch (err) {
        logger.error(`cannot remove note ${noteId}`, err)
        throw err
    }
}

async function add(note) {
    try {
        const collection = await dbService.getCollection('note')
        await collection.insertOne(note)
        return note
    } catch (err) {
        logger.error('cannot insert note', err)
        throw err
    }
}

async function update(note) {
    const { _id, ...updatedFields } = note
    const id = ObjectId(_id)
    try {
        const collection = await dbService.getCollection('note')
        await collection.updateOne({ _id: id }, { $set: { ...updatedFields } })
        return note
    } catch (err) {
        logger.error(`cannot update note ${id}`, err)
        throw err
    }
}

async function updateByKey(noteId, key, value) {
    const id = ObjectId(noteId)
    try {
        const collection = await dbService.getCollection('note')
        const result = await collection.findOneAndUpdate({ _id: id }, { $set: { [key]: value, lastEditedAt: Date.now() } }, { returnOriginal: false })
        return result.value
    } catch (err) {
        logger.error('Error updating note:', err)
        throw err
    }
}

async function addNoteMsg(noteId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('note')
        await collection.updateOne({ _id: ObjectId(noteId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add note msg ${noteId}`, err)
        throw err
    }
}

async function removeNoteMsg(noteId, msgId) {
    try {
        const collection = await dbService.getCollection('note')
        await collection.updateOne({ _id: ObjectId(noteId) }, { $pull: { msgs: { id: msgId } } })
        return msgId
    } catch (err) {
        logger.error(`cannot add note msg ${noteId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    updateByKey,
    addNoteMsg,
    removeNoteMsg,
}

function _buildCriteria(filterBy) {
    const { searchTerm, archiveOnly, labelId } = filterBy
    // const labelId = ''
    // const searchTerm = ''
    // const archiveOnly = false
    const criteria = {
        $and: [
            {
                $or: [
                    { 'info.title': { $regex: searchTerm, $options: 'i' } }, 
                    { 'info.txt': { $regex: searchTerm, $options: 'i' } }, 
                    {
                        'info.todos.txt': { $regex: searchTerm, $options: 'i' }, 
                    },
                ],
            },
            { isArchived: { $eq: JSON.parse(archiveOnly) } },
        ],
    }
    if (labelId) criteria.$and.push({ 'labels.id': labelId })
    return criteria
}
