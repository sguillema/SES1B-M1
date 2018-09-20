# Software Engineering Studio 1B - 2018
**Wrk1 01 1**

This is the repository for SES1B's Patient-Doctor application assignment.

## Table of Contents
- [Software Engineering Studio 1B - 2018](#software-engineering-studio-1b---2018)
    - [Table of Contents](#table-of-contents)
    - [Environment Dependencies](#environment-dependencies)
    - [Installation & Setup](#installation--setup)
        - [Updating the repository](#updating-the-repository)
        - [Running the Application for development](#running-the-application-for-development)
        - [Running the Stub server for development](#running-the-stub-server-for-development)
    - [Back-end Development](#back-end-development)
    - [Testing](#testing)
        - [Front-end](#front-end)
        - [Back-end](#back-end)
    - [Resources](#resources)
___

## Environment Dependencies
* NodeJS - <https://nodejs.org/en/download/>

___
## Installation & Setup
1. Clone the respository
   ```
   git clone https://github.com/sguillema/SES1B-M1
   ```

2. Navigate to the project folder and run
    ```
    npm install
    ```
    And once this is done, you can run
   ```
   npm run install
   ```
   *This will install all project dependencies and link them together*

### Updating the repository
1. In the root folder of the project, run
    ```
    git pull
    ```
    Then run
    ```
    npm run install
    ```
    *Please ensure that you are on the correct branch. You can see what branch you are on using the `git branch` command. You can change what branch you are on using the `git checkout <branchName>` command. Make sure to pull the latest version!*

### Running the Application for development
Once you have successfully installed the project dependencies, you can run the following command from the project root directory to start the application
```
npm run dev
```
After this, make sure to run the stub server. Steps for it can be found in the [Running the Stub server for development](#running-the-stub-server-for-development) section below.

You can access the running application through `localhost:3000`. 

For local development, you can login to the app as a patient using `john@example.com` as the email, and `password` as the password. 

You can login as a doctor using `jane@example.com` as the email, and `password` as the password.

*Note: This is just for local development.*

### Running the Stub server for development
For development, the application will use a stub server to handle API requests. In the project root directory, run the following command to start the server
```
npm run stub <port>
```
*If you don't specify a port, the stub server will choose 4000 as the default*
___
## Back-end Development
Back-end development is done using ClaudiaJS to deploy AWS Lambda functions. Please refer to the [Installation & Setup](#installation--setup) section to get things ready. **Section is WIP**
## Testing
**Section is WIP**
### Front-end
**Section is WIP**
### Back-end
**Section is WIP**
___
## Resources
* IDE: Visual Studio Code - <https://code.visualstudio.com/>
* Application Framework: Nuxt - <https://nuxtjs.org/>
* UI Component Framework: Vuetify - <https://vuetifyjs.com/en/>
* Testing Framework: Jest - <https://jestjs.io/>
* MongoDB using MLab (DB as a Service) - <https://mlab.com/>
* AWS Lambda using ClaudiaJS <https://claudiajs.com/>
* ExpressJS <https://expressjs.com/>
* Application Deployment (CI/CD): Netlify - <https://www.netlify.com/> 
* Project Management: Trello - <https://trello.com/>