import * as Yup from 'yup'
import Date from '../models/Date'
import User from '../models/User'

class DateController {
    async store(request, response){
        const schema = Yup.object({
            date: Yup.string().required(),
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

        const { date } = request.body

        const datesExists = await Date.findOne({
            where: {
                date
            }
        })

        if (datesExists) {
            return response.status(400).json({ error: 'Date already exists'})
        }

        const { id } = await Date.create({
            date
        })

        return response.status(201).json({ id, date})
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

        const datesExists = await Date.findOne({
            where: { id }
        })

        if (!datesExists) {
            return response.status(404).json({ error: 'Date not found'})
        }

        await Date.destroy({
            where: {id}
        })

        return response.status(200).json({ message: 'Date deleted sucessfully' })
    }

    async index(request, response) {
        const dates = await Date.findAll()

        return response.json(dates)
    }
}

export default new DateController()