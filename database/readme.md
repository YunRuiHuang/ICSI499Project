# Data interface

Include A MYSQL database and a Express JS web API interface 

## database

### MYSQL setup

**we will set up the database in the docker**

```shell
docker network create my-network
#setup a local network for docker

docker run --name mysql --network my-network -p 3000:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql 
#set up the last version mysql at port 3000
```



### User table

```sql
CREATE TABLE users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
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
ADD CONSTRAINT unique_email UNIQUE (email);

ALTER TABLE users 
ADD CONSTRAINT check_password_length CHECK (LENGTH(password) = 64);

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
  item_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
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
  keyword_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  keyword VARCHAR(20) NOT NULL,
  item_id INT NOT NULL
);

```

This creates a table named "keyword_map" with the following columns:

- keyword_id: an integer value for the keyword ID, which is set as the primary key.
- keyword: a string value for the keyword, with a maximum length of 20 characters, set as not null.
- item_id: an integer value for the item ID associated with the keyword, set as not null.
- foreign key constraint: a constraint linking the item_id column to the item_id column in the items table.

Additionally, the table includes a constraint to ensure the combination of keyword and item_id is unique.

Note that you may want to consider additional constraints or indexes based on your specific use case.



## Web API Interface

### Interface setup

```shell
cd ~/ICSI499Project/database
#move to the database file, you should see a Dockerfile

docker build -t my-express-app .
#using the dockerfile to build a image in docker

docker run --name express-container --network my-network -p 3001:3001 -d my-express-app
#set up the interface at port 3001, now you access localhost:3001/ you should see a test:"success" which means success setup the interface server

```





### User

User post body :

```json
{
  userName: [string(50)], //not null
  realName: [string(50)],
  email: [string(100)], //not null
  location: [string(200)], //not null
  profileImgId: [string(100)],
  bio: [string],
  password: [string(64)], //not null
  other: [string(200)]
}
```





- Add User

  - PATH = /user/new

  - method = POST

    summary: post the information of new user, return user id or err

    description: post the new user information in *body*, including User_name, Email, location and Password. 

Example:

body:

```json
{
    "userName": "test user", 
    "realName": "test name",
    "email": "test@email.com", 
    "location": "testing location", 
    "profileImgId": null,
    "bio": "test bio",
    "password": "passwordpasswordpasswordpasswordpasswordpasswordpasswordpassword",
    "other": null,
}
```

return:

​	success:

```json
```



​	err:



- Delete User

  - PATH = /user/:id

  - method = DELETE

    summary: delete the user from the database, return success or err

    description: This method require most of information of this user before delete it. In the *body* require user name, user password, user email, all the information should match to delete it.

    

- Edit User

  - PATH = /user/:id

  - method = PUT

    summary: update the user information to database, return success or err

    description: This method require user login first. And the *body* including all the user information, the password and user id is use to find the correct user, which should not be edit.



- Search User (by id)

  - PATH = /user/id/:id

  - method = GET

    summary: find the user and return user information or err

    description: This method use to get the user information by id



- Search User (by name)

  - PATH = /user/name
  
  
    - method = GET
  
      summary: find the user and return a list of user information
  
      description: This method use to find a user when only know the user name, which will return a list of user because user name isn't unique. In the *body* should has user name value.
  
      
  


- Check Password

  - PATH = /user/password/id/:id

  - method = GET

    summary: this use to check the user password correct or not, return the password match or not

    description: This method use to check the password, response (200) as success, (203) as password or user error. The *body* should contain password value.



- Check Password (via email)

  - PATH = /user/password/email

  - method = GET

    summary: this use to check the user password correct or not, return the password match or not

    description: This method use to check the password, response (200) as success, (203) as password or user error. The *body* should contain password value.



- Change Password

  - PATH = /user/password/:id

  - method = PUT

    summary: update the new password of the user to database, return to user profile

    description: This method require user login first. The user id, old password, new password in *body*.



- Set Item List

  - PATH = /user/:id/setList

  - method = POST

    summary: turn the user item list as on, return JSON of user status

    description: turn the user item list as on, which default as off. after turn on, user can post item. require password in the *body*



- Check Item List

  - PATH = /user/:id/setList
  
  
    - method = GET
  
      summary: check the user item list status, return JSON of user status
  
      description: check the user item list is on or off, which default as off. after turn on, user can post item
  



- Delete Item List

  - PATH = /user/:id/setList

  - method = DELETE

    summary: turn the user item list as off, return JSON of user status

    description: turn the user item list as off, user would not allow to post item, also **ALL** the item own by this user will be delete. require password in the *body*



### Item

```json
{
  userId: [INT], //NOT NULL
  itemName: [string(50)],  //NOT NULL
  itemKeywords: ArrayList[string(20)],
  itemLocation: [string(200)], //NOT NULL
  itemDescription: [string],
  itemImgId: [string(100)],
  other: [string(200)]
}
```



- Add Item

  - PATH = /item/:userId

  - method = POST

    summary: post a new item under the user item list, return the item id or err

    description: post the new item information in *body*, including user id, item name, item location



- Delete Item

  - PATH = /item/:itemId

  - method = DELETE

    summary: delete the item from the database, return success or err

    description: This method only require the item id to delete item, would not check other information



- Edit Item

  - PATH = /item/:itemId

  - method = PUT

    summary: update the item information, return success or err

    description: This method require the item id, in *body* should including user id, item name, item location.



- Search Item (by user id)

  - PATH = /item/userid/:userId

  - method = GET

    summary: Search items from database base on user id, return items information list

    description: This method using the user id to search all the items under this user id.



- Search Item (by item id)

  - PATH = /item/itemid/:itemId


  - method = GET

    summary: Search items from database base on item id, return item information or err

    description: This method using the item id to search item.



- Search Item (by item name)

  - PATH = /item/name


  - method = GET

    summary: Search items from database base on name, return items information list

    description:  This method using the item name to search all the items with this item name.



- Search Item

  - PATH = /item/keyword


  - method = GET

    summary: Search items from database base on keyword, return item id list

    description: This method can receive a list of keyword and return a list of item id which sort by the most similarly (which the keyword show up the most) and how many times this id show up as times value , in *body* require a value **keyword** as a list which contain list of keyword











