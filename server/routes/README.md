# REST API

The following HTTP methods are accepted.

## Students

### ```/api/students/```

Method | Description
--- | ---
GET | Retrieves all students in the database.

### ```/api/students/{idnum}```

Method | Description
--- | ---
GET | Retrieves a specific student gives his/her ```idnum```.

### ```/api/students/{idnum}/courses```

Method | Description
--- | ---
GET | Retrieves the courses that a student has enrolled in.
PATCH | Performs enlistment or dropping of the course of the student ```idnum```. Body must include the following: ``` { action, courses } ```. See [```studentController```](../controllers/studentController.js) for more details.

### ```/api/students/register```

Method | Description
--- | ---
POST | Adds a student to the database with the given data **in the body**.

## Courses

### ```/api/courses```

Method | Description
--- | ---
GET | Retrieves all courses.
POST | Adds a course to the database with the given data **in the body**.

### ```/api/courses/code/{courseCode}```

Method | Description
--- | ---
GET | Gets all courses that match the given ```courseCode```. (e.g. "CCAPDEV")

### ```/api/courses/number/{courseNum}```

Method | Description
--- | ---
GET | Returns the course corresponding to the given ```courseNum```.
PUT | Updates the course specified by ```courseNum``` and drops all students enlisted in it.
DELETE | Deletes the course specified by ```courseNum``` and drops all students enlisted in it.

### ```/api/courses/number/{courseNum}/students```

Method | Description
--- | ---
GET | Returns the class list of students enrolled in course ```courseNum```.

## Features to Be Implemented

- Enlistment and dropping of courses
