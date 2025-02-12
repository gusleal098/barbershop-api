import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import configDatabase from '../config/database'

import User from '../app/models/User'
import Product from '../app/models/Product';
import Category from '../app/models/Category'
import Date from '../app/models/Date'
import Time from '../app/models/Time';

const models = [User, Product, Category, Date, Time]

class Database {
    constructor() {
        this.init()
        this.mongo()
    }

    init() {
        this.connection = new Sequelize(configDatabase)
        models.map((model) => model.init(this.connection))
        .map(
            (model) => model.associate && model.associate(this.connection.models)
        )
    }

    mongo() {
        this.mongoConnection = mongoose.connect(
            'mongodb://localhost:27017/barbershop'
        )
    }
}

export default new Database()