// module scaffolding
const environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: 'dlfjwioefjoeijfs',
    maxChecks: 5,
    twilio: {
        fromPhone: '+15005550006',
        accountSid: process.env.TWILIO_SID || 'STAGING_SID', // No quotes around process.env
        authToken: process.env.TWILIO_AUTH_TOKEN || 'STAGING_TOKEN',
    },
};

environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'fjwoirfjwofjdfjwo',
    maxChecks: 5,
    twilio: {
        fromPhone: '+15005550006',
        accountSid: process.env.TWILIO_SID, // FIXED: Removed the hardcoded ACb32...
        authToken: process.env.TWILIO_AUTH_TOKEN, // FIXED: Removed the hardcoded 9455e...
    },
};

// ... (rest of your logic remains the same)