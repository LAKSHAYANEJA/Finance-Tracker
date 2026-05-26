const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const protect = require('../middleware/auth');
const mongoose = require('mongoose');

// ADD TRANSACTION
router.post('/', protect, async (req, res) => {
try{
    const { type, amount, category, description, date } = req.body;

    const transaction = await Transaction.create({
        user: req.user.id,
        type,
        amount,
        category,
        description,
        date
    });

    res.status(201).json(transaction);

}
catch (error){
    res.status(500).json({ message: error.message});
}
});

// GET ALL TRANSACTIONS

router.get('/', protect, async (req, res) => {
    try{
        const transactions = await Transaction.find({ user: req.user.id}).sort({ date: -1});

        res.status(200).json(transactions);
    }

    catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// DELETE TRANSACTION

router.delete('/:id', protect, async (req, res) => {
    try{
        const transaction = await Transaction.findById(req.params.id);

        if(!transaction){
            return res.status(404).json({ message: 'Transaction not found'});
        }

        // Make sure user own this transaction

        if(transaction.user.toString() !== req.user.id){
            return res.status(401).json({ message: 'Not authorized'});
        }

        await transaction.deleteOne();
        res.status(200).json({ message: 'Transaction deleted'});
    }

    catch (error){
        res.status(500).json({ message: error.message});
    }
});

// MONTHLY REPORT

router.get('/report', protect, async (req, res) => {
    try{
        const { month, year } = req.query;

        const startDate = new Date(`${year}-${String(month).padStart(2, '0')}-01T00:00:00.000Z`);
        const endDate = new Date(`${year}-${String(Number(month)+1).padStart(2, '0')}-01T00:00:00.000Z`);

        const userId = new mongoose.Types.ObjectId(req.user.id);

        const allTransactions = await Transaction.find({});
        console.log('All transactions in DB : ',JSON.stringify(allTransactions, null, 2));
        
        // DEBUG 

        console.log('User ID from token: ',req.user.id);
        console.log('Start Date: ', startDate);
        console.log('End Date: ',endDate);

        const rawTransactions = await Transaction.find({ user: userId});
        console.log('Raw transactions found: ',rawTransactions.length);


        const report = await Transaction.aggregate([
            {
                $match:{
                    user:userId,
                    date: { $gte: startDate, $lt: endDate}
                }
            },
            {
                $group:{
                    _id: {type: '$type', category: '$category'},
                    total: {$sum: '$amount'}
                }
            },
            {
                $group:{
                    _id: '$_id.type',
                    categories:{
                        $push: {
                            category: '$_id.category',
                            total: '$total'
                        }
                    },
                    typeTotal: {$sum: '$total' }
                }
            }
        ]);
        res.status(200).json(report);
    }
    catch (error){
        res.status(500).json({ message: error.message});
    }
});

module.exports = router;