# Project Overview

### Project Links

- [Frontend - Deployed](https://giveaway-kck.netlify.app/)
- [Frontend - Github](https://github.com/kndshein/ProjectThree-Frontend)
- [Backend - Deployed](https://giveaway-kck.herokuapp.com/)
- [Backend - Github](https://github.com/kndshein/ProjectThree-Backend)

### Project Description

An e-commerce webapp where users can create a profile to giveaway items. Users can also

# Project Planning

### Wireframes

- [Mobile]
- [Tablet]
- [Desktop]
- [React Architecture](https://docs.google.com/drawings/d/1SXtZHHoyvBN9LyvzRCznBXgXRc66gbG7-O_1b89FF0c/edit?usp=sharing)

<details>
<summary>Models</summary>

```
// Donor Model Schema
const donorSchema = new Schema{
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
}

// Item Model Schema
const itemSchema = new Schema{
    img: Array,
    name: { type: String, required: true },
    description: String,
    available: { type: Boolean, required: true , default: true }
    shipping: String,
    donor: {
        type: Schema.Types.ObjectId,
        ref: "Donor",
    }
}
```

</details>

### Architectures

### User Stories

##### Free Stuff Seekers

- As a seeker, I can browse the items.
- As a seeker, I can select an item.
- As a seeker, I can add items into my cart.
- _As a seeker, I can make transactions. (Post-MVP)_

##### Free Stuff Donators

- As a donator, I can list items to give away.
- AS a donator, I can update my existing listings.
- As a donator, I can also be a seeker.
- As a donator, I can see that a seeker has checked out my item.
- _As a donator, I can accept transactions for shipping. (Post-MVP)_

### MVP / Post-MVP

##### Frontend MVP

| Component                | Priority | Estimated Time | Actual Time |
| ------------------------ | :------: | :------------: | :---------: |
| React: Create Components |    H     |     3 hrs      |             |
| React: Routes for API    |    H     |     2 hrs      |             |
| React: Mapping API       |    H     |     5 hrs      |             |
| React: States            |    H     |     10 hrs     |             |
| CSS: Design              |    H     |     25 hrs     |             |
| **Total**                |          |   **45 hrs**   |             |

##### Frontend Post-MVP

| Component               | Priority | Estimated Time | Actual Time |
| ----------------------- | :------: | :------------: | :---------: |
| Credit Card transaction |    H     |     5 hrs      |             |
| Profile Login           |    H     |     5 hrs      |             |
| Profile Information     |    H     |     5 hrs      |             |
| Sort or Search Items    |    H     |     5 hrs      |             |
| React: Global State     |    M     |     3 hrs      |             |
| Image Carousel          |    M     |     3 hrs      |             |
| Image Upload            |    L     |     5 hrs      |             |
| "Thanks for Purchasing" |    L     |     3 hrs      |             |
| **Total**               |          |   **34 hrs**   |             |

##### Backend MVP

| Component        | Priority | Estimated Time | Actual Time |
| ---------------- | :------: | :------------: | :---------: |
| Login Profile    |    H     |     10 hrs     |             |
| Creating Routes  |    H     |     10 hrs     |             |
| Models / Schemas |    H     |     5 hrs      |             |
| Seed Files       |    H     |     5 hrs      |             |
| **Total**        |          |   **30 hrs**   |             |

##### Backend Post-MVP

| Component                  | Priority | Estimated Time | Actual Time |
| -------------------------- | :------: | :------------: | :---------: |
| if (Login) then (Cart API) |    H     |     10 hrs     |             |
| "Sold" API                 |    H     |     5 hrs      |             |
| Stripe                     |    M     |     10 hrs     |             |
| Login for Buyer            |    L     |     10 hrs     |             |
| **Total**                  |          |   **35 hrs**   |             |

### Time Frames

| **Day**   | **Date**  | **Minimum Frontend**              | **Minimum Backend**  |
| --------- | --------- | --------------------------------- | -------------------- |
| Sunday    | 2/7/2021  | Components                        | Models, Seed, Routes |
| Monday    | 2/8/2021  | Mobile Styling, States            | Login Profiles       |
| Tuesday   | 2/9/2021  | Desktop Styling                   | Start Post-MVP       |
| Wednesday | 2/10/2021 | Responsive Design, Start Post-MVP | Continue Post-MVP    |
| Thursday  | 2/11/2021 | Final Touches                     | Final Touches        |

### Routes

| **URL**                | **HTTP Verb** | **Action** | **Description**    |
| ---------------------- | ------------- | ---------- | ------------------ |
| /api/donors            | GET           | show       | get all donors     |
| /api/donors/id/:id     | GET           | show       | get donor by id    |
| /api/donors            | POST          | create     | create a new donor |
| /api/donors/id/:id     | PUT           | update     | update a donor     |
| /api/items             | GET           | show       | get all items      |
| /api/items/id/:id      | GET           | show       | get item by id     |
| /api/items/id/:donorId | POST          | create     | create a new item  |
| /api/items/id/:id      | PUT           | update     | update a item      |

## Additional Libraries

- Dummy Text

## Code Snippet

```
function reverse(string) {
	// here is the code to reverse a string of text
}
```
