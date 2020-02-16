const router = require('express').Router();

const BookStore = require('../models/book-store');

const booksJson = require('./../books.json');


router.get('/books', (req, res, next) => {
    console.log('getting books...');
    BookStore.find({}, (err, books) => {
        if (err) {
            console.log('error getting books ', err);
        } else {
            res.json({
                success: true,
                message: "Success",
                books: books
            })
        }
    })
});

router.post('/books/save', (req, res, next) => {
    var bookStore = new BookStore(req.body);
    bookStore.save();

    bookStore.save(function (err, savedBooks) {
        if (err) {
            console.log('error saving books ', err);
        }
        res.json({
            success: true,
            message: "Success",
            books: savedBooks
        });
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


