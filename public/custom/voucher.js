$(document).ready(function() {
  $("#datatable-for-voucher").DataTable();

  $("#voucherForm").on("submit", function(e) {
    e.preventDefault();
    $.ajax({
      url: "/Admin_AddVoucher",
      type: "POST",
      data: new FormData(this),
      processData: false,
      contentType: false,
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
              text: "Voucher created successfully",
              type: "success",
            },
            function() {
              document.location = "/Admin_Voucher";
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
  //
  $("#receiptVoucherForm").on("submit", function(e) {
    e.preventDefault();
    $.ajax({
      url: "/Admin_AddReceiptVoucher",
      type: "POST",
      data: new FormData(this),
      processData: false,
      contentType: false,
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
              text: "Voucher created successfully",
              type: "success",
            },
            function() {
              document.location = "/Admin_ReceiptVoucher";
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

  //
  $("#AddSubCategory").on("submit", function(e) {
    e.preventDefault();
    console.log("hello click");
    var formData = $("form[name='addSubCategory']").serialize();
    $.ajax({
      url: "/Admin_AddSubCategory",
      type: "POST",
      data: formData,

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
          document.location = "/Admin_AddVoucher";
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
  //
  $("#CreateBankAccount").on("submit", function(e) {
    e.preventDefault();
    var formData = $("form[name='CreateBankAccount']").serialize();
    $.ajax({
      url: "/Admin_AddNewBank",
      type: "POST",
      data: formData,

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
          document.location = "/Admin_AddVoucher";
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
  //
  $("#CreateBankHead").on("submit", function(e) {
    e.preventDefault();
    var formData = $("form[name='CreateBankHead']").serialize();
    $.ajax({
      url: "/Admin_AddBankHead",
      type: "POST",
      data: formData,

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
          document.location = "/Admin_AddVoucher";
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
