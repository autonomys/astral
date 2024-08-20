module.exports = class Data1724176996444 {
    name = 'Data1724176996444'

    async up(db) {
        await db.query(`DROP INDEX "public"."IDX_5c67cbcf4960c1a39e5fe25e87"`)
        await db.query(`ALTER TABLE "block" DROP COLUMN "timestamp"`)
        await db.query(`ALTER TABLE "block" ADD "timestamp" integer NOT NULL`)
        await db.query(`CREATE INDEX "IDX_5c67cbcf4960c1a39e5fe25e87" ON "block" ("timestamp") `)
    }

    async down(db) {
        await db.query(`CREATE INDEX "IDX_5c67cbcf4960c1a39e5fe25e87" ON "block" ("timestamp") `)
        await db.query(`ALTER TABLE "block" ADD "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL`)
        await db.query(`ALTER TABLE "block" DROP COLUMN "timestamp"`)
        await db.query(`DROP INDEX "public"."IDX_5c67cbcf4960c1a39e5fe25e87"`)
    }
}
