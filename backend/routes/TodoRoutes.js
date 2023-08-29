const express =  require ("express")
const router = express.Router()

const 
{
   addTodo,
   getTodos,
  getTodo,
  addTaskOnly,
  editTodo,
  editTitleOnly,
  deleteTodo,
} = require ("../controllers/TodoControllers.js");


router.route("/addtodo").post(addTodo)
router.route("/gettodos").get(getTodos)
router.route("/gettodo/:todoId").get(getTodo);
router.route("/addtaskonly/:todoId").put(addTaskOnly);
router.route("/edittodo/:todoId").put(editTodo);
router.route("/editTitleOnly/:todoId").put(editTitleOnly);
router.route("/detetetodo/:todoId").delete(deleteTodo);
// router.route("/editTaskOnly/:todoId").put(editTaskOnly);

    //    exporting the router 
   module.exports = router;
