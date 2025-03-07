import { app } from "electron";
import { join } from "path";
import { URL } from "url";

/**
 * 현재 실행 환경이 개발 모드인지 확인
 */
export const isDev = process.env.NODE_ENV === "development";

/**
 * 정적 리소스 경로 관리
 */
export const RESOURCES = {
  // 앱 루트 경로
  appRoot: isDev ? join(process.cwd()) : join(app.getAppPath()),

  // 정적 에셋 경로 (이미지, 아이콘 등)
  assets: isDev ? join(process.cwd(), "resources") : join(process.resourcesPath),

  // 프리로드 스크립트 경로
  preload: isDev ? join(process.cwd(), "dist/preload.js") : join(app.getAppPath(), "dist/preload.js"),

  // 렌더러 페이지 URL (Next.js)
  rendererDev: "http://localhost:8888",
  rendererProd: new URL("../renderer/out/index.html", "file://" + __dirname).toString(),
};

/**
 * 현재 환경에 맞는 렌더러 URL 반환
 */
export function getRendererURL(): string {
  return isDev ? RESOURCES.rendererDev : RESOURCES.rendererProd;
}

/**
 * 에셋 파일 경로 생성
 */
export function getAssetPath(...paths: string[]): string {
  return join(RESOURCES.assets, ...paths);
}

/**
 * 환경별 설정값
 */
export const CONFIG = {
  // 개발 환경에서는 디버깅 기능 활성화
  enableDevTools: isDev,

  // 프로덕션에서는 메뉴 숨기기
  showMenu: isDev,

  // 윈도우 기본 크기
  defaultWidth: 1024,
  defaultHeight: 768,

  // 앱 이름
  appName: app.getName(),
};
