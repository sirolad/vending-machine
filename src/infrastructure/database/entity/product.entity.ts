import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  amount_available: string;

  @Column({ type: 'float' })
  cost: number;

  @Column({ type: 'varchar', unique: true })
  product_name: string;

  @ManyToOne(() => User, (user) => user.products)
  user: User;
}
