import { Router } from 'express';
import { Message } from '../models/Message';
import { checkUserConvo } from '../lib/checkUserConvo';

export const messagesRouter = Router();

// Create a message
messagesRouter.post('/', async (req, res, next) => {
  try {
    await checkUserConvo(res.locals.user.id, req.body.conversationId);

    // const message = new Message(req.body); // NOTE: THIS IS DANGEROUS

    // Example of "safer" database creation from client data
    const { content, userId, conversationId } = req.body;
    const message = new Message({ content, userId, conversationId });
    await message.save();
    res.json(message);
  } catch (e) {
    console.log(e);

    next(e);
  }
});
