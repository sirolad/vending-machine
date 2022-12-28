import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Product } from '../src/infrastructure/database/entity/product.entity';
import { Role } from '../dist/domain/enum/role.enum';
import { TestService } from './test.service';
import dataSource from '../src/infrastructure/config/typeorm.config';

describe('Vending Machine (e2e)', () => {
  let app: INestApplication;
  const testService = new TestService();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await testService.cleanDatabase();
    await app.close();
  });

  const Seller = 'Sellersy';
  const Buyer = 'Buyer';

  it("Let's Create a Seller", () => {
    return request(app.getHttpServer())
      .post('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        username: Seller,
        password: 'Secrets',
        role: 'seller',
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.role).toEqual(Role.Seller);
        expect(response.body.username).toEqual(Seller);
      });
  });

  it("Let's Create a Buyer", () => {
    return request(app.getHttpServer())
      .post('/users')
      .set('Accept', 'application/json')
      .send({
        username: Buyer,
        password: 'Secrets',
        role: 'buyer',
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.role).toEqual(Role.Buyer);
        expect(response.body.username).toEqual(Buyer);
      });
  });

  let sellerAuth: string;
  it('Seller can Authenticate', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({
        username: Seller,
        password: 'Secrets',
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Object);
        sellerAuth = response.body.access_token;
      });
  });

  let buyerAuth: string;
  it('Buyer can Authenticate', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({
        username: Buyer,
        password: 'Secrets',
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Object);
        buyerAuth = response.body.access_token;
      });
  });

  it('Let Our Seller Create a Product', () => {
    return request(app.getHttpServer())
      .post('/products')
      .set('Accept', 'application/json')
      .auth(sellerAuth, { type: 'bearer' })
      .send({
        amountAvailable: 5,
        cost: 50,
        name: 'Snickers',
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.amountAvailable).toEqual(5);
        expect(response.body.name).toEqual('Snickers');
        expect(response.body.cost).toEqual(50);
      });
  });

  it('Our Seller Can Create Product With Valid Cost', () => {
    return request(app.getHttpServer())
      .post('/products')
      .set('Accept', 'application/json')
      .auth(sellerAuth, { type: 'bearer' })
      .send({
        amountAvailable: 1,
        cost: 51,
        name: 'Snickers',
      })
      .expect(400);
  });

  it('Buyer Can only deposit valid amount', () => {
    return request(app.getHttpServer())
      .post('/users/deposit')
      .set('Accept', 'application/json')
      .auth(buyerAuth, { type: 'bearer' })
      .send({
        deposit: 300,
      })
      .expect(400);
  });

  it('Let Our Buyer Make a Deposit', () => {
    return request(app.getHttpServer())
      .post('/users/deposit')
      .set('Accept', 'application/json')
      .auth(buyerAuth, { type: 'bearer' })
      .send({
        deposit: 100,
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.role).toEqual(Role.Buyer);
        expect(response.body.username).toEqual(Buyer);
      });
  });

  it('Let the Buyer buy a product', async () => {
    await dataSource.initialize();
    const getProduct = await dataSource
      .getRepository(Product)
      .findOne({ where: { id: null } });

    return request(app.getHttpServer())
      .post(`/products/${getProduct.id}/buy`)
      .set('Accept', 'application/json')
      .auth(buyerAuth, { type: 'bearer' })
      .send({
        amount: 1,
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.cost).toEqual(50);
        expect(response.body.product).toEqual('Snickers');
      });
  });

  it('Buyer can reset deposit', () => {
    return request(app.getHttpServer())
      .patch('/users/deposit/reset')
      .set('Accept', 'application/json')
      .auth(buyerAuth, { type: 'bearer' })
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.role).toEqual(Role.Buyer);
        expect(response.body.username).toEqual(Buyer);
        expect(response.body.deposit).toEqual(0);
      });
  });

  it('/ (GET) all users users', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
      });
  });
});
