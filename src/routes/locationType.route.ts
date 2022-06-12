import { Router } from 'express';
import { deleteLocationType, getLocationTypes, getLocationType, postLocationType, putLocationType } from '../controllers/locationType.controller';


const router = Router();

router.get('/', getLocationTypes);
router.get('/:id', getLocationType);
router.post('/', postLocationType);
router.put('/:id', putLocationType);
router.delete('/:id', deleteLocationType);



export default router;