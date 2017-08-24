import ClientHistory from './../../lib/lib';
let clientHistory, uniqueHistory, unique1, unique2;
clientHistory = new ClientHistory({
    name: 'click',
    defaults: {
        limit: 10
    }
}).drop();
clientHistory.getItems();
uniqueHistory = new ClientHistory({
    name: 'uniqueClick',
    checkFields: ['unique']
}).drop();
document.getElementById('sTest').addEventListener('click', function (event) {
    clientHistory.push({
        event: event,
        date: new Date()
    });
    this.testResults = document.getElementById('testResults');
    if(!this.testResults) {
        this.testResults = document.createElement('div');
        this.testResults.setAttribute('id', 'testResults');
        this.parentElement.append(this.testResults);
    }
    this.testResults.innerHTML = JSON.stringify(clientHistory.getItems());
});
document.getElementById('uTest').addEventListener('click', function (event) {
    unique1 = document.getElementById('u1').checked;
    unique2 = document.getElementById('u2').checked;
    if(!unique1 && !unique2) {
        alert('Choose one unique');
        return false;
    }
    uniqueHistory.push({
        event: event,
        date: new Date(),
        unique: unique1 ? 'unique1' : 'unique2'
    });
    this.testResults = document.getElementById('uniqueResults');
    if(!this.testResults) {
        this.testResults = document.createElement('div');
        this.testResults.setAttribute('id', 'uniqueResults');
        this.parentElement.append(this.testResults);
    }
    this.testResults.innerHTML = JSON.stringify(uniqueHistory.getItems());
});
