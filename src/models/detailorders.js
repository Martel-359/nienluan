
'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
    class Detailorders extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Detailorders.belongsTo(models.Products,{foreignKey:'Productid'});
            Detailorders.belongsTo(models.Orders,{foreignKey:'Orderid'});

        }
    }
    Detailorders.init({
        Orderid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            // references: {
            //     model: 'Orders',
            //     key: 'Orderid'
            // }
        },
        Productid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            // references: {
            //     model: 'Products',
            //     key: 'Productid'
            // }
        },
        Soluong: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Giasanpham:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Detailorders',
        freezeTableName: true
    });
    return Detailorders;
};
