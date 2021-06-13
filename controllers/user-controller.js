const { User } = require('../models');
const { db } = require('../models/User');

const userController = {
    getAllUser(req, res) {
        User.find({})
            .select('-__v')
            .sort({ _id: -1})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(404).json(err));
    },

    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    updateUser({ params, body }, res) {
        User.updateOne({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData){
                    res.status(404).json({ message: 'No user found with this id!' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteUser({ params }, res) {
        User.deleteOne({ _id: params.id }, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with this id!'} );
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId }},
            { new: true })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: "No user found with this id!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId }},
            { new: true })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            }) 
            .catch(err => res.json(err));
        
    }
}

module.exports = userController;