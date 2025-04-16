# 📍 Lieux – A Minimalist Social Platform for Places

**Lieux** (French for *places*) is a minimalist social media platform designed for storytelling through locations. It allows users to share their favorite spots around the world, attach live maps, upload images, and explore places loved by others.

Whether it’s a café in Paris, a hidden beach in Bali, or your college library — **Lieux** is where people connect through geography and memory.

---

## 🛠️ Backend – Scalable & Expressive with Node.js, Express, and MongoDB

The backend of Lieux is built with **Node.js** and **Express.js**, forming a lightweight yet powerful API layer. It interfaces with a **MongoDB** database via **Mongoose**, enabling flexible, schema-based storage of user data and locations.

### 🔧 Core Architecture

- **RESTful API Design**: Endpoints for places and users follow REST conventions, enabling clean integration and future extensibility.
- **Express Routers**: Modular route handling separates logic for `/places` and `/auth`, making the codebase organized and scalable.
- **Asynchronous Handling**: Leveraging Node.js’s non-blocking I/O model ensures efficient performance under concurrent requests.

### 🗃️ MongoDB + Mongoose for Flexible Data Modeling

- **Document-Oriented Storage**: Places and users are stored as MongoDB documents with support for nested structures (e.g., coordinates, image paths).
- **Schema Validation**: Mongoose enforces data types, required fields, and relations — providing structure to otherwise flexible JSON.

### 🖼️ Image Uploads with MulterJS

- Uses **Multer** to handle image uploads from users when they post a new place or a user's display picture when a new user sign-up.
- Images are stored in **Google Cloud Storage Buckets**, with its location being stored in mongoDB collection to its corresponding place and user.

### 🧱 Middleware & Validation

- **Custom Middleware** for validating data on each request ensures only well-formed content hits the database.
- Error handling is centralized to capture and format all thrown errors into user-friendly API responses.

### 🚀 Performance Optimizations

- **Pagination** strategies ensure fast response even with large datasets.
- MongoDB **indexes** on common query fields (e.g., user ID, timestamps) drastically reduce lookup times.

---

## 🌐 Frontend – Built with ReactJS, Bootstrap, and Smooth UX

The frontend is a responsive single-page application (SPA) built using **ReactJS** and **Bootstrap**. It focuses on simplicity, speed, and seamless interaction.

### ⚛️ Component-Based Structure

- Every feature, from map rendering to image upload, is encapsulated in a **dedicated React component**, making the code reusable and maintainable.
- Navigation across routes is handled via **React Router**, delivering fast, client-side transitions without reloads.

### 🔁 State Management with Hooks

- Built-in React hooks like `useState`, `useEffect`, and `useContext` manage all reactive data — from user sessions to location markers.
- Real-time UI updates reflect every place addition, deletion, or edit without a single refresh.

### 💬 Interactive Modals & User Feedback

- Components like `ErrorModal`, `LoadingSpinner`, and `ModalOverlay` create a rich UX.
- Smooth entrance and exit animations powered by **React Transition Group** enhance usability.

### 🧭 SideDrawer Navigation

- A sliding **SideDrawer** menu provides quick access to key features like:
  - All Users
  - My Places
  - Add New Place
- Combined with a **Backdrop overlay** and CSS transitions, the drawer creates a mobile-friendly, modern UI flow.

### 📥 Form Handling & Validation

- Custom form validators like `VALIDATOR_REQUIRE` and `VALIDATOR_MINLENGTH` ensure users input meaningful and complete data before submitting.
- Client-side checks prevent unnecessary API calls, keeping things fast and clean.

---

## 🔐 Authentication – Secured via Context API

Authentication is implemented using **React Context API**, enabling seamless global state without prop drilling.

### 🧠 Context-Driven Auth Management

- Auth state (`isLoggedIn`, `token`, `userId`) is shared across the app via a centralized `AuthContext`.
- Based on login state, the UI conditionally renders:
  - "MY PLACES" and "ADD PLACE" links for logged-in users
  - "AUTHENTICATION" link for guests

### 🖼️ Avatar & Persistent Sessions

- User avatars are dynamically rendered via `process.env.REACT_APP_ASSET_URL`.
- Auth tokens and session state are stored in `localStorage` for persistence across browser reloads.
- Logout clears both local storage and context, resetting the app state cleanly.

---

## 🗺️ Interactive Maps – Google Maps JavaScript API

Lieux integrates **Google Maps API** to visually plot shared locations.

### 🗺️ Dynamic Map Rendering
### 📍 Custom Markers with AdvancedMarkerElement

- Uses Google’s **AdvancedMarkerElement** for customizable and high-performance markers.
- Markers update automatically when map center or data props change.
- Google Maps libraries are lazily imported with `importLibrary('marker')` to reduce initial load time.

---

## 🧪 Tech Stack Overview

| Layer        | Tech Stack                          | Purpose                                |
|--------------|--------------------------------------|------------------------------------------|
| Frontend     | ReactJS, Bootstrap, CSS              | SPA, UI Components, Routing              |
| Backend      | Node.js, Express.js                  | REST API, Routing, Middleware            |
| Database     | MongoDB, Mongoose                    | Data Storage & Validation                |
| Media Storage| Google Cloud Storage Buckets         | To dynamically store and retrieve images |
| Auth         | JWT, React Context API               | Secure User Login & State                |
| Media Upload | MulterJS                             | Image Uploads                            |
| Maps         | Google Maps JavaScript API           | Interactive Map Embedding                |

---

## 🔮 Planned Enhancements

- 🔍 **Introduce tag-based search & filtering** for discovering specific types of places.
- 📲 **Push notifications** for new places from followed users.
- 🗺️ **Map clustering and heatmaps** to better visualize dense regions.

---

## 📌 Summary

**Lieux** is more than just a map app — it’s about turning locations into stories. From its RESTful backend to its smooth, real-time frontend, every part of the system is built with performance, usability, and creativity in mind.

Whether you’re sharing your favorite coffee shop or discovering a friend’s secret hiking spot, **Lieux** makes it personal, visual, and delightful.

---


Authentication landing pages:</br>
<img width="800" alt="LOGIN" src="https://github.com/user-attachments/assets/bd0259f1-c74f-443d-aa39-6fd9151778ab" /></br>
<img width="800" alt="SignUp" src="https://github.com/user-attachments/assets/7c74b17c-8f1a-4c61-82f2-c426c23988a0" /></br></br>
Main experience page:</br>
<img width="800" alt="HomePage" src="https://github.com/user-attachments/assets/f9110747-eed4-4cfb-8aa7-2af31e95a560" /></br></br>
Individual user places page:</br>
<img width="800" alt="location" src="https://github.com/user-attachments/assets/25bf90e9-3d9f-4b91-9d9d-af0ee19b2a9b" /></br></br>
Live map rendering of individual places:</br>
<img width="800" alt="map" src="https://github.com/user-attachments/assets/54144f91-def9-4c7c-99a5-0a4ee2196b4f" /></br>
<img width="800" alt="sat_view" src="https://github.com/user-attachments/assets/31f7cdaf-b563-42be-863a-db6f179e6b1a" /></br></br>
Responsive to mobile screen:</br>
<img width="400" alt="Screenshot 2025-03-13 at 1 26 00 PM" src="https://github.com/user-attachments/assets/ce43b237-7e9e-46ec-8ac7-3c9b31796950" /></br>
<img width="400" alt="Screenshot 2025-03-13 at 1 38 37 PM" src="https://github.com/user-attachments/assets/99e85add-e788-4d13-988b-13eb5edef2ba" />
