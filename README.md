# Event Flow

An application to streamline your celebrations, ensuring every event flows seamlessly.

## Table of Contents

- Project Overview
- Features
- Technologies
- Getting Started

## Project Overview

EventFlow is an application designed to streamline the creation, management, and attendance of events. This app provides users with an easy-to-use interface to organize events, manage their profiles, review events, and handle ticketing seamlessly.

## Features

- Create an account by registering and accessing an existing account.
- Authentication using JWT tokens.
- Create and delete events.
- View a list of all available events
- Retrieve all events created by the user
- Leave reviews for attended events
- Manage and verify event tickets

# Technologies

### 1. Tools & Frameworks

- Code Editor: Visual Studio Code and Microsoft Visual Studio, providing robust environments for coding and debugging.
- Database: Microsoft SQL Server, ensuring reliable data storage and retrieval using TSQL.
- Modeling & Design Tools: Figma and Visual Paradigm

### 2. Programming Languages & Libraries

- React.js: JavaScript library that facilitates building user interfaces.
- TailwindCSS: Utility-first CSS framework that provides pre-designed utility classes.

# Getting Started

### 1. Prerequisites

Before running the application, make sure you have installed the following:

- [Visual Studio](https://learn.microsoft.com/en-us/visualstudio/install/install-visual-studio?view=vs-2022) (Recomended)
- [NPM and NodeJS](https://nodejs.org/en) to run the React app
- [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

### 2. Installation 

- Clone this repository

```
git clone https://github.com/Charbel-Tannous/EventFlow.git
```

- Start the Web API server

    - Open the Event_Flow.sln solution in visual studio.

    - Change in `appsettings.json` the connection string to match your localdb.
    
    - Run below migration commands in order to create the database connection.
    
    ```
    dotnet ef migrations add "EventFlow" --startup-project ./Event_Flow.Data 
    ```
    ```
    dotnet ef database update --startup-project ./Event_Flow.Data 
    ```
    
    - Choose http instead of https and run the Web API.

- Go to the project directory and install dependencies for the client side


```
cd EventFlowWebApp
```
```
npm install
```
- Start the React app client

```
npm run dev
```

- Go to [`http://localhost:5173/`](http://localhost:5173/) to check Event Flow app
