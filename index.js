var Supported = function (target, cssCommands) {
    this.target = target;
    this.cssCommands = cssCommands;
    this.placeholderId = "cssborder-";
    this.domParser = new DOMParser();
    this.targetDom = "";
    this.css = "";
    this.invalidRules = [];
    this.loadPrerequesities().then(() => {
        const cssPairs = this.parseCss();
        this.validateCss(cssPairs);
        let invalidRulesHTML = '';
        this.invalidRules.forEach(rule => {
            invalidRulesHTML += `<li>${rule}</li>`;
        });
        document.getElementById("content-projection").innerHTML = invalidRulesHTML;
    });
}

Supported.prototype.loadPrerequesities = function () {
    var self = this;
    return new Promise(async (res) => {
        self.targetDom = await self.getTargetDom();
        self.css = await self.fetchCss();
        self.css = self.css.replace(/[\r\n]+/g, "");
        res();
    });
}

Supported.prototype.getTargetDom = function () {
    var self = this;
    return new Promise((res) => {
        const xhr = new XMLHttpRequest();
        xhr.open("get", self.target);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                res(self.domParser.parseFromString(xhr.responseText, "text/html"));
            }
        }
    });
};

Supported.prototype.fetchCss = function () {
    var self = this;
    return new Promise((res) => {
        fetch(self.cssCommands)
            .then(data => res(data.text()));
    });
}

Supported.prototype.parseCss = function () {
    var self = this;
    // all rules
    let cssRules = self.css.split(/[{}]/).filter((x, i) => i % 2 !== 0);
    // each rule pair
    const cssRulesPairs = [];
    cssRules = cssRules.map(x => x.trim());
    cssRules.forEach(rule => {
        let x = rule.split(';');
        x = x.filter(function (str) {
            return /\S/.test(str);
        });
        x = x.map(y => y.trim());
        cssRulesPairs.push(...x);
    });
    return cssRulesPairs;
}

Supported.prototype.validateCss = function (pairs) {
    var self = this;
    for (const pair of pairs) {
        let rule = pair.split(':')[0] ? pair.split(':')[0].trim() : pair.split(':')[0];
        let value = pair.split(':')[1] ? pair.split(':')[1].trim() : pair.split(':')[1];
        if (rule === 'background' || rule === 'opacity') {
            continue;
        }
        const result = self.targetDom.body.querySelector(`h3#css${rule}`);
        if (!result) {
            self.invalidRules.push(pair);
            continue;
        }
        console.log(self.invalidRules);
        const valueValidationElement = result.nextSibling.nextSibling.nextSibling.nextSibling;
        if (!(valueValidationElement instanceof HTMLTableElement)) {
            continue;
        }
        // valueValidationElement.tBodies[0].rows[0].cells[0].innerHTML
        let valuePresent = false;
        for (const tableRow of valueValidationElement.tBodies[0].rows) {
            if (tableRow.cells[0].innerHTML == value) {
                valuePresent = true;
                break;
            }
        }
        if (!valuePresent) {
            self.invalidRules.push(pair);
        }
    }
}

const runner = new Supported("http://localhost/adobe-plugin-ref.html", "http://localhost/style.css");