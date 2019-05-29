// Load client library.
const ee = require('@google/earthengine');

// Initialize client library and run analysis.
var initialize = function() {
  ee.initialize();
  console.log('initialized');
};

const CLIENT_ID = "813146478819-j02av2837seqc9urjp7k11du5nrrjej6.apps.googleusercontent.com"

ee.data.authenticateViaOauth(CLIENT_ID, initialize, function(e) {
  console.error('Authentication error: ' + e);
}, null, function() {
  ee.data.authenticateViaPopup(initialize);
});

// Authenticate using an OAuth pop-up.
export default ee;
