$(document).ready(function () {
    //pega o número digitado no campo do pedido
    $("#btnConsulta").click(function (event) {
        const nPedido = document.querySelector("#txtPedido").value;
        console.log(nPedido);
        $.ajax({
            type: "POST",
            url: "sql/consulta.php",  // coloque aqui o endereço que vai buscar os dados no banco
            data: { pedido: nPedido },
            success: function (data) {
                $('.tabelaTipo').html(data);
                $('.tabelaTipo').show(); // Mostrar o retorno em texto no html
                //console.log(data);
            },
            error: function (request, status, erro) {
                $('.tabelaTipo').html('Ocorreu um erro, entre em contato com T.I!', erro);
                $('.tabelaTipo').show();
            }
        });
    });

    let scanner = new Instascan.Scanner({
        video: document.getElementById('preview')
    });

    let camera='';

    $("#btnAbreModal").click(function (event) {
        // leitor qrcode
        // let scanner = new Instascan.Scanner({
        //     video: document.getElementById('preview')
        // });
        scanner.addListener('scan', function(content) {
            //alert('Escaneou o conteudo: ' + content);
            //window.open(content, "_blank");
            console.log(content);
        });
        Instascan.Camera.getCameras().then(cameras => {
            if (cameras.length > 0) {
                camera = cameras[1];
                scanner.start(camera);
                console.log(cameras.length);
            } else {
                console.error("Não existe câmera no dispositivo!");
            }
        });
    });

    $('#btnFechaModal').click(function (event) {
        scanner.stop(camera);
    });
});