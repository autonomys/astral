CREATE FUNCTION public.calculate_share_price(operator_id UUID)
RETURNS NUMERIC AS $$
DECLARE
    total_stake NUMERIC;
    total_shares NUMERIC;
BEGIN
    SELECT currentTotalStake, currentTotalShares
    INTO total_stake, total_shares
    FROM operator
    WHERE id = operator_id;

    IF total_shares = 0 THEN
        RETURN 0; -- Avoid division by zero
    END IF;

    RETURN total_stake / total_shares;
END;
$$ LANGUAGE plpgsql;
