const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    async function waitForSelectors(selectors, frame) {
      for (const selector of selectors) {
        try {
          return await waitForSelector(selector, frame);
        } catch (err) {
          console.error(err);
        }
      }
      throw new Error('Could not find element for selectors: ' + JSON.stringify(selectors));
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
          element = (await element.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
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
            const newEl = (await el.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
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
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      throw new Error('Timed out');
    }
    {
        const targetPage = page;
        await targetPage.setViewport({"width":708,"height":647})
    }
    {
        const targetPage = page;
        const promises = [];
        promises.push(targetPage.waitForNavigation());
        await targetPage.goto('https://docs.google.com/forms/d/e/1FAIpQLSc1yuiSTrog6VnS26WGhJvYfeLH1Ncdj0M5yZAFjwA0WkJI2Q/viewform');
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("Alt");
    }
    {
        const targetPage = page;
        const promises = [];
        promises.push(targetPage.waitForNavigation());
        const element = await waitForSelectors([["body > div.quantumWizDialogBackground.isOpen > div > div.quantumWizDialogPaperdialogEl.quantumWizDialogPaperdialogTransitionZoom.quantumWizDialogEl.isOpen > div.quantumWizDialogPaperdialogBottomButtons.exportButtons > div.quantumWizButtonEl.quantumWizButtonPaperbuttonEl.quantumWizButtonPaperbuttonFlat.quantumWizButtonPaperbuttonFlatColored.quantumWizButtonPaperbutton2El2.quantumWizDialogPaperdialogDialogButton.exportDefaultDialogButton.freebirdThemedFlatButton.isUndragged.isActive > span > span"]], targetPage);
        await element.click({ offset: { x: 32.25, y: 15.5} });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Email or phone"],["#identifierId"]], targetPage);
        await element.click({ offset: { x: 123.5, y: 24.515625} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Email or phone"],["#identifierId"]], targetPage);
        const type = await element.evaluate(el => el.type);
        if (["textarea","select-one","text","url","tel","search","password","number","email"].includes(type)) {
          await element.type('gautam.sahyogcollege@gmail.com');
        } else {
          await element.focus();
          await element.evaluate((el, value) => {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }, "gautam.sahyogcollege@gmail.com");
        }
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#identifierNext > div > button > span"]], targetPage);
        await element.click({ offset: { x: 23.671875, y: 10.515625} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Enter your password"],["#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input"]], targetPage);
        await element.click({ offset: { x: 101.5, y: 44.515625} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Enter your password"],["#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input"]], targetPage);
        await element.click({ offset: { x: 156.5, y: 15.515625} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Enter your password"],["#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input"]], targetPage);
        const type = await element.evaluate(el => el.type);
        if (["textarea","select-one","text","url","tel","search","password","number","email"].includes(type)) {
          await element.type('monti@3009');
        } else {
          await element.focus();
          await element.evaluate((el, value) => {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }, "monti@3009");
        }
    }
    {
        const targetPage = page;
        const promises = [];
        promises.push(targetPage.waitForNavigation());
        const element = await waitForSelectors([["#passwordNext > div > button > span"]], targetPage);
        await element.click({ offset: { x: 24.671875, y: 0.515625} });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        const promises = [];
        promises.push(targetPage.waitForNavigation());
        const element = await waitForSelectors([["#yDmH0d > c-wiz > div > div > div > div.L5MEH.Bokche.ypEC4c > div.lq3Znf > div:nth-child(1) > button > span"]], targetPage);
        await element.click({ offset: { x: 38.5, y: 8} });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 132)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Your email address"],["#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(1) > div > div:nth-child(1) > div.quantumWizTextinputPaperinputEl.freebirdFormviewerComponentsQuestionTextShort.freebirdFormviewerComponentsQuestionTextTextInput.freebirdThemedInput.modeLight.isFocused > div.quantumWizTextinputPaperinputMainContent.exportContent > div > div.quantumWizTextinputPaperinputInputArea > input"]], targetPage);
        await element.click({ offset: { x: 112, y: 9.4375} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Your email address"],["#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(1) > div > div:nth-child(1) > div.quantumWizTextinputPaperinputEl.freebirdFormviewerComponentsQuestionTextShort.freebirdFormviewerComponentsQuestionTextTextInput.freebirdThemedInput.modeLight.isFocused > div.quantumWizTextinputPaperinputMainContent.exportContent > div > div.quantumWizTextinputPaperinputInputArea > input"]], targetPage);
        await element.click({ offset: { x: 77, y: 5.4375} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList"]], targetPage);
        await element.click({ offset: { x: 317, y: 172.4375} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 753)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#i14 > div.quantumWizTogglePapercheckboxInnerBox.exportInnerBox"]], targetPage);
        await element.click({ offset: { x: 3, y: 8.4375} });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("Alt");
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/1.If the basic structure of the database is “tree structure” then the database is termed as_________ Required question[role=\"heading\"]"],["#i17"]], targetPage);
        await element.click({ offset: { x: 9, y: 5.4375} });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Control");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("c");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("c");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("Control");
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#i21 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div"]], targetPage);
        await element.click({ offset: { x: 11, y: 8.4375} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/2._____ command is used to Restores since last commit Required question[role=\"heading\"]"],["#i30"]], targetPage);
        await element.click({ offset: { x: 55, y: 13.4375} });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Control");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("c");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("c");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("Control");
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#i34 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div"]], targetPage);
        await element.click({ offset: { x: 7, y: 3.4375} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 1046)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/3. The object based conceptual models include: ER (Entity Relationship) Model and ____________ Required question[role=\"heading\"]"],["#i40"]], targetPage);
        await element.click({ offset: { x: 19, y: 5.4375} });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Control");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("c");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("c");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("Control");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 1253)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("Alt");
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#i53 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div"]], targetPage);
        await element.click({ offset: { x: 6, y: 10.4375} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 1391)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/4. Network database model was used to map many-to-many data relationships. Required question[role=\"heading\"]"],["#i56"]], targetPage);
        await element.click({ offset: { x: 401, y: 10.4375} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/4. Network database model was used to map many-to-many data relationships. Required question[role=\"heading\"]"],["#i56"]], targetPage);
        await element.click({ offset: { x: 401, y: 10.4375} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/4. Network database model was used to map many-to-many data relationships. Required question[role=\"heading\"]"],["#i56"]], targetPage);
        await element.click({ offset: { x: 401, y: 10.4375} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/4. Network database model was used to map many-to-many data relationships. Required question[role=\"heading\"]"],["#i56"]], targetPage);
        await element.click({ offset: { x: 16, y: 10.4375} });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Control");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("c");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("c");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("Control");
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#i60 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div"]], targetPage);
        await element.click({ offset: { x: 5, y: 4.4375} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 1535)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/5. database is designed using FOUR steps, gathering and analyzing the requirements, ______________, implementation design and physical design. Required question[role=\"heading\"]"],["#i66"]], targetPage);
        await element.click({ offset: { x: 15, y: 11.4375} });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Control");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("c");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("c");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("Control");
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(8) > div > div > div.freebirdFormviewerComponentsQuestionRadioRoot > div > div > span > div > div:nth-child(3) > label > div"]], targetPage);
        await element.click({ offset: { x: 20, y: 9.4375} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 1871)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#i89 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div"]], targetPage);
        await element.click({ offset: { x: 10, y: 8.4375} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 2061)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/7. These are the attributes for which the value is calculated using the base attributes or some operations involving base attributes are known as _________ Required question[role=\"heading\"]"],["#i92"]], targetPage);
        await element.click({ offset: { x: 15, y: 14.4375} });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Control");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("c");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("c");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("Control");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 2265)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/8.If the value of that attribute in the entity set is not repeated. It never comes more than once in the complete entity set is known as_________ Required question[role=\"heading\"]"],["#i108"]], targetPage);
        await element.click({ offset: { x: 15, y: 13.4375} });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Control");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("c");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("c");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("Control");
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(10) > div > div > div.freebirdFormviewerComponentsQuestionRadioRoot > div > div > span > div > div:nth-child(4) > label > div > div.docssharedWizToggleLabeledContent > div > span"]], targetPage);
        await element.click({ offset: { x: 61, y: 6.4375} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 2432)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#i112 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div"]], targetPage);
        await element.click({ offset: { x: 6, y: 14.4375} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 2694)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#i128 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div"]], targetPage);
        await element.click({ offset: { x: 6, y: 14.4375} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 2909)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#i134 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div"]], targetPage);
        await element.click({ offset: { x: 9, y: 6.4375} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 2815)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#i131 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div"]], targetPage);
        await element.click({ offset: { x: 6, y: 19.4375} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 3060)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(13) > div > div"]], targetPage);
        await element.click({ offset: { x: 23, y: 213.4375} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(13) > div > div"]], targetPage);
        await element.click({ offset: { x: 23, y: 213.4375} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#i147 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div"]], targetPage);
        await element.click({ offset: { x: 7, y: 16.4375} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 3245)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#i154 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div"]], targetPage);
        await element.click({ offset: { x: 3, y: 12.4375} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 3480)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#i170 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div"]], targetPage);
        await element.click({ offset: { x: 9, y: 12.4375} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 3761)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#i195 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div"]], targetPage);
        await element.click({ offset: { x: 5, y: 13.4375} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 4010)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/14. Design of a database is called the______a. Schemas Required question[role=\"heading\"]"],["#i198"]], targetPage);
        await element.click({ offset: { x: 24, y: 13.4375} });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Control");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("c");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("Control");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("c");
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/14. Design of a database is called the______a. Schemas Required question[role=\"heading\"]"],["#i198"]], targetPage);
        await element.click({ offset: { x: 24, y: 13.4375} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(17) > div > div > div.freebirdFormviewerComponentsQuestionRadioRoot > div > div > span > div > div:nth-child(4) > label > div"]], targetPage);
        await element.click({ offset: { x: 20, y: 2.4375} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 4167)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 4168)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 4173)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 4179)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 4187)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 4194)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 4202)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 4209)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 4213)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 4214)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 4216)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/15. Data redundancy leads to data inconsistency Required question[role=\"heading\"]"],["#i214"]], targetPage);
        await element.click({ offset: { x: 23, y: 16.4375} });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Control");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("c");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("c");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("Control");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 4046)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 4048)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 4308)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#i221 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div"]], targetPage);
        await element.click({ offset: { x: 19, y: 13.4375} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 4389)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#i231 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div"]], targetPage);
        await element.click({ offset: { x: 8, y: 12.4375} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 4659)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#mG61Hd > div.freebirdFormviewerViewFormCard.exportFormCard > div > div.freebirdFormviewerViewItemList > div:nth-child(19) > div > div"]], targetPage);
        await element.click({ offset: { x: 24, y: 230.4375} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#i237 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div"]], targetPage);
        await element.click({ offset: { x: 2, y: 11.4375} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#i244 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div"]], targetPage);
        await element.click({ offset: { x: 5, y: 17.4375} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 4747)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#i247 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div"]], targetPage);
        await element.click({ offset: { x: 10, y: 13.4375} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 4611)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 4607)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("Alt");
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#i228 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div"]], targetPage);
        await element.click({ offset: { x: 3, y: 16.4375} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 5008)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#i257 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div"]], targetPage);
        await element.click({ offset: { x: 12, y: 15.4375} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 5233)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#i270 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div"]], targetPage);
        await element.click({ offset: { x: 6, y: 14.4375} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 5554)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#i292 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div"]], targetPage);
        await element.click({ offset: { x: 6, y: 6.4375} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 5736)
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#i305 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div"]], targetPage);
        await element.click({ offset: { x: 9, y: 10.4375} });
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 6013)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#i315 > div.appsMaterialWizToggleRadiogroupRadioButtonContainer > div"]], targetPage);
        await element.click({ offset: { x: 6, y: 14.4375} });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 6318)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 6317)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 6313)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 6306)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 6301)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 6291)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 6279)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 6269)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 6259)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 6251)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 6246)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 6243)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 6242)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 6243)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 6245)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 6246)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 6248)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 6260)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 6267)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 6273)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }
    {
        const targetPage = page;
        await targetPage.evaluate((x, y) => { window.scroll(x, y); }, 0, 6278)
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Alt");
    }

    await browser.close();
})();
