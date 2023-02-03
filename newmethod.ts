import puppeteer from 'puppeteer';

async function searchAndJoinJitsiMeeting() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Entrar no Google
  await page.goto('https://google.com');

  // Pesquisar pelo site Jitsi Meet
  await page.type('input[name="q"]', 'jitsi meet site');
  await page.click('input[type="submit"]');

  // Clicar no primeiro resultado de pesquisa
  await page.click('h3 a');

  // Criar uma reunião com o nome "teste"
  await page.click('a[href="/create"]');
  await page.waitForSelector('input[name="conference"]');
  await page.type('input[name="conference"]', 'teste');
  await page.click('button[type="submit"]');

  // Gravar a tela da reunião
  const video = await page.video({
    path: 'jitsi-meeting.mp4',
    width: 1280,
    height: 720,
    quality: 'medium',
  });

  // Parar a gravação
  await video.stop();

  // Fechar o navegador
  await browser.close();
}

searchAndJoinJitsiMeeting()