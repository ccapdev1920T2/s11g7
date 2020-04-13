# ANIMOSIS Frontend

## Project setup

### 1) Install node.js in project
```
npm install
```

### 2) Compiles and hot-reloads for development
```
npm run serve
```
### ---------------------------------

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Views

### Student

#### Log in

*Login is not yet implemented.* Clicking the login button will redirect to the manage courses page. The student currently logged in is assumed have the ID 11828498.

#### Register

Input the details of the student to register and click on the register button below. *Email confimation is not yet implemented.*

#### Search courses

This allows the student to search for all available courses. Type a course code (e.g. "CCAPDEV") to view the list of courses along with their corresponding times. Check any courses that you want to enlist in and click the "Add courses" button.

#### Manage courses

This shows a calendar view of the currently logged in student's schedule. Here they can also drop any course they are enlisted in. Check any course that you would like to drop and click the "Remove courses" button.

### Admin

#### Add course

Input the details of the course as specified in the form and click the add button.

#### Edit course

Click on the manage button, edit the course as specified in the form and click the update button.

#### Delete course

Click on the manage button, then click on the delete button.
