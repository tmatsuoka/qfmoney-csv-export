const csvHeader = 'Date,Payee,Memo,Outflow,Inflow';

startExport.onclick = function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { text: 'generate' }, function (response) {
      document.getElementById('status').innerText = `${response.entries.length} transactions found`;

      // Generate CSV
      const entries = response.entries.map(e => (
        `${e.date},${e.payee},${e.memo},${e.outflow || ''},${e.inflow || ''}`
      )).join('\n');
      const csvBlob = new Blob([csvHeader + '\n'+ entries], { type: 'text/csv' });
      const blobUrl = URL.createObjectURL(csvBlob);

      chrome.downloads.download({ url: blobUrl, filename: 'qf-money-transactions.csv' });
    });
  });
}
