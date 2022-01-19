import {toast} from "react-toastify";

export class ToastUtil {

    static showSuccessToast(msg) {
        toast(msg, {
          hideProgressBar: false,
          type: "success"
        });
      }

      static showAlertToast(msg) {
        toast(msg, {
          hideProgressBar: true,
          type: "dark"
        });
      }

      static showErrorToast(msg) {
        toast(msg, {
          hideProgressBar: false,
          type: "error"
        });
      }

}