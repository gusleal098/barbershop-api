import * as Yup from 'yup'
import Schedule from '../schemas/Schedules'
import Product from '../models/Product'
import Category from '../models/Category'

class ScheduleController {
    async store(request, response){
        const schema = Yup.object({
            products: Yup.array()
                .required()
                .of(
                    Yup.object({
                        id: Yup.number().required(),
                    }),
            )
        })

        try {
            schema.validateSync(request.body, {abortEarly: false})
        } catch (err) {
            return response.status(400).json({error: err.erros})
        }

        const { products } = request.body

        const productsIds = products.map((product) => product.id)

        const findProducts = await Product.findAll({
            where: {
                id: productsIds
            },
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name']
                }
            ]
        })

        const formattedProducts = findProducts.map((product) => {
            const newProduct = {
                id: product.id,
                name: product.name,
                category: product.category.name,
                price: product.price,
                url: product.url
            }

            return newProduct
        })

        const schedule = {
            user: {
                id: request.userId,
                name: request.userName,
                email: request.userEmail
            },
            products: formattedProducts,
            status: 'Agendamento realizado'
        }

        const createdSchedule = await Schedule.create(schedule)

        return response.status(201).json(createdSchedule)
    }
}

export default new ScheduleController()