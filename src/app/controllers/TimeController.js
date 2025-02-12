import * as Yup from 'yup'
import Time from '../models/Time'
import User from '../models/User'
import Date from '../models/Date'

class TimeController {
    async store(request, response){
        const schema = Yup.object({
            time: Yup.string().required(),
            date_id: Yup.number().required()
        })

        try {
            schema.validateSync(request.body, {abortEarly: false})
        } catch (err) {
            return response.status(400).json({error: err.erros})
        }

        const { admin: isAdmin } = await User.findByPk(request.userId)

        if (!isAdmin) {
            return response.status(401).json()
        }

        const { time, date_id } = request.body

        const timesExists = await Time.findOne({
            where: {
                time,
                date_id
            }
        })

        if (timesExists) {
            return response.status(400).json({ error: 'Time already exists'})
        }

        const {id} = await Time.create({
            time,
            date_id
        })

        return response.status(201).json({id, time})
    }

    async delete(request, response){
        const schema = Yup.object({
            id: Yup.string().required()
        })

        try {
            schema.validateSync(request.params, {abortEarly: false})
        } catch (err) {
            return response.status(400).json({error: err.erros})
        }

        const { admin: isAdmin } = await User.findByPk(request.userId)

        if (!isAdmin) {
            return response.status(401).json()
        }

        const { id } = request.params

        const timesExists = await Time.findOne({
            where: { id }
        })

        if (!timesExists) {
            return response.status(404).json({ error: 'Time not found'})
        }

        await Time.destroy({
            where: {id}
        })

        return response.status(200).json({ message: 'Time deleted sucessfully' })
    }

    async index(request, response) {
        const times = await Time.findAll({
            include: [
                {
                    model: Date,
                    as: 'date',
                    attributes: ['id', 'date']
                }
            ]
        })

        return response.json(times)
    }
}

export default new TimeController()