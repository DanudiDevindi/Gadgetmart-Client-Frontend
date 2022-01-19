import {toast} from "react-toastify";

export class ToastUtil {

    static showSuccessToast(msg) {
        toast(msg, {
          hideProgressBar: false,
          type: "success"
        });
      }

}