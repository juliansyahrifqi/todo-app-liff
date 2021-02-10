window.onload = function() {
    const useNodeJS = false;   // if you are not using a node server, set this value to false
    const defaultLiffId = "1655627736-L9KQPNkM";   // change the default LIFF value if you are not using a node server
 
    // DO NOT CHANGE THIS
    let myLiffId = "";
 
    // if node is used, fetch the environment variable and pass it to the LIFF method
    // otherwise, pass defaultLiffId
    if (useNodeJS) {
        fetch('/send-id')
            .then(function(reqResponse) {
                return reqResponse.json();
            })
            .then(function(jsonResponse) {
                myLiffId = jsonResponse.id;
                initializeLiffOrDie(myLiffId);
            })
            .catch(function(error) {
                document.getElementById("liffAppContent").classList.add('hidden');
                document.getElementById("nodeLiffIdErrorMessage").classList.remove('hidden');
            });
    } else {
        myLiffId = defaultLiffId;
        initializeLiffOrDie(myLiffId);
    }
};
 
/**
* Check if myLiffId is null. If null do not initiate liff.
* @param {string} myLiffId The LIFF ID of the selected element
*/
function initializeLiffOrDie(myLiffId) {
    if (!myLiffId) {
        document.getElementById("liffAppContent").classList.add('hidden');
        document.getElementById("liffIdErrorMessage").classList.remove('hidden');
    } else {
        initializeLiff(myLiffId);
    }
}
 
/**
* Initialize LIFF
* @param {string} myLiffId The LIFF ID of the selected element
*/
function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            // start to use LIFF's api
            initializeApp();
        })
        .catch((err) => {
            document.getElementById("liffAppContent").classList.add('hidden');
            document.getElementById("liffInitErrorMessage").classList.remove('hidden');
        });
}
 
/**
 * Initialize the app by calling functions handling individual app components
 */
function initializeApp() {
    displayIsInClientInfo();
    registerButtonHandlers();
 
    // check if the user is logged in/out, and disable inappropriate button
    if (liff.isLoggedIn()) {
        document.getElementById('liffLoginButton').disabled = true; 
    } else {
        document.getElementById('liffLogoutButton').classList.toggle('hidden');
    }
}

/**
* Toggle the login/logout buttons based on the isInClient status, and display a message accordingly
*/
function displayIsInClientInfo() {
    if (liff.isInClient()) {
        document.getElementById('liffLoginButton').classList.toggle('hidden');
        document.getElementById('liffLogoutButton').classList.toggle('hidden');
        document.getElementById('isInClientMessage').textContent = 'Membuka aplikasi di dalam aplikasi LINE';
    } else {
        document.getElementById('isInClientMessage').textContent = 'Membuka aplikasi di browser eksternal';
        document.getElementById('openWindowButton').classList.toggle('hidden');
        document.getElementById('closeWindowButton').classList.toggle('hidden');
        document.getElementById('sendMessageButton').classList.toggle('hidden');
    }
}

function registerButtonHandlers() {
    document.getElementById('openWindowButton').addEventListener('click', function() {
        liff.openWindow({
            url: 'https://todoliffapp.herokuapp.com/', // Isi dengan Endpoint URL aplikasi web Anda
            external: true
        });
    });

    document.getElementById('closeWindowButton').addEventListener('click', function() {
        if (!liff.isInClient()) {
            sendAlertIfNotInClient();
        } else {
            liff.closeWindow();
        }
    });

    document.getElementById('liffLoginButton').addEventListener('click', function() {
        if (!liff.isLoggedIn()) {
            liff.login();
        }
    });
 
    document.getElementById('liffLogoutButton').addEventListener('click', function() {
        if (liff.isLoggedIn()) {
            liff.logout();
            window.location.reload();
        }
    });

    document.getElementById('sendMessageButton').addEventListener('click', function() {
        if (!liff.isInClient()) {
            sendAlertIfNotInClient();
        } else {
            let todosList = [];

            todos.forEach((todo) => {
                todosList.push(todo);
            })

            if(todosList.length == 0) {
                window.alert("Todo list anda masih kosong!");
            } else {
                liff.sendMessages([{
                    'type': 'text',
                    'text': `Todo list hari ini adalah \n\n- ${todosList.join('\n- ')}`
                }]).then(function() {
                    window.alert('Pesan berhasil dikirim!');
                    window.location.reload();
                }).catch(function(error) {
                    window.alert('Pesan gagal dikirim: ' + error);
                    window.location.reload();
                });
            }   
        }
    });
}

function sendAlertIfNotInClient() {
    alert('This button is unavailable as LIFF is currently being opened in an external browser.');
}
 
