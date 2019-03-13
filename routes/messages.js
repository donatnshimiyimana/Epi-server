import express from 'express';


import { createMessage, getOneMessage, modifyMessage, getAllMessages, deleteMessage, getAllUnreadMessages, getAllInboxMessages } from './../controllers/messages';

const messageRoutes = express.Router();

messageRouter.route('/')
  .get(getAllMessages)
  .post(jsonParser, createMessage);

messageRouter.route('/unread/messages')
  .get(getAllUnreadMessages);

messageRouter.route('/read/messages')
  .get(getAllInboxMessages);

messageRouter.route('/message/:id')
  .get(getOneMessage)
  .delete(deleteMessage)
  .patch(jsonParser, modifyMessage);


export default messageRoutes;