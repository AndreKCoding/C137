//Variaveis
status = "";
objectsName = "";

i = 0;

objects = [];

//Carrega Algumas Partes
function setup()
{
    //Canvas
    canvas = createCanvas(640, 300);
    canvas.position(370, 320);

    //WebCam
    video = createCapture(VIDEO);
    video.hide();
}

//Caso o COCOSSD Tenha Carregado
function modelLoaded()
{
    //Juntado a Variavel GotResult
    console.log("Modelo COCOSSD Carrregado");
    status = true;
    detectorObject.detect(video, gotResult);
}

//Para Desenhar Objetos
function draw()
{
    //Cria o Video
    image(video, 0, 0, 640, 420);

    if(status != "")
    {
        //Loop para i ficar igual a quantidade de objetos
        for(i = 0; i < objects.length; i++)
        {
            //Desenho para Criar o Retangulo
            fill('red');
            porcentagem = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + porcentagem + "%", objects[i].x, objects[i].y);
            noFill();
            stroke('red');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

// Coleta Resultados
function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }

    // Definicao de cada variavel
    objects = results;
    objectsName = objects;
    console.log(results);
}

// Ao apertar o botao
function start()
{
    console.log(objectsName);
    detectorObject = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detectando Objeto";
    textInputed = document.getElementById("input").value;
    console.log("Objeto Procurado: " + textInputed);

    // Caso o objeto detectado for igual ao nome Digitado
    if(textInputed == objectsName)
    {
        video.stop();
        detectorObject.detect(gotResult);

        document.getElementById("result").innerHTML = "Objeto Encontrado";

        utterThis = new SpeechSynthesisUtterance("Objeto Encontrado");
        synth.speak(utterThis);
    }
}