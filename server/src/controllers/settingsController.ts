import { Request, Response } from 'express';
import { WebsiteSettings } from '../models/WebsiteSettings';

export const getSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = await WebsiteSettings.create({});
    }
    res.json({ success: true, data: settings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = await WebsiteSettings.create(req.body);
    } else {
      settings = await WebsiteSettings.findByIdAndUpdate(settings._id, req.body, { new: true });
    }
    res.json({ success: true, message: 'Website settings updated successfully.', data: settings });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
