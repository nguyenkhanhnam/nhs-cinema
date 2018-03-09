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
