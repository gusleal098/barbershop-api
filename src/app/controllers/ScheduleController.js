import * as Yup from 'yup';
import Schedule from '../schemas/Schedules';
import Product from '../models/Product';
import Category from '../models/Category';
import Time from '../models/Time'
import User from '../models/User'

class ScheduleController {
  async store(request, response) {
    const schema = Yup.object({
      products: Yup.array()
        .required()
        .of(
          Yup.object({
            id: Yup.number().required(),
          }),
        ),
        times: Yup.array()
        .required()
        .of(
            Yup.object({
                id: Yup.number().required(),
            })
        )
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { products, times } = request.body;

    const productsIds = products.map((product) => product.id);

    const findProducts = await Product.findAll({
      where: {
        id: productsIds,
      },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['name'],
        },
      ],
    });

    const formattedProducts = findProducts.map((product) => {
      const newProduct = {
        id: product.id,
        name: product.name,
        category: product.category.name,
        price: product.price,
        url: product.url,
      };

      return newProduct;
    });

    const timesId = times.map((time) => time.id)

    const findTimes = await Time.findAll({
        where: {
            id: timesId
        }
    })

    const formattedTimes = findTimes.map((times) => {
        const newTime = {
            id: times.id,
            date: times.date,
            times: times.time
        }

        return newTime
    })

    const schedule = {
      user: {
        id: request.userId,
        name: request.userName,
        phone_number: request.userPhoneNumber,
      },
      products: formattedProducts,
      times: formattedTimes,
      status: 'Agendamento realizado',
    };

    const createdSchedule = await Schedule.create(schedule);

    return response.status(201).json(createdSchedule);
  }

  async index(request, response) {
    const schedules = await Schedule.find()

    return response.json(schedules)
  }

  async update(request, response) {
    const schema = Yup.object({
      status: Yup.string().required()
    })

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(request.userId)

    if (!isAdmin) {
      return response.status(401).json()
    }

    const { id } = request.params
    const { status } = request.body

    try {
      await Schedule.updateOne({ _id: id }, { status })
    } catch (err) {
      return response.status(400).json({ error: err.message })
    }

    return response.json({ message: 'Status updated sucessfully' })
  }
}

export default new ScheduleController();