import * as Yup from 'yup'
import Category from '../models/Category'
import User from '../models/User'

class CategoryController {
    async store(request, response){
        const schema = Yup.object({
            name: Yup.string().required(),
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

        const { name } = request.body

        const categoryExists = await Category.findOne({
            where: {
                name,
            }
        })

        if (categoryExists) {
            return response.status(400).json({ error: 'Category already exists'})
        }

        const { id } = await Category.create({
            name,
        })

        return response.status(201).json({ id, name})
    }

    async update(request, response){
        const schema = Yup.object({
            name: Yup.string(),
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

        const { id } = request.params

        const categoryExists = await Category.findByPk(id)

        if (!categoryExists) {
            return response
            .status(400)
            .json({ message: 'Make sure your category Id is correct'})
        }

        const { name } = request.body

        if (name) {
            const categoryNameExists = await Category.findOne({
                where: {
                    name,
                }
            })
    
            if (categoryNameExists && categoryNameExists.id !== id) {
                return response.status(400).json({ error: 'Category already exists'})
            }
        }

        await Category.update({
            name
        }, {
            where: {
                id
            }
        })

        return response.status(200).json()
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

        const categoryExists = await Category.findOne({
            where: { id }
        })

        if (!categoryExists) {
            return response.status(404).json({ error: 'Category not found'})
        }

        await Category.destroy({
            where: {id}
        })

        return response.status(200).json({ message: 'Category deleted sucessfully' })
    }

    async index(request, response) {
        const categories = await Category.findAll()

        return response.json(categories)
    }
}

export default new CategoryController()