import Sequelize, { Model } from 'sequelize'

class Date extends Model {
    static init(sequelize) {
        super.init(
            {
                date: Sequelize.DATEONLY,
            }, 
            {
                sequelize
            }
        )

        return this
    }
}

export default Date