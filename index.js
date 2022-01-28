const puppeteer = require('puppeteer'); //引入puppeteer
//异步模式
(async () => {
    const browser = await puppeteer.launch({
        headless: false,    //打开chromiuml浏览器，不使用无头模式
        slowMo: 10, //每步操作的延时时间
    });    
    const page = (await browser.pages())[0];  //使用打开浏览器时的空页面  //   const page = await browser.newPage();
    // console.log(page)
//  await page.setViewport({isMobile:true});
    await page.setViewport({width: 714, height: 482});  //设置视图窗口
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36');
    await page.goto('https://www.douyin.com/');
    await page.waitForTimeout(1500); //等待延时2秒
    await page.screenshot({ path: 'example10.png', fullPage:true});
    // await page.tap();   //元素点击
    // await page.type();  //字符输入
    // window.innerWidth+' x '+window.innerHeight
    // 抖音视频直链域名头：douyinvod 
    // 响应标头：Content-Type: video/mp4

    const result = await page.evaluate(() => {
        let inn = window.innerWidth + ' x '+ window.innerHeight;
        let out = window.outerHeight + ' x '+ window.outerHeight;
        let toolH = window.outerHeight-window.innerHeight;
        let toolW = window.outerHeight-window.innerHeight;
        console.log(inn+'\n'+out+'\n'+toolW+' x '+toolH);
        // alert('Hello chromium');
        return {inn,out,toolW,toolH}
    }); //浏览器原生控制输出，可以使用console，也可以使用alert，以及任何js脚本
    console.log(result);    //node接收浏览器数据

//   console.log(await page.title() +'\n'+ page.url());  //网页标题
//   console.log(browser.browserContexts());
//   console.log(await browser.userAgent()+'\n'+await browser.version());   //浏览器原始user-agent
//   console.log(await page.target()); //由谁创建的
    // await browser.close();
})();