import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  updateUserRole,
  toggleUserStatus,
  deleteUser,
} from '../controllers/userController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Only admin & super_admin can manage users
router.use(authenticate, authorize('admin', 'super_admin'));

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.patch('/:id/role', updateUserRole);
router.patch('/:id/status', toggleUserStatus);
router.delete('/:id', deleteUser);

export default router;
