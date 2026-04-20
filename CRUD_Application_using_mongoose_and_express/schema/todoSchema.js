const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
    },
    data: {
        type: Date,
        default: Date.now,
    },
    // making relational data
    user: {
        type: mongoose.Types.ObjectId,
        // evert collection has unique mongoose obj _id .thats getting it
        ref: 'User', // getting it from user model
    },
});
// mongoose instance method
todoSchema.methods = {
    findActive() {
        return mongoose.model('Todo').find({ status: 'active' });
    },
};

// mongoose static method
todoSchema.statics = {
    findByExp() {
        return this.find({ title: /ex/i }); // its a static method of this model.so we can use "this"
    },
};

// mongoose query helper
todoSchema.query = {
    byLangulage(language) {
        return this.find({ title: new RegExp(language, 'i') });
    },
};

/* difference between instance and static method :
1.in intance method ,u have to make an intance .then by this document,
u call the instance method but in the static method,u can call it by class name
*/

module.exports = todoSchema;
