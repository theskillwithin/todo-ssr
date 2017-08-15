'use strict';
const {fields, validate} = require('./validation');
const {toCamelCase, toSnakeCase} = require('case-converter');  // TODO :: https://github.com/tgriesser/knex/issues/2084

const addTodoSchema = {
  description: fields.string().label('To-do description'),
  name:        fields.string().required().label('To-do name'),
  userId:      fields.number().required().label('User ID'),
};

const getTodosSchema = {
  userId: fields.number().required().label('User ID')
};

const removeTodoSchema = {
  id: fields.number().required().label('To-do ID')
};

const updateTodoSchema = {
  description: fields.string().label('To-do description'),
  id:          fields.number().required().label('To-do ID'),
  name:        fields.string().required().label('To-do name')
};

module.exports = db => {

  const addTodo = async (name, description, userId) => {
    await validate({ name, description, userId }, addTodoSchema);
    return await db.table('todos').insert(toSnakeCase({ name, description, userId }));
  };

  const getTodos = async userId => {
    await validate({ userId }, getTodosSchema);
    return await db.table('todos').where(toSnakeCase({ userId })).orderBy('id', 'asc');
  };

  const removeTodo = async id => {
    await validate({ id }, removeTodoSchema);
    return await db.table('todos').where({ id }).del();
  };

  const updateTodo = async (name, description, id) => {
    await validate({ name, description, id }, updateTodoSchema);
    return await db.table('todos').where({ id }).update({ name, description });
  };

  return { addTodo, getTodos, removeTodo, updateTodo };

};
