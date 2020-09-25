
# TASKFIX WEB
In this minimalistic todo app you can easily manage your daily todos. 
It allows you to add a new task, if you wish you can update them by double clicking on its name. 
In case you accomplished your tasks you can remove it from the list by hitting the "X" button next to it name.


# INSPECT
The application is deployed here:
https://web-task-fix.herokuapp.com/

# HOW TO RUN
Requirements:
- node 12.18.3
- npm 6.14.6

- You need to set the ENV-s in the .env file, check out the .env-example 
- After installing the app (npm install) you can start it by running the "npm run start" command. The application will be opened on the localhost:3000. 
In this case the application is connected the deployed API (https://api-task-fix.herokuapp.com/)
To connect it the local API you should run "npm run dev" + start the API locally as well.


The API may be found here: https://github.com/MattHowdy/api-task-fix



# FURTHER DEVELOPMENT IDEAS
- Error handling + Notifications
- UI: count tasks, display completed tasks/ deleted task in a new Tab
- Responive design
- utlize webpack
- Task status view
- User management + authentication