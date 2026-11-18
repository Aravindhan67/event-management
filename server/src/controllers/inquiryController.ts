import { Request, Response } from 'express';
import { Inquiry } from '../models/Inquiry';
import { createInquirySchema } from '../validators/schemas';

export const createInquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = createInquirySchema.parse(req.body);
    const inquiry = await Inquiry.create(validatedData);
    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received.',
      data: inquiry,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getInquiries = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query: any = {};
    if (status) query.status = status;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const [inquiries, total] = await Promise.all([
      Inquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Inquiry.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: inquiries,
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateInquiryStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, notes } = req.body;
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      res.status(404).json({ success: false, message: 'Inquiry not found.' });
      return;
    }

    if (status) inquiry.status = status;
    if (notes !== undefined) inquiry.notes = notes;

    await inquiry.save();
    res.json({ success: true, message: 'Inquiry updated successfully.', data: inquiry });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteInquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      res.status(404).json({ success: false, message: 'Inquiry not found.' });
      return;
    }
    res.json({ success: true, message: 'Inquiry deleted successfully.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
