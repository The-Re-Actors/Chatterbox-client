// Declaration of the `apiUrl` variable
let apiUrl

// Object containing different API URLs for different environments
const apiUrls = {
  production: 'https://reactors-chatterbox.herokuapp.com',
  development: 'http://localhost:4741'
}

// Condition to determine the current environment and set the appropriate API URL
if (window.location.hostname === 'localhost') {
  // Set the API URL to the development environment URL
  apiUrl = apiUrls.development
} else {
  // Set the API URL to the production environment URL
  apiUrl = apiUrls.production
}

// Export the `apiUrl` variable as the default export
export default apiUrl
