import Exercise from "../models/exercise.model.js"

export const listAllExercises = async(req, res) => {
    try {
        const exercises = await Exercise.find()
        res.json(exercises)   
    } catch(err) {
        res.status(400).json('Error: ' + err)
    }
}

export const addExercise = async(req, res) => {
    try {
        const username = req.body.username;
        const description = req.body.description
        const duration = Number(req.body.duration);
        const date = Date.parrse(req.body.date);

        const newExercise = new Exercise({
            username,
            description,
            duration,
            date
        })

        newExercise.save()
        res.status(200).json('Exercises added!')
    } catch(err) {
        res.status(400).json('Error: ' + err)
    }
}

export const getExercise = async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id)
        res.json(exercise)
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
}

export const deleteExercise = async (req, res) => {
    try {
        await Exercise.findByIdAndDelete(req.params.id);
        res.json('Exercise deleted.')
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
}

export const updateExercise = async (req, res) => {
    try {
        await Exercise.findById(req.params.id).then(exercise => {
            exercise.username = req.body.username
            exercise.description = req.body.description
            exercise.duration = Number(req.body.duration)
            exercise.date(Date.parse(req.body.date))

            try {
                exercise.save()
                res.json('Exercise updated!')   
            } catch(err) {
                res.status(400).json('Error: ' + err)
            }
        })
    } catch(err) {
        res.status(400).json('Error: ' + err)
    }
    
}