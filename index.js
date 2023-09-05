const express = require('express');
const axios = require('axios');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

/**
 * Get a list of all countries with their names and alpha codes.
 * @returns {object[]} - List of countries with names and alpha codes.
 */
app.get('/countries', async (req, res) => {
  try {
    const response = await axios.get('https://restcountries.com/v2/all', {
      headers: { 'User-Agent': 'country-info-api' },
	  httpsAgent: httpsAgent
    });

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid response from the country API');
    }

    const countryList = response.data.map(country => {
      return {
        name: country.name,
        alpha2Code: country.alpha2Code
      };
    });

    console.log('Country list fetched successfully');
    res.json(countryList);
  } catch (error) {
    console.error('Error fetching country list:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching country data' });
  }
});

/**
 * Get detailed information about a specific country by its alpha code, including languages.
 * @param {string} alphaCode - The alpha code of the country.
 * @returns {object} - Detailed country information.
 */
app.get('/country/:alphaCode', async (req, res) => {
  try {
    const alphaCode = req.params.alphaCode;
    const response = await axios.get(`https://restcountries.com/v2/alpha/${alphaCode}`, {
      headers: { 'User-Agent': 'country-info-api' },
	  httpsAgent: httpsAgent
    });

    if (response.data) {
      const countryInfo = {
        name: response.data.name,
        capital: response.data.capital,
        population: response.data.population,
        currency: response.data.currencies[0].name,
        languages: response.data.languages
      };

      console.log(`Country information fetched for alpha code: ${alphaCode}`);
      res.json(countryInfo);
    } else {
      console.log(`Country not found for alpha code: ${alphaCode}`);
      res.status(404).json({ error: 'Country not found' });
    }
  } catch (error) {
    console.error('Error fetching country data:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching country data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
