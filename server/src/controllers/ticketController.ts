import { Request, Response } from 'express';
import { Ticket } from '../models/Ticket';
import { Event } from '../models/Event';
import { createTicketSchema } from '../validators/schemas';

export const getTicketsByEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const tickets = await Ticket.find({ event: req.params.eventId });
    res.json({ success: true, data: tickets });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = createTicketSchema.parse(req.body);

    const event = await Event.findById(validatedData.event);
    if (!event) {
      res.status(404).json({ success: false, message: 'Associated event not found.' });
      return;
    }

    const ticket = await Ticket.create({
      ...validatedData,
      availableQuantity: validatedData.quantity,
    });

    res.status(201).json({ success: true, message: 'Ticket tier created successfully.', data: ticket });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      res.status(404).json({ success: false, message: 'Ticket not found.' });
      return;
    }

    const updated = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: 'Ticket updated successfully.', data: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) {
      res.status(404).json({ success: false, message: 'Ticket not found.' });
      return;
    }
    res.json({ success: true, message: 'Ticket tier deleted successfully.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
