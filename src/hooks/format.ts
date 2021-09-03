export function useFormatTime(fmt: string, date: string | Date): string {
  if (!date) return '';
  if (typeof date === "string") date = new Date(date);
  const opt = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (const k in opt) {
    const ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    }
  }
  return fmt;
}

/**
 * 秒
 * @param time 
 */
export function useTimerFormat(time: number, fmt = "MM:SS"): string {
  const hour = Math.floor(time / 3600);
  const minutes = Math.floor(Math.floor(time % 3600) / 60);
  const second = Math.floor(time % 60);
  const opt = {
    "H+": hour.toString(),           // 时
    "M+": minutes.toString(),        // 分
    "S+": second.toString()          // 秒
  };
  for (const k in opt) {
    const ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    }
  }
  return fmt;
}