import { Router } from 'express';
import { deleteLocation, getLocations, getLocationById, postLocation, putLocation } from '../controllers/location.controller';


const router = Router();

router.get('/', getLocations);
router.get('/:id', getLocationById);
router.post('/', postLocation);
router.put('/:id', putLocation);
router.delete('/:id', deleteLocation);



export default router;