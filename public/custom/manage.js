$(document).ready(function() {
  $("#datatable-for-voucher").DataTable();

  $("#SeparateCreateBankHead").on("submit", function(e) {
    e.preventDefault();
    $.ajax({
      url: "/Admin_AddBankHead",
      type: "POST",
      data: $(this).serialize(),
      success: function(s) {
        console.log(s);
        var message;
        if (s.message) {
          message = s.message;
        } else {
          message = s.error.message;
        }
        console.log(message);
        const msg = replaceData(message);
        console.log(msg);
        if (s.status == "Success") {
          swal(
            {
              title: "Created",
              text: " Created successfully",
              type: "success",
            },
            function() {
              document.location = "/Admin_MyAccount";
            },
          );
        } else {
          $("#error")
            .text(msg)
            .addClass("alert alert-danger");
          setTimeout(function() {
            $("#error")
              .text("")
              .removeClass("alert alert-danger");
          }, 1500);
        }
      },
    });
  });
  $("#SeparateCreateBankAccount").on("submit", function(e) {
    e.preventDefault();
    $.ajax({
      url: "/Admin_AddNewBank",
      type: "POST",
      data: $(this).serialize(),
      success: function(s) {
        console.log(s);
        var message;
        if (s.message) {
          message = s.message;
        } else {
          message = s.error.message;
        }
        console.log(message);
        const msg = replaceData(message);
        console.log(msg);
        if (s.status == "Success") {
          swal(
            {
              title: "Created",
              text: "Created successfully",
              type: "success",
            },
            function() {
              document.location = "/Admin_BankAccount";
            },
          );
        } else {
          $("#error")
            .text(msg)
            .addClass("alert alert-danger");
          setTimeout(function() {
            $("#error")
              .text("")
              .removeClass("alert alert-danger");
          }, 1500);
        }
      },
    });
  });
});
function replaceData(msg) {
  console.log(msg);
  msg = msg.replace(/"/g, "");
  msg = msg.replace(/\//g, "");
  return msg;
}
