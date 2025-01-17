import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDiscountsTable1737141382518 implements MigrationInterface {
    name = 'AddDiscountsTable1737141382518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`discounts\` (\`id\` varchar(36) NOT NULL, \`code\` varchar(200) NOT NULL, \`value\` int NOT NULL, \`start_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`end_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`status\` enum ('active', 'expired', 'pending', 'used') NOT NULL DEFAULT 'active', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_9a5f6868c96e0069e699f33e124\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`size\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`size\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`code\` \`code\` varchar(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`category_id\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`category_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`name\` varchar(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`description\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phone_number\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phone_number\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_9a5f6868c96e0069e699f33e124\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_9a5f6868c96e0069e699f33e124\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phone_number\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phone_number\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`name\` varchar(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` varchar(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`category_id\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`category_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`updated_at\` datetime(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`created_at\` \`created_at\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`code\` \`code\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`size\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`size\` varchar(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_9a5f6868c96e0069e699f33e124\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE \`discounts\``);
    }

}
