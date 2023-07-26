CREATE TABLE page (
  id INT IDENTITY(1,1) PRIMARY KEY,
  title varchar(255) not null,
  content varchar(255) not null,
  created_at datetime DEFAULT current_timestamp(),
  updated_at datetime DEFAULT null
);

-- --------------------------------------------------------

CREATE TABLE menu (
  id INT IDENTITY(1,1) PRIMARY KEY,
  nama varchar(255) not null,
  jenis int not 0, -- 0=main, 1=sub-menu
  predecessor int default not null,
  created_at datetime DEFAULT current_timestamp(),
  updated_at datetime DEFAULT null
);

-- --------------------------------------------------------

CREATE TABLE content (
  id INT IDENTITY(1,1) PRIMARY KEY,
  nama varchar(255) not null, -- slider, top, midle, footer content
  content text default null, 
  created_at datetime DEFAULT current_timestamp(),
  updated_at datetime DEFAULT null
);

-- --------------------------------------------------------
