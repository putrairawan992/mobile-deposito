CREATE TABLE page (
  id INT IDENTITY(1,1) PRIMARY KEY,
  title varchar(255) not null,
  content varchar(255) not null,
  created_at datetime DEFAULT GETDATE(),
  updated_at datetime DEFAULT null
);

-- --------------------------------------------------------

CREATE TABLE content (
  id INT IDENTITY(1,1) PRIMARY KEY,
  title varchar(255) not null, -- slider, top, midle, footer content
  content text default null, 
  created_at datetime DEFAULT GETDATE(),
  updated_at datetime DEFAULT null
);

-- --------------------------------------------------------
