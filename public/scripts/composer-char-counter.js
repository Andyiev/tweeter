$(document).ready(function () {
  let maxLength = 140;
  console.log(maxLength);
  $("textarea").keyup(function () {
    let length = $(this).val().length;
    length = maxLength - length;
    if (($(this).val().length) > 140) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
    $(".counter").text(length);
  });
});