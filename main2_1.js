
async function getBusyIntervals(accessToken, calendarId, timeMin, timeMax) {
    const requestBody = {
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        items: [{ id: calendarId }]
    };

    const response = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken
        },
        body: JSON.stringify(requestBody)
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(`Error: ${responseData.error.message}`);
    }

    const busyIntervals = responseData.calendars[calendarId]?.busy || [];
    return busyIntervals;
}



const calendarId = 'primary';
const timeMin = new Date('2024-02-20T00:00:00Z'); // Start of the time period
const timeMax = new Date('2024-02-21T00:00:00Z'); // End of the time period
const CLIENT_ID = '537497358405-sa5g8i2vd9v676fiaoq991cf7pv10m9j.apps.googleusercontent.com';
const REDIRECT_URI = 'https://int.bearer.sh/v2/auth/callback';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

// Redirect the user to Google's authorization endpoint
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=code&access_type=offline`;
window.location.href = authUrl;

// Exchange the authorization code for an access token
const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
        code: authorizationCode,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
    }),
});
const tokenData = await response.json();
const accessToken = tokenData.access_token;

// Use the access token to make requests to the Google Calendar API

getBusyIntervals(accessToken, calendarId, timeMin, timeMax)
    .then(busyIntervals => {
        console.log('Busy Intervals:', busyIntervals);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });