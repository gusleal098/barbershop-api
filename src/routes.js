import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'
import authMiddleware from './app/middlewares/auth'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProductController from './app/controllers/ProductController'
import CategoryController from './app/controllers/CategoryController'
import DateController from './app/controllers/DateController'
import TimeController from './app/controllers/TimeController'
import ScheduleController from './app/controllers/ScheduleController'

const routes = new Router()

const upload = multer(multerConfig)

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

routes.use(authMiddleware) // COBRA O TOKEN DE TODAS AS ROTAS A BAIXO
routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)
routes.put('/products/:id', upload.single('file'), ProductController.update)


routes.post('/categories', CategoryController.store)
routes.get('/categories', CategoryController.index)
routes.put('/categories/:id', CategoryController.update)

routes.post('/dates', DateController.store)
routes.get('/dates', DateController.index)
routes.delete('/dates/:id', DateController.delete)

routes.post('/times', TimeController.store)
routes.get('/times', TimeController.index)
routes.delete('/times/:id', TimeController.delete)

routes.post('/schedules', ScheduleController.store)
routes.get('/schedules', ScheduleController.index)
routes.put('/schedules/:id', ScheduleController.update)

export default routes