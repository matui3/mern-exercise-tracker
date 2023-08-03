import express from "express"
import {
    listAllExercises,
    addExercise,
    getExercise,
    deleteExercise,
    updateExercise
} from "../controllers/exerciseController.js"

const router = express.Router()

router.get("/", listAllExercises)
router.post("/add", addExercise)
router.get('/:id', getExercise)

router.delete('/:id', deleteExercise)

router.post('/update/:id', updateExercise)

export default router