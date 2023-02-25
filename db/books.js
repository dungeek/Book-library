const { db } = require('./mongo');

const collection = db.collection('books');

async function findAllByTitle(value = '') {
    const cursor = collection.find({
        title: value,
    });
    const books = [];
    await cursor.forEach((book) => books.push(book));
    return books;
}

async function findAllByPrice(start, end) {
    const cursor = collection.find({
        price: {
            $lte: start,
            $gte: end,
        },
    });
    const books = [];
    await cursor.forEach((book) => books.push(book));
    return books;
}

async function createBook(book = {}) {
    return collection.insertOne(book);
}

module.exports = {
    createBook,
    findAllByPrice,
    findAllByTitle,
};