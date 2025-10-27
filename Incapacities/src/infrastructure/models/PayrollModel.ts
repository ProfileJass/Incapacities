import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize';
import { UserModel } from './UserModel';
import { CompanyModel } from './CompanyModel';

export class PayrollModel extends Model {
  declare id_payroll: string;
  declare id_user: string;
  declare id_company: string;
  declare status: string;
}

PayrollModel.init(
  {
    id_payroll: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: UserModel,
        key: 'id_user',
      },
    },
    id_company: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: CompanyModel,
        key: 'id_company',
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
    },
  },
  {
    sequelize,
    tableName: 'payrolls',
    timestamps: false,
  }
);

PayrollModel.belongsTo(UserModel, { foreignKey: 'id_user', as: 'user' });
PayrollModel.belongsTo(CompanyModel, { foreignKey: 'id_company', as: 'company' });
