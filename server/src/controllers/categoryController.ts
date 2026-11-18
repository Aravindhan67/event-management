import { Request, Response } from 'express';
import { Category } from '../models/Category';
import { Event } from '../models/Event';
import { createCategorySchema } from '../validators/schemas';

const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find().sort({ featured: -1, name: 1 });
    res.json({ success: true, data: categories });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCategoryBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      res.status(404).json({ success: false, message: 'Category not found.' });
      return;
    }
    res.json({ success: true, data: category });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = createCategorySchema.parse(req.body);
    const slug = generateSlug(validatedData.name);

    const existing = await Category.findOne({ slug });
    if (existing) {
      res.status(409).json({ success: false, message: 'A category with this name already exists.' });
      return;
    }

    const category = await Category.create({
      ...validatedData,
      slug,
    });

    res.status(201).json({ success: true, message: 'Category created successfully.', data: category });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, icon, image, color, featured } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json({ success: false, message: 'Category not found.' });
      return;
    }

    if (name && name !== category.name) {
      category.name = name;
      category.slug = generateSlug(name);
    }
    if (description !== undefined) category.description = description;
    if (icon !== undefined) category.icon = icon;
    if (image !== undefined) category.image = image;
    if (color !== undefined) category.color = color;
    if (featured !== undefined) category.featured = featured;

    await category.save();

    res.json({ success: true, message: 'Category updated successfully.', data: category });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventsUsingCategory = await Event.countDocuments({ category: req.params.id });
    if (eventsUsingCategory > 0) {
      res.status(400).json({
        success: false,
        message: `Cannot delete category: ${eventsUsingCategory} event(s) are currently assigned to it.`,
      });
      return;
    }

    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      res.status(404).json({ success: false, message: 'Category not found.' });
      return;
    }

    res.json({ success: true, message: 'Category deleted successfully.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
