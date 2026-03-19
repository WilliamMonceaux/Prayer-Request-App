# Prayer Request App

## Overview

The Prayer Request App is a dedicated sanctuary designed to foster spiritual support and community connection. By creating a personal account, users join a supportive network where they can share their hearts and lift others up. The platform empowers members to submit prayer requests to a public board, manage their active requests through a personal dashboard, and tailor their profile settings to stay connected with the community.

## Goal

The heart of this platform is to provide a digital sanctuary where you can escape the noise of life and find true reassurance through the power of communal prayer. We are dedicated to building a space for collective intercession, ensuring that no one has to carry their burdens alone while fostering a community that intentionally lifts one another up. By offering a quiet corner for scriptural grounding, we aim to help you find the guidance and strength needed to navigate life’s problems with peace. Ultimately, our goal is to facilitate authentic connection, creating an environment where seeking help is embraced as a vital step toward healing and spiritual growth.

## Resources used

**Frontend & UI**
* **Next.js** - Core framework
* **Material UI (MUI)** - Component library
* **Emotion** - CSS-in-JS styling engine
* **Fontsource** - Lato and Roboto typography

**Backend & Database**
* **Mongoose** - MongoDB object modeling
* **JSONWebToken (JWT)** - Secure user authentication
* **Bcryptjs** - Password hashing and security
* **Formidable** - Handling form data and file uploads

**Utilities**
* **Date-fns** & **Dayjs** - Date and time manipulation
* **Dotenv** - Environment variable management

**Tools**
* **Figma** - https://www.figma.com/design/SF2rosZ8WndjtxoK156PG4/Capstone-project?node-id=0-1&p=f&t=7KwcTykKyDnFRMfZ-0
* **API-testing** - Thunder Client
* **Icons** - Flaticon & MUI Icons
* **Unit Testing** - Jest, SuperTest

**Deployment**
* **AWS App Runner**
* **AWS EC2 (Elastic Compute Cloud)**
* **Amazon S3**

## Local Development Setup

Follow these steps to get a local copy of the project up and running.

**prerequisites**
* Node.js (v18.0.0 or higher recommended)
* npm (comes with Node.js)
* MongoDB Atlas account (or a local MongoDB instance)
* AWS Account (for S3 bucket access)

**Clone The Repository**
```bash
git clone https://github.com/WilliamMonceaux/M11-Capstone-Project.git
cd M11-Capstone-Project
```

**Install Dependencies**
```bash
npm install
```

**Environment Configuration**
* Create a .env file in the root directory and add the following keys:
```bash
MONGO_URI=your_mongodb_uri
PORT=3000
JWT_SECRET=your_secret_key
AWS_REGION=your_region
AWS_S3_BUCKET_NAME=your_bucket_name
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

**Run the Project**
```bash
npm run dev
```

