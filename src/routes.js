import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'
import authMiddleware from './app/middlewares/auth'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProductController from './app/controllers/ProductController'
import CategoryController from './app/controllers/CategoryController'
import TimeController from './app/controllers/TimeController'
import ScheduleController from './app/controllers/ScheduleController'

const routes = new Router()

const upload = multer(multerConfig)

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

routes.use(authMiddleware) // COBRA O TOKEN DE TODAS AS ROTAS A BAIXO
routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)

routes.post('/categories', CategoryController.store)
routes.get('/categories', CategoryController.index)

routes.post('/times', TimeController.store)
routes.get('/times', TimeController.index)

routes.post('/schedules', ScheduleController.store)

export default routes