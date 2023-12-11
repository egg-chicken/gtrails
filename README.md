# GTRAILS

Gtrails is an app specifically meant for people who are interested in the outdoors. This is meant to inpire others to go explore outside. Users are able to create, delete, and edit locations.

<details>
<summary>Getting Started to run locally</summary>

   1. Clone this repository (only this branch)

   2. Install dependencies
         ```bash
         pipenv install -r requirements.txt
         ```

   3. Create a **.env** file based on the example with proper settings for your
      development environment

   4. Make sure the SQLite3 database connection URL is in the **.env** file

   5. This starter organizes all tables inside the `flask_schema` schema, defined
      by the `SCHEMA` environment variable.  Replace the value for
      `SCHEMA` with a unique name, **making sure you use the snake_case
      convention**.

   6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

      ```bash
      pipenv shell
      ```

      ```bash
      flask db upgrade
      ```

      ```bash
      flask seed all
      ```

      ```bash
      flask run
      ```

   7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

</details>
<p>&nbsp;</p>

[![alt text](./gtrails-homepage.png)](https://gtrails.onrender.com)
<p>&nbsp;</p>

## Technologies used:
- Flask
- React/Redux
- Javascript
- HTML/CSS


#### click here to navigate to the website: https://gtrails.onrender.com
