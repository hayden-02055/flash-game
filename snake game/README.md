# Snake Game

바닐라 JavaScript(ES 모듈)로 구현한 스네이크 게임입니다.

## 프로젝트 구조

```
snake game/
├── index.html          # 진입점 HTML
├── src/
│   ├── game-logic.mjs  # 게임 상태 및 로직
│   └── main.mjs        # UI 렌더링 및 이벤트 처리
├── style/
│   └── styles.css      # 스타일시트
└── tests/              # 테스트 코드
```

## 실행 방법

ES 모듈을 사용하기 때문에 **로컬 HTTP 서버**가 필요합니다. `file://`로 직접 열면 동작하지 않습니다.

### Python (권장)

```bash
cd "snake game"
python3 -m http.server 8080
```

브라우저에서 http://localhost:8080 접속

### Node.js (npx)

```bash
cd "snake game"
npx serve .
```

### VS Code

Live Server 익스텐션 설치 후 `index.html`에서 **Go Live** 클릭

---

## 조작 방법

| 동작 | 키보드 | 버튼 |
|------|--------|------|
| 위 이동 | `↑` / `W` | Up |
| 아래 이동 | `↓` / `S` | Down |
| 왼쪽 이동 | `←` / `A` | Left |
| 오른쪽 이동 | `→` / `D` | Right |
| 일시정지 / 재개 | `Space` | Pause / Resume |
| 재시작 | `R` | Restart |

## 게임 규칙

- 뱀이 음식(빨간 셀)을 먹으면 점수가 1점 오르고 뱀 길이가 늘어납니다.
- 벽에 부딪히거나 자기 몸과 충돌하면 게임 오버입니다.
- 게임 오버 후 Restart 버튼 또는 `R` 키로 재시작할 수 있습니다.

## 게임 설정

[src/main.mjs](src/main.mjs)의 `createInitialState` 호출 부분에서 설정을 변경할 수 있습니다.

```js
createInitialState({ width: 20, height: 20, tickMs: 120 })
```

| 옵션 | 기본값 | 설명 |
|------|--------|------|
| `width` | 20 | 그리드 가로 칸 수 |
| `height` | 20 | 그리드 세로 칸 수 |
| `tickMs` | 120 | 틱 간격(ms), 낮을수록 빠름 |
