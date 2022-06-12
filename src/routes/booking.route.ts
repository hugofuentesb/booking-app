import { Router } from 'express';
import { deleteBooking, getBookings, getBooking, getBookingsByFilters, postBooking, putBooking } from '../controllers/booking.controller';


const router = Router();

router.get('/', getBookings);
router.get('/:id', getBooking);
//router.post('/', getBookings);
router.post('/', postBooking);
router.put('/:id', putBooking);
router.delete('/:id', deleteBooking);



export default router;