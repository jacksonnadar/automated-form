import puppeteerExtra from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

// (async () => {
//     puppeteerExtra.use(stealthPlugin());
//     const browser = await puppeteerExtra.launch({ headless: false });
//     // const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();

//     await page.goto('https://accounts.google.com/signin/v2/identifier');
//     await page.type('[type="email"]', process.env.gmailUsername);
//     await page.click('#identifierNext');
//     await page.waitForTimeout(1500);

//     await page.type('[type="password"', process.env.password);
//     await page.click('#passwordNext');

//     await page.waitForTimeout(55000);

//     await browser.close();
// })();

(async () => {
  puppeteerExtra.use(stealthPlugin());
  const browser = await puppeteerExtra.launch({ headless: false });
  const page = await browser.newPage();

  async function waitForSelectors(selectors, frame) {
    for (const selector of selectors) {
      try {
        return await waitForSelector(selector, frame);
      } catch (err) {
        console.error(err);
      }
    }
    throw new Error(
      'Could not find element for selectors: ' + JSON.stringify(selectors)
    );
  }

  async function waitForSelector(selector, frame) {
    if (selector instanceof Array) {
      let element = null;
      for (const part of selector) {
        if (!element) {
          element = await frame.waitForSelector(part);
        } else {
          element = await element.$(part);
        }
        if (!element) {
          throw new Error('Could not find element: ' + part);
        }
        element = (
          await element.evaluateHandle((el) =>
            el.shadowRoot ? el.shadowRoot : el
          )
        ).asElement();
      }
      if (!element) {
        throw new Error('Could not find element: ' + selector.join('|'));
      }
      return element;
    }
    const element = await frame.waitForSelector(selector);
    if (!element) {
      throw new Error('Could not find element: ' + selector);
    }
    return element;
  }

  async function waitForElement(step, frame) {
    const count = step.count || 1;
    const operator = step.operator || '>=';
    const comp = {
      '==': (a, b) => a === b,
      '>=': (a, b) => a >= b,
      '<=': (a, b) => a <= b,
    };
    const compFn = comp[operator];
    await waitForFunction(async () => {
      const elements = await querySelectorsAll(step.selectors, frame);
      return compFn(elements.length, count);
    });
  }

  async function querySelectorsAll(selectors, frame) {
    for (const selector of selectors) {
      const result = await querySelectorAll(selector, frame);
      if (result.length) {
        return result;
      }
    }
    return [];
  }

  async function querySelectorAll(selector, frame) {
    if (selector instanceof Array) {
      let elements = [];
      let i = 0;
      for (const part of selector) {
        if (i === 0) {
          elements = await frame.$$(part);
        } else {
          const tmpElements = elements;
          elements = [];
          for (const el of tmpElements) {
            elements.push(...(await el.$$(part)));
          }
        }
        if (elements.length === 0) {
          return [];
        }
        const tmpElements = [];
        for (const el of elements) {
          const newEl = (
            await el.evaluateHandle((el) =>
              el.shadowRoot ? el.shadowRoot : el
            )
          ).asElement();
          if (newEl) {
            tmpElements.push(newEl);
          }
        }
        elements = tmpElements;
        i++;
      }
      return elements;
    }
    const element = await frame.$$(selector);
    if (!element) {
      throw new Error('Could not find element: ' + selector);
    }
    return element;
  }

  async function waitForFunction(fn) {
    let isActive = true;
    setTimeout(() => {
      isActive = false;
    }, 5000);
    while (isActive) {
      const result = await fn();
      if (result) {
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    throw new Error('Timed out');
  }
  {
    const targetPage = page;
    await targetPage.setViewport({ width: 748, height: 792 });
  }
  {
    const targetPage = page;
    const promises = [];
    promises.push(targetPage.waitForNavigation());
    await targetPage.goto(
      'https://docs.google.com/forms/d/e/1FAIpQLSc1yuiSTrog6VnS26WGhJvYfeLH1Ncdj0M5yZAFjwA0WkJI2Q/viewform'
    );
    await Promise.all(promises);
  }
  {
    const targetPage = page;
    const promises = [];
    promises.push(targetPage.waitForNavigation());
    const element = await waitForSelectors(
      [
        [
          'body > div.quantumWizDialogBackground.isOpen > div > div.quantumWizDialogPaperdialogEl.quantumWizDialogPaperdialogTransitionZoom.quantumWizDialogEl.isOpen > div.quantumWizDialogPaperdialogBottomButtons.exportButtons > div.quantumWizButtonEl.quantumWizButtonPaperbuttonEl.quantumWizButtonPaperbuttonFlat.quantumWizButtonPaperbuttonFlatColored.quantumWizButtonPaperbutton2El2.quantumWizDialogPaperdialogDialogButton.exportDefaultDialogButton.freebirdThemedFlatButton.isUndragged.isActive > span > span',
        ],
      ],
      targetPage
    );
    await element.click({ offset: { x: 22.850006103515625, y: 0 } });
    await Promise.all(promises);
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [['aria/Email or phone'], ['#identifierId']],
      targetPage
    );
    const type = await element.evaluate((el) => el.type);
    if (
      [
        'textarea',
        'select-one',
        'text',
        'url',
        'tel',
        'search',
        'password',
        'number',
        'email',
      ].includes(type)
    ) {
      await element.type('jackson.sahyogcollege');
    } else {
      await element.focus();
      await element.evaluate((el, value) => {
        el.value = value;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }, 'jackson.sahyogcollege');
    }
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [['#identifierNext > div > button > span']],
      targetPage
    );
    await element.click({
      offset: { x: 9.36248779296875, y: 3.01251220703125 },
    });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        ['aria/Enter your password'],
        ['#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input'],
      ],
      targetPage
    );
    const type = await element.evaluate((el) => el.type);
    if (
      [
        'textarea',
        'select-one',
        'text',
        'url',
        'tel',
        'search',
        'password',
        'number',
        'email',
      ].includes(type)
    ) {
      await element.type('7304366907');
    } else {
      await element.focus();
      await element.evaluate((el, value) => {
        el.value = value;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }, '7304366907');
    }
  }
  {
    const targetPage = page;
    const promises = [];
    promises.push(targetPage.waitForNavigation());
    const element = await waitForSelectors(
      [['#passwordNext > div > button > span']],
      targetPage
    );
    await element.click({
      offset: { x: 3.36248779296875, y: 3.212493896484375 },
    });
    await Promise.all(promises);
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      300
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        ['aria/Your email'],
        [
          '#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(1) > div > div:nth-child(1) > div.quantumWizTextinputPaperinputEl.freebirdFormviewerComponentsQuestionTextShort.freebirdFormviewerComponentsQuestionTextTextInput.freebirdThemedInput.modeLight.isFocused > div.quantumWizTextinputPaperinputMainContent.exportContent > div > div.quantumWizTextinputPaperinputInputArea > input',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 96.5999984741211, y: 6.4124908447265625 },
    });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        ['aria/Your email'],
        [
          '#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(1) > div > div:nth-child(1) > div.quantumWizTextinputPaperinputEl.freebirdFormviewerComponentsQuestionTextShort.freebirdFormviewerComponentsQuestionTextTextInput.freebirdThemedInput.modeLight.isFocused.hasValue > div.quantumWizTextinputPaperinputMainContent.exportContent > div > div.quantumWizTextinputPaperinputInputArea > input',
        ],
      ],
      targetPage
    );
    const type = await element.evaluate((el) => el.type);
    if (
      [
        'textarea',
        'select-one',
        'text',
        'url',
        'tel',
        'search',
        'password',
        'number',
        'email',
      ].includes(type)
    ) {
      await element.type('JACKSONNADAR123@GMAIL.COM');
    } else {
      await element.focus();
      await element.evaluate((el, value) => {
        el.value = value;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }, 'JACKSONNADAR123@GMAIL.COM');
    }
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      400
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(2) > div > div > div.freebirdFormviewerComponentsQuestionSelectRoot > div > div:nth-child(1) > div.quantumWizMenuPaperselectOptionList > div.quantumWizMenuPaperselectOption.appsMaterialWizMenuPaperselectOption.freebirdThemedSelectOptionDarkerDisabled.exportOption.isSelected.isPlaceholder > span',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 105.5999984741211, y: 8.412506103515625 },
    });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(2) > div > div > div.freebirdFormviewerComponentsQuestionSelectRoot > div > div.exportSelectPopup.quantumWizMenuPaperselectPopup.appsMaterialWizMenuPaperselectPopup',
        ],
      ],
      targetPage
    );
    await element.evaluate(
      (el, x, y) => {
        el.scrollTop = y;
        el.scrollLeft = x;
      },
      0,
      3100
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [['#i14 > div.quantumWizTogglePapercheckboxInnerBox.exportInnerBox']],
      targetPage
    );
    await element.click({
      offset: { x: 9.599998474121094, y: -1.587493896484375 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      700
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i21 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 8.599998474121094, y: 11.412506103515625 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      900
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i34 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 8.599998474121094, y: 9.412506103515625 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      1200
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i47 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 7.599998474121094, y: 11.412490844726562 },
    });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i53 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 7.599998474121094, y: 10.412506103515625 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      1400
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i60 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 12.599998474121094, y: 9.412506103515625 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      1600
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i73 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 8.599998474121094, y: 11.412506103515625 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      1800
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i89 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 4.599998474121094, y: 13.412506103515625 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      2100
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i102 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 4.599998474121094, y: 12.412506103515625 },
    });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i115 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 12.599998474121094, y: 9.4124755859375 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      2400
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i131 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 11.599998474121094, y: 7.4124755859375 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      2700
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i141 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 8.599998474121094, y: 5.412506103515625 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      3100
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i154 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 7.599998474121094, y: 13.412506103515625 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      3400
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i179 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 12.599998474121094, y: 11.412506103515625 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      3600
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i192 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 9.599998474121094, y: 3.412506103515625 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      4000
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i208 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 11.599998474121094, y: 4.412506103515625 },
    });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i221 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 11.599998474121094, y: 16.4124755859375 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      4300
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i228 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 9.599998474121094, y: 8.412506103515625 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      4500
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i247 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 4.599998474121094, y: 13.412506103515625 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      4600
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i244 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 8.599998474121094, y: 8.412506103515625 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      4700
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i254 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 4.599998474121094, y: 11.412506103515625 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      5000
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i270 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 8.599998474121094, y: 11.412506103515625 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      5300
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i292 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 7.599998474121094, y: 6.412506103515625 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      5600
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i302 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 2.5999984741210938, y: 17.412506103515625 },
    });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i315 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 9.599998474121094, y: 15.4124755859375 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      5900
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(26) > div > div > div.freebirdFormviewerComponentsQuestionRadioRoot > div > div > span > div > div:nth-child(1)',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 7.599998474121094, y: 4.4124755859375 },
    });
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i331 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 11.599998474121094, y: 13.4124755859375 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      6300
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i347 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 7.599998474121094, y: 5.412506103515625 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      6600
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i363 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 13.599998474121094, y: 10.412506103515625 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      6700
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i370 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 12.599998474121094, y: 5.412506103515625 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      7000
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i389 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 4.599998474121094, y: 9.4124755859375 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      7200
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i396 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 8.599998474121094, y: 11.412506103515625 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      7400
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i412 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 5.599998474121094, y: 0.4124755859375 },
    });
  }
  {
    const targetPage = page;
    await targetPage.evaluate(
      (x, y) => {
        window.scroll(x, y);
      },
      0,
      7596.7998046875
    );
  }
  {
    const targetPage = page;
    const element = await waitForSelectors(
      [
        [
          '#i422 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div',
        ],
      ],
      targetPage
    );
    await element.click({
      offset: { x: 12.599998474121094, y: 11.21246337890625 },
    });
  }
})();
