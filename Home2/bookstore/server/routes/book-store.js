const router = require('express').Router();

const BookStore = require('../models/book-store');

const booksJson = require('./../books.json');


router.get('/books', (req, res, next) => {
    // BookStore.find({}, (err, books) => {
    //     res.json({
    //         success: true,
    //         message: "Success",
    //         books: booksJson
    //     })
    // })
    res.json({
        success: true,
        message: "Success",
        books: booksJson
    })
});


router.get('/books/:id', (req, res, next) => {
    BookStore.findById({ _id: req.params.id })
        .exec((err, book) => {
            if (err) {
                res.json({
                    success: false,
                    message: 'book is not found'
                });
            } else {
                if (book) {
                    res.json({
                        success: true,
                        book: book
                    });
                }
            }
        });
});

router.get('/books/:pricestart/:priceend', (req, res, next) => {
    BookStore.find({
        minNum: { $gte: 50 },
        maxNum: { $lte: 100 }
    });
});

module.exports = router;


