# The Docker section sets up a containerized environment for the REST API using Docker and Docker Compose.
# The Dockerfile defines the instructions to build a custom Docker image for the Node.js application.
# It uses an official Node.js LTS image as the base, sets the working directory, copies the application files,
# installs the dependencies, exposes port 3000 for the API, and specifies the command to start the server.

# The docker-compose.yml file orchestrates multiple containers for the project.
# It defines two services: 'app' for the Node.js application and 'db' for the MySQL database.
# The 'app' service builds the image using the Dockerfile, maps the local port 3000 to the container's port 3000,
# and ensures the app code is synchronized between the host and the container.
# The 'db' service uses the official MySQL 8.0 image, sets up environment variables for the database,
# and maps port 3306 on the host to the database container for easy access.

# The 'depends_on' configuration ensures the database container starts before the application container.
# This setup enables seamless integration between the Node.js API and the MySQL database,
# while Docker Compose simplifies managing these containers together for development and deployment.
