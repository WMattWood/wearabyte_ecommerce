# Wearabyte E-Commerce Project

This demo project was built with Joseph Surowaniec, Liam Gilmore, and Johnny Huang over the course of one week.  

Front End was built using React.js and styled-components.

Back End was built using Node.js, Express, and MongoDB as the database.

Task management was done using a Trello board with daily morning standup meetings and clearly defined milestones per day.

For this project, my role was primarily in coding the backend API in Node.js along with Liam Gilmore. For undisclosed reasons, we did not use any local or window storage and so all data regarding the active cart was stored directly in the MongoDB as a document.  This created some interesting challenges related to making realtime modifications to the cart, displaying those changes to the UI, and ensuring accurate synchronization between the UI and db regarding available quantities.  and much of the final troubleshooting and logic on this section was done by myself. I also ported in the search logic from an earlier project to allow automatic keyword matching from the items database.  The Front End was primarily handled by Johnny Huang and Joseph Surowaniec, although there was crossover when needed by all members of the team to pitch in and ensure the product was delivered.

This site is not currently hosted - however a brief demonstration of the functionality is shown in the video below.  

If you wish to download the package and check it out - you will need to first clone the repo to your local machine and then run `yarn install` followed by `yarn start` within the `client` and `server` folders respectively.  By default the locally run page will be available on `http://localhost:3000/`. 

Please note - as the `.env` file is not included you would need to provide your own `MONGO_URI` API key.  This API key can be stored in a variable called `MONGO_URI` in a file named `.env` which will need to be located in the server folder. The `batchImport.js` file can be run to load the included data set into your MongoDB service.



https://user-images.githubusercontent.com/47619076/222246052-32414004-00ce-4792-9bfc-024f59786e72.mov

