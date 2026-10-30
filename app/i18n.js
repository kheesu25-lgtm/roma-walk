/* ROMA / WALK — 한/영 번역
 * 화면의 한국어 문구를 사전(D)으로 영어로 바꾸고, 다시 한국어로 되돌린다.
 * 동적으로 그려지는 목록·토스트·지도 말풍선도 MutationObserver로 함께 번역한다. */
(function(){
'use strict';
const TITLE={ko:'ROMA / WALK — 로마 건축 탐험',en:'ROMA / WALK — Rome Architecture Walks'};
const LANG_KEY='romaWalkLang';

const D={
 // 내비게이션·공통
 '탐색':'Explore','명소 아카이브':'Places','나의 경로':'My Route','추천 경로':'Routes','주요 메뉴':'Main menu',
 '전체 보기':'Show all','전체 보기 →':'View all →','모두 보기 →':'See all →','전체':'All',
 '지도를 불러오는 중…':'Loading map…','로마 지도':'Rome map','도보 경로 지도':'Walking route map',
 '⌖ 현재 위치':'⌖ My location','현재 위치':'My location',
 // 홈
 '유명한 장소를 체크하는 여행에서, 도시의 이야기를 발견하는 산책으로. 건축과 골목, 그리고 그 사이의 장소들을 나만의 경로로 연결해 보세요.':'From ticking off famous sights to a walk that uncovers the city’s stories. Connect architecture, alleys and the places in between into a route of your own.',
 '오늘 어떤 로마를 걷고 싶나요?':'Which Rome do you want to walk today?',
 '관심 테마를 선택하면 관련 장소를 모아볼 수 있어요.':'Pick a theme to see related places.',
 '건축과 역사':'Architecture & History','숨은 골목':'Hidden Alleys','예술과 광장':'Art & Piazzas','카페와 식문화':'Cafés & Food Culture',
 '도심의 발견':'Discoveries in the Centre',
 '판테온 · 나보나 광장 · 캄포 데 피오리 주변':'Around the Pantheon · Piazza Navona · Campo de’ Fiori',
 '이 장소들로 경로 만들기 ↗':'Build a route from these ↗',
 '사람들이 만든 산책':'Walks made by people','다른 여행자의 시선으로 도시를 만나보세요.':'See the city through other travellers’ eyes.',
 '걷는 길 위의 쉼표':'A pause along the way','경로 근처에서 들르기 좋은 카페와 식당 아이디어':'Café and restaurant ideas near your route',
 '※ 장소와 소개 문구는 서비스 콘셉트를 보여주기 위한 예시입니다. 영업 여부, 실제 거리, 혼잡도 및 추천 순위는 검증된 실시간 데이터가 아닙니다.':'※ Places and descriptions are examples to illustrate the concept. Opening status, actual distances, crowding and rankings are not verified real-time data.',
 '열기 ↗':'Open ↗','가져오기 ↗':'Import ↗',
 // 명소 아카이브
 '로마의 건축물과 광장, 골목을 기록한 장소 아카이브':'An archive of Rome’s buildings, piazzas and alleys',
 '장소명 또는 키워드 검색 / Search places':'Search places or keywords','모든 테마':'All themes','검색 결과가 없습니다.':'No results found.',
 '소개는 탐험 경험을 위한 편집 콘텐츠 예시입니다. 방문 전 공식 자료를 통해 입장 가능 여부와 운영 정보를 확인하세요.':'Descriptions are sample editorial content. Check official sources for admission and opening information before you visit.',
 // 상세
 '← 장소 목록으로':'← Back to places','장소 사진이 들어갈 영역':'Place photo goes here','실제 사진 또는 이미지 API 연결 예정':'Real photo or image API to be connected',
 '+ 내 경로에 추가':'+ Add to my route','✓ 내 경로에 추가됨':'✓ Added to my route','경로 확인 →':'View route →',
 '함께 둘러볼 만한 곳':'Worth seeing nearby','지도 연동 시 실제 경로 주변 반경을 기준으로 표시할 영역':'Will show places within a radius of the actual route once the map is linked',
 '관찰 포인트':'Look for','추천 시선':'Suggested view','탐험 테마':'Theme',
 // 나의 경로
 '장소를 담고 순서를 바꿔 나만의 산책 코스를 만들어 보세요.':'Add places and reorder them to build your own walking course.',
 '나의 산책 순서':'My walking order','장소를 추가한 뒤 위아래 버튼으로 순서를 조정할 수 있어요.':'Add places, then use the up/down buttons to reorder.',
 '초기화':'Reset','장소 선택해서 추가':'Choose a place to add','+ 장소 추가':'+ Add place','경로 저장하기':'Save route','경로 공유':'Share route',
 '산책에 필요한 작은 정보':'Small details for your walk','코스를 만든 뒤, 이동 흐름에 맞는 카페와 식당을 함께 살펴보세요.':'After building your course, look for cafés and restaurants that fit your flow.',
 '추천은 예시 데이터이며, 경로와의 실제 거리·영업 상태는 확인되지 않았습니다.':'Suggestions are sample data; actual distance from the route and opening status are unverified.',
 '아직 장소가 없어요. 아래 목록에서 장소를 추가해 보세요.':'No places yet. Add some from the list below.',
 '위로':'Move up','아래로':'Move down','삭제':'Remove',
 '선택한 장소':'Places selected','코스 유형':'Course type','나만의 산책':'My own walk','도보 거리':'Walking distance','예상 시간':'Estimated time',
 '지도를 불러오면 도보 경로와 예상 시간이 표시돼요.':'Once the map loads, the walking route and estimated time will appear.',
 '장소를 두 곳 이상 담으면 도보 경로를 계산해요.':'Add two or more places to calculate a walking route.',
 '도보 경로를 계산하는 중이에요…':'Calculating the walking route…',
 '도보 경로를 계산하지 못했어요. 지도의 점선은 방문 순서만 보여 주는 직선 연결이며 실제 경로나 거리가 아니에요.':'Couldn’t calculate the walking route. The dotted line on the map is a straight connection showing visit order only — not a real route or distance.',
 'Google 지도 도보 경로 기준의 추정치예요. 관람·휴식 시간은 포함되지 않아요.':'Estimate based on Google Maps walking routes. Sightseeing and rest time are not included.',
 // 추천 경로
 '관심사와 걷는 속도에 맞는 다른 사람들의 경로를 발견하고, 내 경로의 출발점으로 가져오세요.':'Discover routes by others that match your interests and pace, and bring one in as a starting point.',
 '건축':'Architecture','느긋한 산책':'Slow walks','카페·식당':'Cafés & restaurants','건축 중심':'Architecture-focused','느긋한 산책 ':'Slow walk',
 '이 화면의 경로는 서비스 시나리오를 위한 샘플입니다. 실제 이용자 작성 경로, 후기, 인기 순위가 아닙니다.':'Routes on this screen are samples for the service scenario, not real user routes, reviews or rankings.',
 '고대의 흔적을 따라':'Following Ancient Traces','판테온에서 피아차 디 피에트라까지, 기둥과 돔을 중심으로 보는 산책.':'From the Pantheon to Piazza di Pietra — a walk centred on columns and domes.',
 '광장에서 광장으로':'From Piazza to Piazza','나보나 광장의 열린 공간과 주변 골목을 느긋하게 연결하는 코스.':'A relaxed course linking Piazza Navona’s open space with the surrounding alleys.',
 '골목의 일상 관찰':'Watching Everyday Corners','캄포 데 피오리 주변의 거리 풍경을 보고 카페와 식사 시간을 더하는 코스.':'A course that takes in the streets around Campo de’ Fiori and adds time for coffee and a meal.',
 '작은 광장과 파사드':'Small Piazzas & Façades','눈높이를 바꿔가며 건물의 표정과 광장의 형태를 관찰하는 코스.':'A course for observing the character of buildings and the form of piazzas from changing viewpoints.',
 '느린 오후의 로마':'A Slow Afternoon in Rome','명소 사이에 쉬는 시간을 넣고 도시의 리듬을 즐기는 산책.':'A walk that puts rests between the sights and lets you enjoy the city’s rhythm.',
 '산책과 한 끼':'A Walk and a Meal','도심 장소를 둘러본 뒤 주변 식문화와 휴식을 함께 고려한 코스.':'A course that, after visiting central sights, also takes the surrounding food culture and rest into account.',
 // 카페·식당 아이디어
 '에스프레소 바 들르기':'Stop at an espresso bar','걷는 중 잠깐 쉬어가기 좋은 동네 바를 찾아보세요.':'Look for a neighbourhood bar that’s good for a short break mid-walk.',
 '로마식 점심 탐색':'Find a Roman lunch','오늘의 파스타나 지역 메뉴를 살펴보는 짧은 휴식.':'A short break to look at today’s pasta or local menu.',
 '젤라토 브레이크':'Gelato break','다음 장소로 이동하기 전 잠시 쉬어가기.':'A pause before heading to the next place.',
 // 장소 이름
 '판테온':'Pantheon','나보나 광장':'Piazza Navona','캄포 데 피오리':'Campo de’ Fiori','피아차 디 피에트라':'Piazza di Pietra','산티냐치오 광장':'Piazza di Sant’Ignazio','라르고 디 토레 아르젠티나':'Largo di Torre Argentina',
 // 장소 라벨
 '고대 건축':'Ancient architecture','돔 구조':'Dome structure','바로크':'Baroque','도시의 무대':'The city’s stage','시장 광장':'Market square','일상 풍경':'Everyday scenes',
 '고대 유구':'Ancient remains','현대 도시':'Modern city','도시 공간':'Urban space','건축적 리듬':'Architectural rhythm','고고학 유적':'Archaeological site','도시의 층위':'Layers of the city',
 // 장소 설명
 '거대한 돔과 중앙의 오큘루스로 잘 알려진 로마의 대표적인 고대 건축물입니다. 내부 공간은 장식보다 비례와 빛의 움직임을 먼저 경험하게 합니다.':'One of Rome’s best-known ancient buildings, famed for its huge dome and the central oculus. Inside, you experience proportion and the movement of light before ornament.',
 '광장에 도착하면 건물 정면만 보고 지나가기보다, 포르티코의 기둥과 둥근 돔이 만드는 대비를 천천히 살펴보세요. 날씨와 시간에 따라 빛이 내부에 들어오는 방식도 달라집니다.':'When you reach the square, don’t just glance at the façade — take your time with the contrast between the portico’s columns and the round dome. The way light enters the interior also changes with the weather and time of day.',
 '돔':'Dome','오큘루스':'Oculus','정면과 내부 공간':'Façade and interior',
 '길게 뻗은 광장 형태와 분수, 주변 건축의 조합이 인상적인 장소입니다. 광장은 이동 통로이면서 사람들이 머물고 바라보는 도시의 무대이기도 합니다.':'A place made memorable by its elongated shape, its fountains and the architecture around it. The piazza is a passage, but also a stage where people linger and watch.',
 '분수 주변에서 시선을 조금씩 옮겨 보세요. 광장의 길이와 열린 공간, 주변 파사드가 함께 읽힐 때 이곳이 단순한 명소가 아니라 도시의 방이라는 점이 드러납니다.':'Shift your gaze slowly around the fountains. When the length of the piazza, its open space and the surrounding façades are read together, it reveals itself as not just a sight but a room of the city.',
 '분수':'Fountains','파사드':'Façades','광장 전체의 형태':'The shape of the whole piazza',
 '역사적 중심지 안에서 일상의 움직임을 관찰하기 좋은 광장입니다. 주변 골목과 상점, 광장에 모이는 사람들의 활동이 장소의 분위기를 만듭니다.':'A piazza in the historic centre that is good for watching everyday movement. The surrounding alleys and shops and the people who gather make its atmosphere.',
 '기념물을 보는 것만큼 주변의 작은 가게와 골목의 연결을 살펴보세요. 방문 시간에 따라 풍경이 달라질 수 있으므로, 현장에서 실제 운영 여부를 확인하는 편이 좋습니다.':'Look at how the small shops and alleys connect, as much as at the monuments. The scene changes with the time of your visit, so it’s best to check on site whether things are actually open.',
 '골목':'Alleys','상점':'Shops','광장':'Piazza','일상의 흐름':'The flow of daily life',
 '고대 건축의 흔적이 오늘날의 도시 조직 안에 남아 있는 모습을 살펴볼 수 있는 광장입니다. 오래된 구조와 현재의 거리 풍경이 한 프레임에 겹쳐집니다.':'A piazza where you can see traces of ancient architecture surviving inside today’s urban fabric. Old structures and the present streetscape overlap in a single frame.',
 '기둥의 반복과 주변 건물의 높이를 비교해 보세요. 과거의 건축이 독립된 유물이 아니라 현재의 거리와 함께 살아가는 모습을 관찰할 수 있습니다.':'Compare the repetition of the columns with the height of the surrounding buildings. You can see old architecture not as an isolated relic but living alongside today’s street.',
 '기둥의 반복':'Repeating columns','고대와 현재의 대비':'Contrast of ancient and present',
 '광장을 둘러싼 건물의 곡선적인 외관과 공간 구성이 독특한 인상을 주는 장소입니다. 작은 광장이 어떻게 시선을 모으고 머무름을 만드는지 관찰해 보세요.':'A place with a distinctive impression, given by the curved façades enclosing the piazza and its spatial composition. Watch how a small square gathers the eye and invites you to stay.',
 '광장 가장자리에 서서 건물의 곡선과 창문 리듬을 바라보면, 공간이 시선을 중심으로 모으는 방식을 읽을 수 있습니다.':'Stand at the edge of the piazza and look at the curve of the buildings and the rhythm of the windows; you can read how the space draws your gaze to the centre.',
 '곡선형 파사드':'Curved façades','광장 가장자리에서 중앙으로':'From the edge of the piazza to its centre',
 '도시 한복판에서 고고학적 유적과 현대의 교통·거리 풍경이 만나는 장소입니다. 로마의 시간이 여러 겹으로 쌓여 있다는 사실을 떠올리게 합니다.':'A place in the middle of the city where archaeological remains meet modern traffic and streetscape. It reminds you that Rome’s time is stacked in many layers.',
 '유적을 둘러싼 도로와 주변 건물을 함께 관찰해 보세요. 도시가 과거를 보존하는 방식과 현재의 일상이 공존하는 모습을 생각해 볼 수 있습니다.':'Observe the roads and buildings around the ruins together. Think about how the city preserves its past while everyday life coexists with it.',
 '유적과 도로':'Ruins and roads','거리 위에서 내려다보기':'Looking down from street level',
 // 쉼표(카페·식당) 페이지
 '← 탐색으로':'← Back to Explore','경로 주변에서 찾아보기':'Search along your route','내 경로의 장소 기준':'Based on the places in your route','전체 장소 기준':'Based on all places',
 '내 경로 보기 →':'View my route →','Google 지도에서 검색 ↗':'Search on Google Maps ↗',
 '검색은 Google 지도의 검색 결과로 연결되며, 추천이나 검증된 정보가 아닙니다. 영업 여부와 실제 거리는 지도에서 직접 확인해 주세요.':'Links open Google Maps search results; they are not recommendations or verified information. Please check opening status and actual distance on the map yourself.',
 // 토스트
 '내 경로에 장소를 추가했어요.':'Added the place to your route.','이미 경로에 포함된 장소예요.':'This place is already in your route.',
 '샘플 경로를 내 경로에 불러왔어요.':'Loaded the sample route into your route.','추가할 장소를 선택해 주세요.':'Please choose a place to add.','경로를 초기화했어요.':'Route cleared.',
 '프로토타입에서는 경로가 현재 화면에만 유지됩니다.':'In this prototype the route only lasts on the current screen.','경로 요약을 복사했어요.':'Route summary copied.',
 '한국어 화면으로 전환했어요.':'Switched to Korean.',
 // 지도
 '상세 보기 ↗':'View details ↗','+ 경로':'+ Route','전체 보기 ':'Show all',
 '지도가 아직 준비되지 않았어요.':'The map isn’t ready yet.','이 브라우저에서는 위치 기능을 사용할 수 없어요.':'Location isn’t available in this browser.',
 '위치 권한 없이도 지도를 둘러볼 수 있어요.':'You can still explore the map without location permission.',
 '지도를 보려면 Google Maps API 키가 필요해요. 상단의 “MAP KEY” 버튼에서 키를 입력해 주세요. (장소 목록과 경로 편집은 계속 사용할 수 있어요.)':'A Google Maps API key is needed to show the map. Enter it with the “MAP KEY” button at the top. (The place list and route editing still work.)',
 '지도 인증에 실패했어요. API 키의 사용 설정과 허용 도메인을 확인하거나, 상단 “MAP KEY”에서 키를 다시 입력해 주세요. (장소 목록과 경로 편집은 계속 사용할 수 있어요.)':'Map authentication failed. Check that the API key is enabled and the domain is allowed, or re-enter it under “MAP KEY” at the top. (The place list and route editing still work.)',
 '지도를 불러오지 못했어요. 네트워크 연결을 확인해 주세요. (장소 목록과 경로 편집은 계속 사용할 수 있어요.)':'Couldn’t load the map. Please check your network connection. (The place list and route editing still work.)',
 // API 키 창
 'Google Maps API 키':'Google Maps API key',
 '키는 이 브라우저(localStorage)에만 저장되며 서버로 전송되지 않아요. 저장하면 페이지가 새로고침됩니다.':'The key is stored only in this browser (localStorage) and is never sent to a server. The page reloads after saving.',
 '보기':'Show','숨기기':'Hide','저장된 키가 없어요.':'No key saved.','키 삭제':'Delete key','취소':'Cancel','저장':'Save',
 'Google Cloud 콘솔에서 Maps JavaScript API를 사용 설정하고, 도보 경로(Directions)를 쓰려면 해당 API도 켜 주세요. 키는 사용할 도메인(HTTP 리퍼러)으로 제한하는 것을 권장해요.':'Enable the Maps JavaScript API in the Google Cloud console, and enable Directions as well to use walking routes. We recommend restricting the key to your domain (HTTP referrer).',
 'API 키를 입력해 주세요.':'Please enter an API key.','이 브라우저에서는 키를 저장할 수 없어요.':'This browser can’t store the key.',
 '일반적인 Google API 키 형식(AIza…)이 아니에요. 그래도 저장할까요?':'This doesn’t look like a standard Google API key (AIza…). Save anyway?'
};
const RULES=[
 [/^↓ 다음 장소까지 도보 (.+)$/,'↓ $1 walk to next stop'],
 [/(\d+)시간 (\d+)분/g,'$1 h $2 min'],
 [/(\d+)분/g,'$1 min'],
 [/(\d+)곳/g,(m,n)=>n+(n==='1'?' place':' places')],
 [/^현재 저장된 키: /,'Saved key: ']
];
const HANGUL=/[가-힣]/;
const seg=p=>{if(D[p]!==undefined)return D[p];let r=p;for(const [re,rep] of RULES)r=r.replace(re,rep);return r};
function core(c){
 if(D[c]!==undefined)return D[c];
 const parts=c.split(/( · | — )/);
 return parts.length>1?parts.map((p,i)=>i%2?p:seg(p)).join(''):seg(c);
}
function tr(s){const m=s.match(/^(\s*)([\s\S]*?)(\s*)$/);return m[2]?m[1]+core(m[2])+m[3]:s}
window.tr=tr;

const touched=new Map();                       // text node -> {ko,en}
const attrs=new Map();                         // element -> {attr: ko}
const ATTRS=['placeholder','aria-label','title'];
const skip=el=>{if(!el||/^(SCRIPT|STYLE|NOSCRIPT)$/.test(el.tagName))return true;const g=el.closest('.gmap');return !!g&&!el.closest('.iw')};

function applyAll(){
 if(!isEnglish)return;
 const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 let n;
 while((n=w.nextNode())){
  if(!HANGUL.test(n.data)||skip(n.parentElement))continue;
  const ko=n.data,en=tr(ko);
  if(en!==ko){touched.set(n,{ko,en});n.data=en}
 }
 document.querySelectorAll('[placeholder],[aria-label],[title]').forEach(el=>{
  if(skip(el))return;
  ATTRS.forEach(a=>{const v=el.getAttribute(a);if(v&&HANGUL.test(v)){const o=attrs.get(el)||{};o[a]=v;attrs.set(el,o);el.setAttribute(a,tr(v))}});
 });
}
function restoreAll(){
 touched.forEach((r,n)=>{if(n.isConnected&&n.data===r.en)n.data=r.ko});touched.clear();
 attrs.forEach((o,el)=>{if(el.isConnected)for(const a in o)el.setAttribute(a,o[a])});attrs.clear();
}

let queued=false;
new MutationObserver(()=>{
 if(!isEnglish||queued)return;
 queued=true;setTimeout(()=>{queued=false;applyAll()},0);
}).observe(document.body,{childList:true,subtree:true,characterData:true});

function setLang(en,silent){
 if(!en)restoreAll();
 isEnglish=en;
 try{localStorage.setItem(LANG_KEY,en?'en':'ko')}catch(e){}
 document.documentElement.lang=en?'en':'ko';
 document.title=en?TITLE.en:TITLE.ko;
 $('langBtn').textContent=en?'EN / KR':'KR / EN';
 refreshThemeBtn();
 renderHome();renderCatalog();renderRoute(true);renderCommunity();
 if(currentPage==='detail')openDetail(selectedPlace);
 if(currentPage==='food')openFood(foodIdx);
 if(en)applyAll();
 if(!silent)showToast(en?'Switched to English.':'한국어 화면으로 전환했어요.');
}
$('langBtn').onclick=()=>setLang(!isEnglish);

$('shareRoute').onclick=()=>{
 const text='ROMA / WALK — '+route.map(id=>placeName(id)).join(' → ');
 if(navigator.clipboard)navigator.clipboard.writeText(text).then(()=>showToast('경로 요약을 복사했어요.')).catch(()=>showToast(text));else showToast(text);
};
const nativeConfirm=window.confirm;
window.confirm=m=>nativeConfirm.call(window,isEnglish?tr(m):m);

let saved='ko';try{saved=localStorage.getItem(LANG_KEY)||'ko'}catch(e){}
if(saved==='en')setLang(true,true);
})();
