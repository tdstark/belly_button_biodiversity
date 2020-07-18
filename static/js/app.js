var dropDownChoice = d3.select("#selDataset")

function buildTable(choice){
    d3.json("samples.json").then(function(data){

        // console.log(data)

        var metadata = data.metadata;
        var samples = data.samples;
        var record = samples.filter(s => s.id == choice)[0];
        var meta_record = metadata.filter(m => m.id == choice)[0];

        // var record = record[0];
        console.log(record);

        var sample_values = record.sample_values;
        var top_sample_values = sample_values.slice(0, 10);
        var otu_ids = record.otu_ids;
        var top_otu_ids = otu_ids.slice(0, 10).map(d => "OTU " + d)
        var otu_labels = record.otu_labels;
        var top_otu_labels = otu_labels.slice(0, 10);
        
        console.log(sample_values)

        var barTrace = [{
            type: 'bar',
            x: top_sample_values,
            y: top_otu_ids,
            orientation: 'h',
            text: top_otu_labels,
            marker: {
                color: top_sample_values
            }
        }]

        console.log(barTrace)

        var barLayout = {
            title: "Top OTU IDs",
            width: 1000,
            xaxis: {
                title: {
                    text: "Species Abundance"
                }
            }
        }

        var bubbleTrace = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            type: 'bubble',
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids
            }
        }]

        var bubbleLayout = {
            height: 700,
            width: 1200,
            xaxis: {
                title: {
                    text: "Operational Taxonomic Unit (OTU) ID"
                }
            },
            yaxis: {
                title: {
                    text: "Species Abundance"
                }
            },
        }

        //This creates the charts based on the traces above
        Plotly.react('bar', barTrace, barLayout);
        Plotly.react('bubble', bubbleTrace, bubbleLayout);

        //This populates the metadata field
        d3.select("#id").text(`Ethnicity: ${meta_record.id}`)
        d3.select("#ethnicity").text(`Ethnicity: ${meta_record.ethnicity}`)
        d3.select("#gender").text(`Gender: ${meta_record.gender}`)
        d3.select("#age").text(`Age: ${meta_record.age}`)
        d3.select("#location").text(`Location: ${meta_record.location}`)

})}

//This section populates the dropdown list
d3.json("samples.json").then(function(data){
    var subjectIdList = data.names
    subjectIdList.forEach(id => {
        var newChoice = dropDownChoice.append("option")
        newChoice.text(id)
    });
})

//This creates the initial table with 940 as the default
buildTable("940")

dropDownChoice.on("change", buildTable())

