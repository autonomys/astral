CREATE OR REPLACE FUNCTION staking.prevent_domain_block_histories_duplicate() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
  BEGIN
    IF EXISTS (
        SELECT 1 
        FROM staking.domain_block_histories 
        WHERE id = NEW.id
    ) THEN
        RETURN NULL;
    END IF;

    UPDATE staking.domains
    SET 
        last_domain_block_number = NEW.domain_block_number
    WHERE id = NEW.domain_id;
    
    RETURN NEW;
  END;
  $$;
ALTER FUNCTION staking.prevent_domain_block_histories_duplicate() OWNER TO postgres;

CREATE TRIGGER prevent_domain_block_histories_duplicate
BEFORE INSERT ON staking.domain_block_histories
FOR EACH ROW
EXECUTE FUNCTION staking.prevent_domain_block_histories_duplicate();

CREATE OR REPLACE FUNCTION staking.prevent_domain_staking_histories_duplicate() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM staking.domain_staking_histories 
        WHERE id = NEW.id
    ) THEN
        RETURN NULL;
    END IF;

    RETURN NEW;
END;
$$;
ALTER FUNCTION staking.prevent_domain_staking_histories_duplicate() OWNER TO postgres;

CREATE TRIGGER prevent_domain_staking_histories_duplicate
BEFORE INSERT ON staking.domain_staking_histories
FOR EACH ROW
EXECUTE FUNCTION staking.prevent_domain_staking_histories_duplicate();

CREATE OR REPLACE FUNCTION staking.prevent_operator_staking_histories_duplicate() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM staking.operator_staking_histories 
        WHERE id = NEW.id
    ) THEN
        RETURN NULL;
    END IF;
    
    RETURN NEW;
END;
$$;
ALTER FUNCTION staking.prevent_operator_staking_histories_duplicate() OWNER TO postgres;

CREATE TRIGGER prevent_operator_staking_histories_duplicate
BEFORE INSERT ON staking.operator_staking_histories
FOR EACH ROW
EXECUTE FUNCTION staking.prevent_operator_staking_histories_duplicate();

CREATE OR REPLACE FUNCTION staking.insert_new_domain() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO staking.domains (
        id,
        sort_id,
        account_id,
        name,
        runtime_id,
        runtime,
        runtime_info,
        completed_epoch,
        last_domain_block_number,
        total_deposits,
        total_estimated_withdrawals,
        total_withdrawals,
        total_deposits_count,
        total_withdrawals_count,
        total_tax_collected,
        total_rewards_collected,
        total_transfers_in,
        transfers_in_count,
        total_transfers_out,
        transfers_out_count,
        total_rejected_transfers_claimed,
        rejected_transfers_claimed_count,
        total_transfers_rejected,
        transfers_rejected_count,
        total_volume,
        total_consensus_storage_fee,
        total_domain_execution_fee,
        total_burned_balance,
        current_total_stake,
        current_storage_fee_deposit,
        current_total_shares,
        current_share_price,
        current_1d_yield,
        current_7d_yield,
        current_30d_yield,
        current_1d_apy,
        current_7d_apy,
        current_30d_apy,
        accumulated_epoch_stake,
        accumulated_epoch_storage_fee_deposit,
        accumulated_epoch_rewards,
        accumulated_epoch_shares,
        bundle_count,
        reward_count,
        tax_collected_count,
        current_epoch_duration,
        last_epoch_duration,
        last6_epochs_duration,
        last144_epoch_duration,
        last1k_epoch_duration,
        last_bundle_at,
        extrinsic_id,
        created_at,
        updated_at
    ) VALUES (
        NEW.id,                    -- id from domain_instantiations
        NEW.sort_id,               -- sort_id
        NEW.created_by,            -- account_id from created_by
        NEW.name,                  -- name
        NEW.runtime_id,            -- runtime_id
        NEW.runtime,               -- runtime
        NEW.runtime_info,          -- runtime_info
        0,                         -- completed_epoch
        0,                         -- last_domain_block_number
        0,                         -- total_deposits
        0,                         -- total_estimated_withdrawals
        0,                         -- total_withdrawals
        0,                         -- total_deposits_count
        0,                         -- total_withdrawals_count
        0,                         -- total_tax_collected
        0,                         -- total_rewards_collected
        0,                         -- total_transfers_in
        0,                         -- transfers_in_count
        0,                         -- total_transfers_out
        0,                         -- transfers_out_count
        0,                         -- total_rejected_transfers_claimed
        0,                         -- rejected_transfers_claimed_count
        0,                         -- total_transfers_rejected
        0,                         -- transfers_rejected_count
        0,                         -- total_volume
        0,                         -- total_consensus_storage_fee
        0,                         -- total_domain_execution_fee
        0,                         -- total_burned_balance
        0,                         -- current_total_stake
        0,                         -- current_storage_fee_deposit
        0,                         -- current_total_shares
        0,                         -- current_share_price
        0,                         -- current_1d_yield
        0,                         -- current_7d_yield
        0,                         -- current_30d_yield
        0,                         -- current_1d_apy
        0,                         -- current_7d_apy
        0,                         -- current_30d_apy
        0,                         -- accumulated_epoch_stake
        0,                         -- accumulated_epoch_storage_fee_deposit
        0,                         -- accumulated_epoch_rewards
        0,                         -- accumulated_epoch_shares
        0,                         -- bundle_count
        0,                         -- reward_count
        0,                         -- tax_collected_count
        0,                         -- current_epoch_duration
        0,                         -- last_epoch_duration
        0,                         -- last6_epochs_duration
        0,                         -- last144_epoch_duration
        0,                         -- last1k_epoch_duration
        0,                         -- last_bundle_at
        NEW.extrinsic_id,          -- extrinsic_id
        NEW.block_height,          -- created_at
        NEW.block_height           -- updated_at
    );
    
    RETURN NEW;
END;
$$;
ALTER FUNCTION staking.insert_new_domain() OWNER TO postgres;

CREATE TRIGGER insert_new_domain
AFTER INSERT ON staking.domain_instantiations
FOR EACH ROW
EXECUTE FUNCTION staking.insert_new_domain();

CREATE OR REPLACE FUNCTION staking.insert_new_operator() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO staking.operators (
        id,
        sort_id,
        account_id,
        domain_id,
        signing_key,
        minimum_nominator_stake,
        nomination_tax,
        current_total_stake,
        current_storage_fee_deposit,
        current_epoch_rewards,
        current_total_shares,
        current_share_price,
        raw_status,
        total_deposits,
        total_estimated_withdrawals,
        total_withdrawals,
        total_deposits_count,
        total_withdrawals_count,
        total_tax_collected,
        total_rewards_collected,
        accumulated_epoch_stake,
        accumulated_epoch_storage_fee_deposit,
        accumulated_epoch_rewards,
        accumulated_epoch_shares,
        active_epoch_count,
        bundle_count,
        reward_count,
        tax_collected_count,
        current_1d_yield,
        current_7d_yield,
        current_30d_yield,
        current_1d_apy,
        current_7d_apy,
        current_30d_apy,
        status,
        last_bundle_at,
        extrinsic_id,
        created_at,
        updated_at
    ) VALUES (
        NEW.id,                                  -- id
        NEW.sort_id,                             -- sort_id
        NEW.owner,                               -- account_id
        NEW.domain_id,                           -- domain_id
        NEW.signing_key,                         -- signing_key
        NEW.minimum_nominator_stake,             -- minimum_nominator_stake
        NEW.nomination_tax,                      -- nomination_tax
        0,                                       -- current_total_stake
        0,                                       -- current_storage_fee_deposit
        0,                                       -- current_epoch_rewards
        0,                                       -- current_total_shares
        0,                                       -- current_share_price
        '{"registered":null}',                   -- raw_status
        0,                                       -- total_deposits
        0,                                       -- total_estimated_withdrawals
        0,                                       -- total_withdrawals
        0,                                       -- total_deposits_count
        0,                                       -- total_withdrawals_count
        0,                                       -- total_tax_collected
        0,                                       -- total_rewards_collected
        0,                                       -- accumulated_epoch_stake
        0,                                       -- accumulated_epoch_storage_fee_deposit
        0,                                       -- accumulated_epoch_rewards
        0,                                       -- accumulated_epoch_shares
        0,                                       -- active_epoch_count
        0,                                       -- bundle_count
        0,                                       -- reward_count
        0,                                       -- tax_collected_count
        0,                                       -- current_1d_yield
        0,                                       -- current_7d_yield
        0,                                       -- current_30d_yield
        0,                                       -- current_1d_apy
        0,                                       -- current_7d_apy
        0,                                       -- current_30d_apy
        'PENDING_NEXT_EPOCH',                    -- status
        0,                                       -- last_bundle_at
        NEW.extrinsic_id,                        -- extrinsic_id
        NEW.block_height,                        -- created_at
        NEW.block_height                         -- updated_at
    );
    
    RETURN NEW;
END;
$$;
ALTER FUNCTION staking.insert_new_operator() OWNER TO postgres;

CREATE TRIGGER insert_new_operator
AFTER INSERT ON staking.operator_registrations
FOR EACH ROW
EXECUTE FUNCTION staking.insert_new_operator();

CREATE OR REPLACE FUNCTION staking.handle_deposit_events() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE staking.domains
    SET 
        total_deposits = staking.domains.total_deposits + NEW.amount,
        total_deposits_count = staking.domains.total_deposits_count + 1,
        updated_at = NEW.block_height
    WHERE id = NEW.domain_id;

    UPDATE staking.operators
    SET 
        total_deposits = staking.operators.total_deposits + NEW.amount,
        total_deposits_count = staking.operators.total_deposits_count + 1,
        updated_at = NEW.block_height
    WHERE id = NEW.operator_id;

    IF NOT EXISTS (
        SELECT 1 
        FROM staking.nominators 
        WHERE id = NEW.nominator_id
    ) THEN
        INSERT INTO staking.nominators (
            id,
            account_id,
            domain_id,
            operator_id,
            known_shares,
            known_storage_fee_deposit,
            pending_amount,
            pending_storage_fee_deposit,
            pending_effective_domain_epoch,
            total_withdrawal_amounts,
            total_storage_fee_refund,
            unlock_at_confirmed_domain_block_number,
            pending_shares,
            pending_storage_fee_refund,
            total_deposits,
            total_estimated_withdrawals,
            total_withdrawals,
            total_deposits_count,
            total_withdrawals_count,
            current_total_stake,
            current_storage_fee_deposit,
            current_total_shares,
            current_share_price,
            accumulated_epoch_stake,
            accumulated_epoch_storage_fee_deposit,
            accumulated_epoch_shares,
            active_epoch_count,
            status,
            created_at,
            updated_at
        ) VALUES (
            NEW.nominator_id,                -- id
            NEW.account_id,                  -- account_id
            NEW.domain_id,                   -- domain_id
            NEW.operator_id,                 -- operator_id
            0,                               -- known_shares
            0,                               -- known_storage_fee_deposit
            0,                               -- pending_amount
            0,                               -- pending_storage_fee_deposit
            0,                               -- pending_effective_domain_epoch
            0,                               -- total_withdrawal_amounts
            0,                               -- total_storage_fee_refund
            '{}',                            -- unlock_at_confirmed_domain_block_number (empty JSONB)
            0,                               -- pending_shares
            0,                               -- pending_storage_fee_refund
            NEW.amount,                      -- total_deposits (initialize with first deposit)
            0,                               -- total_estimated_withdrawals
            0,                               -- total_withdrawals
            1,                               -- total_deposits_count (start at 1)
            0,                               -- total_withdrawals_count
            NEW.amount,                      -- current_total_stake (initialize with first deposit)
            NEW.storage_fee_deposit,         -- current_storage_fee_deposit
            0,                               -- current_total_shares
            0,                               -- current_share_price
            0,                               -- accumulated_epoch_stake
            0,                               -- accumulated_epoch_storage_fee_deposit
            0,                               -- accumulated_epoch_shares
            0,                               -- active_epoch_count
            'PENDING_NEXT_EPOCH',            -- status
            NEW.block_height,                -- created_at
            NEW.block_height                 -- updated_at
        );
    ELSE
        UPDATE staking.nominators
        SET
            total_deposits = staking.nominators.total_deposits + NEW.amount,
            total_deposits_count = staking.nominators.total_deposits_count + 1,
            updated_at = NEW.block_height
        WHERE id = NEW.nominator_id;
    END IF;

    INSERT INTO staking.deposits (
        id,
        account_id,
        domain_id,
        operator_id,
        nominator_id,
        amount,
        storage_fee_deposit,
        total_amount,
        estimated_shares,
        total_withdrawn,
        status,
        "timestamp",
        extrinsic_id,
        created_at,
        updated_at
    ) VALUES (
        NEW.id,                      -- id
        NEW.account_id,              -- account_id
        NEW.domain_id,               -- domain_id
        NEW.operator_id,             -- operator_id
        NEW.nominator_id,            -- nominator_id
        NEW.amount,                  -- amount
        NEW.storage_fee_deposit,     -- storage_fee_deposit
        NEW.total_amount,            -- total_amount
        NEW.estimated_shares,        -- estimated_shares
        0,                           -- total_withdrawn (starts at 0)
        'PENDING_NEXT_EPOCH',        -- status
        NEW."timestamp",             -- timestamp
        NEW.extrinsic_id,            -- extrinsic_id
        NEW.block_height,            -- created_at
        NEW.block_height             -- updated_at
    ) ON CONFLICT (id) DO UPDATE SET
        account_id = EXCLUDED.account_id,
        domain_id = EXCLUDED.domain_id,
        operator_id = EXCLUDED.operator_id,
        nominator_id = EXCLUDED.nominator_id,
        amount = EXCLUDED.amount,
        storage_fee_deposit = EXCLUDED.storage_fee_deposit,
        total_amount = EXCLUDED.total_amount,
        estimated_shares = EXCLUDED.estimated_shares,
        "timestamp" = EXCLUDED."timestamp",
        extrinsic_id = EXCLUDED.extrinsic_id,
        updated_at = EXCLUDED.updated_at;

    INSERT INTO staking.accounts (
        id,
        total_deposits,
        total_estimated_withdrawals,
        total_withdrawals,
        total_deposits_count,
        total_withdrawals_count,
        total_tax_collected,
        total_tax_collected_count,
        total_rewards_collected,
        total_rewards_collected_count,
        current_total_stake,
        current_storage_fee_deposit,
        current_total_shares,
        current_share_price,
        accumulated_epoch_stake,
        accumulated_epoch_storage_fee_deposit,
        accumulated_epoch_shares,
        created_at,
        updated_at
    ) VALUES (
        NEW.account_id,            -- id
        NEW.total_amount,          -- total_deposits (start with the new deposit amount)
        0,                         -- total_estimated_withdrawals
        0,                         -- total_withdrawals
        0,                         -- total_deposits_count
        0,                         -- total_withdrawals_count
        0,                         -- total_tax_collected
        0,                         -- total_tax_collected_count
        0,                         -- total_rewards_collected
        0,                         -- total_rewards_collected_count
        NEW.amount,                -- current_total_stake
        NEW.storage_fee_deposit,   -- current_storage_fee_deposit
        0,                         -- current_total_shares
        0,                         -- current_share_price
        0,                         -- accumulated_epoch_stake
        0,                         -- accumulated_epoch_storage_fee_deposit
        0,                         -- accumulated_epoch_shares
        NEW.block_height,            -- created_at
        NEW.block_height             -- updated_at
    )
    ON CONFLICT (id) DO UPDATE SET
        total_deposits = staking.accounts.total_deposits + NEW.total_amount,
        total_deposits_count = staking.accounts.total_deposits_count + 1,
        current_total_stake = staking.accounts.current_total_stake + NEW.amount,
        current_storage_fee_deposit = staking.accounts.current_storage_fee_deposit + NEW.storage_fee_deposit,
        updated_at = NEW.block_height;
    
    RETURN NEW;
END;
$$;
ALTER FUNCTION staking.handle_deposit_events() OWNER TO postgres;

CREATE TRIGGER handle_deposit_events
AFTER INSERT ON staking.deposit_events
FOR EACH ROW
EXECUTE FUNCTION staking.handle_deposit_events();

CREATE OR REPLACE FUNCTION staking.handle_withdraw_events() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
  DECLARE
    last_domain_block_number staking.domain_block_histories.domain_block_number%TYPE;
    last_domain_epoch staking.domain_epochs.epoch%TYPE;
  BEGIN
    SELECT domain_block_number
    INTO last_domain_block_number
    FROM staking.domain_block_histories
    WHERE domain_id = NEW.domain_id
    ORDER BY domain_block_number DESC
    LIMIT 1;

    SELECT epoch
    INTO last_domain_epoch
    FROM staking.domain_epochs
    WHERE domain_id = NEW.domain_id
    ORDER BY epoch DESC
    LIMIT 1;

    INSERT INTO staking.withdrawals (
        id,
        account_id,
        domain_id,
        operator_id,
        nominator_id,
        shares,
        storage_fee_refund,
        estimated_amount,
        unlocked_amount,
        unlocked_storage_fee,
        total_amount,
        status,
        "timestamp",
        withdraw_extrinsic_id,
        unlock_extrinsic_id,
        epoch_withdrawal_requested_at,
        domain_block_number_withdrawal_requested_at,
        created_at,
        domain_block_number_ready_at,
        unlocked_at,
        updated_at
    ) VALUES (
        NEW.id,                      -- id
        NEW.account_id,              -- account_id
        NEW.domain_id,               -- domain_id
        NEW.operator_id,             -- operator_id
        NEW.nominator_id,            -- nominator_id
        NEW.shares,                  -- shares
        NEW.storage_fee_refund,      -- storage_fee_refund
        NEW.estimated_amount,        -- estimated_amount
        0,                           -- unlocked_amount
        0,                           -- unlocked_storage_fee
        0,                           -- total_amount
        'PENDING_NEXT_EPOCH',        -- status
        NEW."timestamp",             -- timestamp
        NEW.extrinsic_id,            -- withdraw_extrinsic_id
        0,                           -- unlock_extrinsic_id
        last_domain_epoch,           -- epoch_withdrawal_requested_at
        last_domain_block_number,    -- domain_block_number_withdrawal_requested_at
        NEW.block_height,            -- created_at
        last_domain_block_number + 14400, -- domain_block_number_ready_at
        0,                           -- unlocked_at
        NEW.block_height             -- updated_at
    ) ON CONFLICT (id) DO UPDATE SET
        account_id = EXCLUDED.account_id,
        domain_id = EXCLUDED.domain_id,
        operator_id = EXCLUDED.operator_id,
        nominator_id = EXCLUDED.nominator_id,
        shares = EXCLUDED.shares,
        storage_fee_refund = EXCLUDED.storage_fee_refund,
        estimated_amount = EXCLUDED.estimated_amount,
        "timestamp" = EXCLUDED."timestamp",
        withdraw_extrinsic_id = EXCLUDED.withdraw_extrinsic_id,
        epoch_withdrawal_requested_at = EXCLUDED.epoch_withdrawal_requested_at,
        domain_block_number_withdrawal_requested_at = EXCLUDED.domain_block_number_withdrawal_requested_at,
        created_at = EXCLUDED.created_at,
        domain_block_number_ready_at = EXCLUDED.domain_block_number_ready_at,
        updated_at = EXCLUDED.updated_at;
    
    RETURN NEW;
  END;
$$;
ALTER FUNCTION staking.handle_withdraw_events() OWNER TO postgres;

CREATE TRIGGER handle_withdraw_events
AFTER INSERT ON staking.withdraw_events
FOR EACH ROW
EXECUTE FUNCTION staking.handle_withdraw_events();

CREATE OR REPLACE FUNCTION staking.handle_operator_tax_collections_events() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
DECLARE
    operator_account_id TEXT;
BEGIN
    SELECT account_id INTO operator_account_id
    FROM staking.operators
    WHERE id = NEW.operator_id;

    UPDATE staking.domains
    SET 
        total_tax_collected = staking.domains.total_tax_collected + NEW.amount,
        tax_collected_count = staking.domains.tax_collected_count + 1,
        updated_at = NEW.block_height
    WHERE id = NEW.domain_id;

    UPDATE staking.operators
    SET 
        total_tax_collected = staking.operators.total_tax_collected + NEW.amount,
        tax_collected_count = staking.operators.tax_collected_count + 1,
        updated_at = NEW.block_height
    WHERE id = NEW.operator_id;

    UPDATE staking.accounts
    SET 
        total_tax_collected = staking.accounts.total_tax_collected + NEW.amount,
        total_tax_collected_count = staking.accounts.total_tax_collected_count + 1,
        updated_at = NEW.block_height
    WHERE id = operator_account_id;
    
    RETURN NEW;
END;
$$;
ALTER FUNCTION staking.handle_operator_tax_collections_events() OWNER TO postgres;

CREATE TRIGGER handle_operator_tax_collections_events
AFTER INSERT ON staking.operator_tax_collections
FOR EACH ROW
EXECUTE FUNCTION staking.handle_operator_tax_collections_events();

CREATE OR REPLACE FUNCTION staking.handle_operator_rewards_events() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
DECLARE
    operator_account_id TEXT;
BEGIN
    SELECT account_id INTO operator_account_id
    FROM staking.operators
    WHERE id = NEW.operator_id;

    UPDATE staking.domains
    SET 
        total_rewards_collected = staking.domains.total_rewards_collected + NEW.amount,
        reward_count = staking.domains.reward_count + 1,
        updated_at = NEW.block_height
    WHERE id = NEW.domain_id;

    UPDATE staking.operators
    SET 
        total_rewards_collected = staking.operators.total_rewards_collected + NEW.amount,
        reward_count = staking.operators.reward_count + 1,
        updated_at = NEW.block_height
    WHERE id = NEW.operator_id;

    UPDATE staking.accounts
    SET 
        total_rewards_collected = staking.accounts.total_rewards_collected + NEW.amount,
        total_rewards_collected_count = staking.accounts.total_rewards_collected_count + 1,
        updated_at = NEW.block_height
    WHERE id = operator_account_id;
    
    RETURN NEW;
END;
$$;
ALTER FUNCTION staking.handle_operator_rewards_events() OWNER TO postgres;

CREATE TRIGGER handle_operator_rewards_events
AFTER INSERT ON staking.operator_rewards
FOR EACH ROW
EXECUTE FUNCTION staking.handle_operator_rewards_events();

CREATE OR REPLACE FUNCTION staking.handle_bundle_submissions_events() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE staking.domains
    SET 
        total_transfers_in = staking.domains.total_transfers_in + NEW.total_transfers_in,
        transfers_in_count = staking.domains.transfers_in_count + NEW.transfers_in_count,
        total_transfers_out = staking.domains.total_transfers_out + NEW.total_transfers_out,
        transfers_out_count = staking.domains.transfers_out_count + NEW.transfers_out_count,
        total_rejected_transfers_claimed = staking.domains.total_rejected_transfers_claimed + NEW.total_rejected_transfers_claimed,
        rejected_transfers_claimed_count = staking.domains.rejected_transfers_claimed_count + NEW.rejected_transfers_claimed_count,
        total_transfers_rejected = staking.domains.total_transfers_rejected + NEW.total_transfers_rejected,
        transfers_rejected_count = staking.domains.transfers_rejected_count + NEW.transfers_rejected_count,
        total_volume = staking.domains.total_volume + NEW.total_volume,
        total_consensus_storage_fee = staking.domains.total_consensus_storage_fee + NEW.consensus_storage_fee,
        total_domain_execution_fee = staking.domains.total_domain_execution_fee + NEW.domain_execution_fee,
        total_burned_balance = staking.domains.total_burned_balance + NEW.burned_balance,
        bundle_count = staking.domains.bundle_count + 1,
        last_bundle_at = NEW.consensus_block_number,
        updated_at = NEW.block_height
    WHERE id = NEW.domain_id;

    UPDATE staking.operators
    SET 
        bundle_count = staking.operators.bundle_count + 1,
        last_bundle_at = NEW.consensus_block_number,
        updated_at = NEW.block_height
    WHERE id = NEW.operator_id;
    
    RETURN NEW;
END;
$$;
ALTER FUNCTION staking.handle_bundle_submissions_events() OWNER TO postgres;

CREATE TRIGGER handle_bundle_submissions_events
AFTER INSERT ON staking.bundle_submissions
FOR EACH ROW
EXECUTE FUNCTION staking.handle_bundle_submissions_events();

CREATE OR REPLACE FUNCTION staking.update_operator_stakes() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
  DECLARE
    share_price_1d_old staking.operator_staking_histories.share_price%TYPE := '1000000000000000000';
    share_price_7d_old staking.operator_staking_histories.share_price%TYPE := '1000000000000000000';
    share_price_30d_old staking.operator_staking_histories.share_price%TYPE := '1000000000000000000';
    calc_1d_yield NUMERIC;
    calc_7d_yield NUMERIC;
    calc_30d_yield NUMERIC;
    calc_1d_apy NUMERIC;
    calc_7d_apy NUMERIC;
    calc_30d_apy NUMERIC;
    divisor NUMERIC := 1000000000000000000;
  BEGIN
    SELECT share_price
    INTO share_price_1d_old
    FROM staking.operator_staking_histories
    WHERE operator_id = NEW.operator_id
    ORDER BY ABS(EXTRACT(EPOCH FROM (timestamp - (NEW.timestamp - INTERVAL '1 day'))))
    LIMIT 1;

    SELECT share_price
    INTO share_price_7d_old
    FROM staking.operator_staking_histories
    WHERE operator_id = NEW.operator_id
    ORDER BY ABS(EXTRACT(EPOCH FROM (timestamp - (NEW.timestamp - INTERVAL '7 days'))))
    LIMIT 1;

    SELECT share_price
    INTO share_price_30d_old
    FROM staking.operator_staking_histories
    WHERE operator_id = NEW.operator_id
    ORDER BY ABS(EXTRACT(EPOCH FROM (timestamp - (NEW.timestamp - INTERVAL '30 days'))))
    LIMIT 1;

    -- Calculate yields with explicit NUMERIC casts to avoid overflow
    -- For 1-day: (NEW.share_price / share_price_1d_old - 1)
    calc_1d_yield := CASE 
      WHEN CAST(share_price_1d_old AS NUMERIC) > 0 THEN 
        ((CAST(NEW.share_price AS NUMERIC) / CAST(share_price_1d_old AS NUMERIC)) - 1.0)
      ELSE 0
    END;

    -- For 7-day: (NEW.share_price / share_price_7d_old - 1)
    calc_7d_yield := CASE 
      WHEN CAST(share_price_7d_old AS NUMERIC) > 0 THEN 
        ((CAST(NEW.share_price AS NUMERIC) / CAST(share_price_7d_old AS NUMERIC)) - 1.0)
      ELSE 0
    END;

    -- For 30-day: (NEW.share_price / share_price_30d_old - 1)
    calc_30d_yield := CASE 
      WHEN CAST(share_price_30d_old AS NUMERIC) > 0 THEN 
        ((CAST(NEW.share_price AS NUMERIC) / CAST(share_price_30d_old AS NUMERIC)) - 1.0)
      ELSE 0
    END;

    -- Calculate APYs with explicit NUMERIC casts to avoid overflow
    -- For 1-day: (1 + 1d_yield_calc) ^ 365 - 1
    calc_1d_apy := CASE 
      WHEN calc_1d_yield >= 0 THEN 
        ((1.0 + calc_1d_yield) ^ 365.0) - 1.0
      ELSE 0
    END;

    -- For 7-day: (1 + 7d_yield_calc) ^ 365 - 1
    calc_7d_apy := CASE 
      WHEN calc_7d_yield >= 0 THEN 
        ((1.0 + calc_7d_yield) ^ (365.0 / 7.0)) - 1.0
      ELSE 0
    END;

    -- For 30-day: (1 + 30d_yield_calc) ^ 365 - 1
    calc_30d_apy := CASE 
      WHEN calc_30d_yield >= 0 THEN 
        ((1.0 + calc_30d_yield) ^ (365.0 / 30.0)) - 1.0
      ELSE 0
    END;

    UPDATE staking.operators
    SET 
        current_total_stake = NEW.current_total_stake,
        current_storage_fee_deposit = NEW.total_storage_fee_deposit,
        current_total_shares = NEW.current_total_shares,
        current_share_price = NEW.share_price,
        raw_status = NEW.partial_status,
        current_1d_yield = calc_1d_yield,
        current_7d_yield = calc_7d_yield,
        current_30d_yield = calc_30d_yield,
        current_1d_apy = calc_1d_apy,
        current_7d_apy = calc_7d_apy,
        current_30d_apy = calc_30d_apy,
        updated_at = NEW.block_height
    WHERE id = NEW.operator_id;
    
    RETURN NEW;
  END;
$$;
ALTER FUNCTION staking.update_operator_stakes() OWNER TO postgres;

CREATE TRIGGER update_operator_stakes_trigger
AFTER INSERT ON staking.operator_staking_histories
FOR EACH ROW
EXECUTE FUNCTION staking.update_operator_stakes();

CREATE OR REPLACE FUNCTION staking.update_domain_stakes() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
  DECLARE
    last_domain_block_number staking.domain_block_histories.domain_block_number%TYPE;
    share_price_1d_old staking.operator_staking_histories.share_price%TYPE := '1000000000000000000';
    share_price_7d_old staking.operator_staking_histories.share_price%TYPE := '1000000000000000000';
    share_price_30d_old staking.operator_staking_histories.share_price%TYPE := '1000000000000000000';
    calc_1d_yield NUMERIC;
    calc_7d_yield NUMERIC;
    calc_30d_yield NUMERIC;
    calc_1d_apy NUMERIC;
    calc_7d_apy NUMERIC;
    calc_30d_apy NUMERIC;
  BEGIN
    SELECT domain_block_number
    INTO last_domain_block_number
    FROM staking.domain_block_histories
    WHERE domain_id = NEW.domain_id
    ORDER BY block_height DESC
    LIMIT 1;

    IF NOT FOUND THEN
        last_domain_block_number := 0;
    END IF;

    SELECT share_price
    INTO share_price_1d_old
    FROM staking.domain_staking_histories
    WHERE domain_id = NEW.domain_id
    ORDER BY ABS(EXTRACT(EPOCH FROM (timestamp - (NEW.timestamp - INTERVAL '1 day'))))
    LIMIT 1;

    SELECT share_price
    INTO share_price_7d_old
    FROM staking.domain_staking_histories
    WHERE domain_id = NEW.domain_id
    ORDER BY ABS(EXTRACT(EPOCH FROM (timestamp - (NEW.timestamp - INTERVAL '7 days'))))
    LIMIT 1;

    SELECT share_price
    INTO share_price_30d_old
    FROM staking.domain_staking_histories
    WHERE domain_id = NEW.domain_id
    ORDER BY ABS(EXTRACT(EPOCH FROM (timestamp - (NEW.timestamp - INTERVAL '30 days'))))
    LIMIT 1;

    -- Calculate yields with explicit NUMERIC casts to avoid overflow
    -- For 1-day: (NEW.share_price / share_price_1d_old - 1)
    calc_1d_yield := CASE 
      WHEN CAST(share_price_1d_old AS NUMERIC) > 0 THEN 
        ((CAST(NEW.share_price AS NUMERIC) / CAST(share_price_1d_old AS NUMERIC)) - 1.0)
      ELSE 0
    END;

    -- For 7-day: (NEW.share_price / share_price_7d_old - 1)
    calc_7d_yield := CASE 
      WHEN CAST(share_price_7d_old AS NUMERIC) > 0 THEN 
        ((CAST(NEW.share_price AS NUMERIC) / CAST(share_price_7d_old AS NUMERIC)) - 1.0)
      ELSE 0
    END;

    -- For 30-day: (NEW.share_price / share_price_30d_old - 1)
    calc_30d_yield := CASE 
      WHEN CAST(share_price_30d_old AS NUMERIC) > 0 THEN 
        ((CAST(NEW.share_price AS NUMERIC) / CAST(share_price_30d_old AS NUMERIC)) - 1.0)
      ELSE 0
    END;

    -- Calculate APYs with explicit NUMERIC casts to avoid overflow
    -- For 1-day: (1 + 1d_yield_calc) ^ 365 - 1
    calc_1d_apy := CASE 
      WHEN calc_1d_yield >= 0 THEN 
        ((1.0 + calc_1d_yield) ^ 365.0) - 1.0
      ELSE 0
    END;

    -- For 7-day: (1 + 7d_yield_calc) ^ 365 - 1
    calc_7d_apy := CASE 
      WHEN calc_7d_yield >= 0 THEN 
        ((1.0 + calc_7d_yield) ^ (365.0 / 7.0)) - 1.0
      ELSE 0
    END;

    -- For 30-day: (1 + 30d_yield_calc) ^ 365 - 1
    calc_30d_apy := CASE 
      WHEN calc_30d_yield >= 0 THEN 
        ((1.0 + calc_30d_yield) ^ (365.0 / 30.0)) - 1.0
      ELSE 0
    END;

    UPDATE staking.domains
    SET 
        current_total_stake = NEW.current_total_stake,
        completed_epoch = NEW.current_epoch_index,
        current_total_shares = NEW.current_total_shares,
        current_share_price = NEW.share_price,
        current_1d_yield = calc_1d_yield,
        current_7d_yield = calc_7d_yield,
        current_30d_yield = calc_30d_yield,
        current_1d_apy = calc_1d_apy,
        current_7d_apy = calc_7d_apy,
        current_30d_apy = calc_30d_apy,
        updated_at = NEW.block_height
    WHERE id = NEW.domain_id;

    INSERT INTO staking.domain_epochs (
        id,
        domain_id,
        epoch,
        domain_block_number_start,
        domain_block_number_end,
        domain_block_count,
        timestamp_start,
        timestamp_end,
        epoch_duration,
        consensus_block_number_start,
        consensus_block_number_end,
        consensus_block_count,
        created_at,
        updated_at
    ) VALUES (
        NEW.domain_id || '-' || NEW.current_epoch_index,
        NEW.domain_id,
        NEW.current_epoch_index,
        last_domain_block_number,
        last_domain_block_number,
        1,
        NEW.timestamp,
        NEW.timestamp,
        0,
        NEW.block_height,
        NEW.block_height,
        1,
        NEW.block_height,
        NEW.block_height
    ) ON CONFLICT (id) DO UPDATE SET
        domain_block_number_start = CASE 
            WHEN staking.domain_epochs.domain_block_number_start = 0 
            THEN last_domain_block_number 
            ELSE staking.domain_epochs.domain_block_number_start 
        END,
        domain_block_number_end = last_domain_block_number,
        domain_block_count = staking.domain_epochs.domain_block_count + 1,
        timestamp_end = NEW.timestamp,
        epoch_duration = EXTRACT(EPOCH FROM (NEW.timestamp - staking.domain_epochs.timestamp_start)),
        consensus_block_number_end = NEW.block_height,
        consensus_block_count = staking.domain_epochs.consensus_block_count + 1,
        updated_at = NEW.block_height;

    UPDATE staking.withdrawals
    SET 
        status = 'PENDING_UNLOCK_FUNDS',
        updated_at = NEW.block_height
    WHERE status = 'PENDING_CHALLENGE_PERIOD' AND domain_block_number_ready_at <= last_domain_block_number;
    
    RETURN NEW;
  END;
$$;
ALTER FUNCTION staking.update_domain_stakes() OWNER TO postgres;

CREATE TRIGGER update_domain_stakes_trigger
AFTER INSERT ON staking.domain_staking_histories
FOR EACH ROW
EXECUTE FUNCTION staking.update_domain_stakes();

CREATE OR REPLACE FUNCTION staking.handle_domain_epochs() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
  BEGIN
    UPDATE staking.operators
    SET 
        status = 'ACTIVE',
        updated_at = NEW.created_at
    WHERE status = 'PENDING_NEXT_EPOCH';

    UPDATE staking.nominators
    SET 
        status = 'ACTIVE',
        updated_at = NEW.created_at
    WHERE status = 'PENDING_NEXT_EPOCH';

    UPDATE staking.deposits
    SET 
        status = 'ACTIVE',
        updated_at = NEW.created_at
    WHERE status = 'PENDING_NEXT_EPOCH';

    UPDATE staking.withdrawals
    SET 
        status = 'PENDING_CHALLENGE_PERIOD',
        updated_at = NEW.created_at
    WHERE status = 'PENDING_NEXT_EPOCH';
    
    RETURN NEW;
  END;
$$;
ALTER FUNCTION staking.handle_domain_epochs() OWNER TO postgres;

CREATE TRIGGER handle_domain_epochs_trigger
AFTER INSERT ON staking.domain_epochs
FOR EACH ROW
EXECUTE FUNCTION staking.handle_domain_epochs();

CREATE OR REPLACE FUNCTION staking.update_operator_on_deregistration() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE staking.operators
    SET 
        status = 'DEREGISTERED',
        updated_at = NEW.block_height
    WHERE id = NEW.id;

    RETURN NEW;
END;
$$;
ALTER FUNCTION staking.update_operator_on_deregistration() OWNER TO postgres;

CREATE TRIGGER update_operator_on_deregistration_trigger
AFTER INSERT ON staking.operator_deregistrations
FOR EACH ROW
EXECUTE FUNCTION staking.update_operator_on_deregistration();

CREATE OR REPLACE FUNCTION staking.handle_unlocked_events() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
DECLARE
    remaining_amount numeric;
    current_deposit RECORD;
    found_eligible_deposits boolean;
    deposit_cursor CURSOR FOR 
        SELECT id, amount, storage_fee_deposit, total_amount, total_withdrawn, status
        FROM staking.deposits
        WHERE (status = 'ACTIVE' OR status = 'PARTIALLY_WITHDRAWN') 
        AND nominator_id = NEW.nominator_id
        ORDER BY created_at ASC;
    withdrawal_id text;
    deposit_to_update_id text;
    last_domain_block_number staking.domain_block_histories.domain_block_number%TYPE;
    last_domain_epoch staking.domain_epochs.epoch%TYPE;
BEGIN
    SELECT id INTO withdrawal_id
    FROM staking.withdrawals
    WHERE status = 'PENDING_UNLOCK_FUNDS' AND nominator_id = NEW.nominator_id
    ORDER BY created_at ASC
    LIMIT 1;

    SELECT domain_block_number
    INTO last_domain_block_number
    FROM staking.domain_block_histories
    WHERE domain_id = NEW.domain_id
    ORDER BY domain_block_number DESC
    LIMIT 1;

    SELECT epoch
    INTO last_domain_epoch
    FROM staking.domain_epochs
    WHERE domain_id = NEW.domain_id
    ORDER BY epoch DESC
    LIMIT 1;

    UPDATE staking.domains
    SET 
        total_withdrawals = staking.domains.total_withdrawals + NEW.amount,
        total_withdrawals_count = staking.domains.total_withdrawals_count + 1,
        updated_at = NEW.block_height
    WHERE id = NEW.domain_id;

    UPDATE staking.operators
    SET 
        total_withdrawals = staking.operators.total_withdrawals + NEW.amount,
        total_withdrawals_count = staking.operators.total_withdrawals_count + 1,
        updated_at = NEW.block_height
    WHERE id = NEW.operator_id;

    UPDATE staking.nominators
    SET
        total_withdrawal_amounts = staking.nominators.total_withdrawal_amounts + NEW.amount,
        total_storage_fee_refund = staking.nominators.total_storage_fee_refund + NEW.storage_fee,
        total_withdrawals = staking.nominators.total_withdrawals + NEW.amount,
        total_withdrawals_count = staking.nominators.total_withdrawals_count + 1,
        updated_at = NEW.block_height
    WHERE id = NEW.nominator_id;

    UPDATE staking.accounts
    SET
        total_withdrawals = staking.accounts.total_withdrawals + NEW.amount,
        total_withdrawals_count = staking.accounts.total_withdrawals_count + 1,
        updated_at = NEW.block_height
    WHERE id = NEW.account_id;

    IF withdrawal_id IS NOT NULL THEN
        UPDATE staking.withdrawals
        SET
            unlocked_amount = NEW.amount,
            unlocked_storage_fee = NEW.storage_fee,
            total_amount = NEW.amount + NEW.storage_fee,
            unlock_extrinsic_id = NEW.extrinsic_id,
            status = 'FUNDS_UNLOCKED',
            unlocked_at = NEW.block_height,
            updated_at = NEW.block_height
        WHERE id = withdrawal_id;
    ELSE
        INSERT INTO staking.withdrawals (
            id, 
            account_id, 
            domain_id, 
            operator_id, 
            nominator_id, 
            shares, 
            storage_fee_refund, 
            estimated_amount, 
            unlocked_amount, 
            unlocked_storage_fee, 
            total_amount, 
            status, 
            timestamp,
            withdraw_extrinsic_id,
            unlock_extrinsic_id,
            epoch_withdrawal_requested_at,
            domain_block_number_withdrawal_requested_at,
            created_at,
            domain_block_number_ready_at,
            unlocked_at,
            updated_at
        ) VALUES (
            NEW.extrinsic_id || '-' || NEW.account_id,      -- id
            NEW.account_id,                                 -- account_id
            NEW.domain_id,                                  -- domain_id
            NEW.operator_id,                                -- operator_id
            NEW.nominator_id,                               -- nominator_id
            0, -- To-Fix                                    -- shares
            NEW.storage_fee,                                -- storage_fee_refund
            NEW.amount + NEW.storage_fee,                   -- estimated_amount
            NEW.amount,                                     -- unlocked_amount
            NEW.storage_fee,                                -- unlocked_storage_fee
            NEW.amount + NEW.storage_fee,                   -- total_amount
            'FUNDS_UNLOCKED',                               -- status
            NEW.timestamp,                                  -- timestamp
            NEW.extrinsic_id,                               -- withdraw_extrinsic_id
            NEW.extrinsic_id,                               -- unlock_extrinsic_id
            last_domain_epoch,                              -- epoch_withdrawal_requested_at
            last_domain_block_number,                       -- domain_block_number_withdrawal_requested_at
            NEW.block_height,                               -- created_at
            last_domain_block_number,                       -- domain_block_number_ready_at
            NEW.block_height,                               -- unlocked_at
            NEW.block_height                                -- updated_at
        ) ON CONFLICT (id) DO UPDATE SET
            storage_fee_refund = EXCLUDED.storage_fee_refund,
            estimated_amount = EXCLUDED.estimated_amount,
            unlocked_amount = EXCLUDED.unlocked_amount,
            unlocked_storage_fee = EXCLUDED.unlocked_storage_fee,
            total_amount = EXCLUDED.total_amount,
            timestamp = EXCLUDED.timestamp,
            withdraw_extrinsic_id = EXCLUDED.withdraw_extrinsic_id,
            unlock_extrinsic_id = EXCLUDED.unlock_extrinsic_id,
            epoch_withdrawal_requested_at = EXCLUDED.epoch_withdrawal_requested_at,
            domain_block_number_withdrawal_requested_at = EXCLUDED.domain_block_number_withdrawal_requested_at,
            domain_block_number_ready_at = EXCLUDED.domain_block_number_ready_at,
            unlocked_at = EXCLUDED.unlocked_at,
            updated_at = EXCLUDED.updated_at;
    END IF;

    remaining_amount := NEW.amount + NEW.storage_fee;
    found_eligible_deposits := FALSE;

    OPEN deposit_cursor;
    LOOP
        FETCH deposit_cursor INTO current_deposit;
        EXIT WHEN NOT FOUND;
        
        IF (current_deposit.total_amount - current_deposit.total_withdrawn) >= remaining_amount THEN
            UPDATE staking.deposits
            SET
                total_withdrawn = total_withdrawn + remaining_amount,
                status = CASE 
                        WHEN (total_withdrawn + remaining_amount) >= total_amount THEN 'FULLY_WITHDRAWN'
                        ELSE 'PARTIALLY_WITHDRAWN'
                    END,
                updated_at = NEW.block_height
            WHERE id = current_deposit.id;
            
            remaining_amount := 0;
            found_eligible_deposits := TRUE;
            EXIT;
        ELSE
            UPDATE staking.deposits
            SET
                total_withdrawn = total_amount,
                status = 'FULLY_WITHDRAWN',
                updated_at = NEW.block_height
            WHERE id = current_deposit.id;
            
            remaining_amount := remaining_amount - (current_deposit.total_amount - current_deposit.total_withdrawn);
            found_eligible_deposits := TRUE;
        END IF;
    END LOOP;
    
    CLOSE deposit_cursor;
    
    IF remaining_amount > 0 AND found_eligible_deposits = TRUE THEN
        SELECT id INTO deposit_to_update_id
        FROM staking.deposits
        WHERE account_id = NEW.account_id AND status = 'FULLY_WITHDRAWN'
        ORDER BY created_at DESC
        LIMIT 1;
        
        IF deposit_to_update_id IS NOT NULL THEN
            UPDATE staking.deposits
            SET
                total_withdrawn = total_withdrawn + remaining_amount,
                updated_at = NEW.block_height
            WHERE id = deposit_to_update_id;
        END IF;
    ELSIF remaining_amount > 0 AND found_eligible_deposits = FALSE THEN
        RAISE NOTICE 'No active or partially withdrawn deposits found for account %. Withdrawing amount: %', 
            NEW.account_id, remaining_amount;
    END IF;

    RETURN NEW;
END;
$$;
ALTER FUNCTION staking.handle_unlocked_events() OWNER TO postgres;

CREATE TRIGGER handle_unlocked_events
AFTER INSERT ON staking.unlocked_events
FOR EACH ROW
EXECUTE FUNCTION staking.handle_unlocked_events();

CREATE OR REPLACE FUNCTION staking.handle_nominators_unlocked_events() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE staking.operators
    SET 
        status = 'NOMINATORS_UNLOCKED',
        updated_at = NEW.block_height
    WHERE id = NEW.operator_id;

    RETURN NEW;
END;
$$;
ALTER FUNCTION staking.handle_nominators_unlocked_events() OWNER TO postgres;

CREATE TRIGGER handle_nominators_unlocked_events
AFTER INSERT ON staking.nominators_unlocked_events
FOR EACH ROW
EXECUTE FUNCTION staking.handle_nominators_unlocked_events();