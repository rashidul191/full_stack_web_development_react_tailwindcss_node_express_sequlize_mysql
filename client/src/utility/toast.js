import Swal from "sweetalert2";

const toast = {
  success: (message) => {
    Swal.fire({
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  },

  error: (message) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
    });
  },

  // delete: async (message = null) => {
  //   const swalWithBootstrapButtons = Swal.mixin({
  //     customClass: {
  //       confirmButton: "btn btn-success",
  //       cancelButton: "btn btn-danger",
  //     },
  //     buttonsStyling: false,
  //   });
  //   swalWithBootstrapButtons
  //     .fire({
  //       title: "Are you sure?",
  //       text: `You want be able to delete ${message ?? "this"} !`,
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonText: "Yes, delete it!",
  //       cancelButtonText: "No, cancel!",
  //       reverseButtons: true,
  //     })
  //     .then((result) => {
  //       if (result.isConfirmed) {
  //         swalWithBootstrapButtons.fire({
  //           title: "Deleted!",
  //           text: "Your file has been deleted.",
  //           icon: "success",
  //         });
  //         return result.isConfirmed;
  //       } else if (
  //         /* Read more about handling dismissals below */
  //         result.dismiss === Swal.DismissReason.cancel
  //       ) {
  //         swalWithBootstrapButtons.fire({
  //           title: "Cancelled",
  //           text: "Your file is safe :)",
  //           icon: "error",
  //         });
  //         return false;
  //       }
  //     });
  // },

  delete: async (message = null) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You want be able to delete ${message ?? "this"}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    return result.isConfirmed;
  },
};

export default toast;
