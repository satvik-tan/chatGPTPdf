import {Hono} from 'hono';
import { generatePdfService } from '../service/puppeteer';

const app = new Hono();

app.post('/generate', (c) => generatePdfService(c));
