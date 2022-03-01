import { Optional } from 'sequelize';
import { WithoutTimestamps } from ':helpers/types';

import {
  Model,
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  DefaultScope,
  Scopes,

  // HasOne,
  // HasMany,
  // BelongsToMany,
} from 'sequelize-typescript';


export interface UserAttributes {
  auth_id: string;
  email: string;
  password?: string;
  about_me?: string;
  name?: string;
  birth_date?: Date;
  address?: string;
  country?: string;
  city?: string;
  postal_code?: string;
  language: string;
  settings?: Record<string, unknown>;
  avatar?: string;

  is_admin?: boolean;
  phone_number?: string;
  stripe_id?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserCreationAttributes = Optional<
  WithoutTimestamps<UserAttributes>,
  | 'password'
  | 'about_me'
  | 'name'
  | 'birth_date'
  | 'address'
  | 'country'
  | 'city'
  | 'postal_code'
  | 'language'
  | 'settings'
  | 'avatar'
  | 'phone_number'
>;


@Table({ tableName: 'users' })
@DefaultScope(() => ({
  attributes: { exclude: ['password', 'settings'] },
}))
@Scopes(() => ({ allInfo: {} }))
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({ type: DataType.STRING, allowNull: false, primaryKey: true, autoIncrement: true })
  auth_id: string;

  @Column({ type: DataType.STRING, allowNull: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: true })
  password: string;

  @Column({ type: DataType.STRING, allowNull: true })
  about_me: string;

  @Column({ type: DataType.STRING, allowNull: true })
  name: string;

  @Column({ type: DataType.DATEONLY, allowNull: true })
  birth_date: Date;

  @Column({ type: DataType.STRING, allowNull: true })
  address: string;

  @Column({ type: DataType.STRING, allowNull: true })
  country: string;

  @Column({ type: DataType.STRING, allowNull: true })
  city: string;

  @Column({ type: DataType.STRING, allowNull: true })
  postal_code: string;

  @Column({ type: DataType.STRING(5), allowNull: false, defaultValue: 'en' })
  language: string;

  @Column({ type: DataType.JSONB, allowNull: true })
  settings: Record<string, unknown>;

  @Column({ type: DataType.STRING, allowNull: true })
  avatar: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_admin: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  phone_number: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;


  // > Associations

  // @HasMany(() => Assignment, 'user_auth_id')
  // assignments?: Assignment[];


  // @BelongsToMany(() => Product, () => ProductPurchase, 'user_auth_id')
  // products?: Product[];

  // @HasMany(() => ProductPurchase, 'user_auth_id')
  // purchases?: ProductPurchase[];
}
