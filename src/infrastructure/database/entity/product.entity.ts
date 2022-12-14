import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'amount_available' })
  amountAvailable: number;

  @Column({ type: 'float' })
  cost: number;

  @Column({ type: 'varchar', unique: true, name: 'product_name' })
  name: string;

  @ManyToOne(() => User, (user) => user.products, { cascade: true })
  @JoinColumn({ name: 'seller_id' })
  sellerId: User;
}
