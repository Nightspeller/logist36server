$('document').ready(function(){

    submitFormBothCases();
    editInfo();
    deleteButtonHandler();
    loginAndLogoutButtonHandlers();

    registrationButtonsHandler();
    orderButtonsHandler();
    educationRegistrationButtonsHandler();
});

function submitFormBothCases(){
    var page = '';
    var form = '';
    switch (window.location.pathname){
        case '/addEvent':
            form = $('#eventForm');
            page = '/events/';
            break;
        case '/addNews':
            form = $('#newsForm');
            page = '/news/';
            break;
        case '/addParticipant':
            form = $('#participantForm');
            page = '/participants/';
            break;
        case '/addPartner':
            form = $('#partnerForm');
            page = '/partners/';
            break;
        case '/addCompany':
            form = $('#companyForm');
            page = '/companies/';
            break;
        case '/addEducation':
            form = $('#educationForm');
            page = '/educations/';
            break;
        case '/addArticle':
            form = $('#articleForm');
            page = '/articles/';
            break;
    }
    if (form){
        form.submit(function (e) {
            e.preventDefault();
            var formData = new FormData($(this)[0]);
            if (window.location.search !== ''){
                $.ajax({
                    url: page+window.location.search.split('?')[1],
                    data: formData,
                    processData: false,
                    contentType: false,
                    type: 'PUT',
                    success: function(data){
                        alert('Успешно обновлено!');
                        console.log('Success: ', data)
                    },
                    error: function(error){
                        alert('К сожалению произошла ошибка. Повторите попытку или обратитесь к администратору.');
                        console.log('Error: ', error)
                    }
                });
            } else {
                $.ajax({
                    url: page,
                    data: formData,
                    processData: false,
                    contentType: false,
                    type: 'POST',
                    success: function(data){
                        alert('Успешно добавлено!');
                        console.log('Success: ', data)
                    },
                    error: function(error){
                        alert('К сожалению произошла ошибка. Повторите попытку или обратитесь к администратору.');
                        console.log('Error: ', error)
                    }
                });
            }
        });
    }
}

function editInfo(){
    if (window.location.search){
        var page = '';
        switch (window.location.pathname){
            case '/addEvent':
                page = '/events/';
                break;
            case '/addNews':
                page = '/news/';
                break;
            case '/addParticipant':
                page = '/participants/';
                break;
            case '/addPartner':
                page = '/partners/';
                break;
            case '/addCompany':
                page = '/companies/';
                break;
            case '/addEducation':
                page = '/educations/';
                break;
            case '/addArticle':
                page = '/articles/';
                break;
        }
        if (page){
            $.ajax({
                url: page+window.location.search.split('?')[1],
                type: 'GET',
                success: function(data){
                    console.log('Success: ', data);
                    for (var field in data){
                        $('input[name='+ field +']').val(data[field]);
                    }
                },
                error: function(error){
                    alert('К сожалению произошла ошибка. Повторите попытку или обратитесь к администратору.');
                    console.log('Error: ', error)
                }
            });
        }
    }
}

function deleteButtonHandler(){
    $('.deleteButton').on('click',function(){
        if (confirm('Вы уверены? Данные будут удалены БЕЗВОЗВРАТНО!')){
            var button = $(this);
            var serviceURL = window.location.pathname+'/';
/*            switch (window.location.pathname){
                case '/events':
                    serviceURL = '/events/';
                    break;
                case '/news':
                    serviceURL = '/news/';
                    break;
                case '/participants':
                    serviceURL = '/participants/';
                    break;
                case '/partners':
                    serviceURL = '/partners/';
                    break;
                case '/companies':
                    serviceURL = '/companies/';
                    break;
                case '/educations':
                    serviceURL = '/educations/';
                    break;
            }*/
            $.ajax({
                url: serviceURL+button.data('id'),
                type: 'DELETE',
                success: function(data){
                    alert('Удалено');
                    console.log('Success: ', data);
                    button.hide('fast').parent().hide('fast').prev().hide('slow');
                },
                error: function(error){
                    alert('К сожалению произошла ошибка. Повторите попытку или обратитесь к администратору.');
                    console.log('Error: ', error)
                }
            });
        }
    });
}

function loginAndLogoutButtonHandlers(){
    $('#loginForm').submit(function(event){
        event.preventDefault();
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: '/login',
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
                location.reload();
                console.log('Success: ', data)
            },
            error: function(error){
                console.log('Error: ', error);
                var errorMessage = $('#errorMessage');
                switch (error.status){
                    case 403:
                        errorMessage.text('Неверный пароль');
                        break;
                    case 404:
                        errorMessage.text('Неверный логин');
                        break;
                    default :
                        errorMessage.text('К сожалению произошла ошибка. Повторите попытку или обратитесь к администратору.');
                        break;
                }
            }
        });
    });
    $('#logoutButton').on('click', function(){
        $.ajax({
            url: '/logout',
            type: 'POST',
            success: function(data){
                location.reload();
                console.log('Success: ', data)
            },
            error: function(error){
                alert('К сожалению произошла ошибка. Повторите попытку или обратитесь к администратору.');
                console.log('Error: ', error)
            }
        });
    })
}

function registrationButtonsHandler(){
    if (window.location.pathname === '/registration'){
        $('#regNewParticipant').submit(function(event){
            event.preventDefault();
            var formData = new FormData($(this)[0]);
            $.ajax({
                url: '/registration',
                data: formData,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(data){
                    alert('Заявка отправлена!');
                    console.log('Success: ', data)
                },
                error: function(error){
                    alert('К сожалению произошла ошибка. Повторите попытку или обратитесь к администратору.');
                    console.log('Error: ', error)
                }
            });
        })
    }
}

function educationRegistrationButtonsHandler(){
    if (window.location.pathname === '/educationRegistration'){
        $('#regNewParticipant').submit(function(event){
            event.preventDefault();
            var formData = new FormData($(this)[0]);
            $.ajax({
                url: '/educationRegistration',
                data: formData,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(data){
                    alert('Заявка отправлена!');
                    console.log('Success: ', data)
                },
                error: function(error){
                    alert('К сожалению произошла ошибка. Повторите попытку или обратитесь к администратору.');
                    console.log('Error: ', error)
                }
            });
        })
    }
}

function orderButtonsHandler(){
    if (window.location.pathname === '/order'){
        $('#newOrder').submit(function(event){
            event.preventDefault();
            var formData = new FormData($(this)[0]);
            $.ajax({
                url: '/order',
                data: formData,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(data){
                    alert('Заявка отправлена!');
                    console.log('Success: ', data)
                },
                error: function(error){
                    alert('К сожалению произошла ошибка. Повторите попытку или обратитесь к администратору.');
                    console.log('Error: ', error)
                }
            });
        })
    }
}