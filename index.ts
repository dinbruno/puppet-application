import puppeteer from "puppeteer";
import { faker } from "@faker-js/faker";

const entryIntoJitsiMeeting = async () => {

    /** Base URL of the website to be tested */

    const BASE_URL = 'http://google.com/'

    /** Create the browser */
    const browser = await puppeteer.launch({
        headless: false,      
        args: ['--lang=en-EN,en', '--use-fake-ui-for-media-stream' ],
        ignoreDefaultArgs: ['--disable-extensions'],         
    });

    /** Create a new page */
    const page = await browser.newPage();

    /** Go to the Google website */

    await page.goto(BASE_URL);

    /** Fill the input with "meet jitsi" */

    const inputHandle = await page.waitForXPath("//input[@name = 'q']");

    await inputHandle?.type("meet jitsi", { delay: 300 });

    /** Click on the first suggestion */

    await page.waitForSelector("ul[role='listbox']");

    await page.click("ul[role='listbox'] li:first-child");
    
    
    /** Wait for the page to load */
    
    await page.waitForSelector(".LC20lb", {visible: true});
    
    
    /** Go to the Jitsi Meet website */
    
    await page.click('.LC20lb');

    /** Fill the input with firelies.ai */

    await page.waitForSelector('input[aria-label="Meeting name input"]', {visible: true});


    await page.type('input[aria-label="Meeting name input"]', "fireflies.ai");

    /** Click on the "Join a meeting" button */

    await page.click('button[aria-label="Start meeting"]');

    /** Entering the meeting */

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

    /** Taking a screenshot */

    await page.screenshot({path: './src/meet.png'});

};

entryIntoJitsiMeeting();
