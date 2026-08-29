import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** 프로젝트·활동에서 공통으로 쓰는 참여 인원 표기.
 *  아직 확인하지 못했거나(0) 인원 개념이 없는 항목(undefined)은 null을 돌려 UI에서 숨긴다 */
export function formatTeamSize(teamSize?: number) {
  return teamSize && teamSize > 0 ? `${teamSize}인 팀` : null;
}

