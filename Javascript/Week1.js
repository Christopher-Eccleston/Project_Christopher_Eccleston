function ShowHelloMessage() {
    var name = document.getElementById("myname");
    document.getElementById("hellomessage").innerHTML = "Hello, " + name.value;
}

document.getElementById("mybutton").onclick = ShowHelloMessage;

const fileUrl = '/Database/Data.csv'

Papa.parse(fileUrl, {
    download:true,
    header: true,
    complete: function(results) {
        console.log("Parsed data:", results.data);

        const data = results.data;
        if (data.length > 0) {
            const outputElement = document.getElementById('output');
            if (outputElement) {
                const firstRow = data[0];
                outputElement.textContent = `First product is: ${firstRow.name}`;
            }
        }
    },
    error: function(err, file) {
        console.error("Error parsing file:", err);
    }
});