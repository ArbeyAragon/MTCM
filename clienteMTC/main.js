
//const tem = document.getElementById('dat_in');

function auntenticado(){
    bodyId.hidden=false;
    var dbRef = firebase.database().ref().child("currentAlgoData");
    
    setMenuPrincipal('ib_m');
    dbRef.on('value',function(snap) {
        //console.log(snap.val())
        let data = snap.val(); 
        //console.log(data.data)

        if(init){
            createPlot(data);
            init=false;
        } else {
            console.log(data);
            updateData(data)
        }
        
        let tabla = '';
        Object.keys(data).forEach((key) => {
            var d = new Date(+data[key].date);
            
            tabla = tabla + `<tr>
                <td>${key}</td>
                <td>${data[key].data}</td>
                <td>${d.toString()}</td>
            </tr>`
        })
        

        let tablaEnd = `<table class="table">
            <thead>
            <tr>
                <th scope="col">Nemo</th>
                <th scope="col">Price</th>
                <th scope="col">Date</th>
            </tr>
            </thead>
            <tbody>
                ${tabla}
            </tbody>
        </table>`
            
        document.getElementById("tabla1").innerHTML = tablaEnd;
        
    });
}

auntenticado();

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createPlot(data){
    let names = Object.keys(data);
    var data = [];
    names.forEach((nemo) => {
        data.push({
            x: [], 
            y: [],
            mode: 'lines',
            name: nemo,
            line: {color: getRandomColor()}
        });
    });
    Plotly.plot('graph1', data);      
}

function updateData(data){

    let names=Object.keys(data)
    var time = new Date();
    
    timesData = [];
    dataList = [];
    lenDataIter = [];
    let num = 0;
    names.forEach(key => {
        timesData.push([time]);
        dataList.push([data[key].data]);
        lenDataIter.push(num);
        num=num+1;
    });

    var update = {
        x:  timesData,//[[time],[time]],
        y: dataList//[[rand()],[rand()]]
    }
    var olderTime = time.setMinutes(time.getMinutes() - 1);
    var futureTime = time.setMinutes(time.getMinutes() + 1);

    var minuteView = {
        xaxis: {
            type: 'date',
            range: [olderTime,futureTime]
        },  
    };

    Plotly.relayout('graph1', minuteView);
    Plotly.extendTraces('graph1', update, lenDataIter)
}


/*
var data = [{
    x: [], 
    y: [],
    mode: 'lines',
    name: 'AAPL2',
    line: {color: '#80CAF6'}
},{
    x: [], 
    y: [],
    mode: 'lines',
    name: 'GOOGL2',
    line: {color: '#80FFFF'}
}]

Plotly.plot('graph2', data);  
/** */

/*
var cnt = 0;
var interval = setInterval(function() {

    var time = new Date();

    var update = {
        x:  [[time],[time]],
        y: [[rand()],[rand()]]
    }
    var olderTime = time.setMinutes(time.getMinutes() - 1);
    var futureTime = time.setMinutes(time.getMinutes() + 1);

    var minuteView = {
        xaxis: {
            type: 'date',
            range: [olderTime,futureTime]
        },  
    };

    Plotly.relayout('graph1', minuteView);
    Plotly.extendTraces('graph1', update, [0,1])

    if(cnt === 100) clearInterval(interval);


}, 1000);
/** */


/*
var cnt2 = 0;
var interval2 = setInterval(function() {

    var time = new Date();

    var update = {
        x:  [[time],[time]],
        y: [[rand()],[rand()]]
    }
    var olderTime = time.setMinutes(time.getMinutes() - 1);
    var futureTime = time.setMinutes(time.getMinutes() + 1);

    var minuteView = {
        xaxis: {
            type: 'date',
            range: [olderTime,futureTime]
        },  
    };

    Plotly.relayout('graph2', minuteView);
    Plotly.extendTraces('graph2', update, [0,1])

    if(cnt2 === 100) clearInterval(interval2);
}, 1000);
/** */


/** */

//////////////////////////////////////////////////
/*
var provider = new firebase.auth.GoogleAuthProvider();

function googleSignin() {
   firebase.auth()
   
   .signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
		
      console.log(token)
      console.log(user)
   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
		
      console.log(error.code)
      console.log(error.message)
   });
}

function googleSignout() {
   firebase.auth().signOut()
	
   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')  
   });
}/** */


/*
var dbRef = firebase.database().ref().child("currectTestDB").child("test1");

var firstTime = true;

dbRef.on('value',function(snap) {
    console.log(snap.val())
    let value = snap.val(); 
    

    var time = new Date(value.date);
    

    if(firstTime){
        firstTime=false;

        var data = [{
            x: [time], 
            y: [value.data],
                mode: 'lines',
                line: {color: '#80CAF6'}
        }]
            
        Plotly.plot('graph', data);      

    }else{

        var update = {
            x:  [[time]],
            y: [[value.data]]
        }
    
        var olderTime = time.setMinutes(time.getMinutes() - 1);
        var futureTime = time.setMinutes(time.getMinutes() + 1);
    
        var minuteView = {
            xaxis: {
            type: 'date',
            range: [olderTime,futureTime]
            }
        };
    
        Plotly.relayout('graph', minuteView);
        Plotly.extendTraces('graph', update, [0])

    }

});/** */



/** */
/*
setInterval(function() {
    document.getElementById("hola").innerHTML = rand();
}, 1000);/** */


/*

var cnt = 0;

var interval = setInterval(function() {

    var time = new Date();

    var update = {
        x:  [[time]],
        y: [[rand()]]
    }

    var olderTime = time.setMinutes(time.getMinutes() - 1);
    var futureTime = time.setMinutes(time.getMinutes() + 1);

    var minuteView = {
        xaxis: {
        type: 'date',
        range: [olderTime,futureTime]
        }
    };

    Plotly.relayout('graph', minuteView);
    Plotly.extendTraces('graph', update, [0])

    if(cnt === 100) clearInterval(interval);
}, 1000);/** */
