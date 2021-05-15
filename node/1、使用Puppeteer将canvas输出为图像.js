// 需求：需要抓取 http://www.395.net.cn/ 生成的公章图片
const puppeteer = require('puppeteer')

puppeteer.launch().then(async browser => {
    const page = await browser.newPage()

    await page.goto('http://www.395.net.cn/')

    let canvas = await page.$('#p_canvas')

    // canvas.toDataURL('image/jpg') 报错 toDataURL 未定义

    // 解决方法
    // 参考：https://stackoverflow.com/questions/65914988/how-to-save-a-canvas-as-an-image-using-puppeteer
    // evaluate方法api文档：http://www.puppeteerjs.com/#?product=Puppeteer&version=v9.1.1&show=api-pageevaluatepagefunction-args
    let img = await page.evaluate(canvas => {
        return canvas.toDataURL('image/png')
    }, canvas)
    console.log(img)
})