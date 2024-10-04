# X-Team Chrome Extension Challange

## Setup instructions

- `npm install` to install all the dependencies
- `npm run start` to build the extension and run the `mockServer.js`
- Go to your extensions page `chrome://extensions/` and enable the `developer mode`
- Click on `Load unpacked` and select the `dist` folder where the extension was built or use the `extension.zip` file, unpack it and select the unpacked folder (for this option the `mockServer.js` should be running. Use `npm run mockServer` to start the server if it is not running already)

## Architectural decisions

- `Vite`to help with the build
- `Extension Development - Auto Reloader` to help with some king of `hot-reload` for the extension without the need of remove the extension and install again everytime you change something on the code
- `Tailwind CSS` to help with the styling and used the `WhatsApp` ui for inspiration to create the UI/UX
- To build the `mockServer` I've use `express.js` and `@faker-js` to generate the mock data so everytime I call the `API` via `get` it will generate an amount of data, just to have the data already changing and simulate some kind of server running behind the scenes

 ## Future improvements

 - Add pagination to make the experience better for the user and load less data per API call
 - Add filters `read` (to show only the read messages), `unread` (to show only the unread messages), `high priority` (to show only the high priority messages) and `new` (to show only new messages)
 - Maybe set a defaul size for each message and add an option to open the full message when you click on that
 - Add states for `loading`, `no messages` and `error` (didn't work on that because of the time)
 - Create `Options page` to set some configurations and also a way to categorize the messages in a custom way (like creating a custom category name) and add an option on each message to move to that category
 - Add `search field` to help the user to find some specific message quickly
 - Make the selection of the messages persist on `storage` in case the user start selectiong the messages, close the extension and go back again to mark the selected messages as read

## Screenshots

- With some messages to mark as read
<img width="441" alt="image" src="https://github.com/user-attachments/assets/041fc99f-99a7-46cc-93bf-5e43597c53cc">

- Selecting messages to mark as read
<img width="441" alt="image" src="https://github.com/user-attachments/assets/32194b58-3490-4328-9238-9b95cc0d4415">

- Selecting all messages to mark as read
<img width="441" alt="image" src="https://github.com/user-attachments/assets/da344ec1-72ff-4f77-8ff5-85c350ecefb9">

- All messages marked as read
<img width="441" alt="image" src="https://github.com/user-attachments/assets/6bcd4666-0776-48ea-a8fd-ac4a4f1b47ad">

## Video

https://github.com/user-attachments/assets/87a8c1f3-05fe-4a4b-a351-355f378c3fda

