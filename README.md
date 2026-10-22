# Travlr Getaways — Full Stack Web Application

## Project Overview

Travlr Getaways is a full stack travel application developed for CS 465. The project uses the MEAN stack—MongoDB, Express.js, Angular, and Node.js—to support a customer-facing travel website and an administrative single-page application (SPA) for managing trip information. The application evolved from serving static content into a database-driven system with REST API endpoints and an authenticated administrative workflow.

## Architecture

The customer-facing side of Travlr Getaways uses Express to serve web pages and JavaScript to support dynamic functionality. Early in development, the site relied on static HTML; later, the project was reorganized using a model-view-controller (MVC) structure and Handlebars templates, which made page rendering more maintainable. In contrast, the administrative interface uses an Angular SPA. Rather than reloading an entire page whenever data changes, the SPA updates portions of the interface dynamically and communicates with the backend through API requests. These approaches serve different needs: server-rendered pages provide a straightforward customer experience, while the SPA supports a more interactive administrative experience.

The backend uses MongoDB, a NoSQL database, because trip information can be represented naturally as JSON-like documents. MongoDB works well with the JavaScript-based MEAN stack and supports flexible document structures without requiring a rigid relational schema. Mongoose adds structure through models and validation, allowing the application to manage trip data consistently.

## Functionality

JavaScript is a programming language used to implement application logic, while JSON (JavaScript Object Notation) is a text-based data format for exchanging structured information. JSON connects the frontend and backend because the API sends trip records as JSON responses and receives JSON data in requests. Angular services can retrieve this information and display it in the administrative interface without embedding the data directly in the frontend.

Several refactoring steps improved the application's organization and maintainability. I transitioned the customer site from static content to an MVC structure with Handlebars templates, moved trip information from a local JSON file into MongoDB, and introduced REST API routes and Mongoose models to separate data access from presentation logic. On the administrative side, I built reusable Angular components and a trip service to centralize API communication. Reusable UI components reduce duplication, keep the interface consistent, and make future changes easier because a component can be updated in one place rather than across multiple pages.

## Testing

API testing focuses on verifying that each endpoint responds correctly to the intended HTTP method. For example, GET requests retrieve trip information, while POST requests create new records. Depending on the implemented routes, PUT requests update records and DELETE requests remove them. Tests should check both expected behavior and failure cases, including missing fields, invalid input, unknown resources, and appropriate HTTP status codes. Testing the API separately from the UI helps identify whether an issue originates in the frontend, server logic, or database.

Adding authentication increases the complexity of testing because protected administrative endpoints should reject unauthenticated or unauthorized requests while still allowing valid users to perform approved operations. This requires testing login behavior, credential handling, authorization, and error responses in addition to normal CRUD functionality. I also learned the importance of verifying that the frontend sends any required authentication information correctly and that the server—not just the UI—enforces access restrictions. This separation is essential because client-side controls alone cannot secure backend resources.

## Reflection

This course strengthened my understanding of how frontend interfaces, APIs, server-side logic, databases, and authentication fit together in a production-style application. Building Travlr Getaways gave me hands-on experience with Node.js, Express, Angular, MongoDB, Mongoose, RESTful API design, and troubleshooting across multiple layers of a system. Working through each milestone also improved my ability to refactor existing code rather than simply adding new functionality.

My professional goal is to work in cybersecurity, initially in a defensive role such as a security operations center (SOC) analyst or threat hunter, with opportunities to progress into detection engineering and purple-team work. Understanding full stack architecture is relevant to those goals because security professionals need to understand how applications exchange data, authenticate users, and expose potential attack surfaces. The authentication work in the final iteration was especially useful because it connected software development decisions with practical security controls. Overall, this project gives me an example of applied technical work that I can discuss with prospective employers and include in my GitHub portfolio.

## Technology Stack

- **Frontend:** HTML, JavaScript, Handlebars, Angular
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Architecture:** MVC, REST API, SPA

## Repository Notes

This README accompanies the final CS 465 project submission. For setup and execution, use the dependency files and environment configuration appropriate to each application directory. Do not commit real credentials, database connection strings, or signing secrets to the repository.
