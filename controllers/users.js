// in controllers/users.js
import users from './../models/users';
import { validateUser } from './../middleware/usersValidation';

//To create new user
export const createUser = (req, res, next) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send({
      status: 400,
      error: error.details[0].message
    });
  }
  const newUser = {
    id: parseInt(users.length + 1, 10),
    email: req.body.email || '',
    firstname: req.body.firstname || '',
    lastname: req.body.lastname || '',
    password: req.body.password || ''
  };
  users.push(newUser);
  return res.send(({
    status: 201,
    data: [newUser]
  }));
};

//To get one user Details
export const getOneUser = (req, res, next) => {
  const selectedUser = users.find(user => user.id === parseInt(req.params.id, 10));
  if (selectedUser) {
    return res.status(200).send({
      status: 200,
      data: [selectedUser]
    });
  }
  return res.status(404).send({
    status: 404,
    error: `The user with the id ${req.params.id} was not found`
  });
};

//To modify user details
export const modifyUser = (req, res, next) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send({
      status: 400,
      error: error.details[0].message
    });
  }

  const userId = req.params.id;
  const userIndex = users.findIndex(user => user.id === parseInt(userId, 10));
  if (userIndex > -1) {
    const originalUser = users[userIndex];

    const newUser = {
      id: userId,
      email: req.body.email || originalUser.email,
      firstname: req.body.firstname || originalUser.message,
      lastname: req.body.lastname || originalUser.lastname,
      password: req.body.password || originalUser.password
    };
    users[userIndex] = newUser;
    return res.status(201).send({
      status: 201,
      data: [newUser]
    });
  }

  return res.status(404).send({
    status: 404,
    message: `The message with the id ${userId} was not found`
  });
};

//To delete one User
export const deleteUser = (req, res, next) => {
  const userIndex = users.findIndex(user => user.id === parseInt(req.params.id, 10));
  if (userIndex > -1) {
    users.splice(userIndex);
    return res.status(200).send({
      status: 200,
      data: [{ message: 'User deleted successfully' }]
    });
  }

  return res.status(404).send({
    status: 404,
    message: `The user with the id ${req.params.id} was not found`
  });
};

//Get all users
export const getAllUsers = (req, res, next) => {
  res.send({
    status: 200,
    data: [users]
  });
};