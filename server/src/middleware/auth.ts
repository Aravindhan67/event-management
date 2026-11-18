import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUserDocument } from '../models/User';
import { Event } from '../models/Event';
import { UserRole } from '../types';

export interface AuthRequest extends Request {
  user?: IUserDocument;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string | undefined;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({ success: false, message: 'Authentication required. No token provided.' });
      return;
    }

    const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_event_management_2026_xyz';
    const decoded = jwt.verify(token, secret) as { id: string; role: string };

    const user = await User.findById(decoded.id).select('+password');
    if (!user || !user.isActive) {
      res.status(401).json({ success: false, message: 'User account is inactive or not found.' });
      return;
    }

    req.user = user;
    next();
  } catch (error: any) {
    res.status(401).json({ success: false, message: 'Invalid or expired authentication token.' });
  }
};

export const authorize = (...roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required.' });
      return;
    }

    if (!roles.includes(req.user.role as UserRole)) {
      res.status(403).json({
        success: false,
        message: `Forbidden: Access restricted to [${roles.join(', ')}]. Your role is: ${req.user.role}`,
      });
      return;
    }

    next();
  };
};

export const checkEventOwnership = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required.' });
      return;
    }

    // Admins and Super Admins can manage any event
    if (req.user.role === 'admin' || req.user.role === 'super_admin') {
      return next();
    }

    const eventId = req.params.id || req.body.eventId;
    if (!eventId) {
      return next();
    }

    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404).json({ success: false, message: 'Event not found.' });
      return;
    }

    if (event.organizer.toString() !== req.user._id.toString()) {
      res.status(403).json({
        success: false,
        message: 'Forbidden: You do not have permission to manage an event created by another organizer.',
      });
      return;
    }

    next();
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
