import mongoose from 'mongoose';
const historySchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true,
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true,
    },
    itemId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory',
        required: true, 
    },
    date: {
        type: Date,
        default: Date.now,
    },
    action: {
        type: String,
        required: true,
    },

});

const HistoryModel = mongoose.model('HistoryModel', historySchema);
export default HistoryModel;