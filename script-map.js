let data, info, leftPanel, mapObj;

async function init(){
  let link ="https://data.cityofnewyork.us/resource/uvpi-gqnh.json"; 
  info = await fetch(link);
  data = await info.json();
  leftPanel = get("map-leftPanel");
  let build = "";

  for(let i = 0; i < data.length; i+=1) {
    let tree = data[i];
    build += card(tree);
  }

  leftPanel.innerHTML = build;  
}

