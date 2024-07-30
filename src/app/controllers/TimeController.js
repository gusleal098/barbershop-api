import * as Yup from 'yup'
import Time from '../models/Time'

class TimeController {
    async store(request, response){
        const schema = Yup.object({
            date: Yup.date().required(),
            time: Yup.string().required()
        })

        try {
            schema.validateSync(request.body, {abortEarly: false})
        } catch (err) {
            return response.status(400).json({error: err.erros})
        }

        const { date, time } = request.body

        const timesExists = await Time.findOne({
            where: {
                date,
                time
            }
        })

        if (timesExists) {
            return response.status(400).json({ error: 'Time already exists'})
        }

        const { id } = await Time.create({
            date,
            time
        })

        return response.status(201).json({ id, date, time})
    }

    async index(request, response) {
        const times = await Time.findAll()

        return response.json(times)
    }
}

export default new TimeController()