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