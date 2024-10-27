# API Reference

### Home Route

#### Check if the server is working

```http
GET /api/v1/home
```

### User Routes

#### User Signup

```http
POST /api/v1/signup
```

| Parameter | Type   | Description                   |
| :-------- | :----- | :---------------------------- |
| email     | string | **Required**. User's email.  |
| password  | string | **Required**. User's password.|
| pname     | string | **Required**. User's first name. |
| sname     | string | **Required**. User's last name. |
| sclass    | string | **Required**. User's class.   |
| school    | string | **Required**. User's school.  |
| section   | string | **Required**. User's section. |
| society   | string | **Optional**. User's society name.|

---

### Circle Routes

#### Get Joined Circles

```http
GET /api/v1/circles/:userId
```

| Parameter | Type   | Description                          |
| :-------- | :----- | :----------------------------------- |
| userId    | string | **Required**. ID of the user.      |

---

#### Join a New Circle

```http
POST /api/v1/circles/join
```

| Parameter | Type   | Description                          |
| :-------- | :----- | :----------------------------------- |
| userId    | string | **Required**. ID of the user joining the circle. |
| circleId  | string | **Required**. ID of the circle to join.|

---

#### Get Circle Members

```http
GET /api/v1/circles/:circleId/members
```

| Parameter  | Type   | Description                          |
| :--------- | :----- | :----------------------------------- |
| circleId   | string | **Required**. ID of the circle.     |

---

### Post Routes

#### Get Posts in a Circle

```http
GET /api/v1/circles/:circleId/posts
```

| Parameter  | Type   | Description                          |
| :--------- | :----- | :----------------------------------- |
| circleId   | string | **Required**. ID of the circle.     |

---

#### Get Replies to a Post

```http
GET /api/v1/posts/:postId/replies
```

| Parameter  | Type   | Description                          |
| :--------- | :----- | :----------------------------------- |
| postId     | string | **Required**. ID of the post.       |

---

#### Upvote a Post

```http
PUT /api/v1/posts/upvote
```

| Parameter  | Type   | Description                          |
| :--------- | :----- | :----------------------------------- |
| postId     | string | **Required**. ID of the post to upvote.|

---

#### Downvote a Post

```http
PUT /api/v1/posts/downvote
```

| Parameter  | Type   | Description                          |
| :--------- | :----- | :----------------------------------- |
| postId     | string | **Required**. ID of the post to downvote.|

---

#### Create a New Post

```http
POST /api/v1/posts/new
```

| Parameter  | Type   | Description                          |
| :--------- | :----- | :----------------------------------- |
| content    | string | **Required**. Content of the new post.|
| userId     | string | **Required**. ID of the user creating the post.|
| circleId   | string | **Optional**. ID of the circle where the post is created.|

---

#### Reply to a Specific Post

```http
POST /api/v1/posts/reply/new
```
| Parameter  | Type   | Description                          |
| :--------- | :----- | :----------------------------------- |
| postId     | string  | **Required**. ID of the post being replied to.|
| content     |string  | **Required**. Content of the reply.|
| userId      |string  | **Required**. ID of the user making the reply.|

---
