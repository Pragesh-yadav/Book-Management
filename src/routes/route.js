let express = require("express")
let router = express.Router()
let { createUser, userLogin } = require("../controllers/userController")
let { createBook, getBooks, updateBook, deleteBook, getBookById,bookCoverUrl } = require("../controllers/bookController")
let { createReview, updateReview, deleteReview } = require("../controllers/reviewController")
let { authenticate, authorise, authorisePutAndDelete } = require("../middleware/auth")
router.post("/register", createUser)
router.post("/login", userLogin)

router.post("/bookCover", bookCoverUrl)
router.post("/books", authenticate, authorise, createBook)
router.get("/books", authenticate, getBooks)
router.get("/books/:bookId", authenticate, getBookById)
router.put("/books/:bookId", authenticate, authorisePutAndDelete, updateBook)
router.delete("/books/:bookId", authenticate, authorisePutAndDelete, deleteBook)

router.post("/books/:bookId/review", createReview)
router.put("/books/:bookId/review/:reviewId", updateReview)
router.delete("/books/:bookId/review/:reviewId", deleteReview)


module.exports = router;