
const getData = async () => {
  let json
  await fetch("https://cors-anywhere.herokuapp.com/https://4v9r83qfo4.execute-api.eu-central-1.amazonaws.com/dev")
    .then(res => json = res.json())
  return json
}

const load_graph = async () => {
  document.addEventListener('DOMContentLoaded', async function (e) {
    const datas = await getData();
    console.log(datas)



    const margin = { top: 20, right: 20, bottom: 60, left: 60 },
      width = 500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .range([0, width])
      .padding(0.5);

    const y = d3.scaleLinear()
      .range([height, 0]);

    const svg = d3.select(".app").append("svg")
      .attr("id", "svg1")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);


    datasJson = []
    colors = ['red', 'blue', 'orange', 'green'];
    datas.data.forEach(element => {
      datasJson.push({
        "x": element[0],
        "y": element[1]
      })

    });
    console.log(datasJson)

    x.domain(datasJson.map(d => d.x));
    y.domain([0, 5]);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll("text")
      .attr("dy", "2em")

    svg.append("g")
      .call(d3.axisLeft(y).ticks(5));

    svg.selectAll(".bar")
      .data(datasJson)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.x))
      .attr("width", 50)
      .attr("y", d => y(d.y))
      .attr("height", d => height - y(d.y))
      .attr("fill", function (d, i) { return colors[i] });















    var keys = Object.keys(datas.scores);
    scores = [{
      "x": keys[0],
      "y": datas.scores.a
    },
    {
      "x": keys[1],
      "y": datas.scores.b
    },
    {
      "x": keys[2],
      "y": datas.scores.c
    }
    ]

    const x2 = d3.scalePoint()
      .range([0, width])

    const y2 = d3.scaleLinear()
      .range([height, 0]);

    var svg2 = d3.select(".app").append("svg")
      .attr("id", "svg2")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    x2.domain(scores.map(function (d) { return d.x; }));
    y2.domain([0, 100])

    svg2.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x2).tickSize(0))
      .selectAll("text")
      .attr("dy", "2em")

    svg2.append("g")
      .call(d3.axisLeft(y2).ticks(6));

    console.log(scores)
    svg2.append('g')
    .selectAll("dot")
    .data(scores)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x2(d.x); } )
      .attr("cy", function (d) { return y2(d.y); } )
      .attr("r", 5)
      .style("fill", "#69b3a2")		
        
  });







}

load_graph()