import express, { Request, Response, Application } from 'express';
import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
import { applyFilters } from './filter';
import { Filter } from "./types"

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;


app.get('/:formId/filteredResponses', async (req: Request, res: Response) => {
    try {
        const { API_KEY: apiKey, API_URL: apiUrl } = process.env;
        const formId = req.params.formId;
        const filtersQuery = req.query?.filters ?? null;
        const filters: Filter[] = filtersQuery ? JSON.parse(decodeURIComponent(filtersQuery as string)): [];
        
        const response: AxiosResponse = await axios.get(
          `${apiUrl}/${formId}`, {
              headers: {
                  'Authorization': `Bearer ${apiKey}`
                }
        });

        const filteredQuestions = applyFilters(response.data, filters);
      
        res.json({...response.data, questions: filteredQuestions});
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
      res.status(500).json(error);
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
