module.exports = class Data1708473807749 {
    name = 'Data1708473807749'

    async up(db) {
        await db.query(`CREATE TABLE "reward_event" ("id" character varying NOT NULL, "index_in_block" integer NOT NULL, "name" text NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block_number" integer NOT NULL, "extrinsic_hash" text, "amount" numeric, "is_operator" boolean, "operator_id" integer, "account_id" character varying, CONSTRAINT "PK_212058fe00a4e4ad6f433833992" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_32c335d826e7606e7dec0bcd59" ON "reward_event" ("timestamp") `)
        await db.query(`CREATE INDEX "IDX_dcefc6529930bf025676463725" ON "reward_event" ("block_number") `)
        await db.query(`CREATE INDEX "IDX_53ac1d5bf31f15640e4d54820a" ON "reward_event" ("extrinsic_hash") `)
        await db.query(`CREATE INDEX "IDX_ff1b646bb31ccbc8e1b2f868bd" ON "reward_event" ("account_id") `)
        await db.query(`CREATE TABLE "nominator" ("id" character varying NOT NULL, "shares" numeric, "updated_at" numeric, "operator_id" character varying, "account_id" character varying, CONSTRAINT "PK_7489b7a79b066f2660eab25f60b" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_14374f281ccb6e72c55dab3c20" ON "nominator" ("operator_id") `)
        await db.query(`CREATE INDEX "IDX_917636e6d1130ea9506eaeafef" ON "nominator" ("account_id") `)
        await db.query(`CREATE TABLE "operator" ("id" character varying NOT NULL, "signing_key" text NOT NULL, "operator_owner" text, "ordering_id" integer NOT NULL, "current_domain_id" integer, "next_domain_id" integer, "minimum_nominator_stake" numeric, "nomination_tax" integer, "current_total_stake" numeric, "current_epoch_rewards" numeric, "total_shares" numeric, "nominator_amount" integer NOT NULL, "status" text, "updated_at" numeric, CONSTRAINT "PK_8b950e1572745d9f69be7748ae8" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_51b6c3609906ff3cd25e39e1b2" ON "operator" ("signing_key") `)
        await db.query(`CREATE INDEX "IDX_5ae5d5e1878c2fbe2edbf18330" ON "operator" ("operator_owner") `)
        await db.query(`CREATE INDEX "IDX_5dbe10dbb2aa428088e61574d9" ON "operator" ("ordering_id") `)
        await db.query(`CREATE INDEX "IDX_b0357fd28c43547900d34af4a4" ON "operator" ("nominator_amount") `)
        await db.query(`CREATE INDEX "IDX_d6d18ca05472785030a7a3963b" ON "operator" ("updated_at") `)
        await db.query(`ALTER TABLE "reward_event" ADD CONSTRAINT "FK_ff1b646bb31ccbc8e1b2f868bd4" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "nominator" ADD CONSTRAINT "FK_14374f281ccb6e72c55dab3c209" FOREIGN KEY ("operator_id") REFERENCES "operator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "nominator" ADD CONSTRAINT "FK_917636e6d1130ea9506eaeafef9" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "reward_event"`)
        await db.query(`DROP INDEX "public"."IDX_32c335d826e7606e7dec0bcd59"`)
        await db.query(`DROP INDEX "public"."IDX_dcefc6529930bf025676463725"`)
        await db.query(`DROP INDEX "public"."IDX_53ac1d5bf31f15640e4d54820a"`)
        await db.query(`DROP INDEX "public"."IDX_ff1b646bb31ccbc8e1b2f868bd"`)
        await db.query(`DROP TABLE "nominator"`)
        await db.query(`DROP INDEX "public"."IDX_14374f281ccb6e72c55dab3c20"`)
        await db.query(`DROP INDEX "public"."IDX_917636e6d1130ea9506eaeafef"`)
        await db.query(`DROP TABLE "operator"`)
        await db.query(`DROP INDEX "public"."IDX_51b6c3609906ff3cd25e39e1b2"`)
        await db.query(`DROP INDEX "public"."IDX_5ae5d5e1878c2fbe2edbf18330"`)
        await db.query(`DROP INDEX "public"."IDX_5dbe10dbb2aa428088e61574d9"`)
        await db.query(`DROP INDEX "public"."IDX_b0357fd28c43547900d34af4a4"`)
        await db.query(`DROP INDEX "public"."IDX_d6d18ca05472785030a7a3963b"`)
        await db.query(`ALTER TABLE "reward_event" DROP CONSTRAINT "FK_ff1b646bb31ccbc8e1b2f868bd4"`)
        await db.query(`ALTER TABLE "nominator" DROP CONSTRAINT "FK_14374f281ccb6e72c55dab3c209"`)
        await db.query(`ALTER TABLE "nominator" DROP CONSTRAINT "FK_917636e6d1130ea9506eaeafef9"`)
    }
}
