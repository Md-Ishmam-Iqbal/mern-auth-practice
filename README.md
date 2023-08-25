# mern-auth-boilerplate

This is my mern-auth backend boilerplate to be used on other applications that uses the same stack.

Inspired from the mern auth implementation [tutorial](https://youtu.be/R4AhvYORZRY) by traversy media.

## Run it on your local machine via docker

- Make sure you have docker installed in your local machine
- Clone the repo in your desired directory
  - `git clone git@github.com:Md-Ishmam-Iqbal/mern-auth-practice.git mern-auth`
- Run the app
  - `cd mern-auth`
  - `docker compose up`

The app should be running on http://localhost:3000

## For practice

The frontend is just a placeholder so one can delete everything for the backend and use it as practice to build authentication via MongoDB, Node and express. There is this repo for your reference of how I implemented the backend. Its far from perfect, so feel free to file an issue and suggest improvements.

### File structure

The backend dependencies are in the root directory while the frontend has its own directory containing its dependencies. You will notice there are no package.json file in the backend directory but there is a package.json file in the frontend directory.

### Frontend template

I made a repo containing the [frontend template](https://github.com/Md-Ishmam-Iqbal/mern-auth-backend-practice-template/tree/main) for practice and there are further guidelines in that repo for you to follow along.
