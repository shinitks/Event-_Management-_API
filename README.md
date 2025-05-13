# **Event Management API**
A lightweight RESTful API built with Node.js and Express.js for managing college events. It supports:

.Event creation

.Participant registration

.Capacity tracking

.Event updating and deletion

.JSON file-based data storage (no database needed)

## **📁 File-Based Storage**
Data is stored in local JSON files:

./data/events.json – stores event details

./data/registrations.json – stores participant registrations

./data/count.json – tracks number of registered participants per event

# **⚙️ Setup Instructions**
Clone the Repository
git clone https://github.com/shinitks/Event-_Management-_API

cd Event-_Management-_API

Install Dependencies

npm install

Run the Server

node server.js

Make sure the ./data/ directory exists with the following files:

events.json: []

registrations.json: []

count.json: []

## **🚀 API Endpoints**
Base Route: /api/events

### **Create Event**
POST /create

Creates a new event.


### **Register for an Event**
POST /register/:id

Registers a student for a specific event by ID.

### **Update Event**
PUT /update/:id

Updates fields such as capacity or venue for a specific event.

### **Delete Event**
DELETE /:id

Deletes an event and its associated registration and count data.

### **Get Event by ID**
GET /:id

Fetches details of a specific event.

### **Get All Events**
GET /all

Returns a list of all available events.

## **🛠 Possible Enhancements**
Switch from file-based storage to a real database (MongoDB, PostgreSQL, etc.)

Add user authentication and authorization

Add attendance and feedback features

Use middleware for input validation

Write tests with tools like Jest or Mocha

## **👤 Author**
GitHub: @shinitks

## **📄 License**
This project is licensed under the MIT License.
