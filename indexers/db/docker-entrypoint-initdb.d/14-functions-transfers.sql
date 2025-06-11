CREATE OR REPLACE FUNCTION transfers.insert_new_consensus_transfer() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO transfers.transfers (
        id,
        block_height,
        block_hash,
        extrinsic_id,
        event_id,
        "from",
        from_chain,
        "to",
        to_chain,
        value,
        fee,
        type,
        success,
        is_finalized,
        "timestamp",
        _id,
        _block_range
    ) VALUES (
        'consensus_' || NEW.id,                  -- id
        NEW.block_height,                        -- block_height
        NEW.block_hash,                          -- block_hash
        NEW.extrinsic_id,                        -- extrinsic_id
        NEW.event_id,                            -- event_id
        NEW."from",                                -- from
        NEW.from_chain,                          -- from_chain
        NEW."to",                                  -- to
        NEW.to_chain,                            -- to_chain
        NEW.value,                               -- value
        NEW.fee,                                 -- fee
        NEW.type,                                -- type
        NEW.success,                             -- success
        NEW.is_finalized,                        -- is_finalized
        NEW."timestamp",                          -- timestamp
        gen_random_uuid(),                       -- _id
        NEW._block_range                           -- _block_range
    );
    
    RETURN NEW;
END;
$$;
ALTER FUNCTION transfers.insert_new_consensus_transfer() OWNER TO postgres;

CREATE TRIGGER insert_new_consensus_transfer
AFTER INSERT ON consensus.transfers
FOR EACH ROW
EXECUTE FUNCTION transfers.insert_new_consensus_transfer();

CREATE OR REPLACE FUNCTION transfers.insert_new_domain_auto_evm_transfer() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO transfers.transfers (
        id,
        block_height,
        block_hash,
        extrinsic_id,
        event_id,
        "from",
        from_chain,
        "to",
        to_chain,
        value,
        fee,
        type,
        success,
        is_finalized,
        "timestamp",
        _id,
        _block_range
    ) VALUES (
        'domain_auto_evm_' || NEW.id,            -- id
        NEW.block_height,                        -- block_height
        NEW.block_hash,                          -- block_hash
        NEW.extrinsic_id,                        -- extrinsic_id
        NEW.event_id,                            -- event_id
        NEW."from",                                -- from
        NEW.from_chain,                          -- from_chain
        NEW."to",                                  -- to
        NEW.to_chain,                            -- to_chain
        NEW.value,                               -- value
        NEW.fee,                                 -- fee
        NEW.type,                                -- type
        NEW.success,                             -- success
        NEW.is_finalized,                        -- is_finalized
        NEW."timestamp",                          -- timestamp
        gen_random_uuid(),                       -- _id
        NEW._block_range                         -- _block_range
    );
    
    RETURN NEW;
END;
$$;
ALTER FUNCTION transfers.insert_new_domain_auto_evm_transfer() OWNER TO postgres;

CREATE TRIGGER insert_new_domain_auto_evm_transfer
AFTER INSERT ON domain_auto_evm.transfers
FOR EACH ROW
EXECUTE FUNCTION transfers.insert_new_domain_auto_evm_transfer();