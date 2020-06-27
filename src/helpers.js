/*
* Получение случайного цвета (для графиков)
* */
export function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/*
* Фунция, группирующая данные по дате для построения LineChart
*  */
export function preprocessDataForLineChart (data, groupColumn) {
    let result = [];
    let reduced = data.reduce(function (r, a) {
        r[a.date] = r[a.date] || [];
        r[a.date].push(a);
        return r;
    }, Object.create(null));

    Object.keys(reduced).forEach(function (key) {
        let s = {}
        s.date = (new Date(key)).toLocaleString('ru', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        console.log(key, reduced[key]);
        for (let elem of reduced[key]) {
            s[elem[groupColumn].name] = elem.amount;
        }
        result.push(s);
    });

    return result;
}

/*
* Простая проверка наличия объекта в списке
* */
 export function containsObject(obj, list) {
    let i;
    for (i = 0; i < list.length; i++) {
        if (list[i].value === obj.value) {
            return true;
        }
    }
    return false;
}

/*
* Сортировка списка по ключу
* */
export function sortByKey(array, key, order) {
    let a = array.sort(function(a, b) {
        let x = a[key]; let y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });

    if (order) {
        return a;
    } else {
        return a.reverse();
    }
}
