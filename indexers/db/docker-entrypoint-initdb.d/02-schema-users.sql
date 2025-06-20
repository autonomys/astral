CREATE SCHEMA users;
ALTER SCHEMA users OWNER TO postgres;

CREATE TABLE users.profiles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    name_is_public boolean NOT NULL,
    bio text NOT NULL,
    bio_is_public boolean NOT NULL,
    avatar_url text NOT NULL,
    banner_url text NOT NULL,
    email text NOT NULL,
    email_is_verified boolean NOT NULL,
    email_is_public boolean NOT NULL,
    website text NOT NULL,
    website_is_verified boolean NOT NULL,
    website_is_public boolean NOT NULL,
    discord text NOT NULL,
    discord_is_verified boolean NOT NULL,
    discord_is_public boolean NOT NULL,
    github text NOT NULL,
    github_is_verified boolean NOT NULL,
    github_is_public boolean NOT NULL,
    twitter text NOT NULL,
    twitter_is_verified boolean NOT NULL,
    twitter_is_public boolean NOT NULL,
    proof_message text NOT NULL,
    proof_signature text NOT NULL,
    api_total_requests numeric NOT NULL,
    api_daily_requests_limit numeric NOT NULL,
    api_monthly_requests_limit numeric NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone
);
ALTER TABLE users.profiles OWNER TO postgres;
ALTER TABLE ONLY users.profiles ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);
ALTER TABLE users.profiles ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE users.profiles ALTER COLUMN updated_at SET DEFAULT now();

CREATE TABLE users.api_keys (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    profile_id uuid NOT NULL,
    description text NOT NULL,
    key uuid DEFAULT gen_random_uuid() NOT NULL,
    total_requests numeric NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);
ALTER TABLE users.api_keys OWNER TO postgres;
ALTER TABLE ONLY users.api_keys ADD CONSTRAINT api_keys_pkey PRIMARY KEY (id);
ALTER TABLE ONLY users.api_keys ADD CONSTRAINT api_keys_key_unique UNIQUE (key);

CREATE TABLE users.api_keys_daily_usage (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    api_key_id uuid NOT NULL,
    total_requests numeric NOT NULL,
    date DATE DEFAULT CURRENT_DATE NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);

ALTER TABLE users.api_keys_daily_usage OWNER TO postgres;
ALTER TABLE ONLY users.api_keys_daily_usage ADD CONSTRAINT api_keys_daily_usage_pkey PRIMARY KEY (id);

CREATE TABLE users.api_keys_monthly_usage (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    api_key_id uuid NOT NULL,
    total_requests numeric NOT NULL,
    date DATE DEFAULT date_trunc('month', CURRENT_DATE) NOT NULL CHECK (date_trunc('month', date) = date),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);
ALTER TABLE users.api_keys_monthly_usage OWNER TO postgres;
ALTER TABLE ONLY users.api_keys_monthly_usage ADD CONSTRAINT api_keys_monthly_usage_pkey PRIMARY KEY (id);

CREATE TABLE users.api_daily_usage (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    profile_id uuid NOT NULL,
    total_requests numeric NOT NULL,
    date DATE DEFAULT CURRENT_DATE NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);

ALTER TABLE users.api_daily_usage OWNER TO postgres;
ALTER TABLE ONLY users.api_daily_usage ADD CONSTRAINT api_daily_usage_pkey PRIMARY KEY (id);

CREATE TABLE users.api_monthly_usage (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    profile_id uuid NOT NULL,
    total_requests numeric NOT NULL,
    date DATE DEFAULT date_trunc('month', CURRENT_DATE) NOT NULL CHECK (date_trunc('month', date) = date),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);
ALTER TABLE users.api_monthly_usage OWNER TO postgres;
ALTER TABLE ONLY users.api_monthly_usage ADD CONSTRAINT api_monthly_usage_pkey PRIMARY KEY (id);

CREATE TABLE users.wallets (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    profile_id uuid NOT NULL,
    address TEXT NOT NULL,
    type TEXT NOT NULL,
    is_public boolean NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);
ALTER TABLE users.wallets OWNER TO postgres;
ALTER TABLE ONLY users.wallets ADD CONSTRAINT wallets_pkey PRIMARY KEY (id);
ALTER TABLE ONLY users.wallets ADD CONSTRAINT address_key UNIQUE (address);

CREATE TABLE users.tags (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    profile_id uuid NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    value TEXT NOT NULL,
    is_public boolean NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);
ALTER TABLE users.tags OWNER TO postgres;
ALTER TABLE ONLY users.tags ADD CONSTRAINT tags_pkey PRIMARY KEY (id);

CREATE TABLE users.session (
    id TEXT NOT NULL,
    dids TEXT[] NOT NULL,
    data jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE users.session OWNER TO postgres;
ALTER TABLE ONLY users.session ADD CONSTRAINT session_pkey PRIMARY KEY (id);