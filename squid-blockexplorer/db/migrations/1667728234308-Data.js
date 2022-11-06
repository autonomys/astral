module.exports = class Data1667728234308 {
  name = 'Data1667728234308'

  async up(db) {
    await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "free" numeric NOT NULL, "reserved" numeric NOT NULL, "total" numeric NOT NULL, "updated_at" integer, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "block" ("id" character varying NOT NULL, "height" numeric, "timestamp" TIMESTAMP WITH TIME ZONE, "hash" text, "parent_hash" text, "spec_id" text, "state_root" text, "extrinsic_root" text, "space_pledged" numeric NOT NULL, "blockchain_size" numeric NOT NULL, CONSTRAINT "PK_d0925763efb591c2e2ffb267572" PRIMARY KEY ("id"))`)
  }

  async down(db) {
    await db.query(`DROP TABLE "account"`)
    await db.query(`DROP TABLE "block"`)
  }
}
