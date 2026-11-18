// 1. 제품 데이터베이스
const productsData = {
  original: {
    id: 'original',
    tag: 'CLASSIC ENERGY',
    name: '핫식스 오리지널',
    desc: '대한민국 대표 에너지 드링크의 시작. 과라나 추출물과 타우린이 조화된 오리지널의 짜릿함을 경험하세요.',
    label: 'ORIGINAL',
    color: '#0066FF',
    canGradient: 'linear-gradient(135deg, #002b80, #0066FF 50%, #001a4d)',
    canShadow: '0 20px 45px rgba(0, 102, 255, 0.5), inset -12px 0 20px rgba(0, 0, 0, 0.4)',
    caffeine: { val: '60mg', pct: 60 },
    taurine: { val: '1,000mg', pct: 50 },
    calorie: { val: '120kcal', pct: 65 },
    specs: ['카페인 60mg', '타우린 1,000mg', '클래식 오리지널 맛']
  },
  power: {
    id: 'power',
    tag: 'EXTREME BOOST',
    name: '핫식스 더킹 파워',
    desc: '한계를 돌파하는 강력한 각성! 고카페인 100mg과 타우린 2,000mg으로 밤샘 공부와 고강도 퍼포먼스를 완벽 지원합니다.',
    label: 'THE KING POWER',
    color: '#FF5500',
    canGradient: 'linear-gradient(135deg, #801a00, #FF5500 50%, #4d0f00)',
    canShadow: '0 20px 45px rgba(255, 85, 0, 0.5), inset -12px 0 20px rgba(0, 0, 0, 0.4)',
    caffeine: { val: '100mg', pct: 100 },
    taurine: { val: '2,000mg', pct: 100 },
    calorie: { val: '165kcal', pct: 85 },
    specs: ['고카페인 100mg', '타우린 2,000mg', '강력한 에너지 부스팅']
  },
  force: {
    id: 'force',
    tag: 'FRESH & SHARP',
    name: '핫식스 더킹 포스',
    desc: '상큼하고 톡 쏘는 과일 향과 100mg의 카페인! 게이밍 랭크전과 오후의 나른함을 한 번에 날려버리는 짜릿한 맛.',
    label: 'THE KING FORCE',
    color: '#FF8800',
    canGradient: 'linear-gradient(135deg, #993d00, #FF8800 50%, #4d1f00)',
    canShadow: '0 20px 45px rgba(255, 136, 0, 0.5), inset -12px 0 20px rgba(0, 0, 0, 0.4)',
    caffeine: { val: '100mg', pct: 100 },
    taurine: { val: '1,000mg', pct: 50 },
    calorie: { val: '150kcal', pct: 75 },
    specs: ['카페인 100mg', '상큼한 과일 탄산', '게이밍 집중력']
  },
  zero: {
    id: 'zero',
    tag: 'ZERO SUGAR & CALORIE',
    name: '핫식스 더킹 제로',
    desc: '당류 0g, 칼로리 0kcal! 식단 관리 중에도 부담 없이 즐길 수 있는 깔끔하고 청량한 제로 칼로리 에너지 드링크.',
    label: 'THE KING ZERO',
    color: '#00C8FF',
    canGradient: 'linear-gradient(135deg, #1a1a1a, #0099cc 55%, #0d0d0d)',
    canShadow: '0 20px 45px rgba(0, 200, 255, 0.45), inset -12px 0 20px rgba(0, 0, 0, 0.5)',
    caffeine: { val: '100mg', pct: 100 },
    taurine: { val: '1,000mg', pct: 50 },
    calorie: { val: '0kcal', pct: 5 },
    specs: ['0 kcal / 당류 0g', '카페인 100mg', '깔끔한 청량감']
  }
};

// 2. 3단계 큐레이션 질문 데이터
const quizQuestions = [
  {
    question: 'Q1. 지금 가장 에너지가 필요한 순간은?',
    options: [
      { text: '🌙 밤샘 공부 및 과제 마감 (강력한 집중력)', target: 'power' },
      { text: '🎮 게임 랭크전 및 피지컬 부스팅 (빠른 반응속도)', target: 'force' },
      { text: '🏃‍♂️ 운동 전 퍼포먼스 향상 및 피로 회복 (활력 충전)', target: 'power' },
      { text: '🍃 오후의 나른함 타파 및 가벼운 리프레시', target: 'zero' }
    ]
  },
  {
    question: 'Q2. 선호하는 맛과 칼로리 타입은?',
    options: [
      { text: '🍬 달콤하고 클래식한 오리지널 에너지 맛', target: 'original' },
      { text: '🍋 상큼하고 톡 쏘는 과일/탄산 맛', target: 'force' },
      { text: '🧊 당류와 칼로리 걱정 없는 깔끔한 제로(Zero)', target: 'zero' }
    ]
  },
  {
    question: 'Q3. 오늘 필요한 에너지 충전 강도는?',
    options: [
      { text: '⚡ 적당하고 기분 좋은 활력 (카페인 60mg 수준)', target: 'original' },
      { text: '🔥 한계를 돌파하는 강력한 각성 (카페인 100mg 이상)', target: 'power' }
    ]
  }
];

let currentStep = 0;
let scores = { original: 0, power: 0, force: 0, zero: 0 };

// DOM 요소
const quizContainer = document.getElementById('quizContainer');
const quizProgress = document.getElementById('quizProgress');
const stepText = document.getElementById('stepText');
const questionArea = document.getElementById('questionArea');
const questionTitle = document.getElementById('questionTitle');
const optionsGrid = document.getElementById('optionsGrid');
const loadingArea = document.getElementById('loadingArea');
const resultArea = document.getElementById('resultArea');

// 질문 렌더링 함수
function renderQuestion() {
  const currentQ = quizQuestions[currentStep];
  quizProgress.style.width = `${((currentStep + 1) / quizQuestions.length) * 100}%`;
  stepText.textContent = `STEP ${currentStep + 1} / ${quizQuestions.length}`;
  questionTitle.textContent = currentQ.question;

  optionsGrid.innerHTML = '';
  currentQ.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt.text;
    btn.onclick = () => handleOptionSelect(opt.target);
    optionsGrid.appendChild(btn);
  });
}

// 선택지 클릭 처리
function handleOptionSelect(targetProduct) {
  // 가중치 부여 (2단계 맛/칼로리 선택에 조금 더 높은 비중)
  const weight = currentStep === 1 ? 1.5 : 1;
  scores[targetProduct] += weight;

  currentStep++;

  if (currentStep < quizQuestions.length) {
    renderQuestion();
  } else {
    showLoadingAndResult();
  }
}

// 로딩 후 결과 출력
function showLoadingAndResult() {
  questionArea.classList.add('hidden');
  stepText.textContent = 'ANALYZING...';
  loadingArea.classList.remove('hidden');

  setTimeout(() => {
    loadingArea.classList.add('hidden');
    stepText.textContent = 'RESULT';

    // 최고 점수 제품 도출
    const bestKey = Object.keys(scores).reduce((a, b) => scores[a] >= scores[b] ? a : b);
    const product = productsData[bestKey];

    // 결과 UI 채우기
    document.getElementById('resultName').textContent = product.name;
    document.getElementById('resultDesc').textContent = product.desc;

    const specsContainer = document.getElementById('resultSpecs');
    specsContainer.innerHTML = product.specs
      .map(s => `<span class="spec-badge">${s}</span>`)
      .join('');

    // 테마 테두리 색상 변경
    quizContainer.classList.remove('glow-result-blue', 'glow-result-orange');
    if (bestKey === 'power' || bestKey === 'force') {
      quizContainer.classList.add('glow-result-orange');
    } else {
      quizContainer.classList.add('glow-result-blue');
    }

    // '라인업에서 자세히 보기' 버튼 연동
    const goBtn = document.getElementById('goToProductBtn');
    goBtn.onclick = () => {
      selectProductTab(bestKey);
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    };

    resultArea.classList.remove('hidden');
  }, 650);
}

// 퀴즈 초기화
function resetQuiz() {
  currentStep = 0;
  scores = { original: 0, power: 0, force: 0, zero: 0 };
  quizContainer.classList.remove('glow-result-blue', 'glow-result-orange');
  resultArea.classList.add('hidden');
  questionArea.classList.remove('hidden');
  renderQuestion();
}

// 3. 제품 라인업 탭 전환 로직
const tabBtns = document.querySelectorAll('.tab-btn');

function selectProductTab(prodId) {
  const data = productsData[prodId];
  if (!data) return;

  // 탭 버튼 활성화 스타일 변경
  tabBtns.forEach(btn => {
    if (btn.dataset.id === prodId) {
      btn.classList.add('active');
      btn.style.backgroundColor = data.color;
      btn.style.borderColor = data.color;
      btn.style.boxShadow = `0 0 20px ${data.color}80`;
    } else {
      btn.classList.remove('active');
      btn.style.backgroundColor = '';
      btn.style.borderColor = '';
      btn.style.boxShadow = '';
    }
  });

  // 캔 디자인 및 텍스트 업데이트
  const canMockup = document.getElementById('canMockup');
  canMockup.style.background = data.canGradient;
  canMockup.style.boxShadow = data.canShadow;
  document.getElementById('canLabel').textContent = data.label;

  const prodTag = document.getElementById('prodTag');
  prodTag.textContent = data.tag;
  prodTag.style.color = data.color;

  document.getElementById('prodName').textContent = data.name;
  document.getElementById('prodDesc').textContent = data.desc;

  // 스펙 게이지 바 업데이트
  updateStatBar('statCaffeine', 'valCaffeine', data.caffeine, data.color);
  updateStatBar('statTaurine', 'valTaurine', data.taurine, data.color);
  updateStatBar('statCalorie', 'valCalorie', data.calorie, data.color);
}

function updateStatBar(barId, valId, statObj, color) {
  const bar = document.getElementById(barId);
  bar.style.width = `${statObj.pct}%`;
  bar.style.background = color;
  document.getElementById(valId).textContent = statObj.val;
}

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => selectProductTab(btn.dataset.id));
});

// 4. 스크롤 등장 애니메이션 (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// 초기 실행
renderQuestion();
selectProductTab('original');
