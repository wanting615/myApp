import { delUserAddress } from "@/api/user/user";
import alertService from "@/until/alert.service";

export async function userDelAddress(id: number): Promise<boolean> {
  const result = await alertService.alertRemind({
    header: "删除地址",
    subHeader: "确认删除该地址吗?",
  });
  if (result) {
    const result = await delUserAddress(id);
    if (!result.status) {
      alertService.errorToast(result.message);
      return false;
    }
    return true;
  }
  return false
}
