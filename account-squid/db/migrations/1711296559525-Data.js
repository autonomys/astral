module.exports = class Data1711296559525 {
    name = 'Data1711296559525'

    async up(db) {
        await db.query(`CREATE TABLE "transfer" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "extrinsic_hash" text, "amount" numeric NOT NULL, "fee" numeric NOT NULL, "from_id" character varying, "to_id" character varying, CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_d6624eacc30144ea97915fe846" ON "transfer" ("block_number") `)
        await db.query(`CREATE INDEX "IDX_70ff8b624c3118ac3a4862d22c" ON "transfer" ("timestamp") `)
        await db.query(`CREATE INDEX "IDX_070c555a86b0b41a534a55a659" ON "transfer" ("extrinsic_hash") `)
        await db.query(`CREATE INDEX "IDX_76bdfed1a7eb27c6d8ecbb7349" ON "transfer" ("from_id") `)
        await db.query(`CREATE INDEX "IDX_0751309c66e97eac9ef1149362" ON "transfer" ("to_id") `)
        await db.query(`CREATE INDEX "IDX_f4007436c1b546ede08a4fd7ab" ON "transfer" ("amount") `)
        await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "free" numeric NOT NULL, "reserved" numeric NOT NULL, "total" numeric NOT NULL, "updated_at_block" integer NOT NULL, "nonce" integer NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "backup_counter" ("id" character varying NOT NULL, "balances_transfers_volume" numeric NOT NULL, "balances_transfers_amount" numeric NOT NULL, "chain_signed_extrinsics" numeric NOT NULL, CONSTRAINT "PK_68cff71a7e23d9d07fe40a39e4e" PRIMARY KEY ("id"))`)
        await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_76bdfed1a7eb27c6d8ecbb73496" FOREIGN KEY ("from_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_0751309c66e97eac9ef11493623" FOREIGN KEY ("to_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "transfer"`)
        await db.query(`DROP INDEX "IDX_d6624eacc30144ea97915fe846"`)
        await db.query(`DROP INDEX "IDX_70ff8b624c3118ac3a4862d22c"`)
        await db.query(`DROP INDEX "IDX_070c555a86b0b41a534a55a659"`)
        await db.query(`DROP INDEX "IDX_76bdfed1a7eb27c6d8ecbb7349"`)
        await db.query(`DROP INDEX "IDX_0751309c66e97eac9ef1149362"`)
        await db.query(`DROP INDEX "IDX_f4007436c1b546ede08a4fd7ab"`)
        await db.query(`DROP TABLE "account"`)
        await db.query(`DROP TABLE "backup_counter"`)
        await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_76bdfed1a7eb27c6d8ecbb73496"`)
        await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_0751309c66e97eac9ef11493623"`)
    }
}
