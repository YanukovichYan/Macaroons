'use strict';

window.onload = function () {
    document.getElementById('burger').onclick = function () {
        document.getElementById('menu').classList.add('open');
    }

    document.querySelectorAll('#menu *').forEach((item) => {
        item.onclick = () => {
            document.getElementById('menu').classList.remove('open');
        }
    })


    let inputOrder = $('#input-order'),
        inputName = $('#input-name'),
        inputPhone = $('#input-phone'),
        submit = $('#submit'),
        inputMain = $('.input'),
        loading = $('.loading'),
        form = $('.fourth-inputs'),
        window = $('.window');


    // Маска телефона
    inputPhone.inputmask({"mask": "(+999) 99-999-99-99"});

    // Валидация формы
    submit.click(function () {

        $('.error-input').hide();
        let hasError = false;
        inputMain.removeClass('input-red');


        if (!inputOrder.val()) {
            inputOrder.next().show();
            hasError = true;
            inputOrder.addClass('input-red');
        }
        if (!inputName.val()) {
            inputName.next().show();
            hasError = true;
            inputName.addClass('input-red');
        }
        if (!inputPhone.val()) {
            inputPhone.next().show();
            hasError = true;
            inputPhone.addClass('input-red');
        }

        // Отправка на сервер
        if (!hasError) {
            loading.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {order: inputOrder.val(), name: inputName.val(), phone: inputPhone.val()}
            })
                .done(function (msg) {
                    loading.hide();
                    if (msg.success === 1) {
                        form.remove();
                        window.css('display', 'flex');
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ.')
                    }
                });
        }


    });
}