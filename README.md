# Chat App
https://chat-app-kufo.onrender.com/
Messaging application that can connect people real-time from all around the world.

## Technologies used
 - React
 - Express
 - MongoDB
 - Bootstrap
 - Socket.io
 - AWS
 - Redux

## Instructions/Features
- Signup
    - First you can create an account from signup page. You can naviagate to signup from login page.

- Login 
    - After creating account you can log into it. When logging in jwt token is created and it's stored in local storage to authrorize actions.

- Password Reset
    - If user can't remember password he can navigate to the reset page from login page.
    - Typing email and sending request will send email containing link to password reset if email is correct.
    - From email the link to resetting pasword will contain jwt token which will expire in 1 hour.

- Main page
    - This shows your contacts and group chats.
    - Allows you to navigate to profile.
    - Also Allows you to log out from your account.
    - Group chats and private profiles can be created/viewed from here (blue pen edit icon). 

- Group Chat
    - Clicking Pen icon and new group chat.
    - Group chat is created by searching usernames from the search bar.
    - Selecting users and current user that creates the chat is automatically added to the group chat.
    - In group chats everyone elses names are being shown with the message.
    - You can change group chat's name by clicking the group chat name inside of the chat.

- Private Chat
    - Clicking Pen icon and new private chat
    - This redirects you to that specific user's profile. 
    - If you haven't already added this user that you are viewing, there is icon to be able to add him.
    - Contact is rendered to the contactlist.

- Chat Room
    - By Clicking anyone on the contactlist (private or groupChat) will navigate user to chat room (pagename.com/chat/id).
    - In chat room you can send messages and images(plus icon) and they are sent to other user real-time.
    - Selecting images opens file explorer and you have to select from there what you want to send.
    - If message is sent by a current user (blue message), user can hover the message which shows blue icon. Clicking this icon deletes the messages or image.
    - You can see typing indicator if other person is typing in the chat.
    - Messages have time stamps.
    - You can also see timelines or dates in chat if the day is different between 2 messages.

- Profile
    - You can navigate to your profile from main page by clicking settings icon. 
    - Authenticated user is allowed to modify profile picture, email, username and status in profile page.
    - Fields are modified by clicking them. Profile picture if changed by hovering over to it and clicking the edit icon. 
    - Trash icon pops up window alert. Clicking yes will delete the account and navigate back to login page.
    - You can turn on dark mode from profile as well.

- Some things to note
    - If group chat has only 3 people and one of them deletes their account. The group chat is automatically deleted as well since it has to contain more than 2 people.
    - If on the other hand group chat has 4 or more people and of them deletes their account, the user is just removed from the group chat.
    - Deleting user causes deleting every private chat between that user and it also deletes all messages and images in those chats.
    - If someone in your contactlist is logged in as well. You can see green dot next to their name in contactlist which indicates that they are online.
