# Enterprise Web Development Module - Point of Interest Web Application (Svelte Frontend)

#### Student Name: John Dennehy Student ID: 20091408

## Introduction

“A “point of interest” (POI) is a location for which information is available. A POI can be as simple as a set of coordinates, a name, and a unique identifier, or more complex such as a three-dimensional model of a building with names in multiple languages, information about opening and closing hours, and a civic
address. POI data has many applications, including augmented reality browsers, location- based social networking games, geocaching,
mapping and navigation systems.”

I chose to focus on Irish national monuments for this assignment.

## Svelte Frontend

For this assignment, the Svelte framework was used to develop a front-end service which interacts with a back-end Hapi.js API to provide users with a range of functionality around managing a collection of Irish national monuments.

## Technology Stack - Frontend

- Svelte
- uikit
- FontAwesome

## Netlify Deployment

Here's a link to a live version of the application on Netlify: [Svelte Application Link](https://pointofinterestapplication.netlify.app/#/)

## Hapi.js API Backend

For this assignment, the Hapi framework was used to develop a backend API for CRUD operations around user and point of interest management. Another significant focus of this assignment was unit testing with Mocha. NYC (also know as istanbul) tool used to generate code coverage reports. API routes are secured using Json Web Tokens (JWT).

Postman can be used to test the API routes for this service. Just to note that the form-data module is used to wrangle payloads so interaction with the majority of the API routes around monuments requires use of the form-data data-type on Postman.

![Form Data](https://github.com/JohnDennehy101/pointOfInterestV2/blob/main/public/images/FormData.png)

To authenticate with the API, pass a successful JSON request with a valid email and password for an existing user. If successful, a JWT will be returned. This can then be subsequently used in other API requests to interact with the service.

![Authenticate](https://github.com/JohnDennehy101/pointOfInterestV2/blob/main/public/images/Authenticate.png)

To do that, copy the JWT token and set a new 'Authorization' header in Postman.

![Get Users](https://github.com/JohnDennehy101/pointOfInterestV2/blob/main/public/images/GetUsers.png)

## Code Coverage

![Code Coverage Overview](https://github.com/JohnDennehy101/pointOfInterestV2/blob/main/public/images/codeCoverage.png)

## Technology Stack - BackEnd API

- hapi
- mongodb
- Cloudinary
- OpenWeather API
- Joi
- sanitizeHtml
- JWT
