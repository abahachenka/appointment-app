Hey! This is a coursework project for my university. It might not look as fancy as it could be, but it does solve a problem and I got a good grade for it. 

This app is an automated appointment registration system for belarusian state clinics. 

The idea is the following: 

A clinic administrator is supposed to create an account on the the website. They add some basic info about the clinic, and send invitations to doctors to create their accounts. Because people in Belarus can only visit those clinics, which are closest to the place, where they live, clinic administrators need to add the locations of the areas, which they can provide service to. Then, each doctor adds appointment time data via their account. 

The patients visit the website, enter their home address, select the available clinic, select a type of doctor they need to see and then choose available time and date. Then, they make an appointment and get an electronic receipt. They can also cancel their appointment online using the receipt number. 


More details about the interface and the architecture, you can find in the pdf manual uploaded here. This is a part of the coursework report, so it's a bit lengthy and might contain a lot of "water", sorry for that. Use the table of contents to skip unnecessary info.

To run the project locally, complete the following steps:

1. Run `npm install` to install required packages
2. Run `gulp` to build the project
3. Run `npm start` to start a server

The API repo is available [here](https://github.com/abahachenka/appointment-app-api)
Api docs are not yet available.

[DEMO LINK](https://appointment-by.herokuapp.com/)
