const express = require('express');
const journalRouter = express.Router();
const JournalPost = require('../models/journal-post');


journalRouter.post('/:user/add', async (req, res, next) => {
    try {
        req.body.user = req.params.user;
        const newJournalPost = new JournalPost(req.body);
        const savedJournalPost = await newJournalPost.save();
        return res.status(201).send(savedJournalPost);
    } catch (err) {
        res.status(500)
        return next(err);
    }
});

journalRouter.get('/:user/get', async (req, res, next) => {
    try {
        const journalPosts = await JournalPost.find({ user: req.params.user });
        return res.status(200).send(journalPosts);
    } catch (err) {
        res.status(500)
        return next(err);
    }
});

journalRouter.put('/:user/edit/:journalId', async (req, res, next) => {
    try {
        const journalPost = await JournalPost.findOneAndUpdate(
            { _id: req.params.journalId, user: req.params.user },
            req.body,
            { new: true }
        );
        if (!journalPost) {
            return res.status(404).send({ message: 'Journal post not found' });
        }
        return res.status(200).send(journalPost);
    } catch (err) {
        res.status(500)
        return next(err);
    }
});

journalRouter.delete('/:user/delete/:journalId', async (req, res, next) => {
    try {
        const deletedJournalPost = await JournalPost.findOneAndDelete({ _id: req.params.journalId, user: req.params.user });
        if (!deletedJournalPost) {
            return res.status(404).send({ message: 'Journal post not found' });
        }
        return res.status(200).send({ message: 'Successfully deleted journal post' });
    } catch (err) {
        res.status(500)
        return next(err);
    }
});

module.exports = journalRouter;