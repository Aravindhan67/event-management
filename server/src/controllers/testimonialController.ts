import { Request, Response } from 'express';
import { Testimonial } from '../models/Testimonial';
import { createTestimonialSchema } from '../validators/schemas';

export const getTestimonials = async (req: Request, res: Response): Promise<void> => {
  try {
    const { approvedOnly = 'true' } = req.query;
    const query: any = {};
    if (approvedOnly === 'true') {
      query.isApproved = true;
    }

    const testimonials = await Testimonial.find(query).sort({ rating: -1, createdAt: -1 });
    res.json({ success: true, data: testimonials });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = createTestimonialSchema.parse(req.body);
    const testimonial = await Testimonial.create(validatedData);
    res.status(201).json({ success: true, message: 'Testimonial submitted successfully.', data: testimonial });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!testimonial) {
      res.status(404).json({ success: false, message: 'Testimonial not found.' });
      return;
    }
    res.json({ success: true, message: 'Testimonial updated successfully.', data: testimonial });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      res.status(404).json({ success: false, message: 'Testimonial not found.' });
      return;
    }
    res.json({ success: true, message: 'Testimonial deleted successfully.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
