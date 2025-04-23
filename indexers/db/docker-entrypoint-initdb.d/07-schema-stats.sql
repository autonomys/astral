CREATE SCHEMA stats;
ALTER SCHEMA stats OWNER TO postgres;

CREATE TABLE stats.hourly (
    id TEXT NOT NULL,
    cumulated_history_size numeric NOT NULL,
    delta_history_size numeric NOT NULL,
    start_date timestamp without time zone NOT NULL,
    start_block numeric NOT NULL,
    end_date timestamp without time zone NOT NULL,
    end_block numeric NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
ALTER TABLE stats.hourly OWNER TO postgres;

CREATE TABLE stats.daily (
    id TEXT NOT NULL,
    cumulated_history_size numeric NOT NULL,
    delta_history_size numeric NOT NULL,
    start_date timestamp without time zone NOT NULL,
    start_block numeric NOT NULL,
    end_date timestamp without time zone NOT NULL,
    end_block numeric NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
ALTER TABLE stats.daily OWNER TO postgres;

CREATE TABLE stats.weekly (
    id TEXT NOT NULL,
    cumulated_history_size numeric NOT NULL,
    delta_history_size numeric NOT NULL,
    start_date timestamp without time zone NOT NULL,
    start_block numeric NOT NULL,
    end_date timestamp without time zone NOT NULL,
    end_block numeric NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
ALTER TABLE stats.weekly OWNER TO postgres;

CREATE TABLE stats.monthly (
    id TEXT NOT NULL,
    cumulated_history_size numeric NOT NULL,
    delta_history_size numeric NOT NULL,
    start_date timestamp without time zone NOT NULL,
    start_block numeric NOT NULL,
    end_date timestamp without time zone NOT NULL,
    end_block numeric NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
ALTER TABLE stats.monthly OWNER TO postgres;

ALTER TABLE ONLY stats.hourly
    ADD CONSTRAINT hourly_pkey PRIMARY KEY (id);

ALTER TABLE ONLY stats.daily
    ADD CONSTRAINT daily_pkey PRIMARY KEY (id);

ALTER TABLE ONLY stats.weekly
    ADD CONSTRAINT weekly_pkey PRIMARY KEY (id);

ALTER TABLE ONLY stats.monthly
    ADD CONSTRAINT monthly_pkey PRIMARY KEY (id);

CREATE INDEX "stats_hourly_end_date" ON stats.hourly USING btree ("end_date" DESC);
CREATE INDEX "stats_daily_end_date" ON stats.daily USING btree ("end_date" DESC);
CREATE INDEX "stats_weekly_end_date" ON stats.weekly USING btree ("end_date" DESC);
CREATE INDEX "stats_monthly_end_date" ON stats.monthly USING btree ("end_date" DESC);