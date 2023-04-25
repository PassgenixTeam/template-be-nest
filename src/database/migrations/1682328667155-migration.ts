import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1682328667155 implements MigrationInterface {
  name = 'migration1682328667155';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('freelance', 'client', 'admin')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" uuid, "updated_by" uuid, "deleted_at" TIMESTAMP, "deleted_by" uuid, "password" character varying(500) NOT NULL, "email" character varying NOT NULL, "first_name" character varying(100) NOT NULL, "last_name" character varying(100), "avatar_url" character varying(255) NOT NULL DEFAULT 'https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA=', "is_active" boolean NOT NULL DEFAULT false, "role" "public"."users_role_enum" NOT NULL DEFAULT 'freelance', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" uuid, "updated_by" uuid, "deleted_at" TIMESTAMP, "deleted_by" uuid, "access_token" character varying(1000) NOT NULL, "refresh_token" character varying(1000) NOT NULL, "expired_at" TIMESTAMP, "user_id" uuid, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."uploads_status_enum" AS ENUM('pending', 'using', 'deleted')`,
    );
    await queryRunner.query(
      `CREATE TABLE "uploads" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" uuid, "updated_by" uuid, "deleted_at" TIMESTAMP, "deleted_by" uuid, "type" character varying(50) NOT NULL, "size" double precision NOT NULL, "url" character varying(255) NOT NULL, "key" character varying(100) NOT NULL, "status" "public"."uploads_status_enum" NOT NULL, CONSTRAINT "PK_d1781d1eedd7459314f60f39bd3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19"`,
    );
    await queryRunner.query(`DROP TABLE "uploads"`);
    await queryRunner.query(`DROP TYPE "public"."uploads_status_enum"`);
    await queryRunner.query(`DROP TABLE "sessions"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
