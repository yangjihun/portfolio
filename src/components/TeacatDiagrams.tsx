import {
  Activity, Blocks, CheckCircle2, Database,
  Gauge, Globe, Layers, ListOrdered, LockKeyhole, Search,
  Server, ShieldCheck, Timer, Users, Wallet, type LucideIcon,
} from 'lucide-react';
import { Canvas, Card, DiagramCard, Edge, Group, colors } from './diagrams/DiagramPrimitives';

function Architecture() {
  return (
    <DiagramCard
      number="01"
      title="예매 API와 포토카드 이상거래 탐지(FDS), 블록체인 정산"
      subtitle="포토카드 정산 시 기본 FLAG 모드는 이상 신호를 기록하고 정산을 계속합니다. HOLD 모드에서는 규칙이 보류 기준을 충족하면 체인 전송을 보류합니다."
      caption="Python에서 합성 거래 데이터로 학습한 로지스틱 회귀 모델을 Spring Boot가 불러옵니다. 심사 시 계산한 모델 점수는 PostgreSQL에 기록합니다."
    >
      <Canvas
        id="teacat-architecture"
        height={616}
        title="티캣 전체 시스템 아키텍처"
        description="React의 요청은 nginx를 거쳐 Spring Boot에 도달합니다. Spring은 Caffeine으로 좌석맵을 캐시하고 Redis로 입장 상태를 관리합니다. 포토카드 정산에서는 첫 체인 전송 전에 규칙 8개를 검사하고, Python에서 학습한 로지스틱 회귀 모델로 위험 점수를 계산합니다. PostgreSQL에는 규칙 신호와 섀도 모델 점수를 저장합니다. 정산을 진행하면 Node.js 내부 API가 HD 지갑과 직렬 전송 큐를 사용해 서명한 트랜잭션을 체인에 전송합니다."
      >
        <Group x={24} y={24} width={186} height={128} label="CLIENT" tone="blue" />
        <Group x={260} y={172} width={676} height={292} label="APPLICATION" tone="teal" />
        <Group x={24} y={172} width={186} height={292} label="DATA" tone="blue" />
        <Group x={260} y={478} width={320} height={126} label="OFFLINE TRAINING" tone="amber" />
        <Group x={638} y={478} width={298} height={126} label="BLOCKCHAIN" tone="violet" />

        <Edge d="M 194 100 H 280" label="HTTPS" x={237} y={87} />
        <Edge d="M 430 138 V 218" label="API 요청" x={462} y={166} />
        <Edge d="M 280 264 H 194" label="대기실" x={237} y={252} />
        <Edge d="M 280 299 H 232 V 352 H 194" label="조회·저장" x={235} y={288} />
        <Edge d="M 580 274 H 660" label="내부 호출" x={620} y={262} />
        <Edge d="M 580 386 H 660" label="심사 후 정산" x={620} y={374} />
        <Edge d="M 789 417 V 518" label="서명 Tx / 체인 RPC" x={850} y={460} />
        <Edge d="M 117 448 V 554 H 280" label="합성 거래 피처와 라벨" x={190} y={543} />

        <Card x={40} y={62} width={154} height={76} title="React" lines={['예매 · 거래 화면']} icon={Globe} tone="blue" />
        <Card x={280} y={62} width={300} height={76} title="nginx" lines={['Reverse proxy · keepalive']} icon={Layers} tone="slate" />
        <Card x={40} y={218} width={154} height={99} title="Redis" lines={['Sorted Set · Lua', '대기열 · 입장 TTL']} icon={ListOrdered} tone="blue" />
        <Card x={40} y={337} width={154} height={111} title="PostgreSQL" lines={['회원, 예매, 거래', '규칙 신호, 모델 점수']} icon={Database} tone="blue" titleSize={15} />
        <Card x={280} y={218} width={300} height={230} title="Spring Boot" lines={['예매, 좌석 및 포토카드 거래 API', '입장 상태 검증 / Caffeine 좌석맵 1초 캐시']} icon={Server} />
        <Edge d="M 294 392 H 194" label="심사 기록" x={237} y={380} />
        <Edge d="M 492 518 V 435" label="model.json 로드" x={546} y={475} />
        <Card x={294} y={326} width={272} height={109} title="포토카드 이상거래 탐지 (FDS)" lines={['체인 전송 전 규칙 8개 심사', '로지스틱 회귀 점수 기록 (섀도 모드)']} icon={ShieldCheck} tone="amber" titleSize={15} />
        <Card x={660} y={248} width={258} height={169} title="Node.js · Express" lines={['지갑 · 서명 · 트랜잭션 내부 API']} icon={Blocks} tone="violet" />
        <g>
          <rect x="674" y="354" width="100" height="36" rx="3" fill={colors.violet.tint} />
          <Wallet x={682} y={364} width={16} height={16} color={colors.violet.accent} aria-hidden />
          <text x="703" y="377" fontSize="13" fontWeight="600" fill={colors.violet.accent}>HD Wallet</text>
          <rect x="780" y="354" width="124" height="36" rx="3" fill={colors.violet.tint} />
          <LockKeyhole x={788} y={364} width={16} height={16} color={colors.violet.accent} aria-hidden />
          <text x="809" y="377" fontSize="13" fontWeight="600" fill={colors.violet.accent}>직렬 Tx Queue</text>
        </g>
        <Card x={280} y={518} width={280} height={76} title="Python / scikit-learn" lines={['로지스틱 회귀 모델 학습']} icon={Activity} tone="amber" />
        <Card x={652} y={518} width={266} height={76} title="Smart Contracts" lines={['Ticket SBT · ERC-20 · ERC-1155 · 추첨']} icon={Blocks} tone="violet" />
      </Canvas>
    </DiagramCard>
  );
}

function AdmissionStep({ y, number, title, detail, icon: Icon }: { y: number; number: string; title: string; detail: string; icon: LucideIcon }) {
  return (
    <g>
      <rect x="580" y={y} width="336" height="52" rx="4" fill="white" stroke={colors.teal.border} />
      <Icon x={594} y={y + 17} width={18} height={18} color={colors.teal.accent} aria-hidden />
      <text x="624" y={y + 22} fontSize="14" fontWeight="700" fill="#163d3b">{number}. {title}</text>
      <text x="624" y={y + 40} fontSize="12" fill="#536575">{detail}</text>
    </g>
  );
}

export function WaitingRoom() {
  return (
    <DiagramCard headingLevel={4} number="02" title="Redis + Lua 가상 대기실" subtitle="정원과 입장 속도를 함께 제어해, 한 번에 서버로 몰리는 요청을 줄였습니다." caption="Lua 안에서 만료자 정리 → 정원·틱 한도 확인 → 선두 대기자 이동을 원자적으로 처리합니다. 입장 처리자의 중복 실행은 Redis 락으로 제어하고, 서버 인터셉터에서 좌석 조회·선점 요청의 입장 상태를 검증합니다.">
      <Canvas id="teacat-waiting-room" height={532} title="가상 대기실 입장 흐름" description="사용자 요청을 Redis Sorted Set 대기열에 등록합니다. 1초마다 입장 처리자가 Lua로 만료자를 정리하고, 기본 정원 5,000명과 틱당 최대 200명 한도 내에서 대기 순서대로 입장자를 이동합니다. 입장 전 사용자는 대기 순번과 예상 시간을 확인합니다. 입장한 사용자는 서버 검증을 거쳐 좌석 조회와 선점이 가능합니다. 예매 완료·이탈 시 정원을 반환하고 10분 무활동 사용자는 만료 처리합니다.">
        <Group x={560} y={24} width={376} height={280} label="LUA · 원자적 입장 처리 / 1초 틱" />
        <Edge d="M 204 88 H 260" label="등록" x={232} y={74} />
        <Edge d="M 500 102 H 580" label="순서 유지" x={540} y={89} />
        <Edge d="M 748 128 V 150" />
        <Edge d="M 748 202 V 224" />
        <Edge d="M 580 250 H 480 V 310 H 174 V 358" label="정원·틱 한도 초과 → 대기 유지" x={323} y={297} />
        <Edge d="M 748 276 V 358" label="선두 대기자부터 입장" x={833} y={330} />
        <Card x={24} y={40} width={180} height={95} title="사용자 요청" lines={['회차별 대기실 진입']} icon={Users} tone="blue" />
        <Card x={260} y={40} width={240} height={95} title="Redis Sorted Set" lines={['대기 순서 · 입장 만료 시각']} icon={ListOrdered} tone="blue" />
        <AdmissionStep y={76} number="1" title="만료자 정리" detail="10분 무활동 사용자 제거 · 빈자리 확보" icon={Timer} />
        <AdmissionStep y={150} number="2" title="정원·입장 속도 확인" detail="기본 정원 5,000명 · 틱당 최대 200명" icon={Gauge} />
        <AdmissionStep y={224} number="3" title="대기자 → 입장자 이동" detail="Sorted Set 변경을 한 번에 실행" icon={ShieldCheck} />
        <Card x={24} y={358} width={300} height={96} title="대기 화면" lines={['순번 · 예상 대기 시간 표시', '다음 틱에서 입장 상태 재확인']} icon={Timer} tone="amber" />
        <Card x={560} y={358} width={376} height={96} title="입장 허용" lines={['서버 인터셉터가 입장 상태 검증', '좌석 조회 · 선점 요청 허용']} icon={CheckCircle2} />
        <rect x="24" y="478" width="912" height="36" rx="3" fill={colors.teal.tint} />
        <text x="480" y="501" textAnchor="middle" fontSize="13" fontWeight="500" fill={colors.teal.accent}>예매 완료 · 이탈 시 자리 반환 / 무활동 만료 → 다음 틱에서 빈자리 재배정</text>
      </Canvas>
    </DiagramCard>
  );
}

export function LoadTesting() {
  return (
    <DiagramCard headingLevel={4} number="03" title="부하 테스트 → 병목 개선 → 재측정" subtitle="3초 좌석 폴링을 재현하고, DB 병목과 프록시 연결 문제를 차례로 추적했습니다." caption="최종 3,600 VU의 p95 20ms·실패율 0%는 EC2 내부 서버 직접 호출 결과입니다. nginx·TLS·대기실·결제를 포함한 전체 경로는 별도 측정이 필요합니다.">
      <Canvas id="teacat-load-testing" height={540} title="좌석 조회 부하 테스트와 개선 과정" description="k6에서 3초마다 좌석을 조회하고 VU를 단계적으로 늘립니다. Grafana와 서버 지표를 대조해 반복 DB 조회와 커넥션 점유 병목을 확인하고 Caffeine 1초 캐시로 동일 키의 동시 로딩을 합칩니다. 캐시 적용 뒤에도 남은 nginx TIME_WAIT 누적과 임시 포트 고갈을 추적해 upstream keepalive를 적용합니다. 서버 직접 호출로 재측정한 최종 3,600 VU에서 서버 p95 20ms와 요청 실패율 0%를 확인했습니다.">
        <Edge d="M 268 87 H 352" label="측정" x={310} y={73} />
        <Edge d="M 492 138 V 182 H 146 V 212" label="병목 확인" x={310} y={171} />
        <Edge d="M 268 269 H 352" label="DB 비용 축소" x={310} y={255} />
        <Edge d="M 632 269 H 704" label="잔여 지연" x={668} y={255} />
        <Edge d="M 820 326 V 392" label="연결 재사용" x={874} y={364} />
        <Edge d="M 704 447 H 632" label="재측정" x={668} y={433} />
        <Edge d="M 352 447 H 268" label="검증 결과" x={310} y={433} />
        <Card x={24} y={32} width={244} height={106} title="k6 부하 테스트" lines={['좌석 페이지 · 3초 폴링', 'VU 단계 증가']} icon={Activity} tone="blue" />
        <Card x={352} y={32} width={280} height={106} title="관측 지표 대조" lines={['p95 · Hikari 대기 · 스레드 · CPU', 'Grafana + 서버 지표']} icon={Search} tone="blue" />
        <Card x={24} y={212} width={244} height={114} title="DB 병목" lines={['같은 좌석맵 반복 조회', '커넥션 점유 · 요청 대기']} icon={Database} tone="amber" />
        <Card x={352} y={212} width={280} height={114} title="Caffeine · 1초 TTL" lines={['회차·구역별 좌석맵 캐시', '동일 키의 동시 로딩 통합']} icon={Layers} />
        <Card x={704} y={212} width={232} height={114} title="nginx 연결 병목" lines={['TIME_WAIT 누적', '임시 포트 고갈 · 502']} icon={Server} tone="amber" />
        <Card x={704} y={392} width={232} height={110} title="upstream keepalive" lines={['백엔드 연결 재사용', '반복 연결 생성 축소']} icon={Layers} />
        <Card x={352} y={392} width={280} height={110} title="서버 직접 호출" lines={['EC2 내부에서 네트워크 영향 분리', '최종 3,600 VU 구간 확인']} icon={Gauge} tone="blue" />
        <Card x={24} y={392} width={244} height={110} title="20ms / 0%" lines={['서버 p95 · 요청 실패율', '3,600 VU · 좌석 조회']} icon={CheckCircle2} />
      </Canvas>
    </DiagramCard>
  );
}

export default function TeacatDiagrams() {
  return <Architecture />;
}
