import { Router } from 'express';
import { deleteTest, getTest, getTests, postTest, putTest } from '../controllers/test.controller';


const router = Router();

router.get('/', getTests);
router.get('/:id', getTest);
router.post('/', postTest);
router.put('/:id', putTest);
router.delete('/:id', deleteTest);



export default router;