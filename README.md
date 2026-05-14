# 학생 찾기 PWA

학생 이름이나 학번으로 사진과 전화번호를 빠르게 검색하는 PWA입니다.

## 🚀 GitHub Pages 배포 방법

### 1단계: 새 저장소 만들기

1. https://github.com/new 접속
2. Repository name: **`student-finder`**
3. **Public** 선택 (Pages 사용하려면)
4. **Create repository**

### 2단계: 파일 업로드

이 폴더의 모든 파일을 저장소에 업로드:
- `index.html`
- `manifest.json`
- `service-worker.js`
- `icons/icon-192.png`
- `icons/icon-512.png`

**업로드 방법:**
- 저장소 페이지에서 **"Add file" → "Upload files"**
- 모든 파일과 `icons` 폴더를 드래그
- **"Commit changes"** 클릭

### 3단계: GitHub Pages 활성화

1. 저장소 → **Settings** 탭
2. 좌측 메뉴 → **Pages**
3. Source: **Deploy from a branch**
4. Branch: **main** / Folder: **/ (root)**
5. **Save**
6. 1-2분 후 URL이 표시됨: `https://jeondemo.github.io/student-finder/`

## 📱 폰에 설치하는 법

### iPhone (Safari)
1. Safari로 `https://jeondemo.github.io/student-finder/` 접속
2. 하단 **공유 버튼** (사각형 + 화살표 위 아이콘) 탭
3. **"홈 화면에 추가"** 선택
4. **"추가"** 탭 → 홈화면에 아이콘 생김

### Android (Chrome)
1. Chrome으로 URL 접속
2. 우상단 **메뉴(⋮)** 탭
3. **"홈 화면에 추가"** 또는 **"앱 설치"** 선택
4. **"설치"** 탭

## 🔐 첫 사용

1. 홈화면 아이콘 탭
2. 비밀번호 입력 (설정 시트에 입력한 비밀번호)
3. 한 번 로그인하면 계속 유지됨 (수동 로그아웃 전까지)

## 🔧 설정 변경

비밀번호나 사진 폴더를 바꾸려면:
- 구글 스프레드시트 → **설정 시트**에서 값 수정
- 별도 재배포 불필요 (실시간 반영)

학생 추가/삭제:
- **학생정보 시트**에 행 추가/삭제만 하면 됨

## 🔄 GAS 코드 수정 시

GAS 코드를 수정하면 **반드시 재배포** 필요:
1. GAS 에디터 → 우상단 **"배포"** → **"배포 관리"**
2. 기존 배포 ✏️ 편집 → 버전: **"새 버전"** 선택 → **"배포"**
3. URL은 그대로 유지됨

## ⚠️ 주의사항

- 학생 전화번호가 들어있는 시스템이므로 본인만 사용
- 폰을 빌려줄 때는 반드시 **로그아웃** (앱 우상단 버튼)
- 비밀번호는 가족이나 동료와 공유하지 않기
