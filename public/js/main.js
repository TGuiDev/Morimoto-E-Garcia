(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 0);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 45) {
      $(".navbar").addClass("sticky-top shadow-sm");
    } else {
      $(".navbar").removeClass("sticky-top shadow-sm");
    }
  });

  // Dropdown on mouse hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  $(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off("mouseenter mouseleave");
    }
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 10, "easeInOutExpo");
    return false;
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    dots: true,
    loop: true,
    center: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  // Vendor carousel
  $(".vendor-carousel").owlCarousel({
    loop: true,
    margin: 45,
    dots: false,
    loop: true,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 2,
      },
      576: {
        items: 4,
      },
      768: {
        items: 6,
      },
      992: {
        items: 8,
      },
    },
  });
})(jQuery);

function mostrarMensagem() {
  const erroElement = document.getElementById("message");
  if(erroElement) {
    const conteudo = erroElement.textContent.trim();

    if (conteudo.length > 2) {
      erroElement.classList.remove("display-none");
      erroElement.style.backgroundColor = "red";

      setTimeout(function () {
        erroElement.classList.add("display-none");
      }, 5000);
    }
  }
}
mostrarMensagem();

function mostrarMensagem() {
  const erroElement = document.getElementById("success");
  if(erroElement) {
    const conteudo = erroElement.textContent.trim();

    if (conteudo.length > 2) {
      erroElement.classList.remove("display-none");

      setTimeout(function () {
        erroElement.classList.add("display-none");
      }, 5000);
    }
  }
}
mostrarMensagem();


// Mascara Telefone
function mascaraTelefone(event) {
  let tecla = event.key;
  let telefone = event.target.value.replace(/\D+/g, "");

  if (/^[0-9]$/i.test(tecla)) {
      telefone = telefone + tecla;
      let tamanho = telefone.length;

      if (tamanho >= 12) {
          return false;
      }
      
      if (tamanho > 10) {
          telefone = telefone.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
      } else if (tamanho > 5) {
          telefone = telefone.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
      } else if (tamanho > 2) {
          telefone = telefone.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
      } else {
          telefone = telefone.replace(/^(\d*)/, "($1");
      }

      event.target.value = telefone;
  }

  if (!["Backspace", "Delete"].includes(tecla)) {
      return false;
  }
}


// mascara CPF
function mascaranum(event) {
  let tecla = event.key;
  let telefone = event.target.value.replace(/\D+/g, "");

  if (/^[0-9]$/i.test(tecla)) {
      telefone = telefone + tecla;
      let tamanho = telefone.length;

      if (tamanho >= 12) {
          return false;
      }
      

      console.log(tamanho)

      if (tamanho >= 9) {
          telefone = telefone.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,5}).*/, "$1.$2.$3-$4");
      } else if (tamanho > 6) {
          telefone = telefone.replace(/^(\d{3})(\d{3})(\d{3})*/, "$1.$2.$3");
      } else if (tamanho > 3) {
          telefone = telefone.replace(/^(\d{3})(\d{0,5})/, "$1.$2");
      } else {
          telefone = telefone.replace(/^(\d{3})/, "$1.");
      }

      event.target.value = telefone;
  }

  if (!["Backspace", "Delete"].includes(tecla)) {
      return false;
  }
}

//mascara RG
function mascararg(event) {
  let tecla = event.key;
  let cpf = event.target.value.replace(/\D+/g, "");

  if (/^[0-9]$/i.test(tecla)) {
      cpf = cpf + tecla;
      let tamanho = cpf.length;

      if (tamanho >= 12) {
          return false;
      }
      

      console.log(tamanho)

      if (tamanho >= 9) {
          cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,5}).*/, "$1.$2.$3-$4");
      } else if (tamanho > 6) {
          cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})*/, "$1.$2.$3");
      } else if (tamanho > 3) {
          cpf = cpf.replace(/^(\d{3})(\d{0,5})/, "$1.$2");
      } else {
          cpf = cpf.replace(/^(\d{3})/, "$1.");
      }

      event.target.value = cpf;
  }

  if (!["Backspace", "Delete"].includes(tecla)) {
      return false;
  }
}


// mascara CNPJ
function mascaracpnj(event) {
  let tecla = event.key;
  let rg = event.target.value.replace(/\D+/g, "");

  if (/^[0-9]$/i.test(tecla)) {
      rg = rg + tecla;
      let tamanho = rg.length;

      console.log(tamanho)

      // 00.857.758/0001-40
      if (tamanho >= 14) {
        rg = rg.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/, "$1.$2.$3/$4-$5");
      } else if (tamanho > 9) {
          rg = rg.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,5}).*/, "$1.$2.$3/$4");
      } else if (tamanho > 5) {
          rg = rg.replace(/^(\d{2})(\d{3})(\d{0,5})*/, "$1.$2.$3");
      } else if (tamanho > 2) {
          rg = rg.replace(/^(\d{2})(\d{0,5})/, "$1.$2");
      } else {
          rg = rg.replace(/^(\d{2})/, "$1");
      }

      event.target.value = rg;
  }

  if (!["Backspace", "Delete"].includes(tecla)) {
      return false;
  }
}









// Mascara endereço
function mascaracep(event) {
  let tecla = event.key;
  let rg = event.target.value.replace(/\D+/g, "");

  if (/^[0-9]$/i.test(tecla)) {
      rg = rg + tecla;
      let tamanho = rg.length;

      console.log(tamanho)

      // 00.857.758/0001-40
      if (tamanho >= 1) {
        rg = rg.replace(/^(\d{8}).*/, "$1");
      }

      event.target.value = rg;
  }

  if (!["Backspace", "Delete"].includes(tecla)) {
      return false;
  }
}
function complementarEndereco() {
  let cep = document.getElementById('cep').value;
  cep = cep.replace(/[^0-9]/g, '');
  document.getElementById('cep').value = cep;

  if (cep.length === 8) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (!data.erro) {
          document.getElementById('cidade').value = data.localidade;
          document.getElementById('bairro').value = data.bairro;
          document.getElementById('endereco').value = data.logradouro;
          document.getElementById('uf').value = data.uf;
        } else {
          // Mostrar o alerta do Bootstrap
          const alertDiv = document.getElementById('alertDiv');
          alertDiv.style.display = 'block';

          // Esconder o alerta após 5 segundos com animação
          setTimeout(() => {
            alertDiv.classList.remove('show');
            alertDiv.style.display = 'none';
          }, 5000);
        }
      })
      .catch(error => {
        console.error('Erro ao consultar o CEP:', error);
      });
  } else {
    // Mostrar o alerta do Bootstrap
    const alertDiv = document.getElementById('alertDiv');
    alertDiv.style.display = 'block';

    // Esconder o alerta após 5 segundos com animação
    setTimeout(() => {
      alertDiv.classList.remove('show');
      alertDiv.style.display = 'none';
    }, 5000);
  }
}
