# Copilot 使用說明 — webapi

目的：讓 AI 編碼代理（例如 Copilot / GitHub Copilot）快速理解本專案的結構、開發流程與專案慣例，能直接做出可執行、符合語意的修改建議。

概要要點：

- 框架：使用 Ts.ED（@tsed/\*）與 `PlatformExpress`，controller/route 定義位於 `src/controllers`，透過 `src/server.mts` 的 `@Configuration({ mount: { '/': [ApiController] } })` 掛載。
- 模組格式：專案為 ESM 並使用 TypeScript（`"type": "module"` 與大量 `.mts` 檔案）。編譯後產出為 `.mjs`（執行時從 `dist` 讀取）。
- DI 與設定：使用 `@tsed/di` 的 `@Service()`, `@Inject()`, `@Value()`。例如 `src/services/ApiKeyService.mts` 使用 `@Value('API_KEY_WHITELIST')` 讀取設定/環境變數。
- 認證與協定：`src/protocals`（注意拼字為 `protocals`）包含 `JwtProtocal.mts`、`LocalProtocal.mts`，專案把 Passport/Ts.ED 的策略放在此目錄。
- DTO 與模型：輸入/輸出 DTO 放在 `src/dtos`（並由 `dtos/index.mts` 聚合匯出），實際資料模型放 `src/models`。
- 中介層：`src/middlewares` 儲存專案自訂中介層（例如 API key middleware）。
- Swagger：已在 `server.mts` 啟用，對應路徑為 `/docs`。

重要檔案參考（快速導航）：

- 啟動與設定： `src/index.ts`, `src/server.mts`
- 控制器範例： `src/controllers/ApiController.mts`
- 服務範例： `src/services/ApiKeyService.mts`（展示 `@Service()` / `@Value()` / 日誌使用）
- DTO 匯出： `src/dtos/index.mts`
- 認證： `src/protocals/*`

開發與執行命令（可直接執行）：

- 本地開發（熱重載）： `npm run dev`
  - 這會執行 `nodemon src/index.ts`（專案使用 `ts-node`/nodemon 開發流程）。
- 建置： `npm run build` -> `tsc && tsc-alias`（產生 `dist/` 與修正 path alias）。
- 啟動（生產）： `npm run start` -> `cross-env NODE_ENV=production node ./dist/index.js`。
- 複製 `.env` 至 `dist`： `npm run cpy`（用於部署時把設定帶到 `dist`）。
- 測試：目前沒有通用 `test` 腳本（`package.json` 的 `test` 為 placeholder）。倘若要執行現有單元測試檔，請直接執行 `npx jest` 或依該測試檔撰寫對應腳本。

專案慣例與注意事項（供 AI 直接應用）：

- 檔名與擴展：原始 TypeScript 檔大多為 `.mts`（ESM），編譯產出為 `.mjs`。修改 source 時優先編輯 `src/*.mts` 或 `src/*.ts`。
- DI 類別：所有 service 類別使用 `@Service()` 並作命名匯出（例：`export class ApiKeyService {}`），新增服務請放 `src/services` 並保持命名一致（PascalCase + Service/Controller suffix）。
- 設定注入：使用 `@Value('<KEY>')` 讀取設定；`src/index.ts` 使用 `dotenv.config()` 並將 `config.parsed` 傳入 `PlatformExpress.bootstrap(Server, configObj)`，因此環境變數會以字串注入。
- 保持現有拼字/命名：資料夾 `src/protocals` 使用非標準拼字（`protocal`），請勿自動更改為 `protocol` 除非同步更新所有引用。
- 路由掛載：主要 router 在 `ApiController`，子 controller 置於 `src/controllers/*`。新增路由時，確認 `server.mts` 的 `mount` 覆蓋或新增路徑。

範例片段（快速參考）

- API key 取得樣式（來自 `src/services/ApiKeyService.mts`）：
  - `@Value('API_KEY_WHITELIST') private apiKeyWhitelist!: string;`
  - `public isWhitelisted(apiKey: string): boolean { return this.apiKeyWhitelist.indexOf(apiKey) !== -1; }`

AI 行為建議（明確、可執行）：

- 當修改或新增 Controller：
  - 編輯 `src/controllers` 下的 `.mts` 檔案，使用 `@Controller()` / 對應 Ts.ED decorator。
  - 若需暴露新路由，更新 `src/server.mts` 的 `mount`（或將 Controller 自動被 Ts.ED 掃描並匯入 `ApiController`）。
- 當新增 service：
  - 在 `src/services` 新增檔案，使用 `@Service()`，並以命名匯出 class。若需要注入設定，使用 `@Value('<ENV_KEY>')`。
- 當修改環境/設定讀取：
  - `src/index.ts` 將 `.env` 內容合併到 `configObj` 傳入 bootstrap，修改此行會改變整個應用的設定注入行為。

限制與未發現項目：

- 本專案沒有統一的測試腳本；請在修改時附帶單元/整合測試（若需要），並告訴 maintainers 更新 `package.json`。
- 部署細節（例如容器、CI）未在 repo 明確描述；可參考 `Dockerfile` / `fly.toml` 作為部署範例，但請先詢問 maintainers 以避免破壞現有流程。
