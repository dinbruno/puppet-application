import puppeteer from "puppeteer";
import { faker } from "@faker-js/faker";

const entryIntoJitsiMeeting = async () => {
    /** Create the browser */
    const browser = await puppeteer.launch({
        headless: false,      
        args: ['--lang=en-EN,en', '--use-fake-ui-for-media-stream' ],
        ignoreDefaultArgs: ['--disable-extensions'], 
        
    });

    /** Create a new page */
    const page = await browser.newPage();

    /** Go to the Jitsi Meet website */
    await page.goto("https://meet.jit.si/");

    /** Fill the input with firelies.ai */
    await page.type('input[aria-label="Meeting name input"]', "fireflies.ai");

    /** Click on the "Join a meeting" button */
    await page.click('button[aria-label="Start meeting"]');

    const buttonSelector =
        '.css-1hbmoh1-actionButton[aria-label="Participar da reunião"]';

    /** Wait for the page to load */
    await page.waitForSelector(buttonSelector);

    /** Fill the name */
    await page.type(
        'input[placeholder="Digite seu nome aqui"]',
        faker.name.firstName()
    );

    /** Join the meeting */
    await page.click(buttonSelector);
};

entryIntoJitsiMeeting();
