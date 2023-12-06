const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionControler = require('./controllers/SessionController')
const SpotsController = require('./controllers/SpotsController')
const DashboardController = require('./controllers/DashboardController')
const BookingController = require('./controllers/BookingController')
const ApprovalController = require('./controllers/ApprovalController')
const RejectionController = require('./controllers/RejectionController')

const routes = express.Router();
const upload = multer(uploadConfig)

routes.post('/sessions', SessionControler.store)

routes.get('/spots', SpotsController.index)
routes.post('/spots', upload.single('thumbnail'), SpotsController.store)

routes.get('/dashboard', DashboardController.show)

routes.post('/spots/:spot_id/bookings', BookingController.store)

routes.post('/bookings/:booking_id/approvals', ApprovalController.store)
routes.post('/bookings/:booking_id/rejections', RejectionController.store)

module.exports = routes