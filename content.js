chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('received');
  if (request.text === 'generate') {
    console.log('start generate');
    const tables = document.getElementsByTagName('tbody');
    const transactionTable = tables[0];

    let entries = [];
    for (const row of transactionTable.childNodes) {
      const dateRow = row.childNodes[0];
      const descriptionRow = row.childNodes[1];
      const amountRow = row.childNodes[2];

      // Process date
      const dateObj = new Date(dateRow.innerText);
      const date = dateObj.toLocaleDateString('en-US');
      // Process description
      const description = descriptionRow.innerText;
      // Process amount
      let inflow, outflow;
      const amountStr = amountRow.innerText.replace(/[^0-9\.-]+/g, '');
      const amountObj = new Number(amountStr);
      if (amountObj < 0) {
        outflow = (amountObj * -1).toFixed(2);
      } else {
        inflow = amountObj.toFixed(2);
      }

      entries.push({ date, payee: '', memo: description, outflow, inflow });
    }

    sendResponse({ entries: entries });
  }
});
