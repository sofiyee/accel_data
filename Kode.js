const SHEET_ID = "1yCQA__1FfgrnFo03ikebPuT5z2NAMrGyhcNE6x5LQf0";
const SHEET_NAME = "accel_data";

/* ======================
   ROUTING
====================== */
function doGet(e) {

  // ===== REST API GET =====
  if (e.parameter.path === "telemetry/accel/latest") {
    return getLatest(e);
  }

  // ===== VIEW ROUTING =====
  if (e.parameter.view === "sensor") {
    return HtmlService.createHtmlOutputFromFile("Sensor");
  }

  if (e.parameter.view === "monitor") {
    return HtmlService.createHtmlOutputFromFile("Monitor");
  }

  return HtmlService.createHtmlOutput("Invalid route");
}

/* ======================
   OPTIONAL REST POST
====================== */
function doPost(e) {

  if (e.parameter.path === "telemetry/accel") {
    return saveAccelREST(e);
  }

  return jsonResponse({ ok:false, message:"Invalid endpoint" });
}

/* ======================
   SAVE FROM google.script.run
====================== */
function saveAccelFromClient(data) {

  if (!data || !data.samples || data.samples.length === 0) {
    return { ok:false, message:"No data received" };
  }

  const device_id = data.device_id;
  const ts = data.ts;
  const samples = data.samples;

  const sheet = getSheet();

  samples.forEach(s => {
    sheet.appendRow([
      device_id,
      ts,
      s.t,
      s.x,
      s.y,
      s.z
    ]);
  });

  return {
  ok: true,
  data: {
    accepted: samples.length
  }
};
}

/* ======================
   SAVE FROM REST POST
====================== */
function saveAccelREST(e){

  const body = JSON.parse(e.postData.contents);
  return jsonResponse(saveAccelFromClient(body));
}

/* ======================
   GET LATEST DATA
====================== */
function getLatest(e){

  const device_id = e.parameter.device_id;

  if (!device_id) {
    return jsonResponse({ ok:false, message:"device_id required" });
  }

  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();

  if (data.length <= 1) {
    return jsonResponse({ ok:false, message:"No data yet" });
  }

  let latest = null;

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == device_id) {
      latest = data[i];
    }
  }

  if (!latest) {
    return jsonResponse({ ok:false, message:"Device not found" });
  }

  return jsonResponse({
    ok:true,
    data:{
      t: latest[2],
      x: latest[3],
      y: latest[4],
      z: latest[5]
    }
  });
}

/* ======================
   UTIL
====================== */
function getSheet(){
  return SpreadsheetApp
    .openById(SHEET_ID)
    .getSheetByName(SHEET_NAME);
}

function jsonResponse(obj){
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}