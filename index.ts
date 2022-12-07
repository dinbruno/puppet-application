const puppeteer = require("puppeteer");
const fs = require("fs");

const initProcessToGetContents = async () => {
 
    const browser = await puppeteer.launch({headless: false});


    const page = await browser.newPage();
    await page.goto("http://www.google.com/");
   
    await page.type("*[name='q']", 'fireflies.ai', { 
        delay: 500 
    });

	await page.waitForSelector("ul[role='listbox']");
	
	const suggestedItensByGoogle = await page.evaluate(() => {
			    let listOfSuggestedItens = document.body.querySelectorAll("ul[role='listbox'] li .wM6W7d");
			    let item = Object.values(listOfSuggestedItens).map(item => {
			        return {						
			            keyword: item.querySelector('span').innerText,
			        }
			    });
			    return item;			

			});
	fs.writeFileSync('./src/components/suggestedItens.json', JSON.stringify(suggestedItensByGoogle, null, 2), 'utf-8');	
	

	await page.click("ul[role='listbox'] li:first-child");

	await page.waitForSelector(".LC20lb", {visible: true});

	const searchResultsLinks = await page.$$eval(".LC20lb", results => 
		results.map(itens => (		
			{ title: itens.innerText, link: itens.parentNode.href }
		))
  	);
	fs.writeFileSync('./src/components/searchResultsLinks.json', JSON.stringify(searchResultsLinks, null, 2), 'utf-8');	

	await page.click('.LC20lb');
		


		// const getCurrentPageItens = await page.evaluate(async () => {
		// 	const getImageLogo = await page.$eval('img[alt="fireflies logo"]', img => img.map(item => item.src))
		// 	const getBackgroundImage = await page.$eval('div.ff-landing-hero span img', img => img.map(item => item.src))

		// 	return { logoSrc: getImageLogo, backgroundImage: getBackgroundImage }
		// })
		
		// console.log(getCurrentPageItens)
	
		

	
	

}
initProcessToGetContents();

// const puppeteer = require('puppeteer');

// async function initProject() {

  
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto('https://www.google.com/');

//   await page.type("*[name='q']", "copa do mundo", { delay: 500});

//   await page.waitForSelector("ul[role='listbox']");

//   await page.click("ul[role='listbox'] li:first-child");

//   await page.click("button[aria-label='Google Search']");

//   const search = await page.evaluate(() => {

// 	    let listBox = document.body.querySelectorAll("ul[role='listbox'] li .wM6W7d");
// 	    let item = Object.values(listBox).map(x => {
// 	        return {
// 	            keyword: x.querySelector('span').innerText,
// 	        }
// 	    });
// 	    return item;

// 	});

// 	console.log(search)

//   await browser.close();


// }



// const puppeteering = require('puppeteer');


// async function getSuggestedItensByGoogleSearch() {

//     const getBrowser = await puppeteering.launch({ headless: false });
    
//     const page = await getBrowser.newPage();

//     await page.goto(`http://google.com`);
 
//     const unique = new Set()

//     await page.type("*[name='q']", 'copa do', { 
//         delay: 400 
//     });

//     page.on('response', async response => {
//         if (response.url().includes('/complete/search?q=puppeteer')) {
//             const data = await page.evaluate(() => {
//                 Array.from(document.querySelectorAll("li[role='presentation'] .wM6W7d span")), element => element.textContent
//             })
            

//             return data.forEach(item => unique.add(item))
//         }

//     })

//     await getBrowser.close();
   

    
//     console.log(unique)
// }

// getSuggestedItensByGoogleSearch();



