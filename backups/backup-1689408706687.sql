--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Debian 15.3-1.pgdg110+1)
-- Dumped by pg_dump version 15.3 (Debian 15.3-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: uploads_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.uploads_status_enum AS ENUM (
    'pending',
    'using',
    'deleted'
);


ALTER TYPE public.uploads_status_enum OWNER TO postgres;

--
-- Name: users_role_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.users_role_enum AS ENUM (
    'freelance',
    'client',
    'admin'
);


ALTER TYPE public.users_role_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by uuid,
    updated_by uuid,
    deleted_at timestamp without time zone,
    deleted_by uuid,
    access_token character varying(1000) NOT NULL,
    refresh_token character varying(1000) NOT NULL,
    expired_at timestamp without time zone,
    user_id uuid
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: uploads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.uploads (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by uuid,
    updated_by uuid,
    deleted_at timestamp without time zone,
    deleted_by uuid,
    type character varying(50) NOT NULL,
    size double precision NOT NULL,
    url character varying(255) NOT NULL,
    key character varying(100) NOT NULL,
    status public.uploads_status_enum NOT NULL
);


ALTER TABLE public.uploads OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by uuid,
    updated_by uuid,
    deleted_at timestamp without time zone,
    deleted_by uuid,
    password character varying(500) NOT NULL,
    email character varying NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100),
    avatar_url character varying(255) DEFAULT 'https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA='::character varying NOT NULL,
    is_active boolean DEFAULT false NOT NULL,
    role public.users_role_enum DEFAULT 'freelance'::public.users_role_enum NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1682328667155	migration1682328667155
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, created_at, updated_at, created_by, updated_by, deleted_at, deleted_by, access_token, refresh_token, expired_at, user_id) FROM stdin;
7ae13d9b-66de-429f-8576-1f057ce38a30	2023-07-02 03:43:35.418626	2023-07-02 03:59:14.864685	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiMjU5YTA3ODgtNzQwZi00ZTgyLWFhNTgtNjY5NjMwOTk4NWZjIiwiaWF0IjoxNjg4MjY5NDE1LCJleHAiOjEwMzI4MjY5NDE1fQ.TaoNDnGDjAQKs_0AJyq8td6b8PTxa2MsgkibLwz1Ae0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODgyNjk0MTUsImV4cCI6MTAzMjgyNjk0MTV9.PLd4BQ-o-Y4FqMLLAaeWCt2ep-ayd7-x9tOs9TzIgq4	2023-07-02 10:59:14.86	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
1603aed4-c146-41af-970b-2cc674f78089	2023-07-02 03:43:59.654828	2023-07-02 03:59:14.864685	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiZTRkOTZlMjgtN2M2Zi00MGM0LTk3M2MtZTk3ZDVlMzVhMDRhIiwiaWF0IjoxNjg4MjY5NDM5LCJleHAiOjEwMzI4MjY5NDM5fQ.6nPPPaK6KCZIIayQaxUBK5D0HmK2PQdlX7u_PDhEhYQ	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODgyNjk0MzksImV4cCI6MTAzMjgyNjk0Mzl9.nvu_5dVKr5z9So3sc4lQnGMgeBZBfmgTI658rEb9agw	2023-07-02 10:59:14.86	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
3d539a44-c769-4aec-ba15-9d1b951ed3e8	2023-07-02 16:44:51.914009	2023-07-02 16:44:51.914009	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiNTdjZDQ1N2ItZDM3MS00NzAyLWEyMjUtMWM2ZTNmYWVkNTYyIiwiaWF0IjoxNjg4MzE2MjkxLCJleHAiOjEwMzI4MzE2MjkxfQ.3MMzTNeQfyUqQwMl1t6pgF22c8Oy0W54as9azx9H3n4	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODgzMTYyOTEsImV4cCI6MTAzMjgzMTYyOTF9._U87lAm6arMBECfcVKcnGGAJ89ZSlieJhdqTnDnEh3E	\N	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
c4e062a3-536d-4bed-8b11-e4117d2b1442	2023-07-03 12:14:00.842174	2023-07-03 12:14:00.842174	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiYjI4ZDgwNTktMDM5Ni00MWI2LTgxZWUtMDFhZGZjNzAxNTYyIiwiaWF0IjoxNjg4Mzg2NDQwLCJleHAiOjEwMzI4Mzg2NDQwfQ.JLZNJogRZJf5MmPYSdl9ESgrfZ54ERG46q8x5MAYuVQ	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODgzODY0NDAsImV4cCI6MTAzMjgzODY0NDB9.Va7miJYvLwi2umfEW1iUv48oaZD_FCBESulShyzKRdQ	\N	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
0f514432-e29c-40de-ab88-dfae3c7d3288	2023-07-11 13:52:21.409567	2023-07-11 13:52:21.409567	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiODdhNjJjNGMtY2E3OC00OTAwLTg2NzAtYTgwMjRjMjc5Y2Y0IiwiaWF0IjoxNjg5MDgzNTQxLCJleHAiOjEwMzI5MDgzNTQxfQ.PzpSTCUVrKglc7MXcnkUddk-tyh1YcKfGH30elTQfsY	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODkwODM1NDEsImV4cCI6MTAzMjkwODM1NDF9.B1KU2mHMALzgf1ebJ1FKZ8lsxCh6nrsfdaU1GkixcdQ	\N	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
aefffc31-f38c-4489-8144-5c3e2aa1ca77	2023-07-11 13:54:40.277074	2023-07-11 13:54:40.277074	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiYTc4OTU0Y2EtZjJiNy00YjA2LWJlYTEtZjNlYWFhODE3MzMwIiwiaWF0IjoxNjg5MDgzNjgwLCJleHAiOjEwMzI5MDgzNjgwfQ.o455Poq_4lsy3v1uw22eWpGf63RP5pFsAovH4SSFjBA	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODkwODM2ODAsImV4cCI6MTAzMjkwODM2ODB9.v-PFDIGOIbb5CqwYDqqoFNzQRVL1jLcvRVV2wW180a0	\N	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
50477e6d-261f-4e05-9e50-316e0fef3f98	2023-07-11 13:55:12.130916	2023-07-11 13:55:12.130916	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiN2ZjYjc5MDMtMDcwMi00ZDVjLThjMjQtMmJiZDNiNDI4ZDM0IiwiaWF0IjoxNjg5MDgzNzEyLCJleHAiOjEwMzI5MDgzNzEyfQ.SJRITLhUUxqV2DniijLRjKeFtuTSbitz5CYVoZQtdGk	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODkwODM3MTIsImV4cCI6MTAzMjkwODM3MTJ9.c6t3PFuAjwlbzIYoZXp9hDZadfoAQ75HdESnZMyDjzc	\N	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
e930119d-bda2-4c76-aaca-1d05c1810e1c	2023-07-11 13:55:41.801801	2023-07-11 13:55:41.801801	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiNTBiNTQwYmEtYzcxZS00MTVhLWJjZTUtZGMyYzgyYmMyMmQxIiwiaWF0IjoxNjg5MDgzNzQxLCJleHAiOjEwMzI5MDgzNzQxfQ.H50aeY4oRT95uG2JV-q6ZLoq_ocZYDM_6vg_ojmajvM	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODkwODM3NDEsImV4cCI6MTAzMjkwODM3NDF9.ZApBV9bfzp7mMfdNwCdRK1BH0zj-rPQ9r18JKkPNxkE	\N	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
22a9c40a-8919-4b95-89a0-e34beb6b29a9	2023-07-11 13:56:49.236353	2023-07-11 13:56:49.236353	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiOTM4YWE5N2QtYjEwMC00NTRiLWJiNzUtNGE4ZmRkNGUyMGUzIiwiaWF0IjoxNjg5MDgzODA5LCJleHAiOjEwMzI5MDgzODA5fQ.eY6GK_o0Fv4DRNBO_12Ta7c8hmp-1GOcVSZgkZ8w57Q	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODkwODM4MDksImV4cCI6MTAzMjkwODM4MDl9.VfFuBHdhXq44VYijtdKqzUuVuCgxn7eNWzu2Dy6l8Oo	\N	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
f6b9df4b-1c65-4e12-b9bb-c9946ebfe1ea	2023-07-11 13:57:35.499632	2023-07-11 13:57:35.499632	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiNTIyMzRhMjQtNDI3Yi00ZmY3LTgyZDAtYzJlOTAxZTc5Mzk2IiwiaWF0IjoxNjg5MDgzODU1LCJleHAiOjEwMzI5MDgzODU1fQ.nRjrKfviFXLGmqqrrPeXFTY6_3J0Iprjex5z8HBnL28	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODkwODM4NTUsImV4cCI6MTAzMjkwODM4NTV9.RwHwhremiG4Oe0p6j_TJihGWVPxr0dWioZI6c7wMdIw	\N	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
dbc375b6-ad7f-453e-9bc8-3fd7ab38ff38	2023-07-11 13:57:36.682477	2023-07-11 13:57:36.682477	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiMTM0YzQ4YjYtNGUzZS00ZDA2LWIzZmUtNzA2MDdjYmNiMzBlIiwiaWF0IjoxNjg5MDgzODU2LCJleHAiOjEwMzI5MDgzODU2fQ.Ee9hE8Qwu2-emGi_jvQ0wi0St5te1-pCO10fTJXL-m8	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODkwODM4NTYsImV4cCI6MTAzMjkwODM4NTZ9.hzBAzu2kGjzYHp4OyJ9sG-evCrf_9RyD5fEjnAltPBE	\N	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
5a10889c-a771-4c15-ae01-fede10e94e11	2023-07-11 13:57:55.895963	2023-07-11 13:57:55.895963	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiOTdhMzQ3OGItYWRlMy00MmFhLWEwMDAtNGRkMTA4YWJmYjMzIiwiaWF0IjoxNjg5MDgzODc1LCJleHAiOjEwMzI5MDgzODc1fQ.rCDfZrx2vBkCMLjNVYIisvrvzMbO0xQLNSJtUtwJNwI	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODkwODM4NzUsImV4cCI6MTAzMjkwODM4NzV9.-gH-Q1SP3W98K6wVRqbGo8Jb2gwLZYg_EOQzvNH5KIY	\N	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
e5889fea-9c7b-4b44-a45b-d17377bd95d7	2023-07-11 13:58:34.360278	2023-07-11 13:58:34.360278	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiZDI3ZTdkNWYtY2ZiZC00ZThlLWFkODYtZjYwMzljMWQwYjdhIiwiaWF0IjoxNjg5MDgzOTE0LCJleHAiOjEwMzI5MDgzOTE0fQ.zzYOpimBwFbupBacie8wMYZyz3MzPyeKun3FVEE56sU	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODkwODM5MTQsImV4cCI6MTAzMjkwODM5MTR9.4zocZHc6omRqThJgwTJTolXtXfz9B0Ji3VXBMlgSQ4A	\N	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
85cd3df8-9005-421e-ba35-8d667170302f	2023-07-11 13:58:35.157847	2023-07-11 13:58:35.157847	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiYzliOTIxYWMtNDIyZi00OTRkLTk5NjktNTdlZThjNGM2OTE3IiwiaWF0IjoxNjg5MDgzOTE1LCJleHAiOjEwMzI5MDgzOTE1fQ.kEza9zsMG3ez3ws9tDY40LVv_Qda9N174k6fHX2IkhU	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODkwODM5MTUsImV4cCI6MTAzMjkwODM5MTV9.eRXeo_e5MZEUzLk-lAG1gp-3pfZgBGpMRwEhOZlRit0	\N	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
1696f5bc-efd8-4947-a277-06c1911c7f20	2023-07-11 13:58:35.526589	2023-07-11 13:58:35.526589	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiZTVlN2VjNWMtZTdlMy00OGJiLTlhNjAtYTU3NjU5NjAyNjQ4IiwiaWF0IjoxNjg5MDgzOTE1LCJleHAiOjEwMzI5MDgzOTE1fQ.4ctaFVFB1UVTYvgM4ZzKUXMh2ylPweqjsQXTOxfDL9s	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODkwODM5MTUsImV4cCI6MTAzMjkwODM5MTV9.eRXeo_e5MZEUzLk-lAG1gp-3pfZgBGpMRwEhOZlRit0	\N	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
f2638982-cec7-4264-b084-ac25fb8dc93d	2023-07-11 13:58:35.698148	2023-07-11 13:58:35.698148	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiMTEzNGIwMjQtMGVkYS00NDUyLTg0N2EtMTY4NWM0MmU3NzA5IiwiaWF0IjoxNjg5MDgzOTE1LCJleHAiOjEwMzI5MDgzOTE1fQ.q_FMwG4RLsawHChCw9OgwIlG4-54zWYLf6bDiEytUmU	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODkwODM5MTUsImV4cCI6MTAzMjkwODM5MTV9.eRXeo_e5MZEUzLk-lAG1gp-3pfZgBGpMRwEhOZlRit0	\N	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
8b874214-a784-4100-9171-1bf3adb44ebf	2023-07-11 13:58:35.869316	2023-07-11 13:58:35.869316	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiNGMzZjE2OGQtNjRmNi00OGNkLTljNDgtOTI2ZWJjZjgzM2E2IiwiaWF0IjoxNjg5MDgzOTE1LCJleHAiOjEwMzI5MDgzOTE1fQ.GUcIJ0QNu684-0gQUURG4HmpbnXLPAZJ9hO47dOxMQU	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODkwODM5MTUsImV4cCI6MTAzMjkwODM5MTV9.eRXeo_e5MZEUzLk-lAG1gp-3pfZgBGpMRwEhOZlRit0	\N	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
98a3f282-914e-4759-a402-4c26ff64aeed	2023-07-11 13:59:25.473925	2023-07-11 13:59:25.473925	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiNmViNDhkMzUtOWEyYy00MzU1LTgyMGQtYTAxZjk3ZGQwNWRjIiwiaWF0IjoxNjg5MDgzOTY1LCJleHAiOjEwMzI5MDgzOTY1fQ.1CLLqjY5iRAQtpaIVIe52YL393kFi0VcMZC03IhvYZo	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODkwODM5NjUsImV4cCI6MTAzMjkwODM5NjV9.tFWFRR2GaFouvSxTkLcA_B3evQxSvntedkRNeUK4ZCA	\N	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
1653ea54-1074-400c-b3a0-133d95c90917	2023-07-11 13:59:49.96923	2023-07-11 13:59:49.96923	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiNThmMzVjMWQtY2JlMS00ZmU0LThhODYtZGMyYjdlZmU5OWNkIiwiaWF0IjoxNjg5MDgzOTg5LCJleHAiOjEwMzI5MDgzOTg5fQ.twTD1unFYJ6yHG52ju-FuFxo8wjttWNqisVnTU_ieT0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODkwODM5ODksImV4cCI6MTAzMjkwODM5ODl9.JEci2ktAMOMismk5_32nA8lDRjIQeHeOvsuDuUKZ-n0	\N	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
6bc1ba11-e67c-4069-9c5b-d34bd46b18ff	2023-07-11 13:59:50.85237	2023-07-11 13:59:50.85237	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiNThmNTEwYzEtOWQ5Yy00NDY3LWE5MzYtYjM5YTY5NmU0MzZlIiwiaWF0IjoxNjg5MDgzOTkwLCJleHAiOjEwMzI5MDgzOTkwfQ.o04Q2MJHB94Kc7FTIrIgKHhKrdxRjqKD3w2s8cFldDI	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODkwODM5OTAsImV4cCI6MTAzMjkwODM5OTB9.4nmz1siUScucCT4_3g-iphEokZe8bFbBOs5bMl4bnTs	\N	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
6a385808-67d9-449b-8926-574c779ed7d5	2023-07-11 14:00:03.389882	2023-07-11 14:00:03.389882	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiODcxZjNjYzUtN2YxZS00YmRjLThkZmUtMGFlYzViNzQzMjE1IiwiaWF0IjoxNjg5MDg0MDAzLCJleHAiOjEwMzI5MDg0MDAzfQ.0JkU0YOFoRUDC3Tevgi_aXahKclJPZlqg0HyVZykigA	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODkwODQwMDMsImV4cCI6MTAzMjkwODQwMDN9.kiZljm03wQka95qeqRov-OI3qUiMhcGyJth5MvLlLBE	\N	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
11b8bb1b-e987-47e0-926b-96ed52564241	2023-07-11 14:00:26.767809	2023-07-11 14:00:26.767809	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiZTliMmU5MzYtYWExMC00NGY4LWIxYmEtNDdiN2UyZWRmYzY0IiwiaWF0IjoxNjg5MDg0MDI2LCJleHAiOjEwMzI5MDg0MDI2fQ.JQEdRAtVVohJkYrpeR8d6rb991QmjJ5QK8kyfvNzUw0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODkwODQwMjYsImV4cCI6MTAzMjkwODQwMjZ9.5ZLLEeA1_XTtIyEkVG9RKO6TChCzcsaDko3bFIq9fqY	\N	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
2b16666c-29c3-415e-a280-a7359decb243	2023-07-11 14:00:47.288906	2023-07-11 14:00:47.288906	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiNzk4MTFkOWMtMWNjMy00YzMyLWFlODAtNDlmN2NkODViNTFiIiwiaWF0IjoxNjg5MDg0MDQ3LCJleHAiOjEwMzI5MDg0MDQ3fQ.Ppe-bt3xtzyslWMJPIhKBdBRFOMNEuXVoyYIypjU-qc	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODkwODQwNDcsImV4cCI6MTAzMjkwODQwNDd9.G7P2FUFqmIeo1A1bv7zvmRQg5p8EnmLW1h3nfknGVRc	\N	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
d1833893-4263-423f-8177-956a254ab2a2	2023-07-11 14:01:11.20485	2023-07-11 14:01:11.20485	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiN2UwMzIwNmItMjAxZi00NmI5LWI5NWUtYzNjNDRjNzI4NTdjIiwiaWF0IjoxNjg5MDg0MDcxLCJleHAiOjEwMzI5MDg0MDcxfQ.yJ1eOw1wzE3VsURbGNm9l4-Vqabu7A_s0ezc1hv2e3Q	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODkwODQwNzEsImV4cCI6MTAzMjkwODQwNzF9.RNfMT78lpQWdQerADYEJ9J370J_erbB1J5rvXKvGqsw	\N	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
8c38bef0-3602-4bc6-9a48-8428dcfe7c40	2023-07-11 14:01:32.742959	2023-07-11 14:01:32.742959	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiM2JkNjlmMmMtMDM4NC00MjA0LWI0YTctZmMyYjdlYWI0ZDYzIiwiaWF0IjoxNjg5MDg0MDkyLCJleHAiOjEwMzI5MDg0MDkyfQ.PUhsJwtczUW_cQyhzw6duJfxm6d_uYYjKpP6IpVpNeI	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODkwODQwOTIsImV4cCI6MTAzMjkwODQwOTJ9.imHZev4k_zf0wcWh9XHFSFH0E24malfFENU8wJAcSFM	\N	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
ebbd9b4f-58b0-41c9-8902-05738e6215cb	2023-07-14 09:09:01.41108	2023-07-14 09:09:01.41108	\N	\N	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJjYWNoZUlkIjoiMTY3OWYyODMtNDJkZC00MGVmLWE5OWUtY2JkOGIzOGM5YzNjIiwiaWF0IjoxNjg5MzI1NzQxLCJleHAiOjEwMzI5MzI1NzQxfQ.DnUvQNFma9RTRzFSBTeQUJWv7svLyVUggGuMTX_qOp0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiZDgwM2IzZS1lZDgzLTRkNjktOWIwMC1mY2M1ZjJiYWM1NTEiLCJpYXQiOjE2ODkzMjU3NDEsImV4cCI6MTAzMjkzMjU3NDF9.YE7OwCuSJAY9xSzmqrESDohX7EHz24BekKEXn_Zl8Og	\N	bd803b3e-ed83-4d69-9b00-fcc5f2bac551
\.


--
-- Data for Name: uploads; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.uploads (id, created_at, updated_at, created_by, updated_by, deleted_at, deleted_by, type, size, url, key, status) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, created_at, updated_at, created_by, updated_by, deleted_at, deleted_by, password, email, first_name, last_name, avatar_url, is_active, role) FROM stdin;
bd803b3e-ed83-4d69-9b00-fcc5f2bac551	2023-06-28 16:23:54.24254	2023-06-28 16:23:54.24254	\N	\N	\N	\N	ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413	abc@gmail.com	John	Wick	https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA=	f	freelance
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, true);


--
-- Name: sessions PK_3238ef96f18b355b671619111bc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: uploads PK_d1781d1eedd7459314f60f39bd3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uploads
    ADD CONSTRAINT "PK_d1781d1eedd7459314f60f39bd3" PRIMARY KEY (id);


--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- Name: sessions FK_085d540d9f418cfbdc7bd55bb19; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

