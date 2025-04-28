CREATE FUNCTION domain_auto_evm.insert_log_kind() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    INSERT INTO domain_auto_evm.log_kinds (id, kind)
    VALUES (NEW.kind, NEW.kind)
    ON CONFLICT (id) DO NOTHING;
    
    RETURN NEW;
  END;
  $$;
ALTER FUNCTION domain_auto_evm.insert_log_kind() OWNER TO postgres;

CREATE TRIGGER ensure_domain_auto_evm_log_kind
    BEFORE INSERT ON domain_auto_evm.logs
    FOR EACH ROW
    EXECUTE FUNCTION domain_auto_evm.insert_log_kind();

CREATE FUNCTION domain_auto_evm.insert_event_module() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    INSERT INTO domain_auto_evm.event_modules (id, section, method)
    VALUES (NEW.name, NEW.section, NEW.module)
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO domain_auto_evm.sections (id, section)
    VALUES (NEW.section, NEW.section)
    ON CONFLICT (id) DO NOTHING;
    
    RETURN NEW;
  END;
  $$;
ALTER FUNCTION domain_auto_evm.insert_event_module() OWNER TO postgres;

CREATE TRIGGER ensure_domain_auto_evm_event_module
    BEFORE INSERT ON domain_auto_evm.events
    FOR EACH ROW
    EXECUTE FUNCTION domain_auto_evm.insert_event_module();

CREATE FUNCTION domain_auto_evm.insert_extrinsic_module() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    INSERT INTO domain_auto_evm.extrinsic_modules (id, section, method)
    VALUES (NEW.name, NEW.section, NEW.module)
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO domain_auto_evm.sections (id, section)
    VALUES (NEW.section, NEW.section)
    ON CONFLICT (id) DO NOTHING;
    
    RETURN NEW;
  END;
  $$;
ALTER FUNCTION domain_auto_evm.insert_extrinsic_module() OWNER TO postgres;

CREATE TRIGGER ensure_domain_auto_evm_extrinsic_module
    BEFORE INSERT ON domain_auto_evm.extrinsics
    FOR EACH ROW
    EXECUTE FUNCTION domain_auto_evm.insert_extrinsic_module();

CREATE FUNCTION domain_auto_evm.update_account() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    INSERT INTO domain_auto_evm.accounts (
      id,
      nonce,
      free,
      reserved,
      total,
      created_at,
      updated_at
    )
    VALUES (
      NEW.id,
      NEW.nonce,
      NEW.free,
      NEW.reserved,
      NEW.total,
      NEW.block_height,
      NEW.block_height
    )
    ON CONFLICT (id) DO UPDATE SET
      nonce = EXCLUDED.nonce,
      free = EXCLUDED.free,
      reserved = EXCLUDED.reserved,
      total = EXCLUDED.total,
      updated_at = NEW.block_height;
    
    RETURN NEW;
  END;
  $$;
ALTER FUNCTION domain_auto_evm.update_account() OWNER TO postgres;

CREATE TRIGGER ensure_domain_auto_evm_account_updated
    BEFORE INSERT ON domain_auto_evm.account_histories
    FOR EACH ROW
    EXECUTE FUNCTION domain_auto_evm.update_account();

CREATE FUNCTION domain_auto_evm.update_cumulative_blocks() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  DECLARE
    prev_cumulative domain_auto_evm.cumulative_blocks%ROWTYPE;
  BEGIN
    SELECT *
    INTO prev_cumulative
    FROM domain_auto_evm.cumulative_blocks
    WHERE id = text(NEW.height - 1);

    IF prev_cumulative IS NULL THEN
      prev_cumulative.cumulative_extrinsics_count := 0;
      prev_cumulative.cumulative_events_count := 0;
      prev_cumulative.cumulative_logs_count := 0;
      prev_cumulative.cumulative_transfers_count := 0;
      prev_cumulative.cumulative_transfer_value := 0;
    END IF;

    INSERT INTO domain_auto_evm.cumulative_blocks (
      id,
      cumulative_extrinsics_count,
      cumulative_events_count,
      cumulative_logs_count,
      cumulative_transfers_count,
      cumulative_transfer_value
    )
    VALUES (
      NEW.id,
      prev_cumulative.cumulative_extrinsics_count + NEW.extrinsics_count,
      prev_cumulative.cumulative_events_count + NEW.events_count,
      prev_cumulative.cumulative_logs_count + NEW.logs_count,
      prev_cumulative.cumulative_transfers_count + NEW.transfers_count,
      prev_cumulative.cumulative_transfer_value + NEW.transfer_value
    )
    ON CONFLICT (id) DO UPDATE SET
      cumulative_extrinsics_count = prev_cumulative.cumulative_extrinsics_count + NEW.extrinsics_count,
      cumulative_events_count = prev_cumulative.cumulative_events_count + NEW.events_count,
      cumulative_logs_count = prev_cumulative.cumulative_logs_count + NEW.logs_count,
      cumulative_transfers_count = prev_cumulative.cumulative_transfers_count + NEW.transfers_count,
      cumulative_transfer_value = prev_cumulative.cumulative_transfer_value + NEW.transfer_value;

    RETURN NEW;
  END;
  $$;
ALTER FUNCTION domain_auto_evm.update_cumulative_blocks() OWNER TO postgres;

CREATE TRIGGER ensure_domain_auto_evm_cumulative_blocks
    BEFORE INSERT ON domain_auto_evm.blocks
    FOR EACH ROW
    EXECUTE FUNCTION domain_auto_evm.update_cumulative_blocks();

CREATE OR REPLACE FUNCTION domain_auto_evm.prevent_evm_code_selectors_duplicate() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM domain_auto_evm.evm_code_selectors 
        WHERE id = NEW.id
    ) THEN
        RETURN NULL;
    END IF;
    
    RETURN NEW;
END;
$$;
ALTER FUNCTION domain_auto_evm.prevent_evm_code_selectors_duplicate() OWNER TO postgres;

CREATE TRIGGER prevent_domain_auto_evm_evm_code_selectors_duplicate
BEFORE INSERT ON domain_auto_evm.evm_code_selectors
FOR EACH ROW
EXECUTE FUNCTION domain_auto_evm.prevent_evm_code_selectors_duplicate();