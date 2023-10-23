module.exports = class Data1698039864743 {
    name = 'Data1698039864743'

    async up(db) {
        await db.query(`CREATE TABLE "nominator" ("id" character varying NOT NULL, "shares" numeric, "operator_id" character varying, "account_id" character varying, CONSTRAINT "PK_7489b7a79b066f2660eab25f60b" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_14374f281ccb6e72c55dab3c20" ON "nominator" ("operator_id") `)
        await db.query(`CREATE INDEX "IDX_917636e6d1130ea9506eaeafef" ON "nominator" ("account_id") `)
        await db.query(`CREATE TABLE "operator" ("id" character varying NOT NULL, "signing_key" text NOT NULL, "current_domain_id" integer, "next_domain_id" integer, "minimum_nominator_stake" numeric, "nomination_tax" numeric, "current_total_stake" numeric, "current_epoch_rewards" numeric, "nominator_count" integer NOT NULL, "total_shares" numeric, "status" text, CONSTRAINT "PK_8b950e1572745d9f69be7748ae8" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_51b6c3609906ff3cd25e39e1b2" ON "operator" ("signing_key") `)
        await db.query(`ALTER TABLE "nominator" ADD CONSTRAINT "FK_14374f281ccb6e72c55dab3c209" FOREIGN KEY ("operator_id") REFERENCES "operator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "nominator" ADD CONSTRAINT "FK_917636e6d1130ea9506eaeafef9" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "nominator"`)
        await db.query(`DROP INDEX "public"."IDX_14374f281ccb6e72c55dab3c20"`)
        await db.query(`DROP INDEX "public"."IDX_917636e6d1130ea9506eaeafef"`)
        await db.query(`DROP TABLE "operator"`)
        await db.query(`DROP INDEX "public"."IDX_51b6c3609906ff3cd25e39e1b2"`)
        await db.query(`ALTER TABLE "nominator" DROP CONSTRAINT "FK_14374f281ccb6e72c55dab3c209"`)
        await db.query(`ALTER TABLE "nominator" DROP CONSTRAINT "FK_917636e6d1130ea9506eaeafef9"`)
    }
}
