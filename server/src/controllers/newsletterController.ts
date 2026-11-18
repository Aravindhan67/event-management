import { Request, Response } from 'express';
import { Newsletter } from '../models/Newsletter';
import { createNewsletterSchema } from '../validators/schemas';

export const subscribeNewsletter = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = createNewsletterSchema.parse(req.body);

    const existing = await Newsletter.findOne({ email });
    if (existing) {
      if (!existing.isActive) {
        existing.isActive = true;
        await existing.save();
      }
      res.json({ success: true, message: 'You are subscribed to the newsletter!' });
      return;
    }

    await Newsletter.create({ email });
    res.status(201).json({ success: true, message: 'Successfully subscribed to the newsletter!' });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getSubscribers = async (req: Request, res: Response): Promise<void> => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    res.json({ success: true, data: subscribers });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
