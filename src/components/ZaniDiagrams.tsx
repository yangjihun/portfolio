import {
  AudioLines, BookOpen, BrainCircuit, CheckCircle2, CircleHelp, FileAudio,
  Database, FolderOpen, GitBranch, Globe, GraduationCap, Layers, LockKeyhole,
  MessageSquare, Mic, MonitorPlay, ScanSearch, Search, Server, ShieldCheck, Timer, Users,
} from 'lucide-react';
import { Canvas, Card, DiagramCard, Edge, Group } from './diagrams/DiagramPrimitives';

function Architecture() {
  return (
    <DiagramCard
      number="01"
      title="실시간 강의 · 코칭 · 다중 강의 RAG"
      subtitle="Spring이 강의 접근 권한을 확인하고, LangGraph 챗봇이 별도 MCP 서버에서 답변에 필요한 발화를 찾습니다."
      caption="Spring은 선택한 강의의 목차와 가명 처리된 전사를 챗봇에 전달합니다. 챗봇은 MCP 도구를 호출할 때마다 강의 한 개의 전사를 보내고, 돌려받은 발화 위치를 원문과 대조합니다."
    >
      <Canvas
        id="zani-architecture"
        height={724}
        title="ZANI 전체 시스템 아키텍처"
        description="브라우저는 Spring과 REST·STOMP로 연결되고 LiveKit과 WebRTC로 음성·영상을 주고받습니다. Spring은 Egress가 보낸 강사 PCM을 수집하고 전사·코칭에는 GMS를 직접 호출합니다. 리포트 질문은 Spring이 접근 권한을 확인한 후 HTTP POST /runs/wait로 Python LangGraph 챗봇에 보냅니다. 챗봇은 질문 범위를 정하고 도구 선택·답변 생성·검증에 GMS를 이용합니다. 검색이 필요하면 별도 Python 프로세스인 강의 검색 MCP 서버의 /mcp를 호출합니다. MCP 서버는 전달받은 전사와 선택적으로 사전 구축한 개념 인덱스에서 근거를 찾습니다. 녹화 원본과 Spring이 실행한 FFmpeg 워커의 합성 영상은 로컬 파일에 저장됩니다."
      >
        <Group x={24} y={40} width={240} height={162} label="CLIENT" tone="blue" />
        <Group x={344} y={40} width={292} height={234} label="APPLICATION" />
        <Group x={704} y={40} width={232} height={162} label="MEDIA" tone="blue" />
        <Group x={24} y={316} width={240} height={384} label="DATA" tone="blue" />
        <Group x={344} y={320} width={292} height={380} label="REPORT ASSISTANT · PYTHON" />
        <Group x={704} y={320} width={232} height={166} label="AI GATEWAY" tone="violet" />
        <Group x={704} y={548} width={232} height={152} label="LOCAL STORAGE" tone="slate" />

        <Edge d="M 144 84 V 20 H 820 V 84" label="WebRTC · 음성·영상" x={490} y={14} bidirectional />
        <Edge d="M 248 134 H 360" label="REST · STOMP" x={304} y={120} bidirectional />
        <Edge d="M 620 110 H 720" label="토큰 · 제어" x={670} y={96} />
        <Edge d="M 720 174 H 620" label="PCM · WS" x={670} y={160} />
        <Edge d="M 360 184 H 308 V 410 H 248" label="조회 · 저장" x={282} y={286} />
        <Edge d="M 360 218 H 326 V 558 H 248" label="상태 · 세션" x={284} y={545} />
        <Edge d="M 620 216 H 672 V 282 H 820 V 362" label="전사 · 코칭" x={755} y={270} />
        <Edge d="M 600 254 V 364" label="POST /runs/wait" x={536} y={299} />
        <Edge d="M 620 419 H 720" label="LLM" x={670} y={406} />
        <Edge d="M 490 478 V 546" label="MCP · /mcp" x={544} y={515} bidirectional />
        <Edge d="M 920 134 H 948 V 634 H 920" label="트랙 녹화" x={897} y={526} />
        <Edge d="M 620 242 H 648 V 515 H 820 V 592" label="합성 · 영상 제공" x={754} y={504} bidirectional />

        <Card x={40} y={84} width={208} height={100} title="Next.js" lines={['강의 · 리포트 · 챗봇 UI', '브라우저 참여도 추론']} icon={Globe} tone="blue" />
        <Card x={360} y={84} width={260} height={170} title="Spring Boot" lines={['인증 · 강의 · 리포트 API', '참여 상태 집계 · 코칭 트리거', '오디오 링버퍼 · 사후 전사', '영상 제공 · 강의 접근 권한 검사']} icon={Server} />
        <Card x={720} y={84} width={200} height={100} title="LiveKit" lines={['WebRTC 미디어 서버', 'Egress · 음성 수집·녹화']} icon={MonitorPlay} tone="blue" />
        <Card x={40} y={362} width={208} height={96} title="MySQL" lines={['강의 · 전사 · 리포트']} icon={Database} tone="blue" />
        <Card x={40} y={502} width={208} height={112} title="Redis" lines={['참여 상태 · 세션 관리', '코칭 트리거 · 요청 빈도 제한']} icon={Layers} tone="blue" />
        <Card x={360} y={364} width={260} height={114} title="LangGraph 챗봇" lines={['강의 범위 · 근거 캐시 확인', '도구 선택 · 답변 생성 · 검증']} icon={GitBranch} />
        <Card x={360} y={546} width={260} height={132} title="강의 검색 MCP 서버" lines={['요청당 한 강의의 전사를 검색', '전사 · 개념 Wiki · 개념 관계', 'Wiki·관계용 로컬 인덱스 조회']} icon={Search} tone="violet" />
        <Card x={720} y={362} width={200} height={106} title="GMS" lines={['Whisper · 음성 전사', 'LLM · 개념 추출 · 리포트 QA']} icon={BrainCircuit} tone="violet" />
        <Card x={720} y={592} width={200} height={90} title="로컬 파일" lines={['원본 트랙 · 합성 영상 · 썸네일']} icon={FolderOpen} tone="slate" />
      </Canvas>
    </DiagramCard>
  );
}

export function AudioCoaching() {
  return (
    <DiagramCard headingLevel={4} number="02" title="실시간 오디오 → 강사 코칭" subtitle="Spring이 학생 참여 상태를 집계하고, 강의 내용이 필요한 팁에만 최근 강사 음성을 사용합니다." caption="헷갈림·놓침 유형에서는 Spring이 GMS로 전사와 개념 추출을 요청합니다. 무응답·얼굴 미검출 유형은 고정 문구를 사용합니다. 강사 화면은 완성된 팁을 REST로 주기적으로 조회합니다.">
      <Canvas id="zani-audio" height={756} title="ZANI 실시간 오디오와 코칭 파이프라인" description="LiveKit Egress의 WebSocket PCM 오디오를 세션별 최근 300초 링버퍼에 계속 수집합니다. 음소거 공백에는 무음을 보충합니다. 오디오와 별도로 학생 참여 상태와 응답을 집계해 코칭 조건과 유형을 판단합니다. 헷갈림·놓침 유형은 확보된 최근 오디오를 복사한 뒤 락 밖에서 16kHz 다운샘플과 MP3 인코딩을 수행하고, Whisper STT와 LLM 핵심 개념 추출 후 고정 템플릿으로 팁을 완성합니다. 무응답·얼굴 미검출 유형은 STT와 LLM을 생략하고 고정 팁으로 처리합니다.">
        <Edge d="M 272 90 H 344" label="PCM · WS" x={308} y={76} />
        <Edge d="M 624 90 H 820 V 236" label="트리거 시 캡처" x={812} y={190} />
        <Edge d="M 272 294 H 344" label="집계 결과" x={308} y={280} />
        <Edge d="M 624 294 H 704" label="내용 기반" x={664} y={280} />
        <Edge d="M 820 356 V 428" label="락 밖 변환" x={875} y={397} />
        <Edge d="M 704 485 H 624" label="MP3" x={664} y={471} />
        <Edge d="M 344 485 H 272" label="전사 텍스트" x={308} y={471} />
        <Edge d="M 148 542 V 682 H 344" label="핵심 개념" x={248} y={668} />
        <Edge d="M 484 356 V 386 H 12 V 706 H 344" label="무응답 · 얼굴 미검출 → 고정 팁" x={220} y={377} />
        <Card x={24} y={40} width={248} height={100} title="LiveKit Egress" lines={['강사 음성 · WebSocket', '48kHz PCM · 상시 수집']} icon={Mic} tone="blue" />
        <Card x={344} y={40} width={280} height={100} title="오디오 링버퍼" lines={['세션별 최근 300초 · 메모리 보관', '음소거 공백에 무음 보충']} icon={AudioLines} tone="blue" />
        <Card x={24} y={236} width={248} height={120} title="학생 참여 상태 집계" lines={['참여 관측 + 이해 확인 응답', '최근 5분의 유의 학생 비율', '오디오 수집과 별도 경로']} icon={Users} tone="violet" />
        <Card x={344} y={236} width={280} height={120} title="코칭 조건 · 유형 판단" lines={['유의 학생 비율 ≥ 30%', '확보 오디오 ≥ 60초 · 쿨타임 10분', '내용 기반 팁 / 고정 팁 분기']} icon={GitBranch} tone="violet" />
        <Card x={704} y={236} width={232} height={120} title="최근 오디오 복사" lines={['기본 창 300초 · 확보량만 캡처', '헷갈림 · 놓침 유형', '복사·시각 계산만 락 안에서']} icon={Timer} />
        <Card x={704} y={428} width={232} height={114} title="16kHz → MP3" lines={['다운샘플 + MP3 인코딩', '락 밖에서 무거운 변환 수행']} icon={FileAudio} />
        <Card x={344} y={428} width={280} height={114} title="Whisper STT" lines={['필요한 최근 구간만 전사', 'GMS · whisper-1']} icon={MessageSquare} />
        <Card x={24} y={428} width={248} height={114} title="핵심 개념 추출" lines={['LLM이 개념·내용을 선별', '팁 문구는 고정 템플릿 사용']} icon={BrainCircuit} />
        <Card x={344} y={636} width={280} height={96} title="강사 코칭 팁" lines={['유형별 문구에 추출한 개념 반영', '강사 화면에서 REST로 조회']} icon={GraduationCap} />
      </Canvas>
    </DiagramCard>
  );
}

export function ReportAssistant() {
  return (
    <DiagramCard
      headingLevel={4}
      number="03"
      title="다중 강의 RAG · MCP 검색과 답변 검증"
      subtitle="LangGraph가 강의별로 검색 도구를 고르고, 실제 발화가 답변의 주장을 뒷받침하는지 검증합니다."
      caption="첫 검색부터 전사·개념 Wiki·개념 관계 중 하나를 선택할 수 있습니다. Wiki와 관계 검색은 전사 버전이 일치하는 사전 인덱스를 사용합니다. 해당 도구에서 근거를 얻지 못하면 챗봇이 같은 강의의 전사 검색을 한 번 호출합니다."
    >
      <Canvas
        id="zani-rag"
        height={862}
        title="LangGraph 챗봇과 MCP 서버의 다중 강의 검색 흐름"
        description="Spring은 현재 강의와 추가로 선택한 최대 네 강의의 접근 자격·종료·리포트 게시 상태를 확인하고 목차와 전사를 LangGraph에 전달합니다. 챗봇은 강의별 검색 질문을 정하고 원문과 다시 대조한 캐시가 충분하면 답변 생성으로 갑니다. 검색할 때는 MCP 도구 목록을 읽고 GMS로 도구와 검색어를 정합니다. 도구 선택이 실패하면 전사 검색을 사용합니다. 챗봇은 허용된 한 강의의 전사를 호출 인자에 넣습니다. MCP 서버는 전사 구간과 BM25로 발화를 찾거나, 사전 구축한 Wiki·최대 2홉 개념 관계를 조회해 발화 위치와 보조 노트를 반환합니다. 챗봇은 그 위치에서 원문을 복원한 뒤 답변을 생성하고, 질문의 필수 항목과 답변 주장을 원문에 대조합니다. 근거가 부족하면 허용된 강의 안에서 다시 검색하고, 확보된 근거로 답을 고칠 수 있으면 답변을 수정해 재검증합니다. 기본 검증 재시도는 두 번입니다. 그래프 내부의 검색·검증이 실패하면 인용 없는 근거 부족 응답을 반환합니다. 검증을 통과한 답변의 인용은 Spring이 강의와 발화 시각을 대조해 실제 전사로 확정합니다."
      >
        <Edge d="M 276 91 H 350" label="질문" x={313} y={77} />
        <Edge d="M 606 91 H 684" label="목차 · 전사" x={645} y={77} />
        <Edge d="M 724 150 V 184 H 12 V 548 H 24" label="캐시 근거 충분 → 생성" x={320} y={174} />
        <Edge d="M 810 150 V 250" label="검색 필요" x={852} y={211} />
        <Edge d="M 684 315 H 606" label="tools/call" x={645} y={301} />
        <Edge d="M 350 315 H 276" label="발화 위치" x={313} y={301} />
        <Edge d="M 150 400 V 478" label="복원한 원문" x={202} y={444} />
        <Edge d="M 276 534 H 350" label="초안" x={313} y={520} />
        <Edge d="M 606 534 H 684" label="검증 통과" x={645} y={520} />
        <Edge d="M 522 478 V 438 H 810 V 400" label="근거 부족 → 재검색" x={668} y={427} />
        <Edge d="M 404 610 V 666 H 150 V 610" label="답변 누락·오류 → 수정" x={276} y={655} />
        <Edge d="M 510 610 V 732" label="검증 한도 소진" x={569} y={661} />
        <Edge d="M 936 342 H 948 V 696 H 558 V 732" label="검색 소진 · MCP 연결 실패" x={769} y={684} />

        <Card x={24} y={32} width={252} height={118} title="사용자 질문" lines={['질문 · 선택 문구 · 대화 이력', '현재 강의 + 추가 강의 최대 4개']} icon={CircleHelp} tone="blue" />
        <Card x={350} y={32} width={256} height={118} title="Spring · 강의 접근 확인" lines={['선택한 강의마다 참여 자격 확인', '강의 종료 · 리포트 게시 확인', '목차 · 가명 처리된 전사 전달']} icon={LockKeyhole} tone="blue" />
        <Card x={684} y={32} width={252} height={118} title="챗봇 · 범위와 캐시" lines={['캐시 발화를 최신 원문과 대조', '후보 강의 · 강의별 질문 결정', '해당 범위의 근거가 충분한지 판단']} icon={GitBranch} tone="blue" />

        <Card x={684} y={250} width={252} height={150} title="챗봇 · 도구 선택" lines={['tools/list로 검색 도구 조회', 'GMS가 도구와 검색어 선택', '챗봇이 해당 강의 전사를 첨부', '선택 실패 시 전사 도구 사용']} icon={GitBranch} />
        <Card x={350} y={250} width={256} height={150} title="강의 검색 MCP 서버" lines={['전사 · search_transcript', 'Wiki · search_concept_wiki', '관계 · find_concept_relations', '발화 위치와 보조 노트 반환']} icon={ScanSearch} tone="violet" />
        <Card x={24} y={250} width={252} height={150} title="챗봇 · 근거 복원" lines={['도구에 보낸 전사에서 발화 복원', '여러 강의의 원문 근거 합산', '최대 24,000바이트 · 80발화', '보조 노트는 원문과 연결']} icon={BookOpen} />

        <Card x={24} y={478} width={252} height={132} title="챗봇 · 답변 생성" lines={['GMS에 질문과 원문 근거 전달', '발화에 근거한 답변 초안 작성', '수정할 때는 검증 피드백 반영']} icon={BrainCircuit} />
        <Card x={350} y={478} width={256} height={132} title="챗봇 · 답변 검증" lines={['질문이 요구한 항목의 충족 여부', '답변 주장과 인용을 원문에 대조', '검증 재시도 기본 최대 2회']} icon={ShieldCheck} />
        <Card x={684} y={478} width={252} height={132} title="Spring · 인용 확정" lines={['강의·시각을 확인해 원문 인용', '현재 강의는 해당 시각으로 이동', '다른 강의는 영상 탭을 새로 열기']} icon={CheckCircle2} tone="blue" />
        <Card x={350} y={732} width={256} height={102} title="근거 부족 응답" lines={['인용 없이 질문 구체화 안내']} icon={MessageSquare} tone="slate" />
      </Canvas>
    </DiagramCard>
  );
}

export default function ZaniDiagrams() {
  return <Architecture />;
}
