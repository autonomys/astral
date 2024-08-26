module.exports = class Data1724677830992 {
    name = 'Data1724677830992'

    async up(db) {
        await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "nonce" numeric NOT NULL, "free" numeric NOT NULL, "reserved" numeric NOT NULL, "total" numeric, "created_at" integer NOT NULL, "updated_at" integer NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_3756b99a2c20a91a19196cbc11" ON "account" ("total") `)
        await db.query(`CREATE INDEX "IDX_2740156ea8742b8df1ad9d9774" ON "account" ("created_at") `)
        await db.query(`CREATE INDEX "IDX_8bed31488e09ed64770378600b" ON "account" ("updated_at") `)
        await db.query(`CREATE TABLE "transfer" ("id" character varying NOT NULL, "from" text NOT NULL, "to" text NOT NULL, "value" numeric NOT NULL, "fee" numeric NOT NULL, "timestamp" numeric NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" integer NOT NULL, CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_be54ea276e0f665ffc38630fc0" ON "transfer" ("from") `)
        await db.query(`CREATE INDEX "IDX_4cbc37e8c3b47ded161f44c24f" ON "transfer" ("to") `)
        await db.query(`CREATE INDEX "IDX_70ff8b624c3118ac3a4862d22c" ON "transfer" ("timestamp") `)
        await db.query(`CREATE INDEX "IDX_58367bdb03b7f41ade3b09f26a" ON "transfer" ("date") `)
        await db.query(`CREATE INDEX "IDX_086e57d995900e69b54046e257" ON "transfer" ("created_at") `)
        await db.query(`CREATE TABLE "slack_message" ("id" character varying NOT NULL, "message_id" text NOT NULL, CONSTRAINT "PK_0f63f6886c966a139786d88b66a" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_aa83d548510c4e1b4ecd8d0caa" ON "slack_message" ("message_id") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "account"`)
        await db.query(`DROP INDEX "public"."IDX_3756b99a2c20a91a19196cbc11"`)
        await db.query(`DROP INDEX "public"."IDX_2740156ea8742b8df1ad9d9774"`)
        await db.query(`DROP INDEX "public"."IDX_8bed31488e09ed64770378600b"`)
        await db.query(`DROP TABLE "transfer"`)
        await db.query(`DROP INDEX "public"."IDX_be54ea276e0f665ffc38630fc0"`)
        await db.query(`DROP INDEX "public"."IDX_4cbc37e8c3b47ded161f44c24f"`)
        await db.query(`DROP INDEX "public"."IDX_70ff8b624c3118ac3a4862d22c"`)
        await db.query(`DROP INDEX "public"."IDX_58367bdb03b7f41ade3b09f26a"`)
        await db.query(`DROP INDEX "public"."IDX_086e57d995900e69b54046e257"`)
        await db.query(`DROP TABLE "slack_message"`)
        await db.query(`DROP INDEX "public"."IDX_aa83d548510c4e1b4ecd8d0caa"`)
    }
}
