var name,
    pass;

var user = {
    name: 'Ivan',
    pass: '1111'
};

function auth() {
    name = prompt('Please enter your name:');

    if (name === user.name) {
        pass = prompt('Please enter your password:');

        if (pass === user.pass) {
            alert('Welcome on board!');

        } else if (pass === null) {
                alert('See you!');
        } else {
            retry(2);
        }

    } else if (name === 'null') { // ?????
        alert('See you!');
    } else {
        alert('Access denied');
    }

    console.log(name);
}

function retry(n) {
    pass = prompt('Please try again. ' + n + ' attempts left.');
    n = n - 1;

    if (pass === user.pass) {
        alert('Welcome on board!');
        return false;
    } else if (pass === null) {
        alert('See you!');
        return false;
    } else if (n === 0) {
        alert('Access denied');
        return false;
    } else {
        retry(n);
    }
}

auth();