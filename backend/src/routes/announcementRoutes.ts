import { Router } from 'express';
import {
  getAnnouncementsController,
  createAnnouncementController,
  getAnnouncementByIdController,
  updateAnnouncementController,
  deleteAnnouncementController,
} from '../controllers/announcementController';

const router = Router();

router.get('/', getAnnouncementsController);
router.post('/', createAnnouncementController);
router.get('/:id', getAnnouncementByIdController);
router.put('/:id', updateAnnouncementController);
router.delete('/:id', deleteAnnouncementController);

export default router;
