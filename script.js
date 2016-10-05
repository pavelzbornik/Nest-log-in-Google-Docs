
function nest(){
   

var url = 'https://api.home.nest.com/oauth2/access_token?client_id=XXX&code=XXX&client_secret=XXX&grant_type=authorization_code';
var options = {
    'method': 'post'
    
};
var response = UrlFetchApp.fetch(url, options);
  var tokenResponse = JSON.parse(response);
   
  //store the token for later retrival
  UserProperties.setProperty(tokenPropertyName, tokenResponse.access_token);
  
Logger.log(tokenResponse.access_token);

}

function temperature(){

var url = 'https://developer-api.nest.com/devices/thermostats/XXX?auth=XXX';
var options = {
    'method': 'get'
    
};
var response = UrlFetchApp.fetch(url, options);
var json = JSON.parse(response);  
  
Logger.log(json.ambient_temperature_c);

  var array =[Date(),json.ambient_temperature_c,json.target_temperature_c,away()];
  
  listValues(array);
}

function listValues(array) {
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.appendRow(array);
}


function away(){


var url = 'https://developer-api.nest.com/structures/XXX?auth=XXX';
var options = {
    'method': 'get'
    
};
var response = UrlFetchApp.fetch(url, options);
var json = JSON.parse(response);  
  
return json.away;


}
