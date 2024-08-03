module.exports = class Data1722654132889 {
    name = 'Data1722654132889'

    async up(db) {
        await db.query(`DROP INDEX "public"."IDX_43aeeb4c46d83dd78aa564c1b1"`)
        await db.query(`ALTER TABLE "nominator" DROP COLUMN "status"`)
        await db.query(`ALTER TABLE "nominator" ADD "status" character varying(15) NOT NULL`)
        await db.query(`CREATE INDEX "IDX_43aeeb4c46d83dd78aa564c1b1" ON "nominator" ("status") `)
    }

    async down(db) {
        await db.query(`CREATE INDEX "IDX_43aeeb4c46d83dd78aa564c1b1" ON "nominator" ("status") `)
        await db.query(`ALTER TABLE "nominator" ADD "status" character varying(12) NOT NULL`)
        await db.query(`ALTER TABLE "nominator" DROP COLUMN "status"`)
        await db.query(`DROP INDEX "public"."IDX_43aeeb4c46d83dd78aa564c1b1"`)
    }
}
