const url = 'https://10.120.32.54/app/api/v1';

const getDistruptionData = async () => {
  try {
    const response = await fetch(`${url}/digitransit/disruptions`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    console.log('response: ', response);
    return response.json();
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

const handleDistruptionData = (distruptionData) => {
  // Only show WARNING / SEVERE distruptions
  console.log(distruptionData.data);

  const distruptions = distruptionData.data.alerts.filter(
    (distruption) =>
      distruption.alertSeverityLevel === 'WARNING' ||
      distruption.alertSeverityLevel === 'SEVERE'
  );

  // Create a table with distruption data, there is alertDescriptionText, alertSeverityLevel, alertUrl (url just as text and if you click it, it opens the url in a new tab)
  const table = document.createElement('table');
  table.classList.add('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const theadRow = document.createElement('tr');
  const th1 = document.createElement('th');
  th1.textContent = 'Description';
  const th2 = document.createElement('th');
  th2.textContent = 'Severity';
  const th3 = document.createElement('th');
  // URL text which opens the url in a new tab
  th3.textContent = 'URL';

  theadRow.appendChild(th1);
  theadRow.appendChild(th2);
  theadRow.appendChild(th3);
  thead.appendChild(theadRow);
  table.appendChild(thead);

  distruptions.forEach((distruption) => {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.textContent = distruption.alertDescriptionText;
    tr.appendChild(td1);
    const td2 = document.createElement('td');
    td2.textContent = distruption.alertSeverityLevel;

    const td3 = document.createElement('td');
    const a = document.createElement('a');
    a.href = distruption.alertUrl;
    a.target = '_blank';
    a.textContent = 'Link';
    td3.appendChild(a);

    tr.appendChild(td2);
    tr.appendChild(td3);
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  document.body.appendChild(table);
};

window.onload = async () => {
  const distruptionData = await getDistruptionData();
  handleDistruptionData(distruptionData);
};
