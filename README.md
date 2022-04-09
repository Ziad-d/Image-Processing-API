# Image Processing API

This project is an express server which take images located in a local folder and create or resize a thumb version of it, it then be saved in a thumb folder.

## Create a thumb

http://localhost:3000/api/images?filename={filename}&width={width}&height={height}

### Functionality

- It will create a thumb image if it does not already exist
- Changing the height or the width will create another thumb

#### Scripts

Run tests: npm run test
build the project: npm run build
start the server: npm run start
run lint: npm run lint

