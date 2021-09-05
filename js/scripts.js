$('#open1').on('click', function (e) {
    e.preventDefault();
    $('#modal').modal('show').find('.modal-body').load($(this).attr('href'));
});
$('#open2').on('click', function (e) {
    e.preventDefault();
    $('#modal').modal('show').find('.modal-body').load($(this).attr('href'));
});
$('#open3').on('click', function (e) {
    e.preventDefault();
    $('#modal').modal('show').find('.modal-body').load($(this).attr('href'));
});




$("#formularioAjax").submit(function (event) {
        event.preventDefault();

        var carregando = $(".carregando");

        $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = ((evt.loaded / evt.total) * 100);
                        $(".progress-bar").width(percentComplete + '%');
                        $(".progress-bar").html(percentComplete + '%');
                    }
                }, false);
                return xhr;
            },
            type: 'POST',
            url: $('#formularioAjax').attr("action"),
            data: new FormData(this),
            dataType: 'json',
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function () {
                if ($('input[type="file"]').val()) {
                    $(".progress-bar").width('0%');
                    $(".progress").show();
                }
                carregando.show().fadeIn(200);

            },
            success: function (resposta)
            {
                console.log(resposta);
                //redirecionar
                if (resposta.redirecionar) {
                    window.location.href = resposta.redirecionar;
                }
                //recarrega
                if (resposta.recarregar) {
                    window.location.reload();
                } else {
                    carregando.fadeOut(200);
                }
                //mensagem
                if (resposta.mensagem) {
                    $("#ajaxResposta").html(resposta.mensagem);
                }
            },
            complete: function () {
                carregando.hide().fadeOut(200);
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });

    });
