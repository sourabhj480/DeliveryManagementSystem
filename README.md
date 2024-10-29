**Clone the Repository**
open directory deliverymgm and frontend in terminals (use two diffrent terminals)
# Django Project Setup Guide

## Prerequisites
- **Python 3.x** installed on your system
- **Git** installed to clone the repository

## Setup Instructions

Create and activate a virtual environment to keep dependencies isolated.
python -m venv venv
Activate the Virtual Environment

On Windows:
venv\Scripts\activate

On macOS/Linux:
source venv/bin/activate

Install Project Dependencies
pip install -r requirements.txt

Set up the database by running migrations.
python manage.py migrate
python manage.py runserver

# React Project Setup Guide
## Prerequisites
- **Node.js** (version 14 or higher) and **npm** installed on your system
Install Dependencies

Use npm install to install all project dependencies specified in package.json.
npm install

Start the React development server.
npm start

check the url
http://localhost:3000/
