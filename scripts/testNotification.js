const notifier = require('node-notifier');

// Function to send desktop notification
function sendNotification(title, message) {

    console.log("Is this working? ")
    notifier.notify('Message');

    notifier.notify('Message');

  notifier.notify({
    title: title,
    message: message,
    // Uncomment the line below if you want to use a custom icon for the notification:
    // icon: '/path/to/your/icon.png',
  });
}

// Example: Sending a notification
sendNotification('Hello from Node.js', 'This is a sample notification!');