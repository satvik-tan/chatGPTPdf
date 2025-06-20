import { Hono } from 'hono'
import { generatePdfService } from './service/puppeteer'

// Define the bindings from wrangler.jsonc for type safety


const app = new Hono()

// A simple root endpoint to check if the worker is running
app.get('/', (c) => {
  return c.text('Hono worker is running! Send a POST to /generate.')
})

// The main route for generating a PDF
app.post('/generate', (c) => generatePdfService(c))

export default app
