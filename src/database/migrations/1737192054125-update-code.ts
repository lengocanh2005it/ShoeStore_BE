import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCode1737192054125 implements MigrationInterface {
    name = 'UpdateCode1737192054125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_9a5f6868c96e0069e699f33e124\``);
        await queryRunner.query(`CREATE TABLE \`order_details\` (\`id\` varchar(36) NOT NULL, \`quantity\` int NOT NULL, \`size\` varchar(255) NOT NULL, \`color\` varchar(255) NOT NULL, \`unit_price\` decimal(10,2) NOT NULL, \`total_price\` decimal(10,2) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`order_id\` varchar(36) NULL, \`product_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`discounts\` (\`id\` varchar(36) NOT NULL, \`code\` varchar(255) NOT NULL, \`value\` int NOT NULL, \`start_date\` timestamp NOT NULL, \`end_date\` timestamp NOT NULL, \`status\` enum ('active', 'expired', 'pending', 'used') NOT NULL DEFAULT 'active', \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payments\` (\`id\` varchar(36) NOT NULL, \`status\` enum ('PENDING', 'COMPLETED', 'FAILED') NOT NULL DEFAULT 'PENDING', \`method\` enum ('CREDIT_CARD', 'PAYPAL', 'BANK_TRANSFER') NOT NULL, \`payment_date\` timestamp NOT NULL, \`amount\` decimal(10,2) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` varchar(36) NOT NULL, \`total_price\` decimal(10,2) NOT NULL, \`status\` enum ('pending', 'completed', 'cancelled') NOT NULL DEFAULT 'pending', \`shipping_address\` varchar(255) NOT NULL, \`shipping_fee\` decimal(10,2) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` varchar(36) NULL, \`discount_id\` varchar(36) NULL, \`payment_id\` varchar(36) NULL, UNIQUE INDEX \`REL_5b3e94bd2aedc184f9ad8c1043\` (\`payment_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`color\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`size\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`sizes\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`colors\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`code\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phone_number\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phone_number\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_9a5f6868c96e0069e699f33e124\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_3ff3367344edec5de2355a562ee\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_ce1f689e43b39edd9330cadaeb8\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_a922b820eeef29ac1c6800e826a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_555d48c77395dc43554c7067ed6\` FOREIGN KEY (\`discount_id\`) REFERENCES \`discounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_5b3e94bd2aedc184f9ad8c10439\` FOREIGN KEY (\`payment_id\`) REFERENCES \`payments\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_5b3e94bd2aedc184f9ad8c10439\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_555d48c77395dc43554c7067ed6\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_a922b820eeef29ac1c6800e826a\``);
        await queryRunner.query(`ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_ce1f689e43b39edd9330cadaeb8\``);
        await queryRunner.query(`ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_3ff3367344edec5de2355a562ee\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_9a5f6868c96e0069e699f33e124\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phone_number\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phone_number\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`name\` varchar(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` varchar(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`code\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`description\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`name\` varchar(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`colors\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`sizes\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`updated_at\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`size\` varchar(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`created_at\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`color\` varchar(200) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`REL_5b3e94bd2aedc184f9ad8c1043\` ON \`orders\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
        await queryRunner.query(`DROP TABLE \`payments\``);
        await queryRunner.query(`DROP TABLE \`discounts\``);
        await queryRunner.query(`DROP TABLE \`order_details\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_9a5f6868c96e0069e699f33e124\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
