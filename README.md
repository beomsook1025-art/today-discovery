# 오늘의 나 v15 fixed

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
