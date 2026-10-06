import {
  AudioLines, BookOpen, BrainCircuit, CheckCircle2, CircleHelp, FileAudio,
  Database, FolderOpen, GitBranch, Globe, GraduationCap, Layers, LockKeyhole,
  MessageSquare, Mic, MonitorPlay, ScanSearch, Search, Server, ShieldCheck, Timer, Users,
} from 'lucide-react';
import { Canvas, Card, DiagramCard, Edge, Group } from './diagrams/DiagramPrimitives';

function Architecture() {
  return (
    <DiagramCard number="01" title="실시간 강의 · 코칭 · 다중 강의 RAG" subtitle="미디어는 LiveKit, 업무 API와 코칭은 Spring, 강의 검색·답변 검증은 LangGraph가 담당합니다." caption="주요 연결을 표시했습니다. 미디어는 브라우저와 LiveKit 사이에서 전송하며, 녹화·합성 영상은 로컬 파일로 저장합니다. Spring이 접근 권한을 검사한 강의 원문을 LangGraph에 전달합니다.">
      <Canvas id="zani-architecture" height={700} title="ZANI 전체 시스템 아키텍처" description="Next.js 브라우저는 Spring Boot와 REST API 및 STOMP WebSocket으로 업무 이벤트를 주고받고, LiveKit과 WebRTC로 음성·영상을 직접 주고받습니다. Spring은 LiveKit 토큰과 참가자 제어를 관리하며 Egress WebSocket의 강사 PCM 음성을 링버퍼에 수집합니다. Spring은 MySQL에 강의·전사·리포트를, Redis에 참여 상태·세션·빈도 제한 정보를 관리합니다. 실시간 코칭과 사후 전사는 GMS Whisper 및 LLM을 호출합니다. Python LangGraph에는 권한을 검사한 현재 강의와 다른 강의 최대 4개의 원문을 전달하며, LangGraph가 근거를 검색·선별하고 GMS LLM으로 답변 생성과 검증을 수행합니다. LiveKit Egress 원본 트랙과 Spring의 FFmpeg 영상 합성 결과는 로컬 파일 저장소에 보관하고, Spring이 권한을 검사해 영상과 썸네일을 제공합니다.">
        <Group x={24} y={40} width={240} height={162} label="CLIENT" tone="blue" />
        <Group x={344} y={40} width={292} height={438} label="APPLICATION" />
        <Group x={704} y={40} width={232} height={162} label="MEDIA" tone="blue" />
        <Group x={24} y={302} width={240} height={376} label="DATA" tone="blue" />
        <Group x={704} y={304} width={232} height={174} label="AI GATEWAY" tone="violet" />
        <Group x={704} y={536} width={232} height={142} label="LOCAL STORAGE" tone="slate" />
        <Edge d="M 144 84 V 20 H 820 V 84" label="WebRTC · 음성·영상" x={490} y={14} bidirectional />
        <Edge d="M 248 134 H 360" label="REST · STOMP" x={304} y={120} />
        <Edge d="M 620 110 H 720" label="토큰 · 제어" x={670} y={96} />
        <Edge d="M 720 174 H 620" label="PCM · WS" x={670} y={160} />
        <Edge d="M 490 254 V 350" label="내부 HTTP" x={537} y={310} />
        <Edge d="M 360 184 H 308 V 392 H 248" label="조회 · 저장" x={308} y={286} />
        <Edge d="M 360 218 H 326 V 537 H 248" label="상태 · 세션" x={288} y={524} />
        <Edge d="M 620 218 H 672 V 278 H 820 V 348" label="전사 · 코칭" x={758} y={266} />
        <Edge d="M 620 400 H 720" label="생성 · 검증" x={670} y={386} />
        <Edge d="M 920 134 H 948 V 622 H 920" label="트랙 녹화" x={894} y={524} />
        <Edge d="M 620 238 H 648 V 514 H 820 V 580" label="FFmpeg · 영상 서빙" x={765} y={502} bidirectional />
        <Card x={40} y={84} width={208} height={100} title="Next.js" lines={['강의 · 리포트 · 챗봇 UI', '브라우저 참여도 추론']} icon={Globe} tone="blue" />
        <Card x={360} y={84} width={260} height={170} title="Spring Boot" lines={['인증 · 강의 · 리포트 API', '참여 상태 집계 · 코칭 트리거', '오디오 링버퍼 · 사후 전사', '영상 처리 · 접근 권한 검사']} icon={Server} />
        <Card x={720} y={84} width={200} height={100} title="LiveKit" lines={['WebRTC 미디어 서버', 'Egress · 음성 수집·녹화']} icon={MonitorPlay} tone="blue" />
        <Card x={40} y={346} width={208} height={92} title="MySQL" lines={['강의 · 전사 · 리포트']} icon={Database} tone="blue" />
        <Card x={40} y={482} width={208} height={110} title="Redis" lines={['참여 상태 · 세션 관리', '코칭 트리거 · 요청 빈도 제한']} icon={Layers} tone="blue" />
        <Card x={360} y={350} width={260} height={100} title="Python · LangGraph" lines={['목차·BM25 원문 검색', 'LLM Wiki · 지식 그래프']} icon={GitBranch} />
        <Card x={720} y={348} width={200} height={110} title="GMS" lines={['Whisper · STT', 'LLM · 코칭·답변·검증']} icon={BrainCircuit} tone="violet" />
        <Card x={720} y={580} width={200} height={84} title="로컬 파일" lines={['녹화 · 합성 영상 · 썸네일']} icon={FolderOpen} tone="slate" />
      </Canvas>
    </DiagramCard>
  );
}

export function AudioCoaching() {
  return (
    <DiagramCard headingLevel={4} number="02" title="실시간 오디오 → 강사 코칭" subtitle="음성 수집과 참여 상태 집계를 분리하고, 코칭이 필요할 때 최근 구간만 전사합니다." caption="헷갈림·놓침 유형만 STT와 개념 추출을 호출합니다. 무응답·자리비움은 고정 팁으로 처리하고, 오디오 변환은 버퍼 락 밖에서 수행합니다.">
      <Canvas id="zani-audio" height={756} title="ZANI 실시간 오디오와 코칭 파이프라인" description="LiveKit Egress의 WebSocket PCM 오디오를 세션별 최근 300초 링버퍼에 계속 수집합니다. 음소거 공백에는 무음을 보충합니다. 오디오와 별도로 학생 참여 상태와 응답을 집계해 코칭 조건과 유형을 판단합니다. 헷갈림·놓침 유형은 확보된 최근 오디오를 복사한 뒤 락 밖에서 16kHz 다운샘플과 MP3 인코딩을 수행하고, Whisper STT와 LLM 핵심 개념 추출 후 고정 템플릿으로 팁을 완성합니다. 무응답·자리비움 유형은 STT와 LLM을 생략하고 고정 팁으로 처리합니다.">
        <Edge d="M 272 90 H 344" label="PCM · WS" x={308} y={76} />
        <Edge d="M 624 90 H 820 V 236" label="트리거 시 snapshot" x={812} y={190} />
        <Edge d="M 272 294 H 344" label="집계 결과" x={308} y={280} />
        <Edge d="M 624 294 H 704" label="내용 기반" x={664} y={280} />
        <Edge d="M 820 356 V 428" label="락 밖 변환" x={875} y={397} />
        <Edge d="M 704 485 H 624" label="MP3" x={664} y={471} />
        <Edge d="M 344 485 H 272" label="전사 텍스트" x={308} y={471} />
        <Edge d="M 148 542 V 682 H 344" label="핵심 개념" x={248} y={668} />
        <Edge d="M 484 356 V 386 H 12 V 682 H 344" label="무응답 · 자리비움 → 고정 팁" x={220} y={377} />
        <Card x={24} y={40} width={248} height={100} title="LiveKit Egress" lines={['강사 음성 · WebSocket', '48kHz PCM · 상시 수집']} icon={Mic} tone="blue" />
        <Card x={344} y={40} width={280} height={100} title="오디오 링버퍼" lines={['세션별 최근 300초 · 메모리 보관', '음소거 공백에 무음 보충']} icon={AudioLines} tone="blue" />
        <Card x={24} y={236} width={248} height={120} title="학생 참여 상태 집계" lines={['참여 관측 + 이해 확인 응답', '최근 5분의 유의 학생 비율', '오디오 수집과 별도 경로']} icon={Users} tone="violet" />
        <Card x={344} y={236} width={280} height={120} title="코칭 조건 · 유형 판단" lines={['유의 학생 비율 ≥ 30%', '확보 음성 ≥ 60초 · 쿨타임 10분', '내용 기반 팁 / 고정 팁 분기']} icon={GitBranch} tone="violet" />
        <Card x={704} y={236} width={232} height={120} title="최근 오디오 복사" lines={['기본 창 300초 · 확보량만 캡처', '헷갈림 · 놓침 유형', '복사·시각 계산만 락 안에서']} icon={Timer} />
        <Card x={704} y={428} width={232} height={114} title="16kHz → MP3" lines={['다운샘플 + MP3 인코딩', '락 밖에서 무거운 변환 수행']} icon={FileAudio} />
        <Card x={344} y={428} width={280} height={114} title="Whisper STT" lines={['필요한 최근 구간만 전사', 'GMS · whisper-1']} icon={MessageSquare} />
        <Card x={24} y={428} width={248} height={114} title="핵심 개념 추출" lines={['LLM이 개념·내용을 선별', '팁 문구는 고정 템플릿 사용']} icon={BrainCircuit} />
        <Card x={344} y={636} width={280} height={96} title="강사 코칭 팁" lines={['핵심 개념 + 고정 템플릿', '강사 화면에 전달']} icon={GraduationCap} />
      </Canvas>
    </DiagramCard>
  );
}

export function ReportAssistant() {
  return (
    <DiagramCard headingLevel={4} number="03" title="LangGraph 다중 강의 RAG 라우팅" subtitle="검증 결과에 따라 근거 재검색과 답변 수정을 구분합니다." caption="주요 검색 경로입니다. 유효한 캐시는 검색을 생략하며, Wiki·그래프는 사전 인덱스가 있을 때만 사용합니다. 최대 2회 재시도 후에도 검증하지 못하면 근거 부족 응답으로 종료합니다.">
      <Canvas id="zani-rag" height={1010} title="ZANI LangGraph 다중 강의 검색과 검증 흐름" description="사용자 질문을 받은 Spring 서버가 현재 강의와 다른 강의 최대 4개의 참여·리포트 게시 권한을 검사하고 원문을 전달합니다. LangGraph는 원문 버전과 캐시를 확인하고 필요한 강의와 강의별 검색 질문을 결정합니다. 목차에서 강의별 최대 3구간의 원문을 읽고, 원래 질문의 BM25 상위 최대 3발화를 보완합니다. 초회 원문 근거가 있으면 답변을 생성하며, 원문이 없거나 재검색할 때만 사전 구축된 Wiki·최대 2홉 지식 그래프로 원문을 보완합니다. 답변 생성·검증에 사용하는 원문 근거는 최대 24,000바이트·80발화입니다. 질문 필수 항목, 답변 주장, 원문 인용을 검증해 근거 부족은 검색으로, 답변 누락·오류는 생성으로 돌아갑니다. 검증 통과 시 서버 원문으로 인용을 다시 구성해 영상 시각 이동이 가능한 답변을 반환합니다. 기본 2회 재시도 초과 또는 의존성 실패는 근거 부족 응답으로 종료합니다.">
        <Edge d="M 244 91 H 334" label="질문 · 범위" x={289} y={77} />
        <Edge d="M 586 91 H 684" label="허용된 원문" x={635} y={77} />
        <Edge d="M 810 150 V 188 H 174 V 250" label="강의별 검색 질문" x={471} y={175} />
        <Edge d="M 324 290 H 354 V 212 H 825 V 250" label="초회 원문 근거 확보" x={541} y={201} />
        <Edge d="M 324 340 H 394" label="부족·재검색" x={359} y={326} />
        <Edge d="M 648 340 H 714" label="보완 원문" x={681} y={326} />
        <Edge d="M 825 390 V 506" label="초안" x={853} y={458} />
        <Edge d="M 714 546 H 174 V 716" label="근거 부족 · 재시도 가능" x={444} y={533} />
        <Edge d="M 714 584 H 521 V 716" label="수정 가능 · 재시도 가능" x={546} y={667} />
        <Edge d="M 825 624 V 716" label="검증 통과" x={876} y={673} />
        <Edge d="M 936 565 H 948 V 934 H 648" label="한도 초과 · 의존성 실패" x={815} y={873} />
        <Card x={24} y={32} width={220} height={118} title="사용자 질문" lines={['질문 · 대화 이력', '현재 강의 + 선택한 다른 강의']} icon={CircleHelp} tone="blue" />
        <Card x={334} y={32} width={252} height={118} title="Spring 권한 검사" lines={['강의 참여 · 리포트 게시 확인', '선택 강의의 전체 원문 전달', '강의 ID · 원문 시각 보존']} icon={LockKeyhole} tone="blue" />
        <Card x={684} y={32} width={252} height={118} title="범위 · 캐시 판단" lines={['현재 강의 + 최대 4개 강의', '질문별 후보 강의 · 검색 질문', '원문 버전 · 캐시 재검증']} icon={GitBranch} tone="blue" />
        <Card x={24} y={250} width={300} height={140} title="목차 → 원문 + BM25" lines={['강의별 목차 최대 3구간 선택', '해당 구간의 실제 전사 로드', '원래 질문으로 상위 3발화 보완', '중복 제거 · 강의별 근거 배분']} icon={ScanSearch} />
        <Card x={394} y={250} width={254} height={140} title="Wiki · 지식 그래프" lines={['원문 부족 · 재검색 시에만', '사전 생성된 개념 인덱스', '원문 해시 · 관계 유형 확인', '연결된 원문 탐색 · 최대 2홉']} icon={BookOpen} tone="violet" />
        <Card x={714} y={250} width={222} height={140} title="답변 생성" lines={['원문 근거 상한', '24,000바이트 · 80발화', 'Wiki 노트는 별도 예산', '검증된 주장·인용 보존']} icon={BrainCircuit} />
        <Card x={714} y={506} width={222} height={118} title="답변 검증" lines={['질문 필수 항목 · 답변 주장', '원문 ID · 출처로 대조', '검증 재시도 기본 최대 2회']} icon={ShieldCheck} />
        <Card x={24} y={716} width={300} height={118} title="근거 부족 → 재검색" lines={['허용된 강의 안에서 범위 확장', '검색 질문 · 목차·원문 재탐색', '검색 단계로 복귀']} icon={Search} tone="amber" />
        <Card x={394} y={716} width={254} height={118} title="누락·오류 → 재생성" lines={['검증된 주장·인용은 유지', '피드백으로 답변 수정', '생성 단계로 복귀']} icon={MessageSquare} tone="amber" />
        <Card x={714} y={716} width={222} height={118} title="인용 답변 확정" lines={['서버 원문으로 인용 재구성', '현재 영상의 시각 이동', '다른 강의 영상은 새 탭']} icon={CheckCircle2} />
        <Card x={394} y={886} width={254} height={96} title="근거 부족 응답" lines={['검증 불가 시 답변 확정 중단', '질문 구체화 안내']} icon={ShieldCheck} tone="slate" />
      </Canvas>
    </DiagramCard>
  );
}

export default function ZaniDiagrams() {
  return <Architecture />;
}
