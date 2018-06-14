# Cinema Application
This is a project for training Node.js® at NguyenHiepSoftware. It is a cinema website where user can upload their movies and share with other.

## Getting Started
Follow these instructions, you will able to run this project on your local machine.

### Prerequisites
First, you need to install Node.js®. You can download from [here](https://nodejs.org/dist/v8.9.4/node-v8.9.4-x64.msi).

You also need a code editor to modify the source code. You can pick any code editor, but I sincerely recommend [Visual Studio Code](https://code.visualstudio.com/).

### Installing
Firstly, create a new empty folder
```
mkdir <path>\<folder's name>
```
Next, navigate to your just created folder
```
cd <path>\<folder's name>
```
Next, create `package.json` file. To find out other information about `package.json` you can read this document [package.json]( https://docs.npmjs.com/files/package.json). You can run this command:
```
npm init
```
Next, you need to install `express`, a fast, unopinionated, minimalist web framework for [node](http://nodejs.org/). For detail information, please visit the homepage of `express`: [Express - Node.js web application framework](https://expressjs.com/).
```
npm install express
```
To quickly create an application skeleton, use `express-generator` tool.
```
npm install express-generator -g
```
To create your app, e.g. myapp, and specify `EJS` template engines with `express`, you need to run the following command
```
express --view=ejs myapp
```
Navigate to your app's folder, and run the app
```
cd myapp
npm start
```
Runs the app in the development mode. <br>
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits. <br>
You will also see any lint errors in the console.

## Deployment 

### Heroku 
To deploy on Heroku, you can find instructions in [Deploying Node.js Apps on Heroku](https://devcenter.heroku.com/articles/deploying-nodejs).

## API DOCUMENTATION
- Domain API: `https://nam-cinema.herokuapp.com/`
- Kết quả trả về thành công mặc định có { `status`: 200 }
- Kết quả trả về thất bại mặc định có { `status`: <Number>, `errorMessage`: <String> }

**1. API MOVIES**
----
### 1.1 '/api/v1/movies/' [All]
`POST` - Create movie <br>
#### Request Params
`title`: Movie title `<String>` (required)
`genre`: Movie genre `<String>` (required)
`release`: Movie release date `<String: YYYY/MM>` (required)
`cover`: Movie cover `<FILE>` (required)
`description`: Movie description `<String>`
#### Request Example
```json
{
  "cover": [FILE],
  "title": "The Godfather II",
  "genre": "Crime",
  "release": "12/1974",
  "description": "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate."
}
```
#### Success Response
{ message: `Movie created successfully`, photoURL: `<String>` } <br>
#### Error Response
{ errorMessage: `<String>` } <br>

### 1.2 '/api/v1/movies/' [All]
`GET` - Get all movies <br>
#### Success Response
{ movies: `<Movies Array>` } <br>
#### Error Response
{ errorMessage: `<String>` } <br>

### 1.3 '/api/v1/movies/:id' [All]
`GET` - Get 1 movie by _id <br>
#### Success Response
{ movie: `<Movies Object>` } <br>
#### Error Response
{ errorMessage: `<String>` } <br>

### 1.4 '/api/v1/movies/:id' [All]
`PUT` - Edit movie <br>
#### Request Params
`title`: Movie title `<String>`
`genre`: Movie genre `<String>`
`release`: Movie release date `<String: YYYY/MM>`
`cover`: Movie cover `<FILE>`
`description`: Movie description `<String>`
#### Request Example
```json
{
  "cover": [FILE],
  "title": "The Godfather II",
  "genre": "Crime",
  "release": "12/1974",
  "description": "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate."
}
```
#### Success Response
{ status: `200`, message: `Movie edited successfully`, photoURL: `<String>` } <br>
#### Error Response
{ status: `<Number>`, errorMessage: `<String>` } <br

### 1.5 '/api/v1/movies/:id' [All]
`DELETE` - Delete 1 movie by _id <br>
#### Success Response
{ status: `200`, message: `Delete movie successfully` } <br>
#### Error Response
{ status: `<Number>`, errorMessage: `<String>` } <br>

**2. API AUTH**
----
### 2.1 '/api/v1/auth/sign-up' [All]
`POST` - Sign up an account <br>
#### Request Params
`email`: Email `<String>` (required)
`username`: User's name `<String>` (required)
`password`: Password `<String>` (required)
#### Request Example
```json
{
  "email": "test1@cinema.com",
  "username": "Test Cinema",
  "password": "maenic"
}
```
#### Success Response
{ status: `200`, message: `Sign up successfully`, user: `<User Object>`, token: `<String>` } <br>
#### Error Response
{ status: `<Number>`, errorMessage: `<String>` } <br>

### 2.2 '/api/v1/auth/sign-in' [All]
`POST` - Sign in <br>
#### Request Params
`email`: Email `<String>` (required)
`password`: Password `<String>` (required)
#### Request Example
```json
{
  "email": "test1@cinema.com",
  "username": "Test Cinema",
  "password": "maenic"
}
```
#### Success Response
{ status: `200`, message: `Sign in successfully`, user: `<User Object>`, token: `<String>` } <br>
Mobile, after logged in successfully, must store `token` into `headers['x-access-token']` of following requests.
#### Error Response
{ status: `<Number>`, errorMessage: `<String>` } <br>

### 2.3 '/api/v1/auth/sign-out' [All]
`GET` - Sign out <br>
#### Success Response
{ status: `200`, message: `Sign out successfully` } <br>

### 2.4 '/api/v1/auth/facebook/token' [Mobile]
`POST` - Sign in with Facebook <br>
#### Success Response
{ status: `200`, message: `Sign in successfully`, user: `<User Object>`, token: `<String>` } <br>
Mobile, after logged in successfully, must store `token` into `headers['x-access-token']` of following requests.
#### Error Response
{ status: `<Number>`, errorMessage: `<String>` } <br>

### 2.5 '/api/v1/auth/change-password' [All]
`POST` - Change password <br>
#### Request Params
`oldPassword`: Current password `<String>` (required)
`password`: New password `<String>` (required)
#### Request Example
```json
{
  "oldPassword": "oldPassword",
  "password": "newPassword"
}
```
#### Success Response
{ status: `200`, message: `Change password successfully` } <br>
#### Error Response
{ status: `<Number>`, errorMessage: `<String>` } <br>

### 2.6 '/api/v1/auth/request-reset-password' [All]
`POST` - Request reset password / forgot password<br>
#### Request Params
`email`: Email `<String>` (required)
#### Request Example
```json
{
  "email": "test1@cinema.com"
}
```
#### Success Response
{ status: `200`, message: `Email sent` } <br>
#### Error Response
{ status: `<Number>`, errorMessage: `<String>` } <br>

**3. API USERS**
----
### 3.1 '/api/v1/users/' [All]
`GET` - Get current logged in user's info <br>
#### Success Response
{ status: `200`, user: `<User Object>` } <br>
#### Error Response
{ status: `<Number>`, errorMessage: `<String>` } <br>

### 3.2 '/api/v1/users/' [All]
`PUT` - Edit current logged in user's profile <br>
#### Request Params
`username`: User name `<String>`
`phone`: User phone number `<String>`
`avatar`: User avatar `<FILE>`
#### Request Example
```json
{
  "avatar": [FILE],
  "username": "Test Cinema",
  "phone": "09xxxxxxx"
}
```
#### Success Response
{ status: `200`, message: `Edit profile successfully` } <br>
#### Error Response
{ status: `<Number>`, errorMessage: `<String>` } <br>

### 3.3 '/api/v1/users/:id/movies' [All]
`GET` - Get movie list of 1 user <br>
#### Success Response
{ status: `200`, movies: `<Movie Array>` } <br>
#### Error Response
{ status: `<Number>`, errorMessage: `<String>` } <br>