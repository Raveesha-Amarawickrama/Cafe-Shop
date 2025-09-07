 **Cafe-Shop**

## Overview

**Cafe-Shop** is a modern, web-based application crafted to streamline cafe operations—from managing inventory and staff to handling orders—efficiently and effectively.
Built using JavaScript technologies, it comprises two main components:

* **FrontEnd** – React.
* **BackEnd** – Express js,Node Js.
* **Data Base** - Mongo DB


## Features

* Modern, sleek web-based interface
* Likely includes:

  * Order processing
  * Payment
  * admin- user Mangement,Menu Managment
 
## Project Structure

```
/ (root)
├── BackEnd/      – Backend source code
├── FrontEnd/     – Frontend source code
├── project/      – Additional files (e.g., documentation)
└── project.mp4   – Demo or presentation video
```

## Setup & Installation

**Prerequisites:**

* Node.js (v14+ recommended)
* npm 

**Steps:**

```bash
# Clone the repo
git clone https://github.com/Raveesha-Amarawickrama/Cafe-Shop.git
cd Cafe-Shop

# Install dependencies
cd BackEnd
npm install

cd ../FrontEnd
npm install
```

---

## Scripts & Usage

Add or modify based on actual contents:

```bash
# In the BackEnd folder
npm start        # Start backend (e.g., API server)

# In the FrontEnd folder
npm start        # Launch dev server and open UI
npm run build    # Build optimized production assets
```

---

## Configuration

* Create a `.env` file in `BackEnd` and `FrontEnd` .
* Provide configuration for:

# Server Configuration
PORT=3000
NODE_ENV=development
FRONTEND_URL=https://localhost:5173

# JWT Configuration
JWT_SECRET=your-super-secure-jwt-secret-key-change-this-in-production
JWT_EXPIRE=7d

STRIPE_SECRET_KEY=your-super-secure--secret-key

# Auth0 Configuration
Front End
VITE_AUTH0_DOMAIN=       # e.g., cafecore.us.auth0.com
VITE_AUTH0_CLIENT_ID=
VITE_AUTH0_AUDIENCE=https://cafe-core-api

BackEnd
PORT=3000
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRE=1d
STRIPE_SECRET_KEY=
AUTH0_DOMAIN=
AUTH0_AUDIENCE=https://cafe-core-api

---


## Contact

For questions or feedback, please reach out to **Raveesha Amarawickrama** via GitHub.



[1]: https://github.com/Raveesha-Amarawickrama/Cafe-Shop.git "GitHub - Raveesha-Amarawickrama/Cafe-Shop: Cafe Shop is a modern web-based application designed for managing a cafe's operations efficiently"
