const axios = require('axios');
const cheerio = require('cheerio');

axios.get('https://www.psyh.ru/')
  .then((res) => {
    const data = res.data.trim();
    const $ = cheerio.load(data, {
      // normalizeWhitespace: true,
      xmlMode: true,
      // ignoreWhitespace: true
    });
    // общий массив, надо вытаскивать по три элемента в массив
    const title = $('h2.grid-title-h2').text()
    const text = $('div.rubric-anons_text').text();
    // const siteArray = site.split('  ').filter(n => n);
    console.log(title);

    // отдельные массивы надо сделать map
    const itemsNames = $('a.rubric-anons_text').text().split();
    const itemsStars = $('i.a-icon').text().split(' stars');
    const itemsNumber = []
    $('a.a-size-small.a-link-normal').each(function (i, element) {
      itemsNumber.push($(element).text())
    })

    console.log(itemsNumber)
    // 1 вариант
    // let bigArray = []
    // for (let i = 0; i < itemsNames.length; i++) {
    //   const miniArray = [itemsNames[i], itemsStars[i], itemsNumber[i]]
    //   bigArray = bigArray.push(miniArray)
    // }

    // 2 вариант
    const arrayMain = itemsNames.map((el, index) => [el, itemsStars[index], itemsNumber[index]]);
    // console.table(arrayMain);
    // console.table(bigArray)
  });

