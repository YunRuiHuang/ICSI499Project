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

**To testing the database with data, Please using the .csv file in the [testing](./testing) folder to import to the MySQL database. The file name is same as the table name.**



### User table

```sql
CREATE TABLE users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_name VARCHAR(50) NOT NULL,
  real_name VARCHAR(50),
  email VARCHAR(100) NOT NULL,
  location VARCHAR(200) NOT NULL,
  profile_img_id VARCHAR(100),
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
  item_img_id VARCHAR(100),
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





#### Add User

- PATH = /user/new

- method = POST

  summary: post the information of new user, return user id or err

  description: post the new user information in *body*, including User_name, Email, location and Password. 

Example:

URL: `http://127.0.0.1:3001/user/new`

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
    "other": null
}
```

return:

success: **status : 200** (the insertId is also user id)

```json
{
    "rows": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 4,
        "info": "",
        "serverStatus": 2,
        "warningStatus": 0
    }
}
```

err: **status : 400** (user email already exist)

```json
{
    "code": "ER_DUP_ENTRY",
    "errno": 1062,
    "sqlState": "23000",
    "sqlMessage": "Duplicate entry 'abc@email.com' for key 'users.unique_email'",
    "sql": "INSERT INTO users(user_name,real_name, email, location, profile_img_id, bio, password, other_info ) VALUES ('test user','edit','abc@email.com','testing location',null,'test bio','passwordpasswordpasswordpasswordpasswordpasswordpasswordpassword',null);"
}
```



#### Delete User

- PATH = /user/:id

- method = DELETE

  summary: delete the user from the database, return success or err

  description: This method require most of information of this user before delete it. In the *body* require user name, user password, user email, all the information should match to delete it.

Example:

URL: `http://127.0.0.1:3001/user/4`

body:

```json
{
    "userName": "test user", 
    "email": "test@email.com",
    "password": "passwordpasswordpasswordpasswordpasswordpasswordpasswordpassword"
}
```

return:

success: **status 200**

```json
{
    "rows": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "info": "",
        "serverStatus": 2,
        "warningStatus": 0
    }
}
```

err: **status 200**

```json
{
    "rows": {
        "fieldCount": 0,
        "affectedRows": 0,
        "insertId": 0,
        "info": "",
        "serverStatus": 2,
        "warningStatus": 0
    }
}
```



#### Edit User

- PATH = /user/:id

- method = PUT

  summary: update the user information to database, return success or err

  description: This method require user login first. And the *body* including all the user information, the password and user id is use to find the correct user, which should not be edit.

Example:

URL: `http://127.0.0.1:3001/user/4`

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
    "other": null
}
```

return:

success: **status : 200**

```json
{
    "rows": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "info": "Rows matched: 1  Changed: 1  Warnings: 0",
        "serverStatus": 2,
        "warningStatus": 0,
        "changedRows": 1
    }
}
```

err:  **status : 200**

```json
{
    "rows": {
        "fieldCount": 0,
        "affectedRows": 0,
        "insertId": 0,
        "info": "Rows matched: 0  Changed: 0  Warnings: 0",
        "serverStatus": 2,
        "warningStatus": 0,
        "changedRows": 0
    }
}
```





#### Search User (by id)

- PATH = /user/id/:id

- method = GET

  summary: find the user and return user information or err

  description: This method use to get the user information by id

Example:

URL: `http://127.0.0.1:3001/user/id/4`

body:

```json
{}
```

return:

success: **status 200**

```json
{
    "user_id": 4,
    "user_name": "test user",
    "real_name": "test edit name",
    "email": "test@email.com",
    "location": "testing location",
    "profile_img_id": null,
    "bio": "test bio",
    "password": "passwordpasswordpasswordpasswordpasswordpasswordpasswordpassword",
    "has_items_list": 0,
    "other_info": null
}
```

err: **status 200**

```json
{}
```





#### Search User (by name)

- PATH = /user/name


  - method = POST

    summary: find the user and return a list of user information

    description: This method use to find a user when only know the user name, which will return a list of user because user name isn't unique. In the *body* should has user name value.


Example:

URL: `http://127.0.0.1:3001/user/name`

body:

```json
{
    "userName": "test user"
}
```

return:

success: **status 200**

```json
{
    "user_id": 4,
    "user_name": "test user",
    "real_name": "test edit name",
    "email": "test@email.com",
    "location": "testing location",
    "profile_img_id": null,
    "bio": "test bio",
    "password": "passwordpasswordpasswordpasswordpasswordpasswordpasswordpassword",
    "has_items_list": 0,
    "other_info": null
}
```

err: **status 200**

```json
{}
```



#### Check Password

- PATH = /user/password/id/:id

- method = POST

  summary: this use to check the user password correct or not, return the password match or not

  description: This method use to check the password, response (200) as success, (203) as password or user error. The *body* should contain password value.

Example:

URL: `http://127.0.0.1:3001/user/password/id/4`

body:

```json
{
    "password": "passwordpasswordpasswordpasswordpasswordpasswordpasswordpassword"
}
```

return:

success: **status 200**

```json
{
    "user_id": 4,
    "user_name": "test user",
    "real_name": "test edit name",
    "email": "test@email.com",
    "location": "testing location",
    "profile_img_id": null,
    "bio": "test bio",
    "password": "passwordpasswordpasswordpasswordpasswordpasswordpasswordpassword",
    "has_items_list": 0,
    "other_info": null
}
```

err: **status 203**

```json
{
    "result": "user or password error"
}
```



#### Check Password (via email)

- PATH = /user/password/email

- method = POST

  summary: this use to check the user password correct or not, return the password match or not

  description: This method use to check the password, response (200) as success, (203) as password or user error. The *body* should contain password value.

Example:

URL: `http://127.0.0.1:3001/user/password/email`

body:

```json
{ 
    "email": "test@email.com",
    "password": "passwordpasswordpasswordpasswordpasswordpasswordpasswordpassword"
}
```

return:

success: **status 200**

```json
{
    "user_id": 4,
    "user_name": "test user",
    "real_name": "test edit name",
    "email": "test@email.com",
    "location": "testing location",
    "profile_img_id": null,
    "bio": "test bio",
    "password": "passwordpasswordpasswordpasswordpasswordpasswordpasswordpassword",
    "has_items_list": 0,
    "other_info": null
}
```

err: **status 203**

```json
{
    "result": "user or password error"
}
```



#### Change Password

- PATH = /user/password/:id

- method = PUT

  summary: update the new password of the user to database, return to user profile

  description: This method require user login first. The user id, old password, new password in *body*.

Example:

URL: `http://127.0.0.1:3001/user/password/4`

body:

```json
{
    "oldpassword": "passwordpasswordpasswordpasswordpasswordpasswordpasswordpassword",
    "newpassword": "basswordpasswordpasswordpasswordpasswordpasswordpasswordpassword"
}
```

return:

success: **status 200**

```json
{
    "rows": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "info": "Rows matched: 1  Changed: 1  Warnings: 0",
        "serverStatus": 2,
        "warningStatus": 0,
        "changedRows": 1
    }
}
```

err: **status 200**

```json
{
    "rows": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "info": "Rows matched: 0  Changed: 0  Warnings: 0",
        "serverStatus": 2,
        "warningStatus": 0,
        "changedRows": 1
    }
}
```



#### Set Item List

- PATH = /user/:id/setList

- method = POST

  summary: turn the user item list as on, return JSON of user status

  description: turn the user item list as on, which default as off. after turn on, user can post item. require password in the *body*

Example:

URL: `http://127.0.0.1:3001/user/4/setList`

body:

```json
{
    "password": "passwordpasswordpasswordpasswordpasswordpasswordpasswordpassword"
}
```

return:

success: **status 200**

```json
{
    "rows": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "info": "Rows matched: 1  Changed: 1  Warnings: 0",
        "serverStatus": 2,
        "warningStatus": 0,
        "changedRows": 1
    }
}
```

err: **status 200**

```json
{
    "rows": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "info": "Rows matched: 0  Changed: 0  Warnings: 0",
        "serverStatus": 2,
        "warningStatus": 0,
        "changedRows": 1
    }
}
```



#### Check Item List

- PATH = /user/:id/setList


  - method = GET

    summary: check the user item list status, return JSON of user status

    description: check the user item list is on or off, which default as off. after turn on, user can post item

Example:

URL: `http://127.0.0.1:3001/user/4/setList`

body:

```json
{}
```

return:

success: **status 200** (has_items_list = 1 means turn on, 0 means turn off)

```json
{
    "rows": [
        {
            "user_id": 4,
            "has_items_list": 1
        }
    ]
}
```

err: **status 200**

```json
{
    "rows": []
}
```



#### Delete Item List

- PATH = /user/:id/setList

- method = DELETE

  summary: turn the user item list as off, return JSON of user status

  description: turn the user item list as off, user would not allow to post item, also **ALL** the item own by this user will be delete. require password in the *body*

Example:

URL: `http://127.0.0.1:3001/user/4/setList`

body:

```json
{
    "password": "passwordpasswordpasswordpasswordpasswordpasswordpasswordpassword"
}
```

return:

success: **status 200**

```json
{
    "rows": {
        "fieldCount": 0,
        "affectedRows": 0,
        "insertId": 0,
        "info": "Rows matched: 0  Changed: 0  Warnings: 0",
        "serverStatus": 2,
        "warningStatus": 0,
        "changedRows": 0
    }
}
```

err: **status 200**

```json
{
    "rows": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "info": "Rows matched: 0  Changed: 0  Warnings: 0",
        "serverStatus": 2,
        "warningStatus": 0,
        "changedRows": 1
    }
}
```





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



#### Add Item

- PATH = /item/:userId

- method = POST

  summary: post a new item under the user item list, return the item id or err

  description: post the new item information in *body*, including user id, item name, item location

Example:

URL: `http://127.0.0.1:3001/item/1`

body:

```json
{
    "itemName": "test item name",
    "itemKeywords": ["edit","abc","dd"],
    "itemLocation": "testing location",
    "itemDescription": null,
    "itemImgId": null,
    "other": null
}
```

return:

success: **status 200**

```json
{
    "itemId": 2
}
```

err: **status 400** (item name already exist)

```json
{
    "code": "ER_DUP_ENTRY",
    "errno": 1062,
    "sqlState": "23000",
    "sqlMessage": "Duplicate entry '1-test item name' for key 'items.unique_item_name'",
    "sql": "INSERT INTO items(user_id, item_name,item_keywords, item_location, item_description, item_img_id, other_info) VALUE ('1','test item name','edit,abc,dd','testing location',null,null,null);"
}
```



#### Delete Item

- PATH = /item/:itemId

- method = DELETE

  summary: delete the item from the database, return success or err

  description: This method only require the item id to delete item, would not check other information

Example:

URL: `http://127.0.0.1:3001/item/1`

body:

```json
{}
```



#### Edit Item

- PATH = /item/:itemId

- method = PUT

  summary: update the item information, return success or err

  description: This method require the item id, in *body* should including user id, item name, item location.

Example:

URL: `http://127.0.0.1:3001/item/2`

body:

```json
{
    "userId": 1,
    "itemName": "test item name",
    "itemKeywords": ["edit","abc","dd"],
    "itemLocation": "testing location",
    "itemDescription": null,
    "itemImgId": null,
    "other": null
}
```

return:

success: **status 200**

```json
{
    "status": "success edit item and keyword"
}
```



#### Search Item (by user id)

- PATH = /item/userid/:userId

- method = GET

  summary: Search items from database base on user id, return items information list

  description: This method using the user id to search all the items under this user id.

Example:

URL: `http://127.0.0.1:3001/item/userid/1`

body:

```json
{}
```

return:

success: **status 200**

```json
{
    "rows": [
        {
            "item_id": 2,
            "user_id": 1,
            "item_name": "test item name",
            "item_keywords": "edit,abc,dd",
            "item_location": "testing edit location",
            "item_description": null,
            "item_img_id": null,
            "other_info": null
        }
    ]
}
```



#### Search Item (by item id)

- PATH = /item/itemid/:itemId


  - method = GET

    summary: Search items from database base on item id, return item information or err

    description: This method using the item id to search item.

Example:

URL: `http://127.0.0.1:3001/item/itemid/2`

body:

```json
{}
```

return:

success: **status 200**

```json
{
    "rows": [
        {
            "item_id": 2,
            "user_id": 1,
            "item_name": "test item name",
            "item_keywords": "edit,abc,dd",
            "item_location": "testing edit location",
            "item_description": null,
            "item_img_id": null,
            "other_info": null
        }
    ]
}
```



#### Search Item (by item name)

- PATH = /item/search/name


  - method = POST

    summary: Search items from database base on name, return items information list

    description:  This method using the item name to search all the items with this item name.

Example:

URL: `http://127.0.0.1:3001/item/search/name`

body:

```json
{
    "itemName": "test item name"
}
```

return:

success: **status 200**

```json
{
    "rows": [
        {
            "item_id": 2,
            "user_id": 1,
            "item_name": "test item name",
            "item_keywords": "edit,abc,dd",
            "item_location": "testing edit location",
            "item_description": null,
            "item_img_id": null,
            "other_info": null
        }
    ]
}
```



#### Search Item

- PATH = /item/search/keyword


  - method = POST

    summary: Search items from database base on keyword, return item id list

    description: This method can receive a list of keyword and return a list of item id which sort by the most similarly (which the keyword show up the most) and how many times this id show up as times value , in *body* require a value **keyword** as a list which contain list of keyword

Example:

URL: `http://127.0.0.1:3001/item/search/keyword`

body:

```json
{
    "itemKeywords": ["edit","abc"]
}
```

return:

success: **status 200**

```json
{
    "rows": [
        {
            "item_id": 2,
            "times": 2
        }
    ]
}
```











