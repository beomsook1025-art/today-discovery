# 오늘의 나 발견

## 버전 관리
- 앱 버전의 단일 원본은 `version.js`의 `APP_VERSION`입니다.
- 브라우저 제목과 Service Worker 캐시 이름은 이 값을 함께 사용합니다.
- 이번 점검에서 별도의 빌드/배포 설정 파일은 확인하지 못했습니다. 따라서 버전 값은 배포 전에 `version.js`에서 갱신하고, 실제 운영 화면과 캐시 버전을 배포 후 대조해야 합니다.

실제 테스트용 버전:
- Supabase Auth 로그인/회원가입
- 알림 권한 요청
- Web Push Subscription 생성
- `push_subscriptions`에 user_id/endpoint/keys 저장
- 알림 끄면 구독정보 삭제
- 구독정보 상태 표시

### Supabase
SQL Editor에서 `push_subscription_schema.sql` 실행.

### 중요
VAPID 공개키는 테스트용으로 앱에 포함했고, private key는 절대 앱에 포함하면 안 됩니다.
완전한 푸시 발송은 서버/Edge Function에서 private key를 보관해야 합니다.
