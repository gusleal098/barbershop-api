import Sequelize, { Model } from 'sequelize'

class Time extends Model {
    static init(sequelize) {
        super.init(
            {
                time: Sequelize.TIME
            }, 
            {
                sequelize
            }
        )

        return this
    }

    static associate(models) {
        this.belongsTo(models.Date, {
            foreignKey: 'date_id',
            as: 'date'
        })
    }
}

export default Time