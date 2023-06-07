# redis-caching-demo

This project is a Node.js application that showcases the usage of Redis caching.

## Overview
The project utilizes Redis, an in-memory data store, as a caching layer to improve the performance of a Node.js application. By caching frequently accessed data in Redis, the application can retrieve the data from memory instead of making expensive database or API calls. This can significantly reduce the response time and improve the overall performance of the application.

## Installation
To run this project locally, make sure you have the following software installed:

`Node.js`

`Redis Server`

Follow the steps below to get started:

1. Clone the repo to your local machine: `git clone https://github.com/thesammet/redis-caching-demo.git`
2. Navigate to the project directory: `cd redis-caching-demo`
3. Install the dependencies: `npm install` or `yarn install`

## Usage

1. Start the Redis server: `redis-server`
2. Start the Node.js application: `npm run dev`
3. Make the following URL to local environment's url: `localhost:3000 `

When the request send from Postman, it will cache the data using Redis caching and retrieve the data from the cache.

## Contributing

If you would like to contribute to this project, follow these steps:

1. Fork the repo to your own GitHub account.
2. Clone the repo to your local machine.
3. Make your changes and commit them to your local branch.
4. Push your changes to your forked repo.
5. Submit a pull request to the original repo.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

---

This README file provides basic information on running the project and contributing to it. For more details or usage examples, please refer to the project's source code.

Happy coding!
