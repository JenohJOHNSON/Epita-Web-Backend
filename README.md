Requirements:
Visula Studio Code
MangoDb
MySQL

Steps to setup the project:
Download the Epita Web Backend project file from Github :
In MongoDB (https://cloud.mongodb.com/), signin and create a new project and a Cluster.
And then paste the cluster link in ".env" file at "DB_URL=", which allow you to connect to the MangoDB.
Then install the MySQL database and setup every this and then create a Database named as "moviedb".
After that paste the root password in ".env" file at "PASSWORD=", which allow you to connect to the MySQL.
Finally install the "Visual Studio Code", then open the Epita Web Backend project file in it, which allow you to run the back end.

How to Run
After opening the project in "Visual Studio Code", open the terminal in the menu.
Then type "npm i" in terminal to intall the package file.
And type "nodemon" in terminal to start the backend, and connects the backend with database.
AFter the backend runs, you can see that the tables will be automatically cretated in MySQL database.