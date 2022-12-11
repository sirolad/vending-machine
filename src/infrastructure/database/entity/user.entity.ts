import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../../domain/enum/role.enum';
import { Product } from './product.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'int', nullable: true })
  deposit: number;

  @Column({ type: 'enum', enum: Role, default: Role.Buyer })
  role: Role;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}
