import express, { Request, Response, Application } from 'express';
import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
import { applyFilters } from './filter';
import { Filter } from "./types"

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Fillout take-home app!');
})

app.get('/:formId/filteredResponses', async (req: Request, res: Response) => {
  try {
      const { API_KEY: apiKey, API_URL: apiUrl } = process.env;
      const formId = req.params.formId;
      const filtersQuery = req.query?.filters ?? null;
      const filters: Filter[] = filtersQuery ? JSON.parse(decodeURIComponent(filtersQuery as string)): [];
      
      const response = await axios.get(`${apiUrl}/${formId}`, {
          headers: {
              'Authorization': `Bearer ${apiKey}`
          }
      });

      const filteredQuestions = applyFilters(response.data, filters);
    
      res.json({...response.data, questions: filteredQuestions});
  } catch (error) {
    const isAxiosError = axios.isAxiosError(error);
    const errorMessage = isAxiosError ? error.response?.data?.message : 'An error occurred';
    const errorCode = isAxiosError ? (error.response?.status || 500) : 500

    res.status(errorCode).send(errorMessage);
  }
});

  

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
