let count = 10;
let people = [];
let container = document.getElementById('container');
let tpl = '{% for item in items %}<li>{{ $item.name }}</li>{% endfor %}';

for (i = 1; i < count; i++) {
    let promise = fetch('http://swapi.co/api/people', {mode: 'cors'});

    people.push(promise);
}

Promise
    .all(people)
    .then((items) => {
        return Promise.all(map(item => item.json()));
        container.innerHTML = nunjucks.renderString(tpl, items);
});