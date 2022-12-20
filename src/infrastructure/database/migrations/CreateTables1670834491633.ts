import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1670834491633 implements MigrationInterface {
  name = 'CreateTables1670834491633';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('seller', 'buyer', 'admin')`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "deposit" integer, "role" "public"."user_role_enum" NOT NULL DEFAULT 'buyer', CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "products" ("id" SERIAL NOT NULL, "amount_available" character varying NOT NULL, "cost" double precision NOT NULL, "product_name" character varying NOT NULL, "userId" integer, CONSTRAINT "UQ_aff16b2dbdb8fa56d29ed91e288" UNIQUE ("product_name"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT IF NOT EXISTS "FK_329b8ae12068b23da547d3b4798" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_329b8ae12068b23da547d3b4798"`,
    );
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
  }
}
