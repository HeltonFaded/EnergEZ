function dados_dispositivo() {
  var conteudo = document.getElementById("conteudo");
  conteudo.innerHTML = "";

  dispositivo = document.getElementById("dispositivo-select");
  csrf_token = document.querySelector("[name=csrfmiddlewaretoken]").value;
  id_dispositivo = dispositivo.value;

  data = new FormData();
  data.append("id_dispositivo", id_dispositivo);

  fetch("/clientes/gerencia_dispositivo", {
    method: "POST",
    headers: {
      "X-CSRFToken": csrf_token,
    },
    body: data,
  })
    .then(function (result) {
      return result.json();
    })
    .then(function (data) {
      conteudo = document.getElementById("conteudo");
      id = document.getElementById("id");
      id.value = data.idDisp;
      conteudo.innerHTML += "<b>Tipo:</b>" + data.dispositivo.tipo + "<br>";
      conteudo.innerHTML += "<b>Marca:</b>" + data.dispositivo.marca + "<br>";
      conteudo.innerHTML += "<b>Modelo:</b>" + data.dispositivo.modelo + "<br>";
      conteudo.innerHTML +="<b>Potência: </b>" + data.dispositivo.KHW + " KHW" + "<br>";

      var imagemURL = "/media/" + data.dispositivo.icone;

      var imagemElement = document.createElement("img");
      imagemElement.style.width = "300px";
      imagemElement.style.height = "auto";
      imagemElement.style.border = "1px solid #ccc";
      imagemElement.style.marginTop = "10px";
      imagemElement.style.alignContent = "center";

      imagemElement.src = imagemURL;
      
      conteudo.appendChild(imagemElement);

      var excluir = document.createElement("button");
      excluir.id = "excluir";
      excluir.textContent = "Excluir";
      excluir.classList.add("btn", "btn-danger", "excluir");
      excluir.style.position = "relative";
      excluir.style.bottom = "10px";
      excluir.style.left = "10px";

      
      excluir.addEventListener("click", function () {
      var id = document.getElementById('id')
      console.log (id.value)
      var url = "/clientes/delete_disp/" + id.value;
      

      window.location.href = url;
      });
      
      conteudo.appendChild(excluir);
      

      var atualizar = document.createElement("button");
      atualizar.id = "atualizar";
      atualizar.textContent = "Atualizar";
      atualizar.type = "submit";
      atualizar.classList.add("btn", "btn-success", "atualizar");
      atualizar.style.position = "relative";
      atualizar.style.bottom = "10px";
      atualizar.style.left = "10px";

      var formularioExibido = false;

      atualizar.addEventListener("click", function () {
        var formulario = document.getElementById("form-att-cliente");

        if (!formularioExibido) {
          formulario.style.display = "inline";
          formularioExibido = true;
        } else {
          updateDispositivo(); 
        }
      });

      conteudo.appendChild(atualizar);

      var tipo = document.getElementById("tipo").value = data.dispositivo.tipo;
      var potencia = document.getElementById("potencia").value = data.dispositivo.KHW;
      var marca = document.getElementById("marca").value = data.dispositivo.marca;
      var modelo= document.getElementById("modelo").value = data.dispositivo.modelo;
      var id = document.getElementById('id').value
    });
}

function updateDispositivo() {
  var csrf_token = document.querySelector("[name=csrfmiddlewaretoken]").value;
  var url = '/clientes/att_disp/' + id.value ;

  data = new FormData();
  data.append('tipo', tipo.value);
  data.append('marca', marca.value);
  data.append('potencia', potencia.value);
  data.append('modelo', modelo.value);
  data.append('id', id.value);

  var iconeInput = document.getElementById('icone');
  if (iconeInput.files.length > 0) {
    data.append('icone', iconeInput.files[0]);
  }

  fetch(url, {
    method: 'POST',
    body: data,
    headers: {
      'X-CSRFToken': csrf_token
    },
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === '200') {
      
      window.location.href = '/clientes/';
  }

    console.log(data);
  })
}
