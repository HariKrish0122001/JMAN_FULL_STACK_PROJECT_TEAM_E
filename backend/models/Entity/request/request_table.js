module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('feedback', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        request:{
            type:DataTypes.STRING,
            allowNull:false
        },            
    },{
        timestamps: false, // This disables createdAt and updatedAt fields
    });

    return User;
}