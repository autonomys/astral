import { Cache } from "../types/cache.ts";
import { sql } from "./client.ts";

export const initializeDBData = async (cache: Cache) => {
  const domains = await sql`SELECT id FROM staking.domains`;

  const rawBundleSubmissions = await Promise.all(
    domains.map(
      (d) =>
        sql`SELECT * FROM staking.bundle_submissions 
            WHERE domain_id = ${d.id} 
            ORDER BY block_height DESC LIMIT 1`
    )
  );
  const bundleSubmissions = rawBundleSubmissions.flat();
  const rawDomainEpochs = await Promise.all(
    domains.map(
      (d) =>
        sql`SELECT * FROM staking.domain_epochs 
            WHERE domain_id = ${d.id} 
            ORDER BY epoch DESC LIMIT 1`
    )
  );
  const domainEpochs = rawDomainEpochs.flat();
  bundleSubmissions.forEach((bs: any) =>
    cache.lastDomainBlockNumber.set(
      bs.domain_id,
      BigInt(bs.domain_block_number)
    )
  );
  domainEpochs.forEach((de: any) =>
    cache.lastDomainEpoch.set(de.domain_id, de.epoch)
  );
  cache.isDBDataInitialized = true;
};
