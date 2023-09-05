# Country Info API

A simple Node.js application that fetches and provides information about countries using the Restcountries API.

## Features

- Get a list of all countries with their names and alpha codes.
- Get detailed information about a specific country by its alpha code, including languages, capital, population, and currency.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/country-info-api.git
cd country-info-api
```

2. Install dependencies:

```bash
npm install
```

## Usage

Start the server:

```bash
node index.js
```

### Get List of Countries

Send a GET request to the `/countries` endpoint to retrieve a list of all countries along with their names and alpha codes.

**Endpoint:** `/countries`

**Method:** GET

**Example Request:**

```http
GET http://localhost:3000/countries
```

**Example Response:**

```json
[
  {
    "name": "Afghanistan",
    "alpha2Code": "AF"
  },
  {
    "name": "Albania",
    "alpha2Code": "AL"
  },
  // ... other countries ...
]
```

This endpoint allows you to fetch a list of countries available in the Restcountries API. Each country object in the response includes the name of the country and its alpha-2 code.

The endpoint returns a JSON array containing objects for each country. You can use this information for various purposes, such as populating dropdowns or generating dynamic content based on country selection.

### Get Country Information

Send a GET request to the `/country/:alphaCode` endpoint to retrieve detailed information about a specific country, including its name, capital, population, currency, and languages.

**Endpoint:** `/country/:alphaCode`

**Method:** GET

**Parameters:**
- `alphaCode` (Path Parameter): The alpha-2 code of the country (e.g., `US` for the United States).

**Example Request:**

```http
GET http://localhost:3000/country/TR
```

**Example Response:**

```json
{
  "name": "Turkey",
  "capital": "Ankara",
  "population": 84339067,
  "currency": "Turkish lira",
  "languages": [
    {
      "iso639_1": "tr",
      "iso639_2": "tur",
      "name": "Turkish",
      "nativeName": "Türkçe"
    }
  ]
}
```

## Contributing

Contributions are welcome! Feel free to submit issues, pull requests, or feedback in the GitHub repository.
