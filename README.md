# TetrisJS
TetrisJS is a javascript application developer for educational purpose.
The application is written entirely in js, and in some cases was also used the jquery framework.

## Installation
The application don't need any installation, just start the index.html and play the game!

## Customization
If you want to contribute to development, then to improve it or to further customize it, you have to follow the steps below in order to configure the development environment.

### Step 1
Install [NodeJS](https://nodejs.org/it/) and [npm](https://www.npmjs.com/) with it.

### Step 2
Start a new project.

```bash
npm init -y
```

### Step 3
Install [JQuery](https://jquery.com/) dependency in your project.

```bash
npm install --save jquery
```

Install [Webpack](https://webpack.js.org/) and [Webpack-cli] dependency.

```bash
npm install webpack webpack-cli --save-dev
```

### Step 4
Modify the "main" attribute in your pakcage.json file if the target js file is main.js, and optionally set the "private" attribute to true.

### Step 5
Finally build your project with

```bash
npx webpack (npx webpack --devtool source-map)
```
or 

```bash
npx webpack --devtool source-map
```
if you want to generate the main.js.map file.

Enjoy your game!

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
Davie Romano