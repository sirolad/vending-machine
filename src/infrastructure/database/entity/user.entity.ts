import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../../domain/enum/role.enum';
import { Product } from './product.entity';
import { IsNumber, Validate } from 'class-validator';
import { IsValidCoin } from '../../validators/is-valid-coin.validator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'int', nullable: true })
  @IsNumber()
  @Validate(IsValidCoin, { message: 'Only Valid coins are allowed.' })
  deposit?: number = 0;

  @Column({ type: 'enum', enum: Role, default: Role.Buyer })
  role: Role;

  @OneToMany(() => Product, (product) => product.user)
  products?: Product[];
}
