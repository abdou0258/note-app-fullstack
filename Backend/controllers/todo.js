const { StatusCodes } = require('http-status-codes')
const toDo = require('../models/todo')
require('http-status-codes')
const { BadRequestError, UnauthenticatedError,NotFoundError } = require("../errors");

const getAllTasks = async(req,res)=>{
    const userId = req.user.userId;
    const tasks = await toDo.find({createdBy:userId})
    res.status(StatusCodes.OK).json({tasks})
}

const getTask=async(req,res)=>{
    const {params:{id:taskID},user:{userId}} = req
    const task = await toDo.findOne({_id:taskID,createdBy: userId})
    if (!task) {
        throw new NotFoundError(`No task with id ${taskID}`)
      }
    res.status(StatusCodes.OK).json({task})
}

const createTask=async(req,res)=>{
    req.body.createdBy = req.user.userId
    const task = await toDo.create( req.body)
    res.status(StatusCodes.CREATED).json({task})
}

const updateTask=async(req,res)=>{
    const {
        body: { task},
        user: { userId },
        params: { id: taskID },
      } = req
      if (task === '' ) {
        throw new BadRequestError('task field cannot be empty')
      }
    const taskk = await toDo.findOneAndUpdate({_id:taskID,createdBy: userId},req.body,{new:true,runValidators:true})
    if (!taskk) {
        throw new NotFoundError(`No task with id ${taskID}`)
      }
    res.status(StatusCodes.OK).json({taskk})
}


const deleteTask=async(req,res)=>{
    const { user: { userId },
    params: { id: taskID },} = req
    const task = await toDo.findOneAndDelete({_id:taskID,createdBy: userId,})
    if (!task) {
        throw new NotFoundError(`No task with id ${taskID}`)
      }
    res.status(StatusCodes.OK).json({task})
}


module.exports = {getAllTasks,getTask,createTask,updateTask,deleteTask}