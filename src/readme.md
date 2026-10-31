# React TV Show Gallery

A searchable TV show gallery single-page application built with React, Vite, and React Router, utilizing the public TVmaze API.

## How to Run the Project
1. Clone the repository or download the source code.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the local development server.
4. Open the provided local URL (e.g., `http://localhost:5173/`) in your browser.

## Required React Concepts Table

| Required Concept | File Where It Appears |
| :--- | :--- |
| **1. Components & Props** | `src/components/ShowCard.jsx`, `src/components/SearchForm.jsx`, etc. |
| **2. Lists & Keys** | `src/components/ShowList.jsx`, `src/components/CastList.jsx` |
| **3. Conditional Rendering** | `src/components/ShowList.jsx`, `src/pages/ShowDetail.jsx` |
| **4. Controlled Form** | `src/components/SearchForm.jsx` |
| **5. State** | `src/App.jsx`, `src/components/ShowCard.jsx` |
| **6. Effects & Fetch** | `src/App.jsx`, `src/components/ShowCard.jsx` |
| **7. Lifted State** | `src/App.jsx` (shares search query/results with children) |
| **8. Routing & URL Params** | `src/App.jsx`, `src/pages/ShowDetail.jsx` (uses `useParams`) |

## Reflection
Building this TV show gallery in React was notably cleaner and more modular than the vanilla JavaScript version. In vanilla JS, managing DOM elements, manually creating elements with `document.createElement`, and updating UI states on user input required a lot of repetitive, imperative boilerplate code. React's declarative nature made it much easier to synchronize the UI directly with application state. 

State in this app lives primarily in `App.jsx` for top-level concerns like the search query, fetched show results, and loading statuses. This state is "lifted" so that both the search form (which modifies the query) and the gallery/list component (which displays the results) can share and react to the same data. Additionally, individual components like `ShowCard` manage their own local state for secondary data fetching (such as loading the cast list per show), isolating concerns cleanly and preventing a failed cast request from crashing the entire gallery view.