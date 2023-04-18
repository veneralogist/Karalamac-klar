var reElements = $();
function elek() {
  var classes = {};
  //re elementlerimizde aynı olan id leri filitreiliyoruz
  function addUniqueCarouselItems(carouselItems) {
    var uniqueItems = [];
    carouselItems.each(function () {
      var currentElement = $(this);
      var isDuplicate =
        $(".carousel-item[id='" + currentElement.attr("id") + "']").not(
          currentElement
        ).length > 0;
      if (!isDuplicate) {
        uniqueItems.push(currentElement);
      }
    });
    $(".carousel-inner").append(uniqueItems);
  }
  addUniqueCarouselItems(reElements);

  //şimdi atılacak elementler listemizi sıfırlıyoruz
  reElements = $();

  // inputlar üzerinde döngü yap ve value değerlerine göre sınıfları ekle
  $("input").each(function () {
    var val = $(this).val();
    classes[val] = true;
  });
  classList = Object.keys(classes).join(" ");
  var seciliclass = [];
  $(".sec").show();
  // bu aralıkta class listemizi oluşturduk
  if (!$("#hep").is(":checked")) {
    if ($("#duzenli").is(":checked")) {
      seciliclass.push("duzenli");
    }
    if ($("#serbest").is(":checked")) {
      seciliclass.push("serbest");
    }
    if ($("#hos").is(":checked")) {
      seciliclass.push("hos");
    }
    $(".carousel-item").filter(function () {
      for (var i = 0; i < seciliclass.length; i++) {
        if ($(this).hasClass(seciliclass[i])) {
          if (seciliclass.includes("hos")) {
            if (!$(this).hasClass("hos")) {
              basaGit();
              reElements.push($(this));
              $(this).not("#s0").remove();
              return false;
            }
          }
          return true;
        }
      }
      basaGit();
      reElements.push($(this));
      $(this).not("#s0").remove();
      return false;
    });

    $(".sec").filter(function () {
      for (var i = 0; i < seciliclass.length; i++) {
        eleman = $(this).attr("href");
        if ($(eleman).hasClass(seciliclass[i])) {
          if (seciliclass.includes("hos")) {
            if (!$(eleman).hasClass("hos")) {
              $(this).css("visibility", "hidden");

              return false;
            }
          }
          return true;
        }
      }
      $(this).css("display", "none");

      return false;
    });
  }
}

$("#hep").change(function () {
  if ($(this).is(":checked")) {
    $("#hos,#duzenli,#serbest").prop("checked", false);
  }
});
$("#hos,#duzenli,#serbest").change(function () {
  if ($(this).is(":checked")) {
    $("#hep").prop("checked", false);
  }
});

$("input").change(function () {
  if ($(this).attr("id") === "hos" && $(this).prop("checked")) {
    $("#duzenli,#serbest").prop("checked", false);
  }
  if (
    ($(this).attr("id") === "serbest" || $(this).attr("id") === "duz") &&
    $(this).prop("checked")
  ) {
    $("#hos").prop("checked", false);
  }

  elek();
});
function basaGit() {
  $("#s0").addClass("active").siblings().removeClass("active");
}

$(".baloncuk").hide();
//baloncuğumuzun görünmesi
$(document).on("click", ".active .tıkla", function () {
  $(".baloncuk").toggle();
});

//slaytı geçtiğimizde açıklamanın kaybolması için
$(".carousel-control-next,.carousel-control-prev").click(function (event) {
  // Sayfa kaydırma işlemini durdurun
  event.preventDefault();

  // İstediğiniz işlemi yapın
  $(".baloncuk").hide();

  // Default işlevin devam etmesini sağlayın
  return true;
});

//buton siir listesi
var bss = {};

$(".sec").on("click", function (e) {
  $("html, body").animate(
    {
      scrollTop: $("#tanıklar").offset().top - $(window).height() / 13,
    },
    50
  );
  //$("#hep").prop("checked", true);
  //$("#hos,#duzenli,#serbest").prop("checked", false);
  e.preventDefault(); // varsayılan tıklama işlemi engellenir
  var target = $(this).attr("href"); // tıklanan a etiketinin href değeri alınır
  $(target).addClass("active").siblings().removeClass("active"); // hedef carousel item'a active class'ı eklenir ve diğerleri kaldırılır
});

$(window).scroll(function () {
  var sectionEnd = $("#tanıklar").offset().top; // Belirli bir section'un bitim noktası

  if ($(window).scrollTop() > sectionEnd) {
    $(".secici").css({ position: "fixed", top: "0" }); // Öğeyi sabitle
  } else {
    $(".secici").css({ position: "static", top: "auto" }); // Öğenin orijinal pozisyonuna geri yükle
  }
});
