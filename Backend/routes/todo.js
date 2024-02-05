const {Router} = require('express')
const router = Router()

const {getAllTasks,getTask,createTask,updateTask,deleteTask} = require('../controllers/todo')



router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router