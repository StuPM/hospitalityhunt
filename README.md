# Hospitality Hunt

Hospitality Hunt connects freelancers and businesses in the hospitality industry who are looking for and advertising jobs.

## Live link

[Hospitality Hunt](https://hospitalityhunt-production.up.railway.app/) / [Backend](https://github.com/StuPM/hospitalityhunt-back-end)

## Features

Through the signup page, users are able to create an account as a freelancer or a business. Via sha256 and added salt, passwords are securely saved in the database against the supplied email.

Freelancers and then complete their profile, including what sector they want to work in, what type of contract they are looking for and take a photo of themselves through their webcam.
They will then have access to a list of available jobs matching their profile, which can be filtered and sorted.

Businesses can then also complete their profile, detailing what their business does and can also post one or more job listings, which can be edited or deleted when needed.
They will then have access to a list of freelancers who match their criteria.

## Technology Stack

- [React](https://react.dev/)
  - Using functional components to create the website.
- [Redux](https://react-redux.js.org/)
  - To facilitate the storing of data on the user's local computer, through browser local storage and state.
- Validation and security
  - User inputs validated through the [JOI](https://joi.dev/) data validator.
  - Security provided by encrypting passwords with SHA256 and token management.
- SQL database
  - Designed and managed through phpMyAdmin, with a backend developed to connect the front to the database.
- HTML5, CSS3 and JavaScript.

## Authors

This project was built in the context of the 2023 full-time Software Engineering bootcamp run by [The Jump Digital School](https://www.thejump.tech/).

The authors of the project are:

- [Stuart McGee](https://github.com/StuPM)
- [Amelia Qualtrough](https://github.com/Amelia-Q)
- [Dan Smith](https://github.com/dsmithwd)
- [Sze Pui Lam Bernie](https://github.com/BernieLAM)
- [Yahya Yusuf](https://github.com/YYusuf-Dev)
- [Yusuf Yusuf](https://github.com/yyusuf91)
- [Russell Wilkes (Teacher)](https://github.com/russell-gh)
