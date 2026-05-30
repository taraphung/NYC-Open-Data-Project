let data, info, output;

async function init(){
  let link = "https://data.cityofnewyork.us/resource/uvpi-gqnh.json"; 
  info = await fetch(link);
  data = await info.json();
  console.log(data);
}

function ByStatus(){
  let alive = 0, dead = 0, stump = 0, other = 0;

  for(let i = 0; i < data.length; i++){
    let tree = data[i];
    if(tree.status=="Alive"){
      alive++;
    }else if (tree.status=="Dead"){
      dead++;
    }else if(tree.status=="Stump"){
      stump++;
    }else other++;
  }

  let chartData = [
      ["Alive", alive],
      ["Dead", dead],
      ["Stump", stump],
      ["Other", other]
    ];

  displayChart(chartData, "output", "bar");
}

function ByName (){
  let honey = 0, london = 0, ginkgo = 0, redmaple = 0, other = 0; 

  for(let i = 0; i < data.length; i++){
    let tree = data[i];
    if(tree.spc_common=="honeylocust"){
      honey++;
    }else if (tree.spc_common=="London planetree"){
      london++;
    }else if(tree.spc_common=="ginkgo"){
      ginkgo++;
    }else if(tree.spc_common=="red maple"){
      redmaple++;
    }else other++;
  }

  let chartData = [
      ["Honeylocust", honey],
      ["London planetree", london],
      ["Ginkgo", ginkgo],
      ["Red maple", redmaple],
      ["Other", other]
    ];

  displayChart(chartData, "output", "pie");
}

function ByHealth (){
  let good = 0, fair = 0, poor = 0, other = 0; 

  for(let i = 0; i < data.length; i++){
    let tree = data[i];
    if(tree.health=="Good"){
      good++;
    }else if (tree.health=="Fair"){
      fair++;
    }else if(tree.health=="Poor"){
      poor++;
    }else other++;
  }

  let chartData = [
      ["Good", good],
      ["Fair", fair],
      ["Poor", poor],
      ["Other", other]
    ];

  displayChart(chartData, "output", "donut");
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

