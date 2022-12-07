const puppeteer = require('puppeteer');

const execute = async () => {
  //Inicia o navegador
  const browser = await puppeteer.launch({
      headless: false,
      timeout: 60000,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

  //Cria uma nova aba no navegador
  const page = await browser.newPage();
  //Entra no site
  page.goto('https://google.com');

  //Espera até que apareça o conteúdo da página
  await page.waitForSelector("div [id='contents']");
  //Pega o titulo dos vídeos
  const titles = await page.$$("#video-title");

  
  // Printa todos os titulos achados no console
  for (let i = 0; i < titles.length; i++) {
    const title = await (await titles[i].getProperty('ariaLabel')).jsonValue();
    console.log(title);
  }
}

execute();