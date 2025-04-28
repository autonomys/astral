CREATE FUNCTION consensus.update_cumulative_blocks() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  DECLARE
    prev_cumulative consensus.cumulative_blocks%ROWTYPE;
  BEGIN
    SELECT *
    INTO prev_cumulative
    FROM consensus.cumulative_blocks
    WHERE id = text(NEW.height - 1);

    IF prev_cumulative IS NULL THEN
      prev_cumulative.cumulative_extrinsics_count := 0;
      prev_cumulative.cumulative_events_count := 0;
      prev_cumulative.cumulative_logs_count := 0;
      prev_cumulative.cumulative_transfers_count := 0;
      prev_cumulative.cumulative_rewards_count := 0;
      prev_cumulative.cumulative_block_rewards_count := 0;
      prev_cumulative.cumulative_vote_rewards_count := 0;
      prev_cumulative.cumulative_transfer_value := 0;
      prev_cumulative.cumulative_reward_value := 0;
      prev_cumulative.cumulative_block_reward_value := 0;
      prev_cumulative.cumulative_vote_reward_value := 0;
    END IF;

    INSERT INTO consensus.cumulative_blocks (
      id,
      cumulative_extrinsics_count,
      cumulative_events_count,
      cumulative_logs_count,
      cumulative_transfers_count,
      cumulative_rewards_count,
      cumulative_block_rewards_count,
      cumulative_vote_rewards_count,
      cumulative_transfer_value,
      cumulative_reward_value,
      cumulative_block_reward_value,
      cumulative_vote_reward_value
    )
    VALUES (
      NEW.id,
      prev_cumulative.cumulative_extrinsics_count + NEW.extrinsics_count,
      prev_cumulative.cumulative_events_count + NEW.events_count,
      prev_cumulative.cumulative_logs_count + NEW.logs_count,
      prev_cumulative.cumulative_transfers_count + NEW.transfers_count,
      prev_cumulative.cumulative_rewards_count + NEW.rewards_count,
      prev_cumulative.cumulative_block_rewards_count + NEW.block_rewards_count,
      prev_cumulative.cumulative_vote_rewards_count + NEW.vote_rewards_count,
      prev_cumulative.cumulative_transfer_value + NEW.transfer_value,
      prev_cumulative.cumulative_reward_value + NEW.reward_value,
      prev_cumulative.cumulative_block_reward_value + NEW.block_reward_value,
      prev_cumulative.cumulative_vote_reward_value + NEW.vote_reward_value
    )
    ON CONFLICT (id) DO UPDATE SET
      cumulative_extrinsics_count = prev_cumulative.cumulative_extrinsics_count + NEW.extrinsics_count,
      cumulative_events_count = prev_cumulative.cumulative_events_count + NEW.events_count,
      cumulative_logs_count = prev_cumulative.cumulative_logs_count + NEW.logs_count,
      cumulative_transfers_count = prev_cumulative.cumulative_transfers_count + NEW.transfers_count,
      cumulative_rewards_count = prev_cumulative.cumulative_rewards_count + NEW.rewards_count,
      cumulative_block_rewards_count = prev_cumulative.cumulative_block_rewards_count + NEW.block_rewards_count,
      cumulative_vote_rewards_count = prev_cumulative.cumulative_vote_rewards_count + NEW.vote_rewards_count,
      cumulative_transfer_value = prev_cumulative.cumulative_transfer_value + NEW.transfer_value,
      cumulative_reward_value = prev_cumulative.cumulative_reward_value + NEW.reward_value,
      cumulative_block_reward_value = prev_cumulative.cumulative_block_reward_value + NEW.block_reward_value,
      cumulative_vote_reward_value = prev_cumulative.cumulative_vote_reward_value + NEW.vote_reward_value;

    RETURN NEW;
  END;
  $$;
ALTER FUNCTION consensus.update_cumulative_blocks() OWNER TO postgres;

CREATE TRIGGER ensure_consensus_cumulative_blocks
    BEFORE INSERT ON consensus.blocks
    FOR EACH ROW
    EXECUTE FUNCTION consensus.update_cumulative_blocks();