# Flash Game

바닐라 JavaScript로 만든 브라우저 게임 모음 레포지토리입니다.
외부 라이브러리 없이 HTML, CSS, ES 모듈만으로 구현하는 것을 원칙으로 합니다.

---

## 게임 목록

| 게임 | 설명 | 폴더 |
|------|------|------|
| 🐍 Snake Game | 고전 스네이크 게임 | [snake game/](snake%20game/) |

---

## 실행 방법

각 게임 폴더 안의 `README.md`에 개별 실행 방법이 있습니다.
ES 모듈을 사용하므로 로컬 HTTP 서버가 필요합니다.

```bash
# Python (권장)
cd "게임 폴더"
python3 -m http.server 8080
```

브라우저에서 `http://localhost:8080` 접속

---

## 디렉터리 구조

```
flash-game/
└── snake game/       # 스네이크 게임
```
