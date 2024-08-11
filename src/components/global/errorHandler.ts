import { toast } from "react-toastify";
/**
 *
 * @param {*} translation
 * @param {*} status
 * @param {*} callBack
 */
export default function errorHandler(
  t: any,
  status: number,
  callBack: () => void
) {
  switch (status) {
    case 200:
      callBack();
      break;
    case 11:
      toast.warn(t("ERRORS.E_FAILED"));
      break;
    case 12:
      toast.warn(t("ERRORS.E_12"));
      break;
    case 13:
      toast.warn(t("ERRORS.E_13"));
      break;
    case 14:
      toast.warn(t("ERRORS.E_14"));
      break;
    case 15:
      toast.warn(t("ERRORS.E_15"));
      break;
    case 16:
      toast.warn(t("ERRORS.E_16"));
      break;
    case 17:
      toast.warn(t("ERRORS.MSG_404"));
      break;
    case 500:
      toast.warn(t("ERRORS.E_500"));
      break;
    default:
      toast.warn(t("ERRORS.E_UNKNOWN"));
      break;
  }
}
