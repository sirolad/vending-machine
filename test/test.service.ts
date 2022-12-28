import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';
import { User } from '../src/infrastructure/database/entity/user.entity';
import { Product } from '../src/infrastructure/database/entity/product.entity';
import dataSource from '../src/infrastructure/config/typeorm.config';

@Injectable()
export class TestService {
  public async cleanDatabase(): Promise<void> {
    try {
      await dataSource.destroy();
      await dataSource.initialize();
      await dataSource.query(`TRUNCATE products RESTART IDENTITY CASCADE;`);
      await dataSource.query(`TRUNCATE users RESTART IDENTITY CASCADE;`);

      await dataSource.destroy();
    } catch (error) {
      throw new Error(`ERROR: Cleaning test database: ${error}`);
    }
  }
}
