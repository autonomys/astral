module.exports = class Data1666285189843 {
  name = 'Data1666285189843'

  async up(db) {
    await db.query(`ALTER TABLE "account" ADD "free" numeric NOT NULL`)
    await db.query(`ALTER TABLE "account" ADD "reserved" numeric NOT NULL`)
    await db.query(`ALTER TABLE "account" ADD "total" numeric NOT NULL`)
    await db.query(`ALTER TABLE "account" ADD "updated_at" integer`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "account" DROP COLUMN "free"`)
    await db.query(`ALTER TABLE "account" DROP COLUMN "reserved"`)
    await db.query(`ALTER TABLE "account" DROP COLUMN "total"`)
    await db.query(`ALTER TABLE "account" DROP COLUMN "updated_at"`)
  }
}
