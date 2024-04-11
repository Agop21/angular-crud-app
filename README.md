# CrudApplication
This is a simple CRUD (Create, Read, Update, Delete) application built using Angular. It allows users to perform CRUD operations on employee data.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.2.

## Features

- Create: Add new employees to the system.
- Read: View a list of all employees.
- Update: Edit existing employee details.
- Delete: Remove employees from the system.

## Installation

- Clone this repository to your local machine.
- Navigate to the project directory.
- Run npm install to install project dependencies.
- Run ng serve to start the development server.
- Navigate to http://localhost:4200/ in your browser to view the application

## Mocked Data with JSON Server

This project uses JSON Server to provide mocked data for development purposes.
To start the JSON Server: 
- Install JSON Server globally if you haven't already: npm install -g json-server
- Navigate to the project directory and start JSON Server by running: json-server --watch db.json
This command will start a JSON Server with the mocked data provided in the db.json file.
You can access the JSON Server API at http://localhost:3000.

## Usage

Upon opening the application, you will be presented with a list of existing employees.
Use the "Add Employee" button to create a new employee entry.
Click on edit button to edit its details.
To delete an employee, click on the delete icon next to the edit button.

## Technologies Used

- Angular
- Bootstrap for UI components
- HttpClientModule for handling HTTP requests
- TypeScript

## Contributing

Contributions are welcome! Please fork this repository, make your changes, and submit a pull request.
