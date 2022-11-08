module.exports = class Data1667902119319 {
  name = 'Data1667902119319'

  async up(db) {
    await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "free" numeric NOT NULL, "reserved" numeric NOT NULL, "total" numeric NOT NULL, "updated_at" integer, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "event" ("id" character varying NOT NULL, "index_in_block" integer NOT NULL, "name" text NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE, "phase" text NOT NULL, "pos" integer, "args" jsonb, "block_id" character varying, "extrinsic_id" character varying, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_2b0d35d675c4f99751855c4502" ON "event" ("block_id") `)
    await db.query(`CREATE INDEX "IDX_129efedcb305c80256db2d57a5" ON "event" ("extrinsic_id") `)
    await db.query(`CREATE TABLE "extrinsic" ("id" character varying NOT NULL, "hash" text NOT NULL, "index_in_block" integer NOT NULL, "nonce" numeric, "name" text NOT NULL, "signer" text, "signature" text, "error" jsonb, "tip" numeric, "fee" numeric, "success" boolean NOT NULL, "pos" integer, "timestamp" TIMESTAMP WITH TIME ZONE, "args" jsonb, "block_id" character varying, CONSTRAINT "PK_80d7db0e4b1e83e30336bc76755" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_a3b99daba1259dab0dd040d4f7" ON "extrinsic" ("block_id") `)
    await db.query(`CREATE TABLE "block" ("id" character varying NOT NULL, "height" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "hash" text NOT NULL, "parent_hash" text NOT NULL, "spec_id" text NOT NULL, "state_root" text NOT NULL, "extrinsic_root" text, "space_pledged" numeric NOT NULL, "blockchain_size" numeric NOT NULL, CONSTRAINT "PK_d0925763efb591c2e2ffb267572" PRIMARY KEY ("id"))`)
    await db.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_2b0d35d675c4f99751855c45021" FOREIGN KEY ("block_id") REFERENCES "block"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_129efedcb305c80256db2d57a59" FOREIGN KEY ("extrinsic_id") REFERENCES "extrinsic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "extrinsic" ADD CONSTRAINT "FK_a3b99daba1259dab0dd040d4f74" FOREIGN KEY ("block_id") REFERENCES "block"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "account"`)
    await db.query(`DROP TABLE "event"`)
    await db.query(`DROP INDEX "public"."IDX_2b0d35d675c4f99751855c4502"`)
    await db.query(`DROP INDEX "public"."IDX_129efedcb305c80256db2d57a5"`)
    await db.query(`DROP TABLE "extrinsic"`)
    await db.query(`DROP INDEX "public"."IDX_a3b99daba1259dab0dd040d4f7"`)
    await db.query(`DROP TABLE "block"`)
    await db.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_2b0d35d675c4f99751855c45021"`)
    await db.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_129efedcb305c80256db2d57a59"`)
    await db.query(`ALTER TABLE "extrinsic" DROP CONSTRAINT "FK_a3b99daba1259dab0dd040d4f74"`)
  }
}
