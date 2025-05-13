import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    archivedAt: {
        type: Date,
        default: null,
    },
})

const personModel = mongoose.model("Person", personSchema);
export default personModel;