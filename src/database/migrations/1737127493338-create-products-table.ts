import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductsTable1737127493338 implements MigrationInterface {
    name = 'CreateProductsTable1737127493338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phone_number\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phone_number\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`updated_at\` datetime(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`created_at\` datetime(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phone_number\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phone_number\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`name\` varchar(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` varchar(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(200) NOT NULL`);
    }

}
