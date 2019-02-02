![logo](http://rvsistemas.net/wp-content/uploads/2017/06/add-icon.png)

# The All new things

Public API that allows users to manage their personal tasks.

## Installation

Clone this repository and run in the directory

```shell
git clone https://github.com/j053noir/the-all-new-things.git && cd the-all-new-things
```

```shell
npm install
```

In the root folder rename the ".env.example" file to ".env", and change the SERVER_PORT to an available port, eg:

```text
SERVER_PORT=3000
```


Set the url, username and password of your MONGODB server,in the ".env" file

```text
DATABASE_URL=
DATABASE_USERNAME=
DATABASE_PASSWORD=
```

If the database doesn't need username and password leave the fields empty.

## Start the server

To start the server in production mode run:

```shell
npm start
```

To start the server in development mode run:

```shell
npm run dev
```

# API V1.1

| Route           | Method | Parameters | Body                                               | Description               |
| --------------- | :----: | ---------: | -------------------------------------------------- | ------------------------- |
| /api/tasks      |  GET   |          - | -                                                  | Gets all tasks            |
| /api/tasks      |  POST  |            | description: string, author: string (userId)       | Creates a new task        |
| /api/tasks/{id} |  GET   | id: number | -                                                  | Gets task with Id {id}    |
| /api/tasks/{id} |  PUT   | id: number | description: string, author: string (userId)       | Updates task with Id {id} |
| /api/tasks/{id} | DELETE | id: number | -                                                  | Deletes task with Id {id} |
| /api/users      |  GET   |          - | -                                                  | Gets all users            |
| /api/users      |  POST  |            | firstname: string, lastname: string, email: string | Creates a new user        |
| /api/users/{id} |  GET   | id: number | -                                                  | Gets user with Id {id}    |
| /api/users/{id} |  PUT   | id: number | firstname: string, lastname: string, email: string | Updates user with Id {id} |
| /api/users/{id} | DELETE | id: number | -                                                  | Deletes user with Id {id} |


## Testing

Not yet available.
