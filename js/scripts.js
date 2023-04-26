window.addEventListener("DOMContentLoaded", () => {

    //Посчитаем процентное соотношение для графиков
    let values = document.querySelectorAll('.table__cell-value'),
        rows = document.querySelectorAll('.table__row'),
        valuesArr = [];
    values.forEach(value => valuesArr.push(+value.getAttribute('data-value')));

    console.log(valuesArr);

    // находим максимальное значение
    let max = Math.max(...valuesArr);

    rows.forEach((row) => {
        let cells = row.querySelectorAll('.table__cell');

        cells.forEach((cell) => {
            let value = cell.querySelector('.table__cell-value').getAttribute('data-value');
            let gCell = cell.querySelector('.table__cell-g span');

            // Вычисляем процентное соотношение значения относительно максимального значения
            let percent = (value / max) * 100;

            gCell.style.width = percent + '%';
            gCell.style.height = percent + '%';
        });
    });


    // Категория проекта
    let projects = document.querySelectorAll('.projects__item'),
        categories = document.querySelectorAll('.table__cell');

    projects.forEach(project => {
        // сравниваем дата атрибуты ячейки и проекта после клика
        // проект который принадлежит к категории имеет такой же дата атрибут
        project.addEventListener('click', () => {
            let dataCategory = project.getAttribute('data-category');
            categories.forEach(category => {
                if (dataCategory === category.getAttribute('data-category')) {
                    if (category.classList.contains('active')) {
                        category.classList.remove('active');
                    } else {
                        category.classList.add('active');
                    }
                } else {
                    category.classList.remove('active');
                }
            });
        })
    });


    // фильтруем проекты по категории с помощью тех же дата атрибутов
    categories.forEach(category => {
        category.addEventListener('click', () => {
            if (category.classList.contains('active')) {
                // если категория уже активна, снимаем класс active и показываем все проекты
                category.classList.remove('active');
                projects.forEach(project => {
                    project.style.display = 'table';
                });
            } else {
                // если категория неактивна фильтруем проекты
                categories.forEach(item => item.classList.remove('active'));
                let dataCategory = category.getAttribute('data-category');
                projects.forEach(project => {
                    if (dataCategory !== project.getAttribute('data-category')) {
                        category.classList.add('active');
                        project.style.display = 'none';
                    } else {
                        project.style.display = 'table';
                    }
                });
            }
        })
    });

});