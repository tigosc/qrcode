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
            alert(content);
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

     // get page elements
    const video = document.querySelector("#preview");
    const btnPlay = document.querySelector("#btnPlay");
    const btnPause = document.querySelector("#btnPause");
    const btnScreenshot = document.querySelector("#btnScreenshot");
    const btnChangeCamera = document.querySelector("#btnChangeCamera");
    const screenshotsContainer = document.querySelector("#screenshots");
    const canvas = document.querySelector("#canvas");
    const devicesSelect = document.querySelector("#devicesSelect");

     // video constraints
  const constraints = {
    video: {
      width: {
        min: 1280,
        ideal: 1920,
        max: 2560,
      },
      height: {
        min: 720,
        ideal: 1080,
        max: 1440,
      },
    },
    facingMode: "environment"
  };

  // use front face camera
  let useFrontCamera = true;

  // current video stream
  let videoStream;

  // handle events
  // play
  btnPlay.addEventListener("click", function () {
    video.play();
    btnPlay.classList.add("is-hidden");
    btnPause.classList.remove("is-hidden");
  });

  // pause
  btnPause.addEventListener("click", function () {
    video.pause();
    btnPause.classList.add("is-hidden");
    btnPlay.classList.remove("is-hidden");
  });

  // take screenshot
  btnScreenshot.addEventListener("click", function () {
    const img = document.createElement("img");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    img.src = canvas.toDataURL("image/png");
    screenshotsContainer.prepend(img);
  });

  // switch camera
  btnChangeCamera.addEventListener("click", function () {
    useFrontCamera = !useFrontCamera;

    initializeCamera();
  });

  // stop video stream
  function stopVideoStream() {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }

  // initialize
  async function initializeCamera() {
    stopVideoStream();
    constraints.video.facingMode = useFrontCamera ? "user" : "environment";

    try {
      videoStream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = videoStream;
    } catch (err) {
      alert("Could not access the camera");
    }
  }

  initializeCamera();


});