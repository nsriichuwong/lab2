let firebaseConfig = {
    apiKey: "AIzaSyDJibXERQmjx2hOOzRVinwc5Jz_kuqb1n8",
    authDomain: "localhost",
    projectId: "project-d471b",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

$('#pass').click(() => {

    // var letter = $('#Email').val();
    // for (let index = 1 ; index < letter.length ; index++) {
    //     if (letter.charAt(index)=="@" || letter.charAt(index)==".") {
    //         continue
    //     }else{
    //         letter.replace(letter.charAt(index), "x");
    //     }
        
    // }
    
    db.collection("Contact")
    .add({
        Firstname: $('#Firstname').val(),
        Lastname: $('#Lastname').val(),
        Gender: $("[type='radio']:checked").val(),
        Email: $('#Email').val(),
        // Blur_Email: letter,
        Detail: $('#Detail').val(),
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        $('#Firstname').val(''),
        $('#Lastname').val(''),
        $('#Email').val(''),
        $('#Detail').val('')
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    
})

$('#reset').click(() => {
        $('#Firstname').val(''),
        $('#Lastname').val(''),
        $('#Email').val(''),
        $('#Detail').val('')
});
    
var male;
var female;
var resultmale;
var resultfemale;

db.collection('Contact').orderBy("Firstname").onSnapshot(doc =>{
    let table = $('tbody')[0]
    document.querySelectorAll("tbody tr").forEach(item => item.remove())
    var male = 0;
    var female = 0;
    doc.forEach(item => {
        let row = table.insertRow(-1)
        let firstCell = row.insertCell(0)
        let secondCell = row.insertCell(1)
        let thridCell = row.insertCell(2)
        let forthCell = row.insertCell(3)
        let fifthCell = row.insertCell(4)

        if (item.data().Gender == "Male") {male++;} else{female++; }

        // let letter = item.data().Email;
        // for (let index = 1 ; index < letter.length ; index++) {
        // if (letter[index] =="@" || letter[index]==".") {
        //     continue
        // }else{
        //     letter[index] =  "x";
        // }
        
        // }
        let string = String(item.data().Email)
        let something = ""
        for(i=0;i<string.length;i++){
            if(i==0|| string[i]=='@'|| string[i]=='.'){
               something += string[i]
            }else something +='x'
        }

        firstCell.textContent = item.data().Firstname
        secondCell.textContent = item.data().Lastname
        thridCell.textContent = item.data().Gender
        forthCell.textContent = something
        fifthCell.textContent = item.data().Detail

        google.charts.load("current", {packages:["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
      
        var resultmale = male/(male + female)*100;
        var resultfemale = female/(male + female)*100;
              
        function drawChart() {
                var data = google.visualization.arrayToDataTable([
                  ['Task', 'All Time'],
                  ['Male',resultmale],
                  ['Female',resultfemale],
                ]);
        
                var options = {
                  title: 'Gender',
                  titleTextStyle: {color: 'black', fontSize: 30},
                  colors:['#f885a7','#7351b0'] ,
                  pieHole: 0.5,
                };
        
                var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
                chart.draw(data, options);
              };
                
            })
});




