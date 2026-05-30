let data, info, output;

async function init(){
  let link = "https://data.cityofnewyork.us/resource/uvpi-gqnh.json"; 
  info = await fetch(link);
  data = await info.json();
  console.log(data);
}

function ByProb(){
  let none = 0, stones = 0, roots = 0, trunk = 0, other = 0;

  for(let i = 0; i < data.length; i++){
    let tree = data[i];
    if(tree.problems=="None"){
      none++;
    }else if (tree.problems=="Stones" || tree.problems=="Stones,BranchOther" || tree.problems=="Stones,BranchLights" || tree.problems=="Stones,WiresRope" || tree.problems=="Stones,WiresRope,BranchLights" || tree.problems=="Stones,TrunkOther" || tree.problems=="Stones,RootOther,BranchOther" || tree.problems=="Stones,RootOther"){
      stones++;
    }else if(tree.problems=="RootOther" || tree.problems=="RootOther,TrunkOther,BranchOther"|| tree.problems=="RootOther,BranchOther" || tree.problems=="Stones,RootOther" || tree.problems=="RootOther,TrunkOther"){
      roots++;
    }else if(tree.problems=="TrunkOther" || tree.problems=="TrunkLights,BranchLights" || tree.problems=="RootOther,TrunkOther,BranchOther" || tree.problems=="WiresRope,TrunkOther,BranchOther" || tree.problems=="MetalGrates,TrunkOther" || tree.problems=="Stones,TrunkOther" || tree.problems=="RootOther,TrunkOther,BranchOther" || tree.problems=="WiresRope,TrunkLights,BranchLights" || tree.problems=="TrunkOther,BranchLights"){
      trunk++;
    }else other++;
  }

  let chartData = [
      ["None", none],
      ["Stones", stones],
      ["Roots", roots],
      ["Trunk", trunk],
      ["Other", other]
    ];

  displayChart(chartData, "output", "bar");
}

function ByName (){
  let honey = 0, london = 0, ginkgo = 0, maple = 0, pinoak = 0, sophora = 0, other = 0; 

  for(let i = 0; i < data.length; i++){
    let tree = data[i];
    if(tree.spc_common=="honeylocust"){
      honey++;
    }else if (tree.spc_common=="London planetree"){
      london++;
    }else if(tree.spc_common=="ginkgo"){
      ginkgo++;
    }else if(tree.spc_common=="Norway maple"){
      maple++;
    }else if(tree.spc_common=="pin oak"){
      pinoak++;
    }else if(tree.spc_common=="Sophora"){
      sophora++;
    }else other++;
  }

  let chartData = [
      ["Honeylocust", honey],
      ["London planetree", london],
      ["Ginkgo", ginkgo],
      ["Norway maple", maple],
      ["Pink oak", pinoak],
      ["Sophora", sophora],
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

