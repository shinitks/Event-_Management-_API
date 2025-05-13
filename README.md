###Event Management API
A lightweight RESTful API built with Node.js and Express.js for managing college events. It supports:

Event creation

Participant registration

Capacity tracking

Event updating and deletion

JSON file-based data storage (no database needed)

📁 File-Based Storage
Data is stored in local JSON files:

./data/events.json – stores event details

./data/registrations.json – stores participant registrations

./data/count.json – tracks number of registered participants per event

⚙️ Setup Instructions
1. Clone the Repository
git clone https://github.com/shinitks/Event-_Management-_API
cd Event-_Management-_API
2. Install Dependencies

npm install
3. Run the Server

node server.js
Make sure the ./data/ directory exists with the following three files (you can create them manually if missing):

events.json: []

registrations.json: []

count.json: []

🚀 API Endpoints
All endpoints are prefixed with /api/events

📌 Create Event
POST /api/events/create

Creates a new event.

🧾 Register for an Event
POST /api/events/register/:id

Registers a student for a specific event. Automatically checks for available capacity.

🔄 Update Event
PUT /api/events/update/:id

Updates event details.

❌ Delete Event
DELETE /api/events/:id

Deletes an event and all associated registration and count data.

🔍 Get Event by ID
GET /api/events/:id

Returns event details by ID.

📃 Get All Events
GET /api/events/all

Returns a list of all events.


🛠 Possible Enhancements
Switch to a real database (e.g., MongoDB or PostgreSQL)

Add authentication and user roles

Add attendance and feedback endpoints

Validate inputs using middleware

Add unit tests

👤 Author
@shinitks

📄 License
This project is licensed under the MIT License.

