let data, info;

async function init(){   
  let link = "https://data.cityofnewyork.us/resource/uvpi-gqnh.json";
  info = await fetch(link);
  data = await info.json();
  

  output = document.getElementById("output");
  result = document.getElementById("result");
  let build = "";
  let ct = 0;

  for(let i = 0; i < data.length; i++){
    let tree = data[i];
    build += `<div class="fitted card">
                  <h2>${tree.spc_common}</h2>
                  <hr>
                  <h3>Zipcode: ${tree.zipcode}</h3>
                  <p>Address: ${tree.address}</p>
                  <p>Status: ${tree.status}</p>
                  <p>Damage on Sidewalk: ${tree.sidewalk}</p>
                  <p>Health: ${tree.health}</p>
                  <p>Problems: ${tree.problems}</p>
              </div>`;
    ct++;
  }
  result.innerHTML = `${ct} Results found`;
  output.innerHTML = build;

  let status = fillDropDown("status");
  document.getElementById("status").innerHTML = status;

  let treename = fillDropDown("spc_common");
  document.getElementById("treename").innerHTML = treename;

  let damage = fillDropDown("sidewalk");
  document.getElementById("damage").innerHTML = damage;

  let zipcode = fillDropDown("zipcode");
  document.getElementById("zipcode").innerHTML = zipcode;

 
}


function filterByStatusName(){
  let status = document.getElementById("status").value;
  let treename = document.getElementById("treename").value;
  let build = "";
  let ct = 0;

  for(let i = 0; i < data.length; i+=1){
    let tree = data[i];
    if(tree.status == status && tree.spc_common == treename){
      build += `<div class="fitted card">
                    <h2>${tree.spc_common}</h2>
                    <hr>
                    <h3>Zipcode: ${tree.zipcode}</h3>
                    <p>Address: ${tree.address}</p>
                    <p>Status: ${tree.status}</p>
                    <p>Damage on Sidewalk: ${tree.sidewalk}</p>
                    <p>Health: ${tree.health}</p>
                    <p>Problems: ${tree.problems}</p>
                </div>`;
      ct += 1;
    }
  }
  result.innerHTML = `${ct} Results found`;
  output.innerHTML = build;
}

function filterByDamageZip(){
  let damage = document.getElementById("damage").value;
  let zipcode = document.getElementById("zipcode").value;
  let build = "";
  let ct = 0;

  for(let i = 0; i < data.length; i+=1){
    let tree = data[i];
    if(tree.sidewalk == damage && tree.zipcode == zipcode){
      build += `<div class="fitted card">
                    <h2>${tree.spc_common}</h2>
                    <hr>
                    <h3>Zipcode: ${tree.zipcode}</h3>
                    <p>Address: ${tree.address}</p>
                    <p>Status: ${tree.status}</p>
                    <p>Damage on Sidewalk: ${tree.sidewalk}</p>
                    <p>Health: ${tree.health}</p>
                    <p>Problems: ${tree.problems}</p>
                </div>`;
      ct += 1;
    }
  }
  result.innerHTML = `${ct} Results found`;
  output.innerHTML = build;
}






let data, info, output;

async function init(){
  let link = "https://data.cityofnewyork.us/resource/uvpi-gqnh.json"; 
  info = await fetch(link);
  data = await info.json();
  console.log(data);
}

function ByStatus(){
  let s = 0, dot = 0, hpd = 0, other = 0;

  for(let i = 0; i < data.length; i++){
    let complaint = data[i];
    if(complaint.agency=="NYPD"){
      nypd++;
    }else if (complaint.agency=="DOT"){
      dot++;
    }else if (complaint.agency=="HPD"){
      hpd++;
    }else other++;

  }
  let chartData = [
      ["NYC Police Department", nypd],
      ["Dept of Transportation", dot],
      ["Dept of Housing Preservation and Development", hpd],
      ["OTHER", other]
    ];

  let chartType = document.getElementById("chartType").value;

  displayChart(chartData, "output", chartType);
}


function displayChart( data, chart_id, chart_type ){
  let chart = c3.generate({
    bindto: `#${chart_id}`,
    data: {
      columns: data,
      type: chart_type
    }
  });
}

