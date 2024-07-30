import Sequelize, { Model } from 'sequelize'

class Time extends Model {
    static init(sequelize) {
        super.init(
            {
                date: Sequelize.DATEONLY,
                time: Sequelize.TIME
            }, 
            {
                sequelize
            }
        )

        return this
    }
}

export default Time