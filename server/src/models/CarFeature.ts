import { DataTypes, Sequelize, Model } from 'sequelize';

interface CarFeaturesAttributes {
    car_id: string;
    feature_id: string;
}
export class CarFeatures extends Model<CarFeaturesAttributes> implements CarFeaturesAttributes {
   public car_id!: string;
   public feature_id!: string;
   
   // timestamps!
   public readonly createdAt!: Date;
   public readonly updatedAt!: Date;
}
export function CarFeaturesFactory(sequelize: Sequelize) {
    CarFeatures.init(
        {
            car_id: {
                type: DataTypes.STRING,
                allowNull: false,
                references: { model: 'car', key: 'vin' }
            },
            feature_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'features', key: 'id' }
            }
        },
        {
            tableName: 'car_features',
            sequelize,
        }
    );
    return CarFeatures;
}

