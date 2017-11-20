var config = {
    apiKey: "AIzaSyDfq8UY5nh8zBN5pLR79azaGXec_07_7lE",
    authDomain: "mtcdb-912e6.firebaseapp.com",
    databaseURL: "https://mtcdb-912e6.firebaseio.com",
    projectId: "mtcdb-912e6",
    storageBucket: "mtcdb-912e6.appspot.com",
    messagingSenderId: "635396422651"
};
firebase.initializeApp(config);

const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');

var init = true;

const bodyId = document.getElementById('bodyId');
const menuPrincipal = ['ib_m','oanda_m','poloniex_m']

function setMenuPrincipal(menuP){
    menuPrincipal.forEach( m => {
        document.getElementById(m.replace('_m','')).hidden = !(m===menuP)
        //console.log(document.getElementById(m))
        if(m===menuP){
            document.getElementById(m).classList.add("active") 
        } else {
            document.getElementById(m).classList.remove("active"); 
        }
    });
}


var logOutBool = false;

btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    
    const auth = firebase.auth();
    console.log('Loggea usuario')
    //btnLogout.hidden = false
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(err => console.log(err.message))

});


btnSignUp.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    
    const auth = firebase.auth();
    console.log('Crea usuario')
    //btnLogout.hidden = false
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(err => console.log(err.message))
    //.then(user => console.log(user))
});

btnLogout.addEventListener('click', e => {
    logOutBool=true;
    firebase.auth().signOut();
});    

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        console.log(firebaseUser)
        btnLogout.hidden = false
        auntenticado();
    }else{
        console.log('not logget in')
        if(logOutBool){
            location.reload();
        }        
        btnLogout.hidden = true
    }
});

function rand() {
    return Math.random();
}
  