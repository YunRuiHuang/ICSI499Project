# Data interface

Include A MYSQL database and a Express JS web API interface 

## database

### User table

```sql
CREATE TABLE users (
  user_id INT NOT NULL PRIMARY KEY,
  user_name VARCHAR(50) NOT NULL,
  real_name VARCHAR(50),
  email VARCHAR(100) NOT NULL,
  location VARCHAR(200) NOT NULL,
  profile_img_id INT,
  bio TEXT,
  password VARCHAR(64) NOT NULL,
  has_items_list BOOLEAN NOT NULL DEFAULT false,
  other_info VARCHAR(200)
);

ALTER TABLE users
ADD CONSTRAINT unique_user_name UNIQUE (user_name);

ALTER TABLE users
ADD CONSTRAINT unique_email UNIQUE (email);

ALTER TABLE users
ADD CONSTRAINT unique_location UNIQUE (location);

ALTER TABLE users
ADD CONSTRAINT check_password CHECK (LEN(password) = 64);

```

This creates a table named "users" with the following columns:

- user_id: an integer value for the user ID, which is set as the primary key.
- user_name: a string value for the user name, with a maximum length of 50 characters, set as not null.
- real_name: a string value for the user's real name, with a maximum length of 50 characters.
- email: a string value for the user's email address, with a maximum length of 100 characters, set as not null.
- location: a string value for the user's location, with a maximum length of 200 characters, set as not null.
- profile_img_id: an integer value for the user's profile image ID.
- bio: a text value for the user's bio.
- password: a string to accommodate the 32-byte SHA-256 hash value. 
- has_items_list: a BOOLEAN datatype with a default value of false. Set true when user setup the item list.
- other_info: a string value for any other user information, with a maximum length of 200 characters.

Additionally, the table includes three constraints to ensure the user_name, email, and location columns have unique values.

Note that the data type for the profile image ID may vary depending on how you plan to store or reference the image data. You may also want to consider additional constraints or indexes based on your specific use case.

### Item table

```sql
CREATE TABLE items (
  item_id INT NOT NULL PRIMARY KEY,
  user_id INT NOT NULL,
  item_name VARCHAR(50) NOT NULL,
  item_keywords VARCHAR(200),
  item_location VARCHAR(200) NOT NULL,
  item_description TEXT,
  item_img_id INT,
  other_info VARCHAR(200)
);

ALTER TABLE items
ADD CONSTRAINT unique_item_name UNIQUE (user_id, item_name);

ALTER TABLE items
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (user_id);

```

This creates a table named "items" with the following columns:

- item_id: an integer value for the item ID, which is set as the primary key.
- user_id: an integer value for the user ID associated with the item, set as not null.
- item_name: a string value for the item name, with a maximum length of 50 characters, set as not null.
- item_keywords: a string value for keywords associated with the item, with a maximum length of 200 characters.
- item_location: a string value for the item location, with a maximum length of 200 characters, set as not null.
- item_description: a text value for the item description.
- item_img_id: an integer value for the item image ID.
- other_info: a string value for any other item information, with a maximum length of 200 characters.

Additionally, the table includes a constraint to ensure the combination of user_id and item_name is unique, as well as a foreign key constraint to link the user_id column to the user_id column in the users table.

Note that you may want to consider additional constraints or indexes based on your specific use case, and that the data type for the item image ID may vary depending on how you plan to store or reference the image data.



### Keyword table

```sql
CREATE TABLE keyword_map (
  keyword_id INT NOT NULL PRIMARY KEY,
  keyword VARCHAR(20) NOT NULL,
  item_id INT NOT NULL,
  CONSTRAINT fk_item_id FOREIGN KEY (item_id) REFERENCES items (item_id)
);

ALTER TABLE keyword_map
ADD CONSTRAINT unique_keyword_item UNIQUE (keyword, item_id);

```

This creates a table named "keyword_map" with the following columns:

- keyword_id: an integer value for the keyword ID, which is set as the primary key.
- keyword: a string value for the keyword, with a maximum length of 20 characters, set as not null.
- item_id: an integer value for the item ID associated with the keyword, set as not null.
- foreign key constraint: a constraint linking the item_id column to the item_id column in the items table.

Additionally, the table includes a constraint to ensure the combination of keyword and item_id is unique.

Note that you may want to consider additional constraints or indexes based on your specific use case.



## Web API Interface

### User

- Add User

  - PATH = /user/new

  - method = POST

    summary: post the information of new user, return to login page

    description: post the new user information in *body*, including User_name, Email, Password. 



- Delete User

  - PATH = /user/:id

  - method = DELETE

    summary: delete the user from the database, return to home page

    description: This method require to login to this user before delete it. And, the *body* require user name, user password, user email, cookie id and timestamp

    

- Edit User

  - PATH = /user/:id

  - method = PUT

    summary: update the user information to database, return to user profile

    description: This method require user login first. And the *body* including all the user information other than **password**, the cookie id and timestamp also require.



- Search User (by id)

  - PATH = /user/:id

  - method = GET

    summary: find the user and jump to it home page

    description: This method use to jump to the user information page



- Check Password

  - PATH = /user/password

  - method = GET

    summary: this use to check the user password correct or not, return JSON

    description: This method use to check the password, response (200) as success, (203) as password or user error. The user can identify by user id or email



- Change Password

  - PATH = /user/password/:id

  - method = PUT

    summary: update the new password of the user to database, return to user profile

    description: This method require user login first. The user id, old password, new password, and the cookie id and timestamp also require.



- Set Item List

  - PATH = /user/:id/setList

  - method = POST

    summary: turn the user item list as on, return JSON of user status

    description: turn the user item list as on, which default as off. after turn on, user can post item



- Delete Item List

  - PATH = /user/:id/setList

  - method = DELETE

    summary: turn the user item list as off, return JSON of user status

    description: turn the user item list as off, user would not allow to post item, also **ALL** the item own by this user will be delete



### Item

- Add Item

  - PATH = /item/:userId

  - method = POST

    summary: post a new item under the user item list, return to user item page

    description: post the new item information in *body*, including item name, item location



- Delete Item

  - PATH = /item/:itemId

  - method = DELETE

    summary: delete the item from the database, return to user item page

    description: This method require the item owner first login, in *body* should including the cookie id and timestamp to identify the user is owner



- Edit Item

  - PATH = /item/:itemId

  - method = PUT

    summary: update the item information, return JSON of item

    description: This method require the item owner first login, in *body* should including user id, item name, item location, and the cookie id and timestamp to identify the user is owner



- Search Item

  - PATH = /item

  - method = GET

    summary: Search items from database base on keyword, return JSON list

    description: This method can receive a list of keyword and return a list of item id which sort by the most similarly (which the keyword show up the most) , in *body* require a value **keyword** as a list which contain list of keyword













