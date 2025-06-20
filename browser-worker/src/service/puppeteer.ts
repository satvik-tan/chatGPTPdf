/// <reference lib="dom" />
import puppeteer from "@cloudflare/puppeteer";
import { Context } from 'hono';

const generateDocument = (article: string) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Generated PDF</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
            }
            h1 {
                color: #333;
            }
            </style>
        </head>
        <body>
         ${article}
        </body>
        </html>
    `;
};

export async function generatePdfService(c: Context) {
    try {
        const { url } = await c.req.json();
        if (!url) {
            return c.text("Please provide a 'url' in the request body.", 400);
        }

        const browser = await puppeteer.launch(c.env.BROWSER);
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        // This is an example selector. You will need to inspect a ChatGPT
        // share page to find the correct selector for the conversation content.
        const articleContent = await page.evaluate(() => {
            const mainContent = document.querySelector('h1');
            return mainContent ? mainContent.innerHTML : 'Content not found.';
        });

        const documentHtml = generateDocument(articleContent);
        await page.setContent(documentHtml, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
        });

        await browser.close();

        c.header('Content-Type', 'application/pdf');
        c.header('Content-Disposition', 'attachment; filename="conversation.pdf"');
        return c.body(pdfBuffer);

    } catch (error: any) {
        console.error("Error generating PDF:", error);
        return c.text(`Failed to generate PDF: ${error.message}`, 500);
    }
}