jQuery(function ($) {
  if ($("body").hasClass("index")) {
    $(".keyvisual").slick({
      autoplay: true,
      speed: 500,
      fade: true,
      cssEase: "linear"
    });

    setTimeout(function () {
      $(".overray").addClass("fade");
      $("html,body").removeClass("fixed");

      setTimeout(function () {
        $("header").addClass("index");
        $("#gnav").fadeIn();
      }, 1000);
    }, 750);

    const request = new XMLHttpRequest();
    request.open("HEAD", window.location.href, true);
    request.send();
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        const serverDate = new Date(request.getResponseHeader("Date"));
        const serverMonth = serverDate.getMonth() + 1;
        const serverDay = serverDate.getDate();

        console.log(
          ("00" + serverMonth).slice(-2) + ("00" + serverDay).slice(-2)
        );

        const el = document.getElementById("countdown");
        el.src =
          "img/countdown/cd" +
          ("00" + serverMonth).slice(-2) +
          ("00" + serverDay).slice(-2) +
          ".jpg";
        el.onerror = function () {
          el.style.display = "none";
        };
      }
    };
  }

  let langNavUrl = "https://kamigata-nihonshu.com/modules/global_nav.html";
  if ($('html').attr('lang') !== 'ja') {
    langNavUrl = "https://kamigata-nihonshu.com/modules/global_nav-en.html";
  }
  $.ajax({
    url: langNavUrl
  }).then(
    function (data) {
      $("#gnav").append(data);
    },
    function () {
      $("#gnav").append('<div class="container">メニューの読み込みに失敗しました。時間を置いてお試しください<div>');
    });

  $("body").append(
    '<div class="humberger-btn" id="humberger-btn"><span></span></div>'
  );
  $("body").append('<div id="drower-box">');
  $("#drower-box").append('<div id="drower-inner">');
  $("#drower-inner").append('<ul id="drower-menu">');
  $("#drower-menu").html($("#gnav-list").html());

  $("#humberger-btn,#drower-box").on("click", function () {
    $("#humberger-btn").toggleClass("on-close");
    $("#drower-box").toggleClass("on");
  });

  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    const speed = 500;
    const href = $(this).attr("href");
    const target = $(href == "#" || href == "" ? "html" : href);
    const position = target.offset().top - 50;
    $("html, body").animate({ scrollTop: position }, speed, "swing");
    return false;
  });
});
