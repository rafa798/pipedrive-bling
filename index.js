// Loads Configuration
require('dotenv').config()

// Imports Container
const container = require('./src/container')

// Resolves Application
const application = container.resolve('application')

// Starts the Application
application.start()
