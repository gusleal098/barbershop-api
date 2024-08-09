module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'barbershop',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
    timezone: 'Etc/UTC',
    dialectOptions: {
        useUTC: true,
        dateStrings: true
    }
}