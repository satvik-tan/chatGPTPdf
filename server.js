const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.post("/convert", async (req, res) => {
  const { link } = req.body;

  // Validate the provided link
  if (!link || !link.startsWith("https://chatgpt.com/share/")) {
    return res.status(400).send("Invalid ChatGPT conversation link.");
  }

  try {
    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true, // Runs in the background
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Needed for environments like Docker
    });
    const page = await browser.newPage();

    // Navigate to the provided link
    await page.goto(link, { waitUntil: "networkidle2" });

    // Extract conversation content
    const chatContent = await page.evaluate(() => {
      // Select elements containing conversation content
      const elements = Array.from(document.querySelectorAll(".whitespace-pre-wrap, .markdown"));
      // Extract and clean the inner HTML/text
      return elements.map((element) => element.innerHTML.trim()).join(''); // Join the array into a single string
    });

    // If no content was found, return an error
    if (!chatContent.length) {
      return res.status(404).send("No conversation data found on the page.");
    }

    // Set content and create the PDF using Puppeteer
    await page.setContent(chatContent);

    // Generate the PDF as a buffer (do not save to file system)
    const outputPdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    // Close the browser
    await browser.close();

    // Set the correct headers for file download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=ChatGPT_Conversation.pdf");

    // Send the PDF buffer directly in the response
    res.end(outputPdfBuffer);  // This sends the PDF as a response

  } catch (error) {
    console.error("Error scraping:", error.message);

    // Handle common Puppeteer errors
    if (error.message.includes("ERR_NAME_NOT_RESOLVED")) {
      return res.status(404).send("Invalid link or the page does not exist.");
    }
    res.status(500).send("Failed to process the link. Please try again later.");
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
