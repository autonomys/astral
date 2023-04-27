module.exports = class Data1682581659497 {
    name = 'Data1682581659497'

    async up(db) {
        await db.query(`CREATE TABLE "reward_event" ("id" character varying NOT NULL, "index_in_block" integer NOT NULL, "name" text NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "phase" text NOT NULL, "pos" integer, "amount" numeric, "block_id" character varying, "extrinsic_id" character varying, "call_id" character varying, "account_id" character varying, CONSTRAINT "PK_212058fe00a4e4ad6f433833992" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_5acef548d32eb482f3e3420e23" ON "reward_event" ("block_id") `)
        await db.query(`CREATE INDEX "IDX_82e7ab388eaceb7c31157f34a2" ON "reward_event" ("extrinsic_id") `)
        await db.query(`CREATE INDEX "IDX_5b5cbe756f0ae619b91f367c30" ON "reward_event" ("call_id") `)
        await db.query(`CREATE INDEX "IDX_ff1b646bb31ccbc8e1b2f868bd" ON "reward_event" ("account_id") `)
        await db.query(`ALTER TABLE "reward_event" ADD CONSTRAINT "FK_5acef548d32eb482f3e3420e231" FOREIGN KEY ("block_id") REFERENCES "block"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "reward_event" ADD CONSTRAINT "FK_82e7ab388eaceb7c31157f34a26" FOREIGN KEY ("extrinsic_id") REFERENCES "extrinsic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "reward_event" ADD CONSTRAINT "FK_5b5cbe756f0ae619b91f367c30e" FOREIGN KEY ("call_id") REFERENCES "call"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "reward_event" ADD CONSTRAINT "FK_ff1b646bb31ccbc8e1b2f868bd4" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "reward_event"`)
        await db.query(`DROP INDEX "public"."IDX_5acef548d32eb482f3e3420e23"`)
        await db.query(`DROP INDEX "public"."IDX_82e7ab388eaceb7c31157f34a2"`)
        await db.query(`DROP INDEX "public"."IDX_5b5cbe756f0ae619b91f367c30"`)
        await db.query(`DROP INDEX "public"."IDX_ff1b646bb31ccbc8e1b2f868bd"`)
        await db.query(`ALTER TABLE "reward_event" DROP CONSTRAINT "FK_5acef548d32eb482f3e3420e231"`)
        await db.query(`ALTER TABLE "reward_event" DROP CONSTRAINT "FK_82e7ab388eaceb7c31157f34a26"`)
        await db.query(`ALTER TABLE "reward_event" DROP CONSTRAINT "FK_5b5cbe756f0ae619b91f367c30e"`)
        await db.query(`ALTER TABLE "reward_event" DROP CONSTRAINT "FK_ff1b646bb31ccbc8e1b2f868bd4"`)
    }
}
