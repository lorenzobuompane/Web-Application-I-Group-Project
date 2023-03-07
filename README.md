# BigLab 2

## Team name: cyberweb

Team members:
* s304930 BUOMPANE LORENZO
* s305954 DEMATTIA GIACOMO  
* s305959 CHESSA MARCO

## Instructions

A general description of the BigLab 2 is avaible in the `course-materials` repository, [under _labs_](https://polito-wa1-aw1-2022.github.io/materials/labs/BigLab2/BigLab2.pdf). In the same repository, you can find the [instructions for GitHub Classroom](https://polito-wa1-aw1-2022.github.io/materials/labs/GH-Classroom-BigLab-Instructions.pdf), covering BigLabs and exam sessions.

Once you cloned this repository, please write the group name and names of the members of the group in the above section.

In the `client` directory, do **NOT** create a new folder for the project, i.e., `client` should directly contain the `public` and `src` folders and the `package.json` files coming from BigLab1.

When committing on this repository, please, do **NOT** commit the `node_modules` directory, so that it is not pushed to GitHub.
This should be already automatically excluded from the `.gitignore` file, but double-check.

When another member of the team pulls the updated project from the repository, remember to run `npm install` in the project directory to recreate all the Node.js dependencies locally, in the `node_modules` folder.
Remember that `npm install` should be executed inside the `client` and `server` folders (not in the `BigLab2` root directory).

Finally, remember to add the `final` tag for the final submission, otherwise it will not be graded.

## Registered Users

Here you can find a list of the users already registered inside the provided database. This information will be used during the fourth week, when you will have to deal with authentication.
If you decide to add additional users, please remember to add them to this table (with **plain-text password**)!

| email | password | name |
|-------|----------|------|
| john.doe@polito.it | password | John |
| mario.rossi@polito.it | password | Mario |
| testuser@polito.it | password | User test |

## List of APIs offered by the server

### __Get all films__
* URL: `/api/v1/films`
* HTTP Method: GET
* Description: Return the list of the films of the logged user
* Request body: _None_
* Response: `200 OK`(success) or `500 Internal Server Error` (generic error) or `400 Bad Request` (not authenticated)
* Response body: 
```
[
	{
		"id": 4,
		"title": "Cars3",
		"favorite": 0,
		"watchdate": "2022-05-27",
		"rating": 4,
		"user": 2
	},
	{
		"id": 5,
		"title": "Shrek",
		"favorite": 0,
		"watchdate": "2022-03-21",
		"rating": 3,
		"user": 2
	}
]
```
* Error response: 
```
For 400 Bad Request status:
{
	"message": "Not authenticated"
}
```

### __Get selected film__
* URL: `/api/v1/films/:id`
* HTTP Method: GET
* Description: Return the selected film of the logged user
* Request body: _None_
* Response: `200 OK`(success) or `500 Internal Server Error` (generic error) or `404 Not found` (film doesn't exist) or `400 Bad Request` (not authenticated)
* Response body: 
```
{
	"id": 4,
	"title": "Matrix",
	"favorite": 0,
	"watchdate": null,
	"rating": null,
	"user": 2
}
```
* Error response: 
```
For 400 Bad Request status:
{
	"message": "Not authenticated"
}
```

### __Filter films__
* URL: `/api/v1/films/filter/:filter`
* HTTP Method: GET
* Description: Return the list of films filtered according to the filter in the parameters
* Request body: _None_
* Response: `200 OK`(success) or `500 Internal Server Error` (generic error) or `400 Bad Request` (not authenticated)
* Response body: 
```
For unseen filter
[
	{
		"id": 4,
		"title": "Matrix",
		"favorite": 0,
		"watchdate": null,
		"rating": null,
		"user": 2
	}
]
```
* Error response: 
```
For 400 Bad Request status:
{
	"message": "Not authenticated"
}
```

### __Insert new film__
* URL: `/api/v1/films/`
* HTTP Method: POST
* Description: Create a new film
* Request body: 
```
{
        "title": "Cars",
        "favorite": 1,
        "watchdate": "27/05/2022",
        "rating": 5,
        "user": 1
}
```
* Response: `201 OK`(success) or `503 Internal Server Error` (generic error) or `400 Bad Request` (not authenticated)
* Response body: _None_
* Error response: 
```
For 400 Bad Request status:
{
	"message": "Not authenticated"
}
```

### __Modify selected film__
* URL: `/api/v1/films/:id`
* HTTP Method: PUT
* Description: Modify the selected film of the logged user
* Request body: 
```
{
	"id": 4,
	"title": "Matrix",
	"favorite": 0,
	"watchdate": null,
	"rating": null
}
```
* Response: `200 OK`(success) or `500 Internal Server Error` (generic error) or `404 Not found` (film doesn't exist) or `400 Bad Request` (not authenticated)
* Response body: _None_
* Error response: 
```
For 400 Bad Request status:
{
	"message": "Not authenticated"
}
```

### __Set favorite/unfavorite__
* URL: `/api/v1/films/:id/favorite`
* HTTP Method: PUT
* Description: Modify favorite in line of the selected film of the logged user
* Request body: _None_
* Response: `200 OK`(success) or `500 Internal Server Error` (generic error) or `404 Not found` (film doesn't exist) or `400 Bad Request` (not authenticated)
* Response body: _None_
* Error response: 
```
For 400 Bad Request status:
{
	"message": "Not authenticated"
}
```

### __Delete film__
* URL: `/api/v1/films/:id`
* HTTP Method: DELETE
* Description: Delete the selected film of the logged user
* Request body: _None_
* Response: `204 OK`(success) or `500 Internal Server Error` (generic error) or `404 Not found` (film doesn't exist) or `400 Bad Request` (not authenticated)
* Response body: _None_
* Error response: 
```
For 400 Bad Request status:
{
	"message": "Not authenticated"
}
```

### __Login__
* URL: `/api/v1/login`
* HTTP Method: POST
* Description: Authenticate the user
* Request body: 
```
{
	"username" : "mario.rossi@polito.it",
	"password" : "password"
}
```
* Response: `200 OK`(success)
* Response body: 
```
{
	"id": 2,
	"name": "Mario",
	"email": "mario.rossi@polito.it"
}
```


### __Logout__
* URL: `/api/v1/logout`
* HTTP Method: POST
* Description: Logout of logged user
* Request body: _None_
* Response: `200 OK`(success) or `400 Bad Request` (not authenticated)
* Response body: _None_
* Error response: 
```
For 400 Bad Request status:
{
	"message": "Not authenticated"
}
```

