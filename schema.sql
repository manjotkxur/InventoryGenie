create a postgreSQL database named inventory (lowercase) with the following schema

--

CREATE TABLE public.categories (
    id integer NOT NULL,
    user_id integer,
    name text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--


CREATE TABLE public.locations (
    id integer NOT NULL,
    user_id integer,
    name text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--


CREATE TABLE public.products (
    id integer NOT NULL,
    user_id integer,
    category_id integer,
    supplier_id integer,
    name text NOT NULL,
    sku text NOT NULL,
    unit_price numeric(10,2) DEFAULT 0.00 NOT NULL,
    description text,
    is_archived boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--


CREATE TABLE public.stock_movements (
    id integer NOT NULL,
    user_id integer,
    product_id integer,
    movement_type character varying(3),
    quantity integer DEFAULT 0 NOT NULL,
    note text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    location_id integer,
    CONSTRAINT stock_movements_movement_type_check CHECK (((movement_type)::text = ANY ((ARRAY['IN'::character varying, 'OUT'::character varying])::text[]))),
    CONSTRAINT stock_movements_quantity_check CHECK ((quantity > 0))
);


--


CREATE TABLE public.supplier_locations (
    supplier_id integer NOT NULL,
    location_id integer NOT NULL
);


--


CREATE TABLE public.suppliers (
    id integer NOT NULL,
    user_id integer,
    name text NOT NULL,
    contact_email text,
    phone text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);



--



CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

