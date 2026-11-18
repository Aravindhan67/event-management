import { Router, Request, Response } from 'express';
import { upload } from '../middleware/upload';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post(
  '/',
  authenticate,
  upload.single('image'),
  (req: Request, res: Response): void => {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'Please upload an image file.' });
      return;
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
      success: true,
      message: 'Image uploaded successfully.',
      url: fileUrl,
      filename: req.file.filename,
    });
  }
);

router.post(
  '/multiple',
  authenticate,
  upload.array('images', 5),
  (req: Request, res: Response): void => {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      res.status(400).json({ success: false, message: 'Please upload at least one image.' });
      return;
    }

    const urls = files.map((file) => `/uploads/${file.filename}`);
    res.json({
      success: true,
      message: 'Images uploaded successfully.',
      urls,
    });
  }
);

export default router;
