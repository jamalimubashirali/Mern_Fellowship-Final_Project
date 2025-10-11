import mongoose from "mongoose";

const dealSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true,
    },
    value: {
        type: Number,
        required: [true, 'Please provide a value'],
    },
    stage: {
        type: String,
        enum: ['Prospecting', 'Qualification', 'Needs Analysis', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'],
        default: 'Prospecting',
    },
    closingDate: {
        type: Date,
    },
    contactPerson: {
        type: String,
    },
    organization: {
        type: String,
    },
}, { timestamps: true });

const Deal = mongoose.model('Deal', dealSchema);

export default Deal;
