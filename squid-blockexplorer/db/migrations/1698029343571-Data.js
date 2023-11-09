module.exports = class Data1698029343571 {
    name = 'Data1698029343571'

    async up(db) {
        await db.query(`CREATE TABLE "extrinsic_module_name" ("id" character varying NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_e3d3a5a01f50bf01655cf4f30eb" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_bf23a0cce635d8eba9918d0339" ON "extrinsic_module_name" ("name") `)
        await db.query(`CREATE TABLE "event_module_name" ("id" character varying NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_07f4296e4cf56dce19efa3be07c" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_ec4fc7a578894139f5bbdfbb33" ON "event_module_name" ("name") `)
        await db.query(`CREATE INDEX "IDX_a032945f45cacda2d30f4286df" ON "call" ("timestamp") `)
        await db.query(`CREATE INDEX "IDX_2f0d3e5417d523daf6f5220599" ON "call" ("signer") `)
        await db.query(`CREATE INDEX "IDX_82cf69218fb1debdc0b499d125" ON "event" ("index_in_block") `)
        await db.query(`CREATE INDEX "IDX_2c15918ff289396205521c5f3c" ON "event" ("timestamp") `)
        await db.query(`CREATE INDEX "IDX_32c335d826e7606e7dec0bcd59" ON "reward_event" ("timestamp") `)
        await db.query(`CREATE INDEX "IDX_110007d6221b41e46fcada62a9" ON "log" ("kind") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "extrinsic_module_name"`)
        await db.query(`DROP INDEX "public"."IDX_bf23a0cce635d8eba9918d0339"`)
        await db.query(`DROP TABLE "event_module_name"`)
        await db.query(`DROP INDEX "public"."IDX_ec4fc7a578894139f5bbdfbb33"`)
        await db.query(`DROP INDEX "public"."IDX_a032945f45cacda2d30f4286df"`)
        await db.query(`DROP INDEX "public"."IDX_2f0d3e5417d523daf6f5220599"`)
        await db.query(`DROP INDEX "public"."IDX_82cf69218fb1debdc0b499d125"`)
        await db.query(`DROP INDEX "public"."IDX_2c15918ff289396205521c5f3c"`)
        await db.query(`DROP INDEX "public"."IDX_32c335d826e7606e7dec0bcd59"`)
        await db.query(`DROP INDEX "public"."IDX_110007d6221b41e46fcada62a9"`)
    }
}
