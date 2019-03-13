import moment from 'moment';
import { validateMessage } from './../middleware/messagesValidation';
import messages from './../models/messages';

//create new message
export const createMessage = (req, res, next) => {
  const { error } = validateMessage(req.body);
  if (error) {
    return res.status(400).send({
      status: 400,
      error: error.details[0].message
    });
  }
  const newMessage = {
    id: parseInt(messages.length + 1, 10),
    createdOn: moment().format('LL'),
    subject: req.body.subject || '',
    message: req.body.message || '',
    senderId: req.body.senderId || '',
    receiverId: req.body.receiverId || '',
    parentMessageId: parseInt(messages.length + 1, 10) || 0,
    status: req.body.status || ''
  };
  messages.push(newMessage);
  return res.send(({
    status: 201,
    data: [newMessage]
  }));
};

//Get one message
export const getOneMessage = (req, res, next) => {
    const selectedMessage = messages.find(message => message.id === parseInt(req.params.id, 10));
    if (selectedMessage) {
      return res.status(200).send({
        status: 200,
        data: [selectedMessage]
      });
    }
    return res.status(404).send({
      status: 404,
      error: `The message with the id ${req.params.id} was not found`
    });
  };

  //Modify message
  export const modifyMessage = (req, res, next) => {
    const { error } = validateMessage(req.body);
    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message
      });
    }
  
    const messageId = req.params.id;
    const messageIndex = messages.findIndex(message => message.id === parseInt(messageId, 10));
    if (messageIndex > -1) {
      const originalMessage = messages[messageIndex];
  
      const newMessage = {
        id: messageId,
        createdOn: moment().format('LL'),
        subject: req.body.subject || originalMessage.subject,
        message: req.body.message || originalMessage.message,
        senderId: req.body.senderId || originalMessage.senderId,
        parentMessageId: req.body.parentMessageId || originalMessage.parentMessageId,
        status: req.body.status || originalMessage.status
      };
      messages[messageIndex] = newMessage;
      return res.status(201).send({
        status: 201,
        data: [newMessage]
      });
    }
  
    return res.status(404).send({
      status: 404,
      message: `The message with the id ${messageId} was not found`
    });
  };

  //Delete one message
  export const deleteMessage = (req, res, next) => {
    const messageIndex = messages.findIndex(message => message.id === parseInt(req.params.id, 10));
    if (messageIndex > -1) {
      messages.splice(messageIndex);
      return res.status(200).send({
        status: 200,
        data: [{ message: 'Message deleted successfully' }]
      });
    }
  
    return res.status(404).send({
      status: 404,
      message: `The message with the id ${req.params.id} was not found`
    });
  };

  //Get all messages
  export const getAllMessages = (req, res, next) => {
    res.send({
      status: 200,
      data: [messages]
    });
  };
  
  export const getAllUnreadMessages = (req, res, next) => {
    const unread = messages.filter(message => message.status === 'sent');
    if (unread) {
      return res.status(200).send({
        status: 200,
        data: [unread]
      });
    }
    return res.status(404).send({
      status: 404,
      message: 'The unread message was not found'
    });
  };
  
  export const getAllInboxMessages = (req, res, next) => {
    const read = messages.filter(message => message.status === 'read');
    if (read) {
      return res.status(200).send({
        status: 200,
        data: [read]
      });
    }
    return res.status(404).send({
      status: 404,
      message: 'The inbox message was not found'
    });
  };