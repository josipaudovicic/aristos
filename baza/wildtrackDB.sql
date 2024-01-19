--
-- PostgreSQL database dump
--

-- Dumped from database version 15.5
-- Dumped by pg_dump version 15.2

-- Started on 2024-01-19 17:50:43

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
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: wildtrack_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO wildtrack_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16679)
-- Name: actions; Type: TABLE; Schema: public; Owner: wildtrack_user
--

CREATE TABLE public.actions (
    action_id bigint NOT NULL,
    action_name character varying(40) NOT NULL,
    user_name character varying(20) NOT NULL,
    started boolean NOT NULL,
    action_active boolean NOT NULL,
    station_id bigint,
    end_time timestamp(6) without time zone,
    start_time timestamp(6) without time zone,
    sent_request boolean DEFAULT false
);


ALTER TABLE public.actions OWNER TO wildtrack_user;

--
-- TOC entry 229 (class 1259 OID 17147)
-- Name: actions_action_id_seq; Type: SEQUENCE; Schema: public; Owner: wildtrack_user
--

CREATE SEQUENCE public.actions_action_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.actions_action_id_seq OWNER TO wildtrack_user;

--
-- TOC entry 3307 (class 0 OID 0)
-- Dependencies: 229
-- Name: actions_action_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wildtrack_user
--

ALTER SEQUENCE public.actions_action_id_seq OWNED BY public.actions.action_id;


--
-- TOC entry 217 (class 1259 OID 16620)
-- Name: animal; Type: TABLE; Schema: public; Owner: wildtrack_user
--

CREATE TABLE public.animal (
    animal_id bigint NOT NULL,
    animal_name character varying(20) NOT NULL,
    latin_name character varying(30) NOT NULL,
    description character varying(200) NOT NULL
);


ALTER TABLE public.animal OWNER TO wildtrack_user;

--
-- TOC entry 218 (class 1259 OID 16627)
-- Name: animal_position; Type: TABLE; Schema: public; Owner: wildtrack_user
--

CREATE TABLE public.animal_position (
    time_stamp timestamp without time zone NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    animal_id bigint NOT NULL
);


ALTER TABLE public.animal_position OWNER TO wildtrack_user;

--
-- TOC entry 228 (class 1259 OID 17080)
-- Name: belongs_to_action; Type: TABLE; Schema: public; Owner: wildtrack_user
--

CREATE TABLE public.belongs_to_action (
    user_name character varying(255) NOT NULL,
    action_id bigint NOT NULL,
    vehicle_id bigint
);


ALTER TABLE public.belongs_to_action OWNER TO wildtrack_user;

--
-- TOC entry 220 (class 1259 OID 16649)
-- Name: belongs_to_station; Type: TABLE; Schema: public; Owner: wildtrack_user
--

CREATE TABLE public.belongs_to_station (
    user_name character varying(20) NOT NULL,
    station_id bigint NOT NULL
);


ALTER TABLE public.belongs_to_station OWNER TO wildtrack_user;

--
-- TOC entry 224 (class 1259 OID 16749)
-- Name: confirmation_token; Type: TABLE; Schema: public; Owner: wildtrack_user
--

CREATE TABLE public.confirmation_token (
    id bigint NOT NULL,
    confirmed_at timestamp(6) without time zone,
    created_at timestamp(6) without time zone NOT NULL,
    expires_at timestamp(6) without time zone NOT NULL,
    token character varying(255) NOT NULL,
    username character varying(255) NOT NULL
);


ALTER TABLE public.confirmation_token OWNER TO wildtrack_user;

--
-- TOC entry 221 (class 1259 OID 16664)
-- Name: qualified_for; Type: TABLE; Schema: public; Owner: wildtrack_user
--

CREATE TABLE public.qualified_for (
    user_name character varying(20) NOT NULL,
    vehicle_id bigint NOT NULL
);


ALTER TABLE public.qualified_for OWNER TO wildtrack_user;

--
-- TOC entry 214 (class 1259 OID 16601)
-- Name: roles; Type: TABLE; Schema: public; Owner: wildtrack_user
--

CREATE TABLE public.roles (
    id bigint NOT NULL,
    role_name character varying(20) NOT NULL
);


ALTER TABLE public.roles OWNER TO wildtrack_user;

--
-- TOC entry 223 (class 1259 OID 16709)
-- Name: searcher_position; Type: TABLE; Schema: public; Owner: wildtrack_user
--

CREATE TABLE public.searcher_position (
    time_stamp timestamp without time zone NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    user_name character varying(20) NOT NULL,
    action_id bigint NOT NULL
);


ALTER TABLE public.searcher_position OWNER TO wildtrack_user;

--
-- TOC entry 216 (class 1259 OID 16615)
-- Name: station; Type: TABLE; Schema: public; Owner: wildtrack_user
--

CREATE TABLE public.station (
    station_id bigint NOT NULL,
    station_name character varying(30) NOT NULL
);


ALTER TABLE public.station OWNER TO wildtrack_user;

--
-- TOC entry 231 (class 1259 OID 17240)
-- Name: task; Type: TABLE; Schema: public; Owner: wildtrack_user
--

CREATE TABLE public.task (
    task_id bigint NOT NULL,
    done boolean NOT NULL,
    task_text character varying(255),
    action_id bigint,
    animal_id bigint,
    user_name character varying(255),
    vehicle_id bigint,
    end_latitude double precision,
    end_longitude double precision,
    start_latitude double precision,
    start_longitude double precision
);


ALTER TABLE public.task OWNER TO wildtrack_user;

--
-- TOC entry 233 (class 1259 OID 17249)
-- Name: task_comment; Type: TABLE; Schema: public; Owner: wildtrack_user
--

CREATE TABLE public.task_comment (
    task_comment_id bigint NOT NULL,
    comment character varying(255),
    task_id bigint,
    user_name character varying(255)
);


ALTER TABLE public.task_comment OWNER TO wildtrack_user;

--
-- TOC entry 232 (class 1259 OID 17248)
-- Name: task_comment_task_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: wildtrack_user
--

CREATE SEQUENCE public.task_comment_task_comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.task_comment_task_comment_id_seq OWNER TO wildtrack_user;

--
-- TOC entry 3308 (class 0 OID 0)
-- Dependencies: 232
-- Name: task_comment_task_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wildtrack_user
--

ALTER SEQUENCE public.task_comment_task_comment_id_seq OWNED BY public.task_comment.task_comment_id;


--
-- TOC entry 230 (class 1259 OID 17239)
-- Name: task_task_id_seq; Type: SEQUENCE; Schema: public; Owner: wildtrack_user
--

CREATE SEQUENCE public.task_task_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.task_task_id_seq OWNER TO wildtrack_user;

--
-- TOC entry 3309 (class 0 OID 0)
-- Dependencies: 230
-- Name: task_task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wildtrack_user
--

ALTER SEQUENCE public.task_task_id_seq OWNED BY public.task.task_id;


--
-- TOC entry 225 (class 1259 OID 16772)
-- Name: token_sequence; Type: SEQUENCE; Schema: public; Owner: wildtrack_user
--

CREATE SEQUENCE public.token_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.token_sequence OWNER TO wildtrack_user;

--
-- TOC entry 237 (class 1259 OID 17305)
-- Name: tracker_comments; Type: TABLE; Schema: public; Owner: wildtrack_user
--

CREATE TABLE public.tracker_comments (
    id bigint NOT NULL,
    comment character varying(255),
    action_id bigint,
    user_name character varying(255)
);


ALTER TABLE public.tracker_comments OWNER TO wildtrack_user;

--
-- TOC entry 236 (class 1259 OID 17304)
-- Name: tracker_comments_id_seq; Type: SEQUENCE; Schema: public; Owner: wildtrack_user
--

CREATE SEQUENCE public.tracker_comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tracker_comments_id_seq OWNER TO wildtrack_user;

--
-- TOC entry 3310 (class 0 OID 0)
-- Dependencies: 236
-- Name: tracker_comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wildtrack_user
--

ALTER SEQUENCE public.tracker_comments_id_seq OWNED BY public.tracker_comments.id;


--
-- TOC entry 227 (class 1259 OID 17055)
-- Name: user_comment; Type: TABLE; Schema: public; Owner: wildtrack_user
--

CREATE TABLE public.user_comment (
    comment_id bigint NOT NULL,
    sent_comment character varying(255),
    action_id bigint,
    animal_id bigint,
    user_name character varying(255)
);


ALTER TABLE public.user_comment OWNER TO wildtrack_user;

--
-- TOC entry 226 (class 1259 OID 17054)
-- Name: user_comment_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: wildtrack_user
--

CREATE SEQUENCE public.user_comment_comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_comment_comment_id_seq OWNER TO wildtrack_user;

--
-- TOC entry 3311 (class 0 OID 0)
-- Dependencies: 226
-- Name: user_comment_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wildtrack_user
--

ALTER SEQUENCE public.user_comment_comment_id_seq OWNED BY public.user_comment.comment_id;


--
-- TOC entry 219 (class 1259 OID 16637)
-- Name: users; Type: TABLE; Schema: public; Owner: wildtrack_user
--

CREATE TABLE public.users (
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    photo character varying(255) NOT NULL,
    role_id bigint NOT NULL,
    admin_check boolean NOT NULL,
    email_check boolean NOT NULL
);


ALTER TABLE public.users OWNER TO wildtrack_user;

--
-- TOC entry 215 (class 1259 OID 16608)
-- Name: vehicle; Type: TABLE; Schema: public; Owner: wildtrack_user
--

CREATE TABLE public.vehicle (
    vehicle_id bigint NOT NULL,
    vehicle_name character varying(20) NOT NULL
);


ALTER TABLE public.vehicle OWNER TO wildtrack_user;

--
-- TOC entry 235 (class 1259 OID 17288)
-- Name: vehicles_for_actions; Type: TABLE; Schema: public; Owner: wildtrack_user
--

CREATE TABLE public.vehicles_for_actions (
    vehicle_for_action_id bigint NOT NULL,
    action_id bigint,
    vehicle_id bigint
);


ALTER TABLE public.vehicles_for_actions OWNER TO wildtrack_user;

--
-- TOC entry 234 (class 1259 OID 17287)
-- Name: vehicles_for_actions_vehicle_for_action_id_seq; Type: SEQUENCE; Schema: public; Owner: wildtrack_user
--

CREATE SEQUENCE public.vehicles_for_actions_vehicle_for_action_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vehicles_for_actions_vehicle_for_action_id_seq OWNER TO wildtrack_user;

--
-- TOC entry 3312 (class 0 OID 0)
-- Dependencies: 234
-- Name: vehicles_for_actions_vehicle_for_action_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wildtrack_user
--

ALTER SEQUENCE public.vehicles_for_actions_vehicle_for_action_id_seq OWNED BY public.vehicles_for_actions.vehicle_for_action_id;


--
-- TOC entry 3062 (class 2604 OID 17148)
-- Name: actions action_id; Type: DEFAULT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.actions ALTER COLUMN action_id SET DEFAULT nextval('public.actions_action_id_seq'::regclass);


--
-- TOC entry 3065 (class 2604 OID 17243)
-- Name: task task_id; Type: DEFAULT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.task ALTER COLUMN task_id SET DEFAULT nextval('public.task_task_id_seq'::regclass);


--
-- TOC entry 3066 (class 2604 OID 17252)
-- Name: task_comment task_comment_id; Type: DEFAULT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.task_comment ALTER COLUMN task_comment_id SET DEFAULT nextval('public.task_comment_task_comment_id_seq'::regclass);


--
-- TOC entry 3068 (class 2604 OID 17308)
-- Name: tracker_comments id; Type: DEFAULT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.tracker_comments ALTER COLUMN id SET DEFAULT nextval('public.tracker_comments_id_seq'::regclass);


--
-- TOC entry 3064 (class 2604 OID 17058)
-- Name: user_comment comment_id; Type: DEFAULT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.user_comment ALTER COLUMN comment_id SET DEFAULT nextval('public.user_comment_comment_id_seq'::regclass);


--
-- TOC entry 3067 (class 2604 OID 17291)
-- Name: vehicles_for_actions vehicle_for_action_id; Type: DEFAULT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.vehicles_for_actions ALTER COLUMN vehicle_for_action_id SET DEFAULT nextval('public.vehicles_for_actions_vehicle_for_action_id_seq'::regclass);


--
-- TOC entry 3286 (class 0 OID 16679)
-- Dependencies: 222
-- Data for Name: actions; Type: TABLE DATA; Schema: public; Owner: wildtrack_user
--

COPY public.actions (action_id, action_name, user_name, started, action_active, station_id, end_time, start_time, sent_request) FROM stdin;
41	akcija za probu	ju54164	t	f	4	2024-01-19 11:42:55.127	2024-01-19 11:36:00.52	t
4	test neaktivna akcija	ju54164	t	f	5	\N	\N	f
32	franjo	ju54164	t	f	4	2024-01-16 19:50:48.466	2024-01-16 19:44:14.361	f
33	test zahtjeva vozila	ju54164	t	f	8	2024-01-17 10:04:59.35	2024-01-17 08:53:28.565	f
34	test zahtjeva vozila 2	ju54164	t	t	8	\N	2024-01-17 10:05:15.683	f
35	test zahtjeva vozila 3	ju54164	t	t	8	\N	2024-01-17 10:24:38.465	f
36	test zahtjeva 4	ju54164	t	t	8	\N	2024-01-17 13:44:05.706	f
2	istrazivacka	admin	t	t	4	\N	2024-01-01 02:07:21.824	f
1	akcija	ju54164	t	t	4	\N	2024-01-01 02:07:21.824	t
38	jumanjiAkcija	istrazivacXmouse	t	t	5	\N	2024-01-18 23:56:58.014	t
39	genericAkcija	ju54164	t	f	6	2024-01-19 01:03:07.184	2024-01-19 00:27:38.434	t
40	genericAkcija2	ju54164	t	t	6	\N	2024-01-19 01:06:43.083	t
\.


--
-- TOC entry 3281 (class 0 OID 16620)
-- Dependencies: 217
-- Data for Name: animal; Type: TABLE DATA; Schema: public; Owner: wildtrack_user
--

COPY public.animal (animal_id, animal_name, latin_name, description) FROM stdin;
1	Smedi medvjed	Ursus arctos	Divlji
6	Kuna bjelica	Martes foina	Pitoma
2	Smedi medvjed	Ursus arctos	Pitom
3	Smedi medvjed	Ursus arctos	Divlji
4	Kuna bjelica	Martes foina	Divlja
5	Kuna bjelica	Martes foina	Zadnji put viđena 1.1.2024.
7	Sivi vuk	Canis lupus	Zadnji put viđen blizu potoka
8	Sivi vuk	Canis lupus	Ne prilaziti
9	Sivi sokol	Falco peregrinus	Zadnji put primijećen kod Medvednice 1.1.2024.
10	Sivi sokol	Falco peregrinus	Neugodan
\.


--
-- TOC entry 3282 (class 0 OID 16627)
-- Dependencies: 218
-- Data for Name: animal_position; Type: TABLE DATA; Schema: public; Owner: wildtrack_user
--

COPY public.animal_position (time_stamp, latitude, longitude, animal_id) FROM stdin;
2024-01-09 02:07:21.824	45.123	16.123	1
2024-01-09 02:07:21.824	45.742	15.585	2
2024-01-09 02:07:21.824	44.663	17.753	3
2024-01-09 02:07:21.824	44.949	15.844	4
2024-01-09 02:07:21.824	45.444	18.126	5
2024-01-09 02:07:21.824	45.656	17.672	6
2024-01-09 02:07:21.824	45.271	18.58	7
2024-01-16 00:38:43.657	45.18368799552623	16.20466661245671	1
2024-01-16 00:38:44.099	45.83567002569523	15.647254786457557	2
2024-01-09 02:07:21.824	44.156	16.652	8
2024-01-09 02:07:21.824	46.127	16.954	9
2024-01-09 02:07:21.824	46.156	15.142	10
2024-01-16 00:38:44.394	44.59178251950539	17.72016156270961	3
2024-01-16 00:38:44.735	44.93056675915268	15.832686167506461	4
2024-01-16 00:38:45.075	45.51002828469677	18.122328392604985	5
2024-01-16 00:38:45.402	45.6286657388671	17.656914412028755	6
2024-01-16 00:38:45.741	45.31782025355928	18.67556574850189	7
2024-01-16 00:38:46.128	44.218767699730215	16.662236614389673	8
2024-01-16 00:38:46.584	46.15326948190568	16.961038510682084	9
2024-01-16 00:38:46.944	46.19996239680399	15.102330839152653	10
2024-01-16 00:38:57.496	45.14398305467581	16.181981604946618	1
2024-01-16 00:38:58.021	45.815208582324814	15.626660348299401	2
2024-01-16 00:38:58.617	44.58763062251662	17.730074235471367	3
2024-01-16 00:38:58.993	44.96177252953566	15.742647497657387	4
2024-01-16 00:38:59.441	45.60414282550334	18.09397618202517	5
2024-01-16 00:38:59.781	45.58424480950384	17.728590266574916	6
2024-01-16 00:39:00.107	45.224399978477	18.57891419922945	7
2024-01-16 00:39:00.429	44.219992389318406	16.72156478154163	8
2024-01-16 00:39:00.744	46.221111287305504	17.053650094461474	9
2024-01-16 00:39:01.081	46.22859689187357	15.121767105709308	10
2024-01-16 00:39:11.54	45.11814552947821	16.193765802508555	1
2024-01-16 00:39:11.849	45.83198165919435	15.642973323259865	2
2024-01-16 00:39:12.308	44.591989052171016	17.784115401522186	3
2024-01-16 00:39:12.664	44.96651624302818	15.765131732009936	4
2024-01-16 00:39:13.024	45.56091455287466	18.062705020217976	5
2024-01-16 00:39:13.366	45.57344421004268	17.659584270379423	6
2024-01-16 00:39:13.734	45.15992092298665	18.522430004832263	7
2024-01-16 00:39:14.043	44.29472643282005	16.819958672820988	8
2024-01-16 00:39:14.381	46.16516874476328	17.030298525940843	9
2024-01-16 00:39:14.79	46.2948734914032	15.203371971514645	10
2024-01-16 00:39:25.176	45.211283652480134	16.115663785268946	1
2024-01-16 00:39:25.524	45.85179841181998	15.617936297699346	2
2024-01-16 00:39:25.866	44.632358954156636	17.7836037863572	3
2024-01-16 00:39:26.18	44.946011744403684	15.742846460712363	4
2024-01-16 00:39:26.523	45.4931594814221	18.016532089589713	5
2024-01-16 00:39:26.871	45.486304514696954	17.646079463162483	6
2024-01-16 00:39:27.271	45.25733462980249	18.424738710861217	7
2024-01-16 00:39:27.895	44.21485027705426	16.738369055772488	8
2024-01-16 00:39:28.793	46.11693774334571	17.10067331097438	9
2024-01-16 00:39:29.343	46.320403290632576	15.262760973148161	10
2024-01-16 00:39:39.779	45.17478683419617	16.149340718885	1
2024-01-16 00:39:40.11	45.868455999566024	15.680874987481213	2
2024-01-16 00:39:40.44	44.58032014923918	17.73884995538392	3
2024-01-16 00:39:40.772	45.03537108942713	15.644103767649455	4
2024-01-16 00:39:41.145	45.451016190704344	18.085100470001763	5
2024-01-16 00:39:41.491	45.43643902739377	17.685125079153117	6
2024-01-16 00:39:41.862	45.34284224238483	18.515337016821285	7
2024-01-16 00:39:42.312	44.16917547578324	16.64332802019703	8
2024-01-16 00:39:42.72	46.16087203193432	17.199780737195898	9
2024-01-16 00:39:43.108	46.36479522637219	15.168441241551646	10
2024-01-16 00:39:53.572	45.18971853340615	16.168490000473618	1
2024-01-16 00:39:53.959	45.77255359117193	15.754541570559164	2
2024-01-16 00:39:54.325	44.5325381491285	17.776349367145887	3
2024-01-16 00:39:54.772	44.95980863656674	15.6065393610891	4
2024-01-16 00:39:55.209	45.416046201370165	18.150167191411803	5
2024-01-16 00:39:55.576	45.53438072506926	17.611208626280707	6
2024-01-16 00:39:55.908	45.264866693733	18.57147062926163	7
2024-01-16 00:39:56.238	44.232591052383015	16.720335120255733	8
2024-01-16 00:39:56.582	46.20730839544294	17.173406240003196	9
2024-01-16 00:39:56.996	46.28739951586038	15.106160893932534	10
2024-01-16 00:40:07.542	45.128931187152325	16.17507982251484	1
2024-01-16 00:40:08.409	45.79107639976621	15.710748747725471	2
2024-01-16 00:40:09.213	44.57604476470577	17.77844638572066	3
2024-01-16 00:40:09.56	44.897166422480865	15.682429044359338	4
2024-01-16 00:40:09.9	45.4511885328522	18.117887824307566	5
2024-01-16 00:40:10.259	45.48637497265258	17.561348051135063	6
2024-01-16 00:40:10.589	45.219751492626145	18.615913689123744	7
2024-01-16 00:40:10.949	44.19655673668616	16.74046510628778	8
2024-01-16 00:40:11.272	46.19665389847419	17.216242527503958	9
2024-01-16 00:40:11.604	46.22896887264337	15.066074743987537	10
2024-01-16 00:40:22.017	45.041203958392536	16.13431193665365	1
2024-01-16 00:40:22.38	45.857250827269574	15.701796068718977	2
2024-01-16 00:40:22.769	44.54437085788924	17.683282870556035	3
2024-01-16 00:40:23.109	44.953433347167994	15.66527870674736	4
2024-01-16 00:40:23.497	45.46982493801118	18.021751011452697	5
2024-01-16 00:40:23.855	45.44476433387176	17.479947442210605	6
2024-01-16 00:40:24.257	45.285341751872565	18.688591229968786	7
2024-01-16 00:40:24.645	44.12629577416981	16.840407804609647	8
2024-01-16 00:40:24.963	46.274607586797885	17.258862240877498	9
2024-01-16 00:40:25.295	46.299946297001085	15.059017129672501	10
2024-01-16 00:40:35.704	44.98560314278091	16.05479296959069	1
2024-01-16 00:40:36.083	45.893257503079454	15.623793087250723	2
2024-01-16 00:40:36.435	44.56925684299793	17.676355244302886	3
2024-01-16 00:40:36.792	44.98530072989274	15.71636014613073	4
2024-01-16 00:40:37.304	45.53377678847349	18.066475415466922	5
2024-01-16 00:40:37.789	45.41593800100493	17.53645665363836	6
2024-01-16 00:40:38.243	45.33177726181314	18.73434049768001	7
2024-01-16 00:40:38.887	44.19495220040328	16.879433983145812	8
2024-01-16 00:40:39.295	46.28367590480002	17.189148382492238	9
2024-01-16 00:40:39.622	46.379794362617865	15.083100351909447	10
2024-01-16 00:40:50.046	44.95652875567785	16.014175165843497	1
2024-01-16 00:40:50.439	45.818721996639134	15.644206097194592	2
2024-01-16 00:40:50.793	44.58656827470847	17.683407474868282	3
2024-01-16 00:40:51.118	44.89820762425311	15.71644865834874	4
2024-01-16 00:40:51.46	45.54897326150673	17.98376803000953	5
2024-01-16 00:40:51.843	45.42761619668019	17.5909176129122	6
2024-01-16 00:40:52.252	45.3540015752753	18.778482881761605	7
2024-01-16 00:40:52.625	44.236457822450895	16.92831840399574	8
2024-01-16 00:40:52.961	46.328204718705514	17.158589067763444	9
2024-01-16 00:40:53.312	46.31224725098537	14.998517220584304	10
2024-01-16 00:41:03.734	44.884587031225266	16.03543655737225	1
2024-01-16 00:41:04.412	45.79338508485327	15.6672509014521	2
2024-01-16 00:41:05.029	44.48806488646148	17.729867171165324	3
2024-01-16 00:41:05.383	44.89546934519444	15.772448719646302	4
2024-01-16 00:41:05.714	45.55003985854668	17.926212588156275	5
2024-01-16 00:41:06.095	45.413314853370906	17.558757957595443	6
2024-01-16 00:41:06.453	45.385305452365394	18.83803557914244	7
2024-01-16 00:41:06.805	44.26465082057064	16.874532979695548	8
2024-01-16 00:41:07.287	46.33995941126395	17.13610291814849	9
2024-01-16 00:41:08.002	46.40565353444567	14.90127550293437	10
2024-01-16 00:41:18.487	44.91014670397316	16.110603203588532	1
2024-01-16 00:41:19.011	45.70350866792829	15.642953776173927	2
2024-01-16 00:41:19.396	44.46742795585562	17.65756536984482	3
2024-01-16 00:41:19.716	44.900966450495204	15.812364147331502	4
2024-01-16 00:41:20.033	45.60120564653479	17.97950201465204	5
2024-01-16 00:41:20.419	45.401430948000225	17.63583927322434	6
2024-01-16 00:41:20.74	45.39401395112107	18.74947885741603	7
2024-01-16 00:41:21.075	44.25506531727732	16.884058486076537	8
2024-01-16 00:41:21.392	46.34879903972753	17.114838725955654	9
2024-01-16 00:41:21.736	46.36708682496943	14.982298791566574	10
2024-01-16 00:41:32.17	44.951125459628315	16.08052196206331	1
2024-01-16 00:41:32.513	45.677902546559885	15.671555624922824	2
2024-01-16 00:41:32.826	44.501339640107766	17.63326665122699	3
2024-01-16 00:41:33.154	44.83973983310594	15.863302721428656	4
2024-01-16 00:41:33.531	45.696158906559816	18.075077477021082	5
2024-01-16 00:41:33.861	45.479991883306276	17.56265378568466	6
2024-01-16 00:41:34.208	45.48688481400483	18.79714096799071	7
2024-01-16 00:41:34.548	44.256225775237596	16.889454273733094	8
2024-01-16 00:41:34.871	46.30774899737716	17.089318886413064	9
2024-01-16 00:41:35.273	46.3376309675887	14.90500375819418	10
2024-01-16 00:42:01.701	45.088645760809904	16.273945295243337	1
2024-01-16 00:42:02.271	45.93143326032699	15.752805182747181	2
2024-01-16 00:42:02.724	44.52911141517432	17.60205266589173	3
2024-01-16 00:42:03.242	44.909106495686004	15.836653326147935	4
2024-01-16 00:42:03.668	45.449345348303915	18.13598231632446	5
2024-01-16 00:42:04.105	45.50321794198572	17.640711981148243	6
2024-01-16 00:42:04.552	45.26929326024425	18.633221719590523	7
2024-01-16 00:42:04.957	44.28231112756078	16.93545638894298	8
2024-01-16 00:42:05.374	46.13871391765009	16.889715562881726	9
2024-01-16 00:42:05.813	46.30603866401418	15.10806113077988	10
2024-01-16 00:42:12.696	45.15949159724705	16.26157302977098	1
2024-01-16 00:42:13.204	46.01755740859589	15.75208712688688	2
2024-01-16 00:42:13.528	44.451659121665976	17.53631604778385	3
2024-01-16 00:42:13.868	44.895202120185296	15.93500525438268	4
2024-01-16 00:42:14.207	45.5174092415943	18.16964290503423	5
2024-01-16 00:42:14.531	45.59963764937282	17.669843158999875	6
2024-01-16 00:42:14.863	45.34908715779878	18.56344867240242	7
2024-01-16 00:42:15.206	44.36250043908024	17.030958224626563	8
2024-01-16 00:42:15.552	46.119166104157124	16.804891987757937	9
2024-01-16 00:42:15.909	46.37474515847694	15.062941629928833	10
2024-01-16 00:51:30.773	45.21945937642849	16.2288801163502	1
2024-01-16 00:51:31.119	46.044961923626126	15.816024355061268	2
2024-01-16 00:51:31.416	44.4552584512771	17.520447760618662	3
2024-01-16 00:51:31.703	44.83471593479103	15.881118959578947	4
2024-01-16 00:51:32.038	45.46396209178556	18.09455060841999	5
2024-01-16 00:51:32.352	45.62252592486472	17.66348367973529	6
2024-01-16 00:51:32.693	45.28018328538184	18.597641802281913	7
2024-01-16 00:51:33.006	44.42716438078825	17.036248021075615	8
2024-01-16 00:51:33.327	46.172701308746106	16.86832168275793	9
2024-01-16 00:51:33.644	46.438413624266246	15.114546007794912	10
2024-01-16 00:52:06.734	45.09381667985609	16.23227494846023	1
2024-01-16 00:52:07.178	45.712749180390524	15.583911035596829	2
2024-01-16 00:52:07.799	44.510085670141585	17.80963000386288	3
2024-01-16 00:52:08.566	44.903109643129355	15.650521673038803	4
2024-01-16 00:52:09.078	45.46752282133724	17.985459637159043	5
2024-01-16 00:52:09.483	45.49981782463178	17.73624650632583	6
2024-01-16 00:52:09.9	45.524886546868316	18.667177527060954	7
2024-01-16 00:52:10.287	44.24423269494345	16.742727323277016	8
2024-01-16 00:52:10.733	46.20076839438502	17.101458519630068	9
2024-01-16 00:52:11.107	46.22186269660283	15.067307082911869	10
2024-01-16 00:54:37.558	45.00895848108434	16.26059272668309	1
2024-01-16 00:54:38.028	45.697742695506506	15.514705198215546	2
2024-01-16 00:54:38.794	44.60067760906052	17.85221749504515	3
2024-01-16 00:54:39.202	45.00124905673505	15.583337350181678	4
2024-01-16 00:54:39.659	45.535278275671054	17.888362763509306	5
2024-01-16 00:54:39.999	45.56304225419788	17.770319509971703	6
2024-01-16 00:54:40.347	45.585643029372605	18.591041441519675	7
2024-01-16 00:54:40.7	44.32070343530406	16.779050056759335	8
2024-01-16 00:54:41.102	46.21032514106536	17.054856926000234	9
2024-01-16 00:54:41.5	46.17668399825552	15.1244531740654	10
2024-01-16 00:55:19.807	45.02151700006177	16.106380433471774	1
2024-01-16 00:55:20.275	46.01135407402697	15.761772549027091	2
2024-01-16 00:55:20.745	44.678149931026766	17.89138986864653	3
2024-01-16 00:55:21.151	44.949829946645075	15.663296981766248	4
2024-01-16 00:55:21.52	45.60885160805052	18.120788917470573	5
2024-01-16 00:55:21.894	45.46380531243528	17.544837927601513	6
2024-01-16 00:55:22.299	45.28815416823506	18.54475468607095	7
2024-01-16 00:55:22.68	44.252193164982536	16.791652968893622	8
2024-01-16 00:55:23.111	46.074976791210084	17.078971125732966	9
2024-01-16 00:55:23.486	46.407053836676766	15.05477013210202	10
2024-01-16 00:58:33.959	44.94076097208335	16.139085091801405	1
2024-01-16 00:58:34.377	45.95877670609427	15.753505503959516	2
2024-01-16 00:58:34.685	44.777706223525556	17.849885937838035	3
2024-01-16 00:58:34.977	44.91461433063515	15.72277181970422	4
2024-01-16 00:58:35.276	45.51229970599594	18.13063408594172	5
2024-01-16 00:58:35.593	45.480713861392246	17.581182242301335	6
2024-01-16 00:58:35.928	45.20357994742623	18.595678145687206	7
2024-01-16 00:58:36.243	44.252553790194526	16.805341773568973	8
2024-01-16 00:58:36.573	46.14395576371552	17.128880866522408	9
2024-01-16 00:58:36.931	46.48379158259331	15.029333705429835	10
2024-01-16 02:13:03.838	45.10497177203577	16.28297063368813	1
2024-01-16 02:13:04.998	45.947204296351465	15.579272813870167	2
2024-01-16 02:13:05.668	44.75707179019485	17.681239906720652	3
2024-01-16 02:13:06.348	44.82485480312619	15.770206656054874	4
2024-01-16 02:13:07.008	45.44401938909701	18.155764415813703	5
2024-01-16 02:13:07.731	45.61858346622439	17.641006430449515	6
2024-01-16 02:13:08.678	45.28021349783555	18.703237469716644	7
2024-01-16 02:13:09.578	44.13852235266952	16.66608104304795	8
2024-01-16 02:13:10.398	46.13723318453413	17.099950193870395	9
2024-01-16 02:13:11.128	46.46103206626817	15.095073776817106	10
2024-01-16 02:23:11.977	45.088557157426834	16.0629830158025	1
2024-01-16 02:23:12.647	45.883295683770065	15.551788721536631	2
2024-01-16 02:23:13.414	44.4448804892692	17.65857613453926	3
2024-01-16 02:23:14.191	44.90216913860554	15.818347866522023	4
2024-01-16 02:23:14.947	45.42912055462677	18.04451482735237	5
2024-01-16 02:23:15.697	45.423111488705366	17.588289435465715	6
2024-01-16 02:23:16.461	45.29733721735957	18.845853504570876	7
2024-01-16 02:23:17.147	44.219504424349154	17.047053305750303	8
2024-01-16 02:23:17.898	46.13318787260142	17.0141122579195	9
2024-01-16 02:23:18.846	46.266639548989716	15.167177910807087	10
\.


--
-- TOC entry 3292 (class 0 OID 17080)
-- Dependencies: 228
-- Data for Name: belongs_to_action; Type: TABLE DATA; Schema: public; Owner: wildtrack_user
--

COPY public.belongs_to_action (user_name, action_id, vehicle_id) FROM stdin;
faranjo	1	5
tragac7	1	3
tragac5	34	1
tragac2	34	1
tragac6	36	4
tragac9	34	1
tragac3	1	2
tragac1	38	6
josipa	38	6
tragac10	39	2
tragac10	40	2
Tragac2022	41	1
\.


--
-- TOC entry 3284 (class 0 OID 16649)
-- Dependencies: 220
-- Data for Name: belongs_to_station; Type: TABLE DATA; Schema: public; Owner: wildtrack_user
--

COPY public.belongs_to_station (user_name, station_id) FROM stdin;
Kekw postaja	8
voditelj	4
tragac2	8
tragac6	8
faranjo	4
tragac7	4
tragac1	5
tragac4	5
tragac5	8
tragac9	8
tragac3	4
tragac8	5
josipa	5
generic	6
tragac10	6
tragac11	6
tragac12	4
waiting	2
Tragac2022	4
voditeljBeth	7
testTragac	2
\.


--
-- TOC entry 3288 (class 0 OID 16749)
-- Dependencies: 224
-- Data for Name: confirmation_token; Type: TABLE DATA; Schema: public; Owner: wildtrack_user
--

COPY public.confirmation_token (id, confirmed_at, created_at, expires_at, token, username) FROM stdin;
102	\N	2023-12-21 16:01:19.275958	2023-12-21 16:16:19.275958	136e9eb6-b58f-4fb6-9339-dc1a2fba69e1	faranjo
104	\N	2023-12-21 17:46:38.901273	2023-12-21 18:01:38.901273	c9654733-417d-4ce5-be2c-74beacc9230a	ju54164
108	\N	2024-01-12 20:56:21.389989	2024-01-12 21:11:21.389989	74c86ec6-3146-4180-a0d9-54eca360eb5f	Kekw postaja
110	\N	2024-01-14 15:32:01.26544	2024-01-14 15:47:01.26544	0cc8587e-21c8-42d8-8fab-67518bc154a8	voditelj
112	\N	2024-01-17 15:22:46.394374	2024-01-17 15:37:46.394374	78c2fe02-6127-4827-9a5e-98af5c2e4a8d	Kekw2 postaja
113	\N	2024-01-18 23:49:55.986748	2024-01-19 00:04:55.986748	7910df92-ae30-435a-8395-5698dc770271	josipa
114	\N	2024-01-18 23:52:09.942699	2024-01-19 00:07:09.942699	3573bde7-0d79-43f9-9553-d79eb201612f	istrazivacXmouse
115	\N	2024-01-19 00:03:34.302527	2024-01-19 00:18:34.302527	3085901f-44d2-4fa7-ac71-61fe4eb82559	voditeljBeth
116	\N	2024-01-19 00:17:38.971814	2024-01-19 00:32:38.971814	f9f6a1b0-28bc-49ff-b282-9f07744dba4b	generic
117	\N	2024-01-19 09:31:10.842883	2024-01-19 09:46:10.842883	659a1e68-adb3-4a6b-8f21-a5802ab9438b	Tragac2022
\.


--
-- TOC entry 3285 (class 0 OID 16664)
-- Dependencies: 221
-- Data for Name: qualified_for; Type: TABLE DATA; Schema: public; Owner: wildtrack_user
--

COPY public.qualified_for (user_name, vehicle_id) FROM stdin;
tragac6	6
tragac6	4
faranjo	3
faranjo	5
faranjo	4
tragac7	3
tragac7	1
tragac3	2
tragac3	3
tragac9	1
tragac9	3
tragac2	1
tragac2	2
Kekw2 postaja	1
Kekw2 postaja	5
tragac3	5
tragac1	4
tragac1	1
tragac1	2
tragac4	5
tragac8	3
josipa	6
josipa	4
josipa	2
josipa	3
josipa	5
josipa	1
tragac10	2
tragac10	4
tragac10	6
tragac10	1
tragac10	5
tragac10	3
tragac11	1
tragac12	4
tragac12	3
tragac12	1
Tragac2022	1
Tragac2022	3
Tragac2022	5
tragac5	6
tragac5	4
tragac5	2
tragac5	3
tragac5	5
tragac5	1
testTragac	1
testTragac	5
\.


--
-- TOC entry 3278 (class 0 OID 16601)
-- Dependencies: 214
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: wildtrack_user
--

COPY public.roles (id, role_name) FROM stdin;
1	Admin
2	Voditelj postaje
3	Istraživač
4	Tragač
\.


--
-- TOC entry 3287 (class 0 OID 16709)
-- Dependencies: 223
-- Data for Name: searcher_position; Type: TABLE DATA; Schema: public; Owner: wildtrack_user
--

COPY public.searcher_position (time_stamp, latitude, longitude, user_name, action_id) FROM stdin;
2024-01-09 02:07:21.824	45.163	16.175	faranjo	1
2024-01-09 03:05:36.36	46.756	16.957	faranjo	1
2024-01-10 02:07:21.824	45.931	16.411	tragac7	1
2024-01-09 02:15:21.824	45.617	16.521	faranjo	1
2024-01-19 00:08:11.372	45.475	16.767	faranjo	1
2024-01-19 00:08:21.253	45.475	16.767	faranjo	1
2024-01-19 00:12:16.027	45.77	15.948	faranjo	1
2024-01-19 00:12:22.548	45.77	15.948	faranjo	1
2024-01-19 00:22:51.633	45.77	15.948	faranjo	1
2024-01-19 00:35:58.864	45.8	15.974	faranjo	1
2024-01-19 00:36:03.804	45.8	15.974	faranjo	1
2024-01-19 00:39:03.531	45.8	15.974	faranjo	1
2024-01-19 01:10:22.46	45.8	15.974	faranjo	1
2024-01-19 01:12:00.127	45.8	15.974	faranjo	1
2024-01-19 08:42:57.686	45.8	15.971	faranjo	1
2024-01-19 08:50:00.888	45.8	15.971	faranjo	1
2024-01-19 09:56:00.429	45.806	15.968	faranjo	1
2024-01-19 11:39:26.487	45.8	15.971	faranjo	1
2024-01-19 16:15:26.494	45.803	16.017	faranjo	1
2024-01-19 16:17:19.091	45.803	16.017	faranjo	1
2024-01-19 16:17:19.087	45.803	16.017	faranjo	1
2024-01-19 16:18:03.362	45.803	16.017	faranjo	1
2024-01-19 16:18:23.417	45.803	16.017	faranjo	1
2024-01-19 16:18:37.085	45.803	16.017	faranjo	1
2024-01-19 16:18:51.397	45.803	16.017	faranjo	1
2024-01-19 16:20:43.378	45.803	16.017	faranjo	1
2024-01-19 16:20:52.702	45.803	16.017	faranjo	1
2024-01-19 16:21:43.093	45.803	16.017	faranjo	1
2024-01-19 16:22:07.258	45.803	16.017	faranjo	1
2024-01-19 16:22:18.704	45.803	16.017	faranjo	1
2024-01-19 16:22:43.096	45.803	16.017	faranjo	1
2024-01-19 16:22:52.585	45.803	16.017	faranjo	1
2024-01-19 16:22:57.591	45.803	16.017	faranjo	1
2024-01-19 16:24:06.971	45.803	16.017	faranjo	1
2024-01-19 16:25:42.884	45.803	16.017	faranjo	1
2024-01-19 16:25:57.373	45.803	16.017	faranjo	1
2024-01-19 16:26:06.68	45.803	16.017	faranjo	1
2024-01-19 16:26:23.3	45.803	16.017	faranjo	1
2024-01-19 16:29:40.948	45.803	16.017	faranjo	1
2024-01-19 16:29:40.974	45.803	16.017	faranjo	1
2024-01-19 16:30:17.485	45.803	16.017	faranjo	1
2024-01-19 16:30:57.682	45.803	16.017	faranjo	1
2024-01-19 16:31:04.065	45.803	16.017	faranjo	1
2024-01-19 16:31:59.21	45.803	16.017	faranjo	1
2024-01-19 16:48:42.873	45.835	16.074	tragac3	1
2024-01-19 16:48:45.819	45.835	16.074	tragac3	1
2024-01-19 16:49:09.98	45.835	16.074	tragac7	1
2024-01-19 16:49:12.832	45.835	16.074	tragac7	1
2024-01-19 16:49:29.785	45.835	16.074	tragac3	1
2024-01-19 16:49:29.866	45.803	16.017	faranjo	1
2024-01-19 16:50:09.074	45.803	16.017	faranjo	1
2024-01-19 16:51:39.87	45.803	16.017	faranjo	1
2024-01-19 16:52:07.839	45.803	16.017	faranjo	1
2024-01-19 16:52:10.145	45.803	16.017	faranjo	1
2024-01-19 16:52:30.075	45.835	16.074	tragac3	1
2024-01-19 16:53:29.484	45.803	16.017	tragac3	1
2024-01-19 16:57:34.913	45.803	16.017	faranjo	1
\.


--
-- TOC entry 3280 (class 0 OID 16615)
-- Dependencies: 216
-- Data for Name: station; Type: TABLE DATA; Schema: public; Owner: wildtrack_user
--

COPY public.station (station_id, station_name) FROM stdin;
1	Risnjak
2	Medvednica
3	Papuk
4	Velebit
5	Vransko jezero
6	Lastovo
7	Brijuni
8	Biokovo
9	Lonjsko polje
10	Mljet
\.


--
-- TOC entry 3295 (class 0 OID 17240)
-- Dependencies: 231
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: wildtrack_user
--

COPY public.task (task_id, done, task_text, action_id, animal_id, user_name, vehicle_id, end_latitude, end_longitude, start_latitude, start_longitude) FROM stdin;
12	f	postavi kameru	1	7	faranjo	5	45.223	16.348	45.252	16.359
4	t	prati zivotinju	1	6	faranjo	5	45.175	16.265	45.373	16.266
14	t	potrazi medvjeda	1	1	faranjo	5	44.684	15.414	45.675	16.952
13	t	postavi mu oznaku na nogu	1	10	tragac7	3	44.661	15.113	44.533	15.184
5	t	vozi za zivotinjom	1	5	tragac7	3	45.793	16.305	45.759	16.157
15	f	provjeri gnijezdo	1	9	tragac7	3	46.448	16.058	46.008	16.047
16	f	postavi kameru kraj brloga	38	3	tragac1	6	45.332	14.443	44.517	17.469
17	f	slikaj tragove šapa	38	5	josipa	6	43.188	17.219	45.497	18.098
18	f	vidi je li ozlijeđen	38	7	tragac1	6	44.722	14.341	45.358	18.955
19	t	novi zadatak	1	6	faranjo	5	45.424	17.742	45.42	17.463
\.


--
-- TOC entry 3297 (class 0 OID 17249)
-- Dependencies: 233
-- Data for Name: task_comment; Type: TABLE DATA; Schema: public; Owner: wildtrack_user
--

COPY public.task_comment (task_comment_id, comment, task_id, user_name) FROM stdin;
1	operi ju	4	ju54164
2	pazi opasna je	5	ju54164
3	ne priblizavaj se	5	ju54164
19	a	5	ju54164
20	a	4	ju54164
21	ajme meni	4	ju54164
22	volim progi	4	ju54164
23	najdrazi predmet	4	ju54164
24	novi komentar	12	ju54164
25	šepa 16.1.	12	ju54164
26	novi komentar	12	ju54164
\.


--
-- TOC entry 3301 (class 0 OID 17305)
-- Dependencies: 237
-- Data for Name: tracker_comments; Type: TABLE DATA; Schema: public; Owner: wildtrack_user
--

COPY public.tracker_comments (id, comment, action_id, user_name) FROM stdin;
1	pazi se medvjeda	1	faranjo
2	ok budem	1	tragac7
18	AAAAAAAAAAAAAAAAAAA NAPADA ME	1	tragac7
19	jesam ti rekao da se pazis	1	faranjo
20	sretno stari	1	faranjo
21	polako decki	1	tragac3
\.


--
-- TOC entry 3291 (class 0 OID 17055)
-- Dependencies: 227
-- Data for Name: user_comment; Type: TABLE DATA; Schema: public; Owner: wildtrack_user
--

COPY public.user_comment (comment_id, sent_comment, action_id, animal_id, user_name) FROM stdin;
22	da	\N	5	ju54164
25	uhvatio pticu	\N	7	tragac7
42	ima mladunce 14.1.	\N	7	ju54164
43	slatka	\N	4	josipa
44	novi komentar	\N	7	faranjo
\.


--
-- TOC entry 3283 (class 0 OID 16637)
-- Dependencies: 219
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: wildtrack_user
--

COPY public.users (username, email, password, name, surname, photo, role_id, admin_check, email_check) FROM stdin;
istrazivacXmouse	istrazivac23@gmail.com	lozinka1	Franklin	Finbar	/images/istrazivacXmouse	3	t	t
generic	b447zbub@gmail.com	password	generic	generic	/images/generic	2	t	t
tragac11	tragac11@gmail.com	lozinka1	Janko	Polić Kamov	/nophoto	4	t	t
Tragac2022	domagoj.juric20@gmail.com	lozinka1	Ivo	Andrić	/images/Tragac2022	4	t	f
waiting	waiting@gmail.com	password	waiting	waiting	/nophoto	2	t	t
tragac3	tragac3@gmail.com	lozinka1	Ante	Budimir	/nophoto	4	t	t
Kekw2 postaja	info@rcjcroatia2023.eu	~iwFG4jenSfT4~8	Kekwa	Kekcina235	/images/Kekw2 postaja	3	t	t
faranjo	vukovicfranjo50@gmail.com	lozinka1	fraanc	Vuković	/images/faranjo	4	t	t
tragac1	tragac1@gmail.com	lozinka1	Marko	Livaja	/nophoto	4	t	t
tragac2	tragac2@gmail.com	lozinka1	Bruno	Petković	/nophoto	4	t	t
tragac4	tragac4@gmail.com	lozinka1	Petar	Musa	/nophoto	4	t	t
tragac5	tragac5@gmail.com	lozinka1	Davor	Šuker	/nophoto	4	t	t
tragac6	tragac6@gmail.com	lozinka1	Andrej	Kramarić	/nophoto	4	t	t
tragac7	tragac7@gmail.com	lozinka1	Mario	Mandžukić	/nophoto	4	t	t
tragac8	tragac8@gmail.com	lozinka1	Marko	Pjaca	/nophoto	4	t	t
tragac9	tragac9@gmail.com	lozinka1	Mislav	Oršić	/nophoto	4	t	t
admin	admin@gmail.com	password	admin	admin	/nophoto	1	t	t
ju54164	josipaudovicic2011@gmail.com	lozinka1	josipa	Udovičić	/images/ju54164	3	t	t
voditelj	voditelj@gmail.com	lozinka1	voditelj	voditelj	/images/voditelj	2	t	t
Kekw postaja	markoml1a@mail.inet.hr	&bQqmPT5iD^en7T	Marko	Pongracz	/images/Kekw postaja	2	t	t
voditeljBeth	istrazivac23@gmail.com	novalozinka1	Bethany	Walker	/images/voditeljBeth	2	t	t
josipa	ju54164@fer.hr	lozinka1	Josipa 	ajka	/images/josipa	4	t	t
tragac12	tragac12@gmail.com	lozinka2	Miroslav	Krleža	/nophoto	4	t	t
tragac10	tragac15@gmail.hr	lozinka1	Marko	Marulić	/nophoto	4	t	t
testTragac	testTragac@gmail.com	testLozinka	test	tragac	/nophoto	4	t	t
\.


--
-- TOC entry 3279 (class 0 OID 16608)
-- Dependencies: 215
-- Data for Name: vehicle; Type: TABLE DATA; Schema: public; Owner: wildtrack_user
--

COPY public.vehicle (vehicle_id, vehicle_name) FROM stdin;
1	foot
3	car
6	helicopter
5	drone
2	motor
4	ship
\.


--
-- TOC entry 3299 (class 0 OID 17288)
-- Dependencies: 235
-- Data for Name: vehicles_for_actions; Type: TABLE DATA; Schema: public; Owner: wildtrack_user
--

COPY public.vehicles_for_actions (vehicle_for_action_id, action_id, vehicle_id) FROM stdin;
4	1	1
5	1	3
6	1	6
7	34	1
8	34	5
9	35	1
10	35	3
11	35	6
12	36	1
13	36	4
14	1	3
15	1	2
16	1	5
23	38	6
24	39	2
25	40	6
26	40	3
27	40	5
28	40	2
29	40	4
30	41	1
31	41	3
32	41	6
33	41	2
\.


--
-- TOC entry 3313 (class 0 OID 0)
-- Dependencies: 229
-- Name: actions_action_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wildtrack_user
--

SELECT pg_catalog.setval('public.actions_action_id_seq', 41, true);


--
-- TOC entry 3314 (class 0 OID 0)
-- Dependencies: 232
-- Name: task_comment_task_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wildtrack_user
--

SELECT pg_catalog.setval('public.task_comment_task_comment_id_seq', 26, true);


--
-- TOC entry 3315 (class 0 OID 0)
-- Dependencies: 230
-- Name: task_task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wildtrack_user
--

SELECT pg_catalog.setval('public.task_task_id_seq', 19, true);


--
-- TOC entry 3316 (class 0 OID 0)
-- Dependencies: 225
-- Name: token_sequence; Type: SEQUENCE SET; Schema: public; Owner: wildtrack_user
--

SELECT pg_catalog.setval('public.token_sequence', 117, true);


--
-- TOC entry 3317 (class 0 OID 0)
-- Dependencies: 236
-- Name: tracker_comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wildtrack_user
--

SELECT pg_catalog.setval('public.tracker_comments_id_seq', 21, true);


--
-- TOC entry 3318 (class 0 OID 0)
-- Dependencies: 226
-- Name: user_comment_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wildtrack_user
--

SELECT pg_catalog.setval('public.user_comment_comment_id_seq', 44, true);


--
-- TOC entry 3319 (class 0 OID 0)
-- Dependencies: 234
-- Name: vehicles_for_actions_vehicle_for_action_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wildtrack_user
--

SELECT pg_catalog.setval('public.vehicles_for_actions_vehicle_for_action_id_seq', 33, true);


--
-- TOC entry 3090 (class 2606 OID 16853)
-- Name: actions actions_pkey; Type: CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.actions
    ADD CONSTRAINT actions_pkey PRIMARY KEY (action_id);


--
-- TOC entry 3080 (class 2606 OID 16898)
-- Name: animal animal_pkey; Type: CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.animal
    ADD CONSTRAINT animal_pkey PRIMARY KEY (animal_id);


--
-- TOC entry 3082 (class 2606 OID 16969)
-- Name: animal_position animal_position_pkey; Type: CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.animal_position
    ADD CONSTRAINT animal_position_pkey PRIMARY KEY (time_stamp, animal_id);


--
-- TOC entry 3100 (class 2606 OID 17084)
-- Name: belongs_to_action belongs_to_action_pkey; Type: CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.belongs_to_action
    ADD CONSTRAINT belongs_to_action_pkey PRIMARY KEY (action_id, user_name);


--
-- TOC entry 3086 (class 2606 OID 16830)
-- Name: belongs_to_station belongs_to_station_pkey; Type: CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.belongs_to_station
    ADD CONSTRAINT belongs_to_station_pkey PRIMARY KEY (user_name, station_id);


--
-- TOC entry 3096 (class 2606 OID 16755)
-- Name: confirmation_token confirmation_token_pkey; Type: CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.confirmation_token
    ADD CONSTRAINT confirmation_token_pkey PRIMARY KEY (id);


--
-- TOC entry 3088 (class 2606 OID 16919)
-- Name: qualified_for qualified_for_pkey; Type: CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.qualified_for
    ADD CONSTRAINT qualified_for_pkey PRIMARY KEY (user_name, vehicle_id);


--
-- TOC entry 3070 (class 2606 OID 16779)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 3072 (class 2606 OID 16607)
-- Name: roles roles_role_name_key; Type: CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key UNIQUE (role_name);


--
-- TOC entry 3094 (class 2606 OID 16949)
-- Name: searcher_position searcher_position_pkey; Type: CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.searcher_position
    ADD CONSTRAINT searcher_position_pkey PRIMARY KEY (time_stamp, user_name, action_id);


--
-- TOC entry 3078 (class 2606 OID 16880)
-- Name: station station_pkey; Type: CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.station
    ADD CONSTRAINT station_pkey PRIMARY KEY (station_id);


--
-- TOC entry 3104 (class 2606 OID 17254)
-- Name: task_comment task_comment_pkey; Type: CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.task_comment
    ADD CONSTRAINT task_comment_pkey PRIMARY KEY (task_comment_id);


--
-- TOC entry 3102 (class 2606 OID 17247)
-- Name: task task_pkey; Type: CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (task_id);


--
-- TOC entry 3108 (class 2606 OID 17312)
-- Name: tracker_comments tracker_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.tracker_comments
    ADD CONSTRAINT tracker_comments_pkey PRIMARY KEY (id);


--
-- TOC entry 3092 (class 2606 OID 17079)
-- Name: actions unique_name; Type: CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.actions
    ADD CONSTRAINT unique_name UNIQUE (action_name);


--
-- TOC entry 3098 (class 2606 OID 17062)
-- Name: user_comment user_comment_pkey; Type: CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.user_comment
    ADD CONSTRAINT user_comment_pkey PRIMARY KEY (comment_id);


--
-- TOC entry 3084 (class 2606 OID 16791)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (username);


--
-- TOC entry 3074 (class 2606 OID 17013)
-- Name: vehicle vehicle_pkey; Type: CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.vehicle
    ADD CONSTRAINT vehicle_pkey PRIMARY KEY (vehicle_id);


--
-- TOC entry 3076 (class 2606 OID 16614)
-- Name: vehicle vehicle_vehicle_name_key; Type: CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.vehicle
    ADD CONSTRAINT vehicle_vehicle_name_key UNIQUE (vehicle_name);


--
-- TOC entry 3106 (class 2606 OID 17293)
-- Name: vehicles_for_actions vehicles_for_actions_pkey; Type: CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.vehicles_for_actions
    ADD CONSTRAINT vehicles_for_actions_pkey PRIMARY KEY (vehicle_for_action_id);


--
-- TOC entry 3115 (class 2606 OID 16802)
-- Name: actions actions_user_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.actions
    ADD CONSTRAINT actions_user_name_fkey FOREIGN KEY (user_name) REFERENCES public.users(username);


--
-- TOC entry 3109 (class 2606 OID 16970)
-- Name: animal_position animal_position_animal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.animal_position
    ADD CONSTRAINT animal_position_animal_id_fkey FOREIGN KEY (animal_id) REFERENCES public.animal(animal_id);


--
-- TOC entry 3111 (class 2606 OID 16881)
-- Name: belongs_to_station belongs_to_station_station_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.belongs_to_station
    ADD CONSTRAINT belongs_to_station_station_id_fkey FOREIGN KEY (station_id) REFERENCES public.station(station_id);


--
-- TOC entry 3112 (class 2606 OID 16792)
-- Name: belongs_to_station belongs_to_station_user_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.belongs_to_station
    ADD CONSTRAINT belongs_to_station_user_name_fkey FOREIGN KEY (user_name) REFERENCES public.users(username);


--
-- TOC entry 3120 (class 2606 OID 17068)
-- Name: user_comment fk1gtkc7te5jq7ejvau3q5e0f85; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.user_comment
    ADD CONSTRAINT fk1gtkc7te5jq7ejvau3q5e0f85 FOREIGN KEY (animal_id) REFERENCES public.animal(animal_id);


--
-- TOC entry 3121 (class 2606 OID 17073)
-- Name: user_comment fk1pyrmyc06lwtse2jeb8tdgxp4; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.user_comment
    ADD CONSTRAINT fk1pyrmyc06lwtse2jeb8tdgxp4 FOREIGN KEY (user_name) REFERENCES public.users(username);


--
-- TOC entry 3132 (class 2606 OID 17294)
-- Name: vehicles_for_actions fk6es0d192s7x15657w7oxdx8a; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.vehicles_for_actions
    ADD CONSTRAINT fk6es0d192s7x15657w7oxdx8a FOREIGN KEY (action_id) REFERENCES public.actions(action_id);


--
-- TOC entry 3126 (class 2606 OID 17260)
-- Name: task fk7n783hksw2tafnevt55xl1ikd; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT fk7n783hksw2tafnevt55xl1ikd FOREIGN KEY (animal_id) REFERENCES public.animal(animal_id);


--
-- TOC entry 3123 (class 2606 OID 17090)
-- Name: belongs_to_action fk944bh8lbia0jd8640p7xnveaf; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.belongs_to_action
    ADD CONSTRAINT fk944bh8lbia0jd8640p7xnveaf FOREIGN KEY (action_id) REFERENCES public.actions(action_id);


--
-- TOC entry 3124 (class 2606 OID 17095)
-- Name: belongs_to_action fkb7knpybsdojbl1wh58mc1qr4l; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.belongs_to_action
    ADD CONSTRAINT fkb7knpybsdojbl1wh58mc1qr4l FOREIGN KEY (vehicle_id) REFERENCES public.vehicle(vehicle_id);


--
-- TOC entry 3127 (class 2606 OID 17265)
-- Name: task fkbxj3u4awv1k50p2arffls9gif; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT fkbxj3u4awv1k50p2arffls9gif FOREIGN KEY (user_name) REFERENCES public.users(username);


--
-- TOC entry 3122 (class 2606 OID 17063)
-- Name: user_comment fkdyp3glicqmx4xlajn4hqbrly7; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.user_comment
    ADD CONSTRAINT fkdyp3glicqmx4xlajn4hqbrly7 FOREIGN KEY (action_id) REFERENCES public.actions(action_id);


--
-- TOC entry 3116 (class 2606 OID 16892)
-- Name: actions fkdypn7jw0l8agleshqrrc0tiwu; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.actions
    ADD CONSTRAINT fkdypn7jw0l8agleshqrrc0tiwu FOREIGN KEY (station_id) REFERENCES public.station(station_id);


--
-- TOC entry 3119 (class 2606 OID 16822)
-- Name: confirmation_token fkfijrqsyerjuuqxo6wl8nu5bsj; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.confirmation_token
    ADD CONSTRAINT fkfijrqsyerjuuqxo6wl8nu5bsj FOREIGN KEY (username) REFERENCES public.users(username);


--
-- TOC entry 3128 (class 2606 OID 17270)
-- Name: task fkfsefuw3eu4hk591ysimetjyig; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT fkfsefuw3eu4hk591ysimetjyig FOREIGN KEY (vehicle_id) REFERENCES public.vehicle(vehicle_id);


--
-- TOC entry 3134 (class 2606 OID 17318)
-- Name: tracker_comments fkgctkt9gstwnd3205evtnixjfr; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.tracker_comments
    ADD CONSTRAINT fkgctkt9gstwnd3205evtnixjfr FOREIGN KEY (user_name) REFERENCES public.users(username);


--
-- TOC entry 3125 (class 2606 OID 17085)
-- Name: belongs_to_action fki1dkkyqny01owpqvpk2jglwtg; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.belongs_to_action
    ADD CONSTRAINT fki1dkkyqny01owpqvpk2jglwtg FOREIGN KEY (user_name) REFERENCES public.users(username);


--
-- TOC entry 3133 (class 2606 OID 17299)
-- Name: vehicles_for_actions fkjwk9e8ydwqxan7gce62d47axm; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.vehicles_for_actions
    ADD CONSTRAINT fkjwk9e8ydwqxan7gce62d47axm FOREIGN KEY (vehicle_id) REFERENCES public.vehicle(vehicle_id);


--
-- TOC entry 3129 (class 2606 OID 17255)
-- Name: task fklqqrdp5pgnh8yqv8349ck4880; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT fklqqrdp5pgnh8yqv8349ck4880 FOREIGN KEY (action_id) REFERENCES public.actions(action_id);


--
-- TOC entry 3135 (class 2606 OID 17313)
-- Name: tracker_comments fkmpbqsdcgnpwqs69xltt22a0v9; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.tracker_comments
    ADD CONSTRAINT fkmpbqsdcgnpwqs69xltt22a0v9 FOREIGN KEY (action_id) REFERENCES public.actions(action_id);


--
-- TOC entry 3130 (class 2606 OID 17275)
-- Name: task_comment fkpoxt1sd4otmq9p94rp1atkgs7; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.task_comment
    ADD CONSTRAINT fkpoxt1sd4otmq9p94rp1atkgs7 FOREIGN KEY (task_id) REFERENCES public.task(task_id);


--
-- TOC entry 3131 (class 2606 OID 17282)
-- Name: task_comment fkqxce79efuw9byycy51ohn3tgn; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.task_comment
    ADD CONSTRAINT fkqxce79efuw9byycy51ohn3tgn FOREIGN KEY (user_name) REFERENCES public.users(username);


--
-- TOC entry 3113 (class 2606 OID 16797)
-- Name: qualified_for qualified_for_user_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.qualified_for
    ADD CONSTRAINT qualified_for_user_name_fkey FOREIGN KEY (user_name) REFERENCES public.users(username);


--
-- TOC entry 3114 (class 2606 OID 17019)
-- Name: qualified_for qualified_for_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.qualified_for
    ADD CONSTRAINT qualified_for_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.vehicle(vehicle_id);


--
-- TOC entry 3117 (class 2606 OID 16931)
-- Name: searcher_position searcher_position_action_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.searcher_position
    ADD CONSTRAINT searcher_position_action_id_fkey FOREIGN KEY (action_id) REFERENCES public.actions(action_id);


--
-- TOC entry 3118 (class 2606 OID 16812)
-- Name: searcher_position searcher_position_user_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.searcher_position
    ADD CONSTRAINT searcher_position_user_name_fkey FOREIGN KEY (user_name) REFERENCES public.users(username);


--
-- TOC entry 3110 (class 2606 OID 16780)
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wildtrack_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- TOC entry 2106 (class 826 OID 16391)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES  TO wildtrack_user;


--
-- TOC entry 2108 (class 826 OID 16393)
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES  TO wildtrack_user;


--
-- TOC entry 2107 (class 826 OID 16392)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS  TO wildtrack_user;


--
-- TOC entry 2105 (class 826 OID 16390)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES  TO wildtrack_user;


-- Completed on 2024-01-19 17:50:50

--
-- PostgreSQL database dump complete
--

