const CLIENT_ID = '313615667967-m4ertukbv4loaumnjslltvjl2gdvcsmd.apps.googleusercontent.com';
const API_KEY = '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';
const SPREADSHEET_ID = '1KrZigsn7v4PghclTm1pAieGCSjQkbaTjd38pSX1Nsms';
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

const form = document.getElementById('qr-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  gapi.load('client:auth2', initClient);
});

function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    scope: SCOPE,
  }).then(() => {
    gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        sendDataToGoogleSheet();
      });
  });
}

function sendDataToGoogleSheet() {
  const data = [
    form.name.value,
    form.vorname.value,
    form.telefonnummer.value,
    form.artikel.value,
    form.anzahl.value,
    from.detachement.value,
  ];

  gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Sheet1!A2:F2',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [data],
    },
  }).then((response) => {
    console.log('Daten erfolgreich gesendet:', response.result);
    alert('Daten erfolgreich gesendet');
    form.reset();
  }).catch((error) => {
    console.error('Fehler beim Senden der Daten:', error);
    alert('Fehler beim Senden der Daten');
  });
}
