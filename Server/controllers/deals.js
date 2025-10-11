import Deal from '../models/Deal.js';

export const createDeal = async (req, res) => {
    try {
        const deal = await Deal.create(req.body);
        res.status(201).json({ deal });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getAllDeals = async (req, res) => {
    try {
        const deals = await Deal.find({});
        res.status(200).json({ deals });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getDealById = async (req, res) => {
    try {
        const { id: dealID } = req.params;
        const deal = await Deal.findOne({ _id: dealID });
        if (!deal) {
            return res.status(404).json({ msg: `No deal with id : ${dealID}` });
        }
        res.status(200).json({ deal });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateDeal = async (req, res) => {
    try {
        const { id: dealID } = req.params;
        const deal = await Deal.findOneAndUpdate({ _id: dealID }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!deal) {
            return res.status(404).json({ msg: `No deal with id : ${dealID}` });
        }
        res.status(200).json({ deal });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const deleteDeal = async (req, res) => {
    try {
        const { id: dealID } = req.params;
        const deal = await Deal.findOneAndDelete({ _id: dealID });
        if (!deal) {
            return res.status(404).json({ msg: `No deal with id : ${dealID}` });
        }
        res.status(200).json({ msg: 'Deal deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
