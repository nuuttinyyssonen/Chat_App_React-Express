This file is to track what did I do in my project and how many hours I spent each day.

| day        | hours           | What did I do  |
| ---------- |:---------------:| --------------:|
| 21.11.2023 |        3        | Started project, configured eslint, made signup/in components |
| 22.11.2023 |       9.5       | Configured Mongo, added routes signup/in, made it possible to make requests from client side, token auth, jest/cypress tests|
| 23.11.2023 |        8        | Added lot of visuals to "main" page. Made update to user model to include friends list and routes to use those. Also made them to work in client side.|
| 24.11.2023 |        6        | Moved a lot of queries to custom hooks. Much cleaner code. Updated FriendList component. Made Jest tests to backend and cypress to frontend. |
| 26.11.2023 |       5.5       | Made new models for chat and messages. Also made it possible to access and create chats from client side. Couple cypress tests as well. |
| 27.11.2023 |        8        | Configured Socket.io library on both client and server side to handle real-time communication. Made rooms possible as well. Added lot of styling |
| 28.11.2023 |        8        | Refactored a lot of frontend. Made jest testing for chat rooms/messaging. Cypress tests for the same in frontend. Added Profile components to handle searched user as well as own profile view. Delete account possibility. |
| 29.11.2023 |        4        | Added time stamps to all messages. Made autoscroll to chat when refreshing page or sending msg. Fixed some bugs as well.|
| 30.11.2023 |        9        | Added some visuals and animations. Made dropdown menu, added latest message to list, live typing text, refactoring and started working on online status. |
| 1.12.2023  |        8        | Configured redux store to handle new feature online status. Added reducers to it and also made online status possible with socketio. A lot of debugging and refactoring. More Jest tests to backend. |
| 4.12.20203 |        8        | Made group chat feature. Had to refactor A LOT of code to make it work as expected. Did some debugging as well. Made some backend tests to it with Jest.|
| 5.12.2023  |       7.5       | Did a lot of refactoring again and debugging to make everything better. Added also some animations to make the app smooth. Jest testing to bakend. |
| 6.12.2023  |       7.5       | Users can now upload images to chat. Made all configurations for it in backend and frontend. Images are stored in mongodb. Groupchat names can be changed now as well. Added transitions and refactored some. |
| 7.12.2023  |        8        | Refactored whole Profile part of the project. Usernames, emails and other stuff can be changed from client side now. Configured AWS and images are now being sent to AWS and links saved in mongo. |
| 8.12.2023  |        6        | Users can now see each others profile pics and upload new ones. All images are in AWS bucket. Made some error handling and lot of refactoring for backend. Also documented whole backend.
| 11.12.2023 |        8        | Started working on video calls. Made required socket in backend. Also made frontend components to video calls. Lot of ideas and figuring out how to use WebRTC to make this work flawlessly. |
| 12.12.2023 |        8        | Dropped the whole video calls idea. Configured mail server to project. Made routes for sending link to change password and route to change it. Links are controlled with jwt token. Made also all of this to work in client side. |
| 13.12.2023 |        7        | Added lot of css to the project. Handled some of the biggest errors in project. Deleting user used to break app 'cause of the empty chats messages and all that. it's fixed now. Did some refactoring and other error handling. a lot of small but important things to prepare for deployment. |
| 14.12.2023 |       10        | A lot of refactoring, especially for sockets. Also changed several features to use socket instead of routes, such as deleting images, messages and changin group name. This way everything important is updated real-time. Also made a lot of error handling to those and profile section. Fixed all jest tests and added few. Documented some of the frontend.
|   Total    |       139        |