(function(){
  try{
    var t=localStorage.getItem('nc_theme')||'light';
    if(t==='winter')t='light';
    document.documentElement.setAttribute('data-theme',t);
    document.documentElement.lang=localStorage.getItem('nc_lang')||'ru';
  }catch(e){}
})();

const GAS_URL='https://script.google.com/macros/s/AKfycbxWdOtpczDkEmU0Nb1gEE8iIovoqTfJPYPTqoUKM__MtciH0xEAlFX3ROPmMnYhxSMd/exec';
const CREATOR_EMAILS = ['maksimsuhomlinov37@gmail.com','maksimsuhomlinov37@nova.class'];
const EMAIL_DOMAIN = '@nova.class';
const SESSION_KEY='nc_session',SESSION_MS=30*24*60*60*1000;
const THEME_KEY='nc_theme',LANG_KEY='nc_lang',AVATAR_KEY='nc_avatar';
const CUSTOM_REFS_KEY='nc_custom_refs_v1',GRADES_KEY='nc_grades_v3',TABLE_KEY='nc_grades_table_v3';
const LESSONS_CACHE_KEY='nc_lessons_cache_v1',HW_CACHE_KEY='nc_hw_cache_v1',USERS_CACHE_KEY='nc_users_cache_v1';
const SCHOOLS_KEY='nc_schools_v1', VACATIONS_KEY='nc_vacations_v1';
const CATBOX_URL='https://catbox.moe/user/api.php',MAX_UPLOAD_MB=200;
const LOADER_MIN_MS = 3000;
const $=id=>document.getElementById(id),$$=s=>document.querySelectorAll(s);

const BRAND='NovaClass You';
function setDocTitle(suffix){document.title=suffix?BRAND+' - '+suffix:BRAND;}
function updateDocTitle(){
  const av=document.getElementById('authView');
  if(!av||!av.classList.contains('hidden')){
    setDocTitle(isRegisterMode?'Регистрация':'Вход');
    return;
  }
  const map={home:'Главная',schedule:'Расписание',homework:'Домашние задания',diary:'Дневник',journal:'Журнал',users:'Пользователи',ministry:'Министерство'};
  setDocTitle(map[currentPage]||'Главная');
}

const ROLES={'Ученик':'student','Модератор':'moderator','Учитель':'teacher','Директор':'director','Администратор':'admin','Создатель':'creator'};
const EDITOR_ROLES=['Учитель','Директор','Администратор','Создатель','Модератор'];
const MONTHS_GEN=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const MONTHS_NOM=['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
const MONTHS_SHORT=['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];
const WEEKDAYS=['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
const WEEKDAYS_SHORT=['ВС','ПН','ВТ','СР','ЧТ','ПТ','СБ'];
const REF_LESSON_NUMS=['1','2','3','4','5','6','7'];
const REF_TIMES=['12:55 - 13:35','13:40 - 14:20','14:30 - 15:10','15:25 - 16:05','16:15 - 16:55','17:00 - 17:40','17:45 - 18:25'];
const REF_SUBJECTS=['Классный час','Казахский язык','Математика','Русский язык','История Казахстана','Физическая культура','Иностранный язык (Английский язык)','Русская литература','Художественный труд','Естествознание','Всемирная история','Музыка','Информация и Искусственный интеллект'];
const REF_TEACHERS=['Күлжиһан Ибтанқыз','Жулдыз Сейдоловна','Елизавета Юрьевна','Камшат Айсиновна','Александра Сергеевна','Лаура Жамбоуловна','Лидия Васильевна','Гульмира Жумагалеевна','Игорь Вячеславович'];
const REF_ROOMS=['308 - Кабинет английского языка','305 - Кабинет математики','214 - Кабинет истории','215 - СпортЗал','307 - Кабинет НВиТП','207 - Кабинет географии'];

const TRANSLATIONS = {
  ru: {
    menu_home: 'Главная', menu_schedule: 'Расписание', menu_homework: 'Домашние задания', menu_diary: 'Дневник', 
    menu_journal: 'Журнал', menu_users: 'Пользователи', menu_ministry: 'Министерство',
    login: 'Вход', register: 'Регистрация', login_label: 'Логин', password_label: 'Пароль', name_label: 'Имя и фамилия', repeat_password: 'Повтор пароля',
    btn_login: 'Войти', btn_register: 'Зарегистрироваться', account: 'Аккаунт', settings: 'Настройки', profile: 'Профиль', app_settings: 'Настройки приложения',
    danger_zone: 'Опасная зона', logout: 'Выйти', delete_account: 'Удалить аккаунт', add: 'Добавить', status: 'Статус', grade_label: 'Оценка (1–10)',
    clear: 'Очистить', save: 'Сохранить', actions: 'Действия', rename: 'Переименовать', delete: 'Удалить', cancel: 'Отмена', add_date: 'Добавить дату',
    date_label: 'Дата', date_format: 'Формат: ДД/ММ/ГГГГ', pick_from_schedule: 'Выбрать из расписания', dates_with_lessons: 'Даты, где есть уроки:',
    ok: 'ОК', confirm: 'Подтверждение', new_lesson: 'Новый урок', date_star: 'Дата *', lesson_num: 'Номер урока', choose_num: 'Выберите номер',
    time_star: 'Время *', choose_time: 'Выберите время', subject_star: 'Предмет *', choose_subject: 'Выберите предмет', teacher_star: 'Учитель *',
    choose_teacher: 'Выберите учителя', room_star: 'Кабинет *', choose_room: 'Выберите кабинет', homework_label: 'Домашнее задание',
    materials: 'Материалы, ссылки и видео', link_video: 'Ссылка / видео', file_200: 'Файл (≤200 МБ)', attach_hint_1: 'YouTube, Google Drive и другие ссылки. Файлы до',
    sor: 'СОР', sor_hint: 'Суммативное за раздел', soch: 'СОЧ', soch_hint: 'Суммативное за четверть', cancel_lesson: 'Отменить урок',
    cancel_lesson_hint: 'Будет красным', click_to_change: 'Нажмите чтобы изменить', change_name: 'Изменить имя', change_email: 'Изменить email',
    change_pass: 'Изменить пароль', close: 'Закрыть', open_profile: 'Открыть профиль', theme: 'Тема оформления', theme_light: 'Светлая', theme_dark: 'Тёмная',
    language: 'Язык', today: 'Сегодня', tomorrow: 'Завтра', yesterday: 'Вчера', no_lessons: 'Расписание уроков отсутствует?', no_lessons_sub: 'Пожалуйста, обратитесь к своему школьному администратору для составления расписания.', 
    no_homework: 'Домашних заданий нет', no_homework_sub: 'Отдыхайте или повторите пройденный материал!',
    no_users: 'Пользователей нет', welcome: 'Добро пожаловать в NovaClass You', welcome_sub: 'Портал для школьного сообщества',
    journal: 'Журнал оценок', ministry: 'Министерство образования', grades_mgmt: 'Управление оценками', stats: 'Статистика', schools: 'Школы', system_status: 'Статус системы', active_users: 'Активные пользователи', total_lessons: 'Всего уроков', avg_grade: 'Средний балл', online: 'Онлайн', database: 'База данных', api: 'API Сервера', stable: 'Стабильно',
    add_school: 'Добавить школу', school_name: 'Название школы', address: 'Адрес', director: 'Директор', students_count: 'Учеников',
    vacations: 'Каникулы', add_vacation: 'Добавить каникулы', vacation_name: 'Название', start_date: 'Начало', end_date: 'Конец', 
    vacation_banner_title: 'Ура, каникулы!', vacation_banner_sub: 'Отдыхайте, набирайтесь сил и хорошо проводите время!', news: 'Новости',
    avg_score: 'Средняя', total_score: 'Общий балл', total: 'Итог', day: 'за день', no_grades: 'нет оценок'
  },
  en: {
    menu_home: 'Home', menu_schedule: 'Schedule', menu_homework: 'Homework', menu_diary: 'Diary', 
    menu_journal: 'Journal', menu_users: 'Users', menu_ministry: 'Ministry',
    login: 'Login', register: 'Register', login_label: 'Login', password_label: 'Password', name_label: 'Full Name', repeat_password: 'Repeat Password',
    btn_login: 'Sign In', btn_register: 'Create Account', account: 'Account', settings: 'Settings', profile: 'Profile', app_settings: 'App Settings',
    danger_zone: 'Danger Zone', logout: 'Logout', delete_account: 'Delete Account', add: 'Add', status: 'Status', grade_label: 'Grade (1–10)',
    clear: 'Clear', save: 'Save', actions: 'Actions', rename: 'Rename', delete: 'Delete', cancel: 'Cancel', add_date: 'Add date',
    date_label: 'Date', date_format: 'Format: DD/MM/YYYY', pick_from_schedule: 'Pick from schedule', dates_with_lessons: 'Dates with lessons:',
    ok: 'OK', confirm: 'Confirmation', new_lesson: 'New Lesson', date_star: 'Date *', lesson_num: 'Lesson Number', choose_num: 'Choose number',
    time_star: 'Time *', choose_time: 'Choose time', subject_star: 'Subject *', choose_subject: 'Choose subject', teacher_star: 'Teacher *',
    choose_teacher: 'Choose teacher', room_star: 'Room *', choose_room: 'Choose room', homework_label: 'Homework',
    materials: 'Materials, links and videos', link_video: 'Link / video', file_200: 'File (≤200 MB)', attach_hint_1: 'YouTube, Google Drive and other links. Files up to',
    sor: 'SOR', sor_hint: 'Summative for section', soch: 'SOCH', soch_hint: 'Summative for quarter', cancel_lesson: 'Cancel lesson',
    cancel_lesson_hint: 'Will be red', click_to_change: 'Click to change', change_name: 'Change Name', change_email: 'Change Email',
    change_pass: 'Change Password', close: 'Close', open_profile: 'Open Profile', theme: 'Theme', theme_light: 'Light', theme_dark: 'Dark',
    language: 'Language', today: 'Today', tomorrow: 'Tomorrow', yesterday: 'Yesterday', no_lessons: 'No schedule available?', no_lessons_sub: 'Please contact your school administrator to create a schedule.', 
    no_homework: 'No homework', no_homework_sub: 'Relax or review the material covered!',
    no_users: 'No users', welcome: 'Welcome to NovaClass You', welcome_sub: 'School community portal',
    journal: 'Grades Journal', ministry: 'Ministry of Education', grades_mgmt: 'Grades Management', stats: 'Statistics', schools: 'Schools', system_status: 'System Status', active_users: 'Active Users', total_lessons: 'Total Lessons', avg_grade: 'Average Grade', online: 'Online', database: 'Database', api: 'Server API', stable: 'Stable',
    add_school: 'Add School', school_name: 'School Name', address: 'Address', director: 'Director', students_count: 'Students',
    vacations: 'Vacations', add_vacation: 'Add Vacation', vacation_name: 'Name', start_date: 'Start', end_date: 'End',
    vacation_banner_title: 'Hooray, vacations!', vacation_banner_sub: 'Rest, gain strength and have a good time!', news: 'News',
    avg_score: 'Average', total_score: 'Total Score', total: 'Total', day: 'per day', no_grades: 'no grades'
  },
  kz: {
    menu_home: 'Басты бет', menu_schedule: 'Кесте', menu_homework: 'Үй тапсырмасы', menu_diary: 'Күнделік', 
    menu_journal: 'Журнал', menu_users: 'Қолданушылар', menu_ministry: 'Министрлік',
    login: 'Кіру', register: 'Тіркелу', login_label: 'Логин', password_label: 'Құпия сөз', name_label: 'Аты-жөні', repeat_password: 'Құпия сөзді қайталаңыз',
    btn_login: 'Кіру', btn_register: 'Аккаунт жасау', account: 'Аккаунт', settings: 'Параметрлер', profile: 'Профиль', app_settings: 'Қолданба параметрлері',
    danger_zone: 'Қауіпті аймақ', logout: 'Шығу', delete_account: 'Аккаунтты жою', add: 'Қосу', status: 'Мәртебе', grade_label: 'Баға (1–10)',
    clear: 'Тазалау', save: 'Сақтау', actions: 'Әрекеттер', rename: 'Қайта атау', delete: 'Жою', cancel: 'Бас тарту', add_date: 'Күн қосу',
    date_label: 'Күн', date_format: 'Формат: КК/АА/ЖЖЖЖ', pick_from_schedule: 'Кестеден таңдау', dates_with_lessons: 'Сабақтары бар күндер:',
    ok: 'ОК', confirm: 'Растау', new_lesson: 'Жаңа сабақ', date_star: 'Күн *', lesson_num: 'Сабақ нөмірі', choose_num: 'Нөмірді таңдаңыз',
    time_star: 'Уақыт *', choose_time: 'Уақытты таңдаңыз', subject_star: 'Пән *', choose_subject: 'Пәнді таңдаңыз', teacher_star: 'Мұғалім *',
    choose_teacher: 'Мұғалімді таңдаңыз', room_star: 'Кабинет *', choose_room: 'Кабинетті таңдаңыз', homework_label: 'Үй тапсырмасы',
    materials: 'Материалдар, сілтемелер және бейнелер', link_video: 'Сілтеме / бейне', file_200: 'Файл (≤200 МБ)', attach_hint_1: 'YouTube, Google Drive және басқа сілтемелер. Файлдар',
    sor: 'БЖБ', sor_hint: 'Бөлім бойынша жиынтық', soch: 'ТЖБ', soch_hint: 'Тоқсан бойынша жиынтық', cancel_lesson: 'Сабақты болдырмау',
    cancel_lesson_hint: 'Қызыл түспен белгіленеді', click_to_change: 'Өзгерту үшін басыңыз', change_name: 'Атын өзгерту', change_email: 'Email өзгерту',
    change_pass: 'Құпия сөзді өзгерту', close: 'Жабу', open_profile: 'Профильді ашу', theme: 'Тақырып', theme_light: 'Ашық', theme_dark: 'Күңгірт',
    language: 'Тіл', today: 'Бүгін', tomorrow: 'Ертең', yesterday: 'Кеше', no_lessons: 'Сабақ кестесі жоқ па?', no_lessons_sub: 'Кесте жасау үшін мектеп әкімшілігіне хабарласыңыз.', 
    no_homework: 'Үй тапсырмасы жоқ', no_homework_sub: 'Демалыңыз немесе өткен материалды қайталаңыз!',
    no_users: 'Қолданушылар жоқ', welcome: 'NovaClass You-ға қош келдіңіз', welcome_sub: 'Мектеп қауымдастығының порталы',
    journal: 'Бағалар журналы', ministry: 'Білім министрлігі', grades_mgmt: 'Бағаларды басқару', stats: 'Статистика', schools: 'Мектептер', system_status: 'Жүйе мәртебесі', active_users: 'Белсенді қолданушылар', total_lessons: 'Барлық сабақтар', avg_grade: 'Орташа баға', online: 'Желіде', database: 'Дерекқор', api: 'Сервер API', stable: 'Тұрақты',
    add_school: 'Мектеп қосу', school_name: 'Мектеп атауы', address: 'Мекенжай', director: 'Директор', students_count: 'Оқушылар',
    vacations: 'Демалыс', add_vacation: 'Демалыс қосу', vacation_name: 'Атауы', start_date: 'Басталуы', end_date: 'Аяқталуы',
    vacation_banner_title: 'Ура, демалыс!', vacation_banner_sub: 'Демалыңыз, күш жинаңыз және жақсы уақыт өткізіңіз!', news: 'Жаңалықтар',
    avg_score: 'Орташа', total_score: 'Жалпы балл', total: 'Қорытынды', day: 'күніне', no_grades: 'бағалар жоқ'
  }
};

let currentLang = localStorage.getItem(LANG_KEY) || 'ru';
function T(key) { return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || TRANSLATIONS['ru'][key] || key; }
function getLocalizedMonths() {
  if(currentLang==='en') return {
    gen: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    nom: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    short: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  };
  if(currentLang==='kz') return {
    gen: ['қаңтарында','ақпанында','наурызында','сәуірінде','мамырында','маусымында','шілдесінде','тамызында','қыркүйегінде','қазанында','қарашасында','желтоқсанында'],
    nom: ['Қаңтар','Ақпан','Наурыз','Сәуір','Мамыр','Маусым','Шілде','Тамыз','Қыркүйек','Қазан','Қараша','Желтоқсан'],
    short: ['Қаң','Ақп','Нау','Сәу','Мам','Мау','Шіл','Там','Қыр','Қаз','Қар','Жел']
  };
  return {gen: MONTHS_GEN, nom: MONTHS_NOM, short: MONTHS_SHORT};
}
function getLocalizedWeekdays() {
  if(currentLang==='en') return {full: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], short: ['SUN','MON','TUE','WED','THU','FRI','SAT']};
  if(currentLang==='kz') return {full: ['Жексенбі','Дүйсенбі','Сейсенбі','Сәрсенбі','Бейсенбі','Жұма','Сенбі'], short: ['ЖС','ДС','СС','СР','БС','ЖМ','СБ']};
  return {full: WEEKDAYS, short: WEEKDAYS_SHORT};
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') { if (el.placeholder) el.placeholder = T(key); }
    else el.textContent = T(key);
  });
  if(currentPage && TITLES[currentPage]) $('topbarTitle').textContent = T(TITLES[currentPage]);
  const loginEmail = $('loginEmail');
  if(loginEmail) loginEmail.placeholder = ' ';
  $('offlineTitle').textContent = currentLang === 'en' ? 'No internet connection' : (currentLang === 'kz' ? 'Интернет байланысы жоқ' : 'Нет подключения к интернету');
  $('offlineSub').textContent = currentLang === 'en' ? 'Please check your connection and try again.' : (currentLang === 'kz' ? 'Қосылымды тексеріп, қайталап көріңіз.' : 'Пожалуйста, проверьте ваше соединение и попробуйте снова.');
  rebuildMenu();
}

function ic(name,cls){return '<svg class="ui-icon'+(cls?' '+cls:'')+'"><use href="#'+name+'"></use></svg>';}
function esc(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function showToast(m){let t=$('toast');t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2400);}
function uid(p){return (p||'id')+'_'+Date.now()+'_'+Math.random().toString(36).slice(2,7);}

/* Ripple Effect for all interactive elements */
document.body.addEventListener('click', function(e) {
  const btn = e.target.closest('.m3-btn, .btn, .topbar-add, .btn-save, .btn-clear, .mgmt-tab, .ud-action, .set-tab, .lesson-row, .date-card');
  if(!btn || btn.disabled) return;
  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  
  const bg = getComputedStyle(btn).backgroundColor;
  if(bg.includes('11, 87, 208') || bg.includes('66, 133, 244') || bg.includes('0, 0, 0')) {
      ripple.style.background = 'rgba(255,255,255,0.3)';
  } else {
      ripple.style.background = 'rgba(0,0,0,0.08)';
  }

  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});

/* DIALOGS */
let dialogResolve = null;
function showConfirm(text, titleSuffix) {
  return new Promise(resolve => {
    dialogResolve = resolve;
    $('dialogTitle').textContent = T('confirm');
    $('dialogText').textContent = text;
    $('dialogInputWrap').classList.add('hidden');
    $('customDialog').classList.add('show');
    if (titleSuffix) setDocTitle('Delete - ' + titleSuffix);
  });
}
function showPrompt(text, defVal) {
  return new Promise(resolve => {
    dialogResolve = resolve;
    $('dialogTitle').textContent = currentLang==='en'?'Input data':(currentLang==='kz'?'Деректерді енгізу':'Ввод данных');
    $('dialogText').textContent = text;
    $('dialogInputWrap').classList.remove('hidden');
    $('dialogInput').value = defVal || '';
    $('customDialog').classList.add('show');
    setTimeout(() => $('dialogInput').focus(), 100);
  });
}
$('dialogConfirm').onclick = () => {
  $('customDialog').classList.remove('show');
  if (dialogResolve) { const val = $('dialogInputWrap').classList.contains('hidden') ? true : $('dialogInput').value; dialogResolve(val); dialogResolve = null; }
  updateDocTitle();
};
$('dialogCancel').onclick = () => {
  $('customDialog').classList.remove('show');
  if (dialogResolve) { dialogResolve(false); dialogResolve = null; }
  updateDocTitle();
};
$('dialogClose').onclick = () => {
  $('customDialog').classList.remove('show');
  if (dialogResolve) { dialogResolve(false); dialogResolve = null; }
  updateDocTitle();
};
$('dialogInput').addEventListener('keydown', e => { if (e.key === 'Enter') $('dialogConfirm').click(); });

function isCreatorEmail(email){ return CREATOR_EMAILS.indexOf(String(email||'').toLowerCase()) !== -1; }

function extractLogin(raw){
  let s = String(raw||'').trim().toLowerCase();
  if (!s) return { error: currentLang==='en'?'Enter login':(currentLang==='kz'?'Логинді енгізіңіз':'Введите логин') };
  const at = s.indexOf('@');
  if (at !== -1) {
    if (isCreatorEmail(s)) return { name: s.slice(0, at), email: s };
    const domain = s.slice(at);
    if (domain !== EMAIL_DOMAIN) return { error: 'Только ' + EMAIL_DOMAIN };
    const name = s.slice(0, at);
    if (!/^[a-z0-9._-]{2,32}$/.test(name)) return { error: currentLang==='en'?'Login: 2-32 chars, latin, digits, . _ -':'Логин: 2–32 симв., латиница, цифры, . _ -' };
    return { name, email: s };
  }
  if (!/^[a-z0-9._-]{2,32}$/.test(s)) return { error: currentLang==='en'?'Login: 2-32 chars, latin, digits, . _ -':'Логин: 2–32 симв., латиница, цифры, . _ -' };
  return { name: s, email: s + EMAIL_DOMAIN };
}
function markLoginError(inputId){ const inp = $(inputId); if (!inp) return; inp.classList.add('error'); const wrap = inp.closest('.login-wrap'); if (wrap) wrap.classList.add('error'); }

let _loaderAt = 0, _loaderT = 0;
function showLoader(){_loaderAt = Date.now(); if(_loaderT){clearTimeout(_loaderT); _loaderT = 0;} const l = $('loader'); if(l) l.classList.remove('hidden','fade-out');}
function hideLoader(){
  if(_loaderT) return;
  const elapsed = Date.now() - _loaderAt;
  const remain = Math.max(0, LOADER_MIN_MS - elapsed);
  _loaderT = setTimeout(()=>{ _loaderT = 0; const l = $('loader'); if(l) { l.classList.add('fade-out'); setTimeout(()=>{l.classList.add('hidden'); l.classList.remove('fade-out');}, 350); } }, remain);
}

function loadGrades(){try{const r=localStorage.getItem(GRADES_KEY);return r?JSON.parse(r):{};}catch(e){return{};}}
function saveGrades(g){try{localStorage.setItem(GRADES_KEY,JSON.stringify(g));}catch(e){}}
let gradesStore=loadGrades();
function gradeKey(d,l,e){return d+'::'+String(l)+'::'+(e||'').toLowerCase();}
function getGrade(d,l,e){return gradesStore[gradeKey(d,l,e)]||null;}
function gradeColorClass(g){if(!g)return'';const n=parseInt(g,10);if(n>=1&&n<=4)return'g1';if(n>=5&&n<=6)return'g5';if(n>=7&&n<=8)return'g7';if(n>=9&&n<=10)return'g9';return'';}
function saveSession(u){try{localStorage.setItem(SESSION_KEY,JSON.stringify({user:u,expiresAt:Date.now()+SESSION_MS}));}catch(e){}}
function getSession(){try{const r=localStorage.getItem(SESSION_KEY);if(!r)return null;const d=JSON.parse(r);if(!d||!d.expiresAt)return null;if(Date.now()>=d.expiresAt){localStorage.removeItem(SESSION_KEY);return null;}return d;}catch(e){return null;}}
function clearSession(){try{localStorage.removeItem(SESSION_KEY);}catch(e){}}
function getCurrentUser(){const s=getSession();return s&&s.user?s.user:null;}
function userRole(){const u=getCurrentUser();let r=u&&u.role?u.role:'Ученик';if(!ROLES[r])r='Ученик';return r;}
function canEditSchedule(){return EDITOR_ROLES.indexOf(userRole())!==-1;}
function isAdmin(){const r=userRole();return r==='Администратор'||r==='Создатель';}
function canManageUsers(){return isAdmin();}
function isCreator(){return userRole()==='Создатель'||isCreatorEmail((getCurrentUser()||{}).email);}
let jsonpCounter=0;
function jsonpOnce(params){return new Promise((resolve,reject)=>{const cbName='nc_cb_'+(++jsonpCounter)+'_'+Date.now();let finished=false,script;const cleanup=()=>{try{delete window[cbName];}catch(e){}if(script&&script.parentNode)script.parentNode.removeChild(script);};window[cbName]=function(data){if(finished)return;finished=true;cleanup();resolve(data);};const qs=new URLSearchParams(Object.assign({},params,{callback:cbName})).toString();script=document.createElement('script');script.src=GAS_URL+'?'+qs+'&_='+Date.now();script.onerror=function(){if(finished)return;finished=true;cleanup();reject(new Error('Нет связи'));};document.head.appendChild(script);});}
async function jsonp(params){let lastErr;for(let attempt=0; attempt<3; attempt++){try{return await jsonpOnce(params);}catch(e){lastErr=e;if(attempt<2)await new Promise(r=>setTimeout(r,700));}}throw lastErr||new Error('Ошибка связи');}
function loadCacheJson(key,def){try{const r=localStorage.getItem(key);return r?JSON.parse(r):def;}catch(e){return def;}}
function saveCacheJson(key,val){try{localStorage.setItem(key,JSON.stringify(val));}catch(e){}}
function normDate(v){if(!v)return'';const s=String(v).trim();let m=s.match(/^(\d{4})-(\d{2})-(\d{2})/);if(m)return m[1]+'-'+m[2]+'-'+m[3];m=s.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})/);if(m)return m[3]+'-'+String(m[2]).padStart(2,'0')+'-'+String(m[1]).padStart(2,'0');const d=new Date(s);if(!isNaN(d.getTime()))return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');return s.slice(0,10);}
function isoOfDate(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function todayISO(){return isoOfDate(new Date());}
function mondayOf(d){const x=new Date(d);x.setHours(0,0,0,0);const day=x.getDay();const diff=(day===0?-6:1-day);x.setDate(x.getDate()+diff);return x;}
function currentMonday(){return mondayOf(new Date(selectedDate+'T00:00:00'));}
function initialDate(){const d=new Date();const dow=d.getDay();if(dow===0)d.setDate(d.getDate()-2);if(dow===6)d.setDate(d.getDate()-1);return isoOfDate(d);}
function moveWeek(delta){const d=new Date(selectedDate+'T00:00:00');d.setDate(d.getDate()+delta*7);selectedDate=isoOfDate(d);}
function setDayOfWeek(idx){const mon=currentMonday();mon.setDate(mon.getDate()+idx);selectedDate=isoOfDate(mon);}
function dowIdx(iso){const d=new Date(iso+'T00:00:00');const day=d.getDay();return day===0?0:Math.min(day-1,4);}
function formatRuDate(iso){const d=new Date(iso+'T00:00:00');const loc=getLocalizedMonths();if(currentLang==='en')return d.getDate()+' '+loc.nom[d.getMonth()]+' '+d.getFullYear();if(currentLang==='kz')return d.getFullYear()+' жылғы '+d.getDate()+' '+loc.gen[d.getMonth()];return d.getDate()+' '+loc.gen[d.getMonth()]+' '+d.getFullYear();}
function getRelativeDate(iso){const today=new Date(todayISO());const target=new Date(iso);const diffTime=target-today;const diffDays=Math.round(diffTime/(1000*60*60*24));let prefix='';if(diffDays===0)prefix=T('today');else if(diffDays===1)prefix=T('tomorrow');else if(diffDays===-1)prefix=T('yesterday');const dateStr=formatRuDate(iso);if(prefix)return `<span class="rel">${prefix}</span> ${dateStr}`;return dateStr;}
function filterByDate(lessons,date){return(lessons||[]).filter(l=>normDate(l.date)===date);}
function getLast5SchoolDays(){const arr=[];const d=new Date();while(d.getDay()===0||d.getDay()===6){d.setDate(d.getDate()-1);}for(let i=0;i<5;i++){arr.unshift(isoOfDate(d));d.setDate(d.getDate()-1);while(d.getDay()===0||d.getDay()===6){d.setDate(d.getDate()-1);}}return arr;}
function formatSize(b){if(!b||b<0)return'';const u=['Б','КБ','МБ','ГБ'];let i=0,n=b;while(n>=1024&&i<u.length-1){n/=1024;i++;}return n.toFixed(n<10?1:0)+' '+u[i];}
function normalizeAttachment(a){if(!a||typeof a!=='object')return null;const url=String(a.url||'').trim();if(!url)return null;let t=String(a.type||'link').toLowerCase();if(!['link','file','video'].includes(t))t='link';return{id:String(a.id||('a'+Date.now()+Math.floor(Math.random()*1000))),type:t,title:String(a.title||url.split('/').pop()||'Материал').slice(0,120),url,size:a.size?Number(a.size):0,mime:String(a.mime||'')};}
function normalizeAttachments(arr){if(!Array.isArray(arr))return[];return arr.map(normalizeAttachment).filter(Boolean);}
function detectTypeFromUrl(url){const u=String(url||'').toLowerCase();if(/youtube\.com|youtu\.be|vimeo\.com|rutube\.ru|dailymotion/.test(u))return'video';if(/\.(mp4|webm|mov|avi|mkv|m4v)(\?|$)/.test(u))return'video';return'link';}
function attachIcon(t){if(t==='video')return'icon-play';if(t==='file')return'icon-file';return'icon-link';}
function attachShortUrl(u){const s=String(u||'');return s.length>70?s.slice(0,67)+'...':s;}
function getYouTubeId(u){const m=String(u||'').match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([\w-]{11})/);return m?m[1]:'';}
function getDrivePreview(u){const m=String(u||'').match(/\/file\/d\/([\w-]+)/);if(m)return'https://drive.google.com/file/d/'+m[1]+'/preview';const m2=String(u||'').match(/[?&]id=([\w-]+)/);if(m2&&/drive\.google\.com/.test(u))return'https://drive.google.com/file/d/'+m2[1]+'/preview';return'';}
function uploadToCatbox(file,onProg){return new Promise((res,rej)=>{const xhr=new XMLHttpRequest();xhr.open('POST',CATBOX_URL);const fd=new FormData();fd.append('reqtype','fileupload');fd.append('fileToUpload',file);xhr.upload.onprogress=e=>{if(e.lengthComputable&&onProg)onProg(e.loaded,e.total);};xhr.onload=()=>{const t=String(xhr.responseText||'').trim();if(xhr.status===200&&/^https?:\/\//.test(t))res(t);else rej(new Error('Ошибка загрузки'));};xhr.onerror=()=>rej(new Error('Ошибка сети'));xhr.send(fd);});}
let currentPage='home',selectedDate=initialDate(),animating=false;
let cacheLessons=[],cacheHwStatuses={},editingId=null;
let editingAttachments=[],currentTableDate=null,miniCallback=null,ctxData=null;
let popState={status:'ЕСТЬ',grade:null},popTarget=null;
let manageTab='grades';
let diaryIsLoading=false,diaryData=null,diaryTimer=null,activeDiarySpinner=null;
const prefetched={scheduleByDate:loadCacheJson(LESSONS_CACHE_KEY,{}),hwStatuses:loadCacheJson(HW_CACHE_KEY,null),users:loadCacheJson(USERS_CACHE_KEY,null),schools:loadCacheJson(SCHOOLS_KEY,[]),vacations:loadCacheJson(VACATIONS_KEY,[])};
const inflight=new Map();
async function pushGradeToServer(dateIso,lessonId,email,entry){const u=getCurrentUser();if(!u)return;try{await jsonp({action:'grades_set',requester:u.email,date:dateIso,lessonId:String(lessonId),email,status:entry?entry.status:'ЕСТЬ',grade:(entry&&entry.grade!=null)?entry.grade:''});}catch(e){}}
async function pullGradesFromServer(user){try{const res=await jsonp({action:'grades_get',requester:user.email});if(!res||res.status!=='ok'||!Array.isArray(res.grades))return;gradesStore={};res.grades.forEach(g=>{gradesStore[gradeKey(g.date,g.lessonId,g.email)]={status:g.status,grade:g.grade};});saveGrades(gradesStore);}catch(e){}}
function setGrade(dateIso,lessonId,email,entry){const k=gradeKey(dateIso,lessonId,email);if(!entry||(entry.status==='ЕСТЬ'&&(entry.grade===null||entry.grade===undefined)))delete gradesStore[k];else gradesStore[k]=entry;saveGrades(gradesStore);pushGradeToServer(dateIso,lessonId,email,entry);}
function loadTableCfg(){try{const r=localStorage.getItem(TABLE_KEY);return r?JSON.parse(r):{students:[],columns:[]};}catch(e){return{students:[],columns:[]};}}
function saveTableCfg(c){try{localStorage.setItem(TABLE_KEY,JSON.stringify(c));}catch(e){}}
function getTableCfg(){const cfg=loadTableCfg();if(!cfg.students)cfg.students=[];if(!cfg.columns)cfg.columns=[];const users=(prefetched.users&&prefetched.users.length)?prefetched.users:[];if(users.length){const known=new Set(cfg.students.map(s=>String(s.email).toLowerCase()));users.filter(u=>String(u.role||'').trim()==='Ученик').forEach(u=>{const em=String(u.email).toLowerCase();if(!known.has(em)){cfg.students.push({email:u.email,name:u.name||u.email});known.add(em);}});saveTableCfg(cfg);}if(!cfg.students.length){const me=getCurrentUser();if(me)cfg.students=[{email:me.email,name:me.name||me.email}];}if(!cfg.columns.length)cfg.columns=getLast5SchoolDays();return cfg;}

const I18N=(function(){
  function apply() { document.documentElement.lang = currentLang; document.querySelectorAll('.lang-card').forEach(c => c.classList.toggle('active', c.dataset.lang === currentLang)); applyTranslations(); if (currentPage) refreshCurrentPage(); }
  function set(l) { currentLang = l; try { localStorage.setItem(LANG_KEY, l); } catch(e) {} apply(); showToast(l === 'en' ? 'Language: English' : (l==='kz'?'Тіл: Қазақша':'Язык: Русский')); }
  function init() { apply(); document.querySelectorAll('.lang-card').forEach(c => c.onclick = () => set(c.dataset.lang)); }
  return {apply, set, init};
})();

const Theme=(function(){function apply(mode){document.documentElement.setAttribute('data-theme',mode==='dark'?'dark':'light');try{localStorage.setItem(THEME_KEY,mode);}catch(e){}document.querySelectorAll('.theme-card').forEach(c=>c.classList.toggle('active',c.dataset.theme===mode));}function current(){try{return localStorage.getItem(THEME_KEY)||'light';}catch(e){return'light';}}function init(){apply(current());document.querySelectorAll('.theme-card').forEach(c=>c.onclick=()=>{apply(c.dataset.theme);showToast(currentLang==='en'?'Theme changed':(currentLang==='kz'?'Тақырып өзгертілді':'Тема изменена'));});}return{apply,current,init};})();
function getCustomRefs(){try{const r=localStorage.getItem(CUSTOM_REFS_KEY);if(!r)return{lessonNum:[],time:[],subject:[],teacher:[],room:[]};const o=JSON.parse(r);return{lessonNum:o.lessonNum||[],time:o.time||[],subject:o.subject||[],teacher:o.teacher||[],room:o.room||[]};}catch(e){return{lessonNum:[],time:[],subject:[],teacher:[],room:[]};}}
function saveCustomRefs(o){try{localStorage.setItem(CUSTOM_REFS_KEY,JSON.stringify(o));}catch(e){}}
function normKey(s){return String(s||'').trim().toLowerCase();}
function contains(list,v){const k=normKey(v);return list.some(x=>normKey(x)===k);}
function mergeRefs(base,custom){const s=new Set();const o=[];(base||[]).forEach(v=>{const k=normKey(v);if(!k||s.has(k))return;s.add(k);o.push(v);});(custom||[]).forEach(v=>{const k=normKey(v);if(!k||s.has(k))return;s.add(k);o.push(v);});return o;}
function rememberValue(kind,value){const v=String(value||'').trim();if(!v)return;const refs=getCustomRefs();if(!refs[kind])refs[kind]=[];if(contains(refs[kind],v))return;const baseMap={lessonNum:REF_LESSON_NUMS,time:REF_TIMES,subject:REF_SUBJECTS,teacher:REF_TEACHERS,room:REF_ROOMS};if(baseMap[kind]&&contains(baseMap[kind],v))return;refs[kind].push(v);saveCustomRefs(refs);}

const CustomSelect=(function(){
  function e2(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function init(wrap,options,opts){
    opts=opts||{};const toggle=wrap.querySelector('[data-cs-toggle]');const search=wrap.querySelector('[data-cs-search]');const list=wrap.querySelector('[data-cs-list]');let allOptions=(options||[]).slice();let filtered=allOptions.slice();
    function renderList(){const cur=wrap.dataset.value||'';const q=search?search.value.trim():'';let html='';if(q&&!filtered.some(v=>normKey(v)===normKey(q)))html+=`<div class="cs-option" data-cs-add="1" style="color:var(--p);font-weight:700">+ ${currentLang==='en'?'Add':(currentLang==='kz'?'Қосу':'Добавить')} «${e2(q)}»</div>`;if(!filtered.length&&!q)html+=`<div class="cs-empty">${currentLang==='en'?'Nothing found':(currentLang==='kz'?'Ештеңе табылмады':'Ничего не найдено')}</div>`;else html+=filtered.map(v=>`<div class="cs-option ${v===cur?'selected':''}" data-val="${e2(v)}">${e2(v)}</div>`).join('');list.innerHTML=html;}
    function open(){document.querySelectorAll('.cs-wrap.open').forEach(w=>{if(w!==wrap)w.classList.remove('open');});wrap.classList.add('open');const rect=wrap.getBoundingClientRect();const spaceBelow=window.innerHeight-rect.bottom;if(spaceBelow<320){wrap.classList.add('drop-up');}else{wrap.classList.remove('drop-up');}if(search){search.value='';filtered=allOptions.slice();renderList();setTimeout(()=>search.focus(),40);}}
    function close(){wrap.classList.remove('open');}
    toggle.addEventListener('click',e=>{e.stopPropagation();wrap.classList.contains('open')?close():open();});
    if(search){search.addEventListener('input',()=>{const q=search.value.trim().toLowerCase();filtered=!q?allOptions.slice():allOptions.filter(v=>v.toLowerCase().includes(q));renderList();});search.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();const q=search.value.trim();if(filtered.length)setValue(filtered[0]);else if(q)addAndSelect(q);}else if(e.key==='Escape')close();});}
    list.addEventListener('click',e=>{const a=e.target.closest('[data-cs-add]');if(a){e.stopPropagation();const q=search.value.trim();if(q)addAndSelect(q);return;}const o=e.target.closest('.cs-option[data-val]');if(!o)return;setValue(o.dataset.val);});
    function addAndSelect(v){rememberValue(wrap.dataset.kind,v);if(!allOptions.some(x=>normKey(x)===normKey(v)))allOptions.push(v);filtered=allOptions.slice();setValue(v);}
    function setValue(v){wrap.dataset.value=v;toggle.textContent=v;toggle.classList.remove('placeholder');close();}
    function setSilent(v){wrap.dataset.value=v||'';if(v){toggle.textContent=v;toggle.classList.remove('placeholder');}else{toggle.textContent=opts.placeholder||'Выберите';toggle.classList.add('placeholder');}}
    document.addEventListener('click',e=>{if(!wrap.contains(e.target))close();});renderList();wrap._cs={setValue,setSilent,get value(){return wrap.dataset.value;}};
  }
  return{init};
})();

function initAllSelects(){const r=getCustomRefs();CustomSelect.init($('csLessonNum'),mergeRefs(REF_LESSON_NUMS,r.lessonNum),{placeholder:T('choose_num')});CustomSelect.init($('csTime'),mergeRefs(REF_TIMES,r.time),{placeholder:T('choose_time')});CustomSelect.init($('csSubject'),mergeRefs(REF_SUBJECTS,r.subject),{placeholder:T('choose_subject')});CustomSelect.init($('csTeacher'),mergeRefs(REF_TEACHERS,r.teacher),{placeholder:T('choose_teacher')});CustomSelect.init($('csRoom'),mergeRefs(REF_ROOMS,r.room),{placeholder:T('choose_room')});}
function setSelectValue(id,v){const w=$(id);if(w&&w._cs)w._cs.setSilent(v);}
function getSelectValue(id){const w=$(id);return w?(w.dataset.value||''):'';}
async function fetchSched(date,user,force){if(!force&&prefetched.scheduleByDate[date]!==undefined)return prefetched.scheduleByDate[date];if(inflight.has(date))return inflight.get(date);const p=jsonp({action:'get_sched',requester:user.email,date}).then(res=>{if(res&&res.status==='ok'){const lessons=filterByDate(res.lessons,date).map(l=>Object.assign({},l,{attachments:normalizeAttachments(l.attachments)}));prefetched.scheduleByDate[date]=lessons;saveCacheJson(LESSONS_CACHE_KEY,prefetched.scheduleByDate);return lessons;}if(prefetched.scheduleByDate[date]===undefined){prefetched.scheduleByDate[date]=[];saveCacheJson(LESSONS_CACHE_KEY,prefetched.scheduleByDate);}return prefetched.scheduleByDate[date];}).catch(e=>{if(prefetched.scheduleByDate[date]===undefined)prefetched.scheduleByDate[date]=[];throw e;}).finally(()=>inflight.delete(date));inflight.set(date,p);return p;}
async function prefetchAll(user){if(!user||!user.email)return;const mon=mondayOf(new Date(selectedDate+'T00:00:00'));const dates=[];for(let w=-1;w<=1;w++)for(let i=0;i<5;i++){const d=new Date(mon);d.setDate(mon.getDate()+w*7+i);dates.push(isoOfDate(d));}const jobs=dates.map(date=>fetchSched(date,user,true).catch(()=>{}));jobs.push(jsonp({action:'hw_status',requester:user.email}).then(hr=>{if(hr&&hr.status==='ok'){prefetched.hwStatuses=hr.statuses||{};saveCacheJson(HW_CACHE_KEY,prefetched.hwStatuses);}}).catch(()=>{}));jobs.push(jsonp({action:'users_list',requester:user.email}).then(ur=>{if(ur&&ur.status==='ok'){prefetched.users=ur.users||[];saveCacheJson(USERS_CACHE_KEY,prefetched.users);}}).catch(()=>{}));jobs.push(pullGradesFromServer(user).catch(()=>{}));jobs.push(jsonp({action:'schools_get',requester:user.email}).then(ur=>{if(ur&&ur.status==='ok'){prefetched.schools=ur.schools||[];saveCacheJson(SCHOOLS_KEY,prefetched.schools);}}).catch(()=>{}));jobs.push(jsonp({action:'vacations_get',requester:user.email}).then(ur=>{if(ur&&ur.status==='ok'){prefetched.vacations=ur.vacations||[];saveCacheJson(VACATIONS_KEY,prefetched.vacations);}}).catch(()=>{}));await Promise.all(jobs);}
function prefetchWeek(user,baseDate){if(!user||!user.email)return;const mon=mondayOf(new Date(baseDate+'T00:00:00'));for(let i=0;i<5;i++){const d=new Date(mon);d.setDate(mon.getDate()+i);const iso=isoOfDate(d);if(prefetched.scheduleByDate[iso]===undefined)fetchSched(iso,user,true).catch(()=>{});}}
const Account=(function(){function loadAvatar(){try{return localStorage.getItem(AVATAR_KEY)||'';}catch(e){return'';}}function saveAvatar(u){try{localStorage.setItem(AVATAR_KEY,u);}catch(e){}}function applyAvatar(){const url=loadAvatar();const u=getCurrentUser();const letter=u?(u.name||u.email||'П').charAt(0).toUpperCase():'П';document.querySelectorAll('[data-user-ava]').forEach(el=>{if(url){el.style.backgroundImage=`url(${url})`;el.style.backgroundSize='cover';el.style.backgroundPosition='center';el.textContent='';}else{el.style.backgroundImage='';el.textContent=letter;}});}function handleFile(input){const f=input.files&&input.files[0];if(!f)return;const r=new FileReader();r.onload=e=>{saveAvatar(e.target.result);applyAvatar();showToast(currentLang==='en'?'Photo updated':'Фото обновлено');};r.readAsDataURL(f);input.value='';}function fillFields(){const u=getCurrentUser();if(!u)return;const name=u.name||(u.email?u.email.split('@')[0]:'');['accName','accName2'].forEach(id=>{const el=$(id);if(el)el.value=name;});['accEmail','accEmail2'].forEach(id=>{const el=$(id);if(el)el.value=u.email||'';});applyAvatar();}async function saveProfile(){const u=getCurrentUser();if(!u)return;const nn=($('accName')&&$('accName').value.trim())||u.name||'';let neRaw=($('accEmail')&&$('accEmail').value.trim())||u.email||'';const oe=u.email;if(!nn||!neRaw){showToast(currentLang==='en'?'Fill fields':'Заполните поля');return false;}let ne=String(neRaw).toLowerCase();if(ne.indexOf('@')===-1){ne=ne+EMAIL_DOMAIN;}else if(!isCreatorEmail(ne) && !ne.endsWith(EMAIL_DOMAIN)){showToast('Только '+EMAIL_DOMAIN);return false;}try{const res=await jsonp({action:'update_profile',requester:oe,oldEmail:oe,email:ne,name:nn});if(!res||res.status!=='ok')throw new Error((res&&res.message)||'Profile update failed');}catch(e){showToast(currentLang==='en'?'Profile update failed':'\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0441\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u043f\u0440\u043e\u0444\u0438\u043b\u044c');return false;}u.name=nn;u.email=ne;saveSession(u);applyUserToUI();fillFields();showToast(currentLang==='en'?'Profile saved':'Профиль сохранён');$('accountModal').classList.remove('show');updateDocTitle();return true;}async function changePassword(){const u=getCurrentUser();if(!u)return;const np=await showPrompt(currentLang==='en'?'New password (min 6):':'Новый пароль (мин. 6):');if(!np||np.length<6){showToast(currentLang==='en'?'Too short':'Слишком короткий');return;}const np2=await showPrompt(currentLang==='en'?'Repeat password:':'Повторите пароль:');if(np!==np2){showToast(currentLang==='en'?'Passwords do not match':'Не совпадают');return;}try{const res=await jsonp({action:'update_password',requester:u.email,email:u.email,pass:np});if(!res||res.status!=='ok')throw new Error((res&&res.message)||'Password update failed');}catch(e){showToast(currentLang==='en'?'Password update failed':'\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u043f\u0430\u0440\u043e\u043b\u044c');return;}u.pass=np;saveSession(u);showToast(currentLang==='en'?'Password changed':'Пароль изменён');}function init(){(['accAvatarInput','accAvatarInput2']).forEach(id=>{const inp=$(id);if(inp)inp.onchange=()=>handleFile(inp);});const cn=$('accChangeName');if(cn)cn.onclick=()=>{const i=$('accName');i.disabled=false;i.focus();};const ce=$('accChangeEmail');if(ce)ce.onclick=()=>{const i=$('accEmail');i.disabled=false;i.focus();};const cp=$('accChangePass');if(cp)cp.onclick=changePassword;fillFields();}return{init,applyAvatar,fillFields,loadAvatar,saveProfile};})();

const UserMenu=(function(){
  function close(){$('userDropdown').classList.remove('open');}
  function toggle(){$('userDropdown').classList.contains('open')?close():$('userDropdown').classList.add('open');}
  function init(){
    const chip=$('userChip');if(chip)chip.onclick=e=>{e.stopPropagation();toggle();};
    document.querySelectorAll('.ud-tab').forEach(tab=>{tab.onclick=()=>{const k=tab.dataset.udTab;document.querySelectorAll('.ud-tab').forEach(t=>t.classList.toggle('active',t===tab));$('udTabs').dataset.active=k;document.querySelectorAll('.ud-pane').forEach(p=>p.classList.toggle('active',p.dataset.udPane===k));};});
    document.querySelectorAll('[data-open-account]').forEach(b=>b.onclick=e=>{
        e.stopPropagation();close();
        const isSettingsOpen=$('settingsModal').classList.contains('show');
        Account.fillFields();
        if(isSettingsOpen){
            if(window.innerWidth>640){
                $('settingsModalInner').classList.add('modal-slide-right');
                setTimeout(()=>{ $('settingsModal').classList.remove('show'); $('settingsModalInner').classList.remove('modal-slide-right'); $('accountModal').classList.add('show'); $('accountModalInner').classList.add('modal-slide-left'); setTimeout(()=>{$('accountModalInner').classList.remove('modal-slide-left');},350); },300);
            } else { $('settingsModal').classList.remove('show'); $('accountModal').classList.add('show'); }
        } else { $('accountModal').classList.add('show'); }
        setDocTitle('Account');
    });
    document.querySelectorAll('[data-open-settings]').forEach(b=>b.onclick=e=>{e.stopPropagation();close();Account.fillFields();$('settingsModal').classList.add('show');setDocTitle('Settings');});
    const ac=$('accModalClose');if(ac)ac.onclick=()=>{$('accountModal').classList.remove('show');updateDocTitle();};
    const acc=$('accClose');if(acc)acc.onclick=()=>{$('accountModal').classList.remove('show');updateDocTitle();};
    const sc=$('setModalClose');if(sc)sc.onclick=()=>{$('settingsModal').classList.remove('show');updateDocTitle();};
    $('accountModal').onclick=e=>{if(e.target===$('accountModal')){$('accountModal').classList.remove('show');updateDocTitle();}};
    $('settingsModal').onclick=e=>{if(e.target===$('settingsModal')){$('settingsModal').classList.remove('show');updateDocTitle();}};
    document.querySelectorAll('.set-tab').forEach(tab=>{tab.onclick=()=>{const k=tab.dataset.setTab;document.querySelectorAll('.set-tab').forEach(t=>t.classList.toggle('active',t===tab));document.querySelectorAll('.set-pane').forEach(p=>p.classList.toggle('active',p.dataset.setPane===k));};});
    document.querySelectorAll('[data-delete-account]').forEach(b=>b.onclick=async()=>{
        const ok=await showConfirm(currentLang==='en'?'Delete account? This cannot be undone.':'Удалить аккаунт? Это действие необратимо.','Account');
        if(!ok)return;
        clearSession();try{localStorage.removeItem(AVATAR_KEY);}catch(e){}showToast(currentLang==='en'?'Account deleted':'Аккаунт удалён');setTimeout(()=>location.reload(),3500);
    });
    document.addEventListener('click',e=>{if(!$('userMenuWrap').contains(e.target))close();});
    const burger=$('burgerBtn'),sb=$('sidebar'),bd=$('mobileSbBackdrop'),topbar=$('topbar'),mobileBottom=$('mobileBottom');
    function hideBars(){topbar.classList.add('bar-hidden');if(mobileBottom)mobileBottom.classList.add('bar-hidden');}
    function showBars(){topbar.classList.remove('bar-hidden');if(mobileBottom)mobileBottom.classList.remove('bar-hidden');}
    function closeSb(){sb.classList.remove('open');burger.classList.remove('open');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label',currentLang==='en'?'Open menu':'Открыть меню');bd.classList.remove('open');showBars();}
    burger.onclick=()=>{const opening=!sb.classList.contains('open');sb.classList.toggle('open',opening);burger.classList.toggle('open',opening);burger.setAttribute('aria-expanded',String(opening));burger.setAttribute('aria-label',opening?(currentLang==='en'?'Close menu':'Закрыть меню'):(currentLang==='en'?'Open menu':'Открыть меню'));bd.classList.toggle('open',opening);if(opening)hideBars();else showBars();};
    bd.onclick=closeSb;
    document.addEventListener('click',e=>{const mi=e.target.closest('.menu-item');if(mi&&window.innerWidth<=640)closeSb();});
  }
  return{init};
})();

/* AUTH LOGIC & MORPHING BUTTONS */
let isRegisterMode=false;
const pageTitle=$('pageTitle');
const formsWrap=$('formsWrap');
const track=$('track');
const loginEmail=$('loginEmail');
const loginPass=$('loginPass');
const regName=$('regName');
const regEmail=$('regEmail');
const regPass=$('regPass');
const regPass2=$('regPass2');

const bottomButtons=$('bottomButtons');
const loginBtn=$('loginBtn');
const btnRegister=$('btnRegister');

function checkFields() {
  document.querySelectorAll('.m3-field').forEach(field => {
    const input = field.querySelector('input');
    if (!input) return;
    if (input.value.trim() !== '') field.classList.add('has-value');
    else field.classList.remove('has-value');
  });
}

function checkMergeState() {
  let isValid = false;
  if (!isRegisterMode) {
    isValid = loginEmail.value.trim().length > 0 && loginPass.value.trim().length > 0;
  } else {
    isValid = regName.value.trim().length > 0 && 
              regEmail.value.trim().length > 0 && 
              regPass.value.trim().length > 0 && 
              regPass2.value.trim().length > 0;
  }

  if (isValid) {
    bottomButtons.classList.add('merged');
    if (!isRegisterMode) {
      loginBtn.classList.add('active');
      btnRegister.classList.remove('active');
      loginBtn.querySelector('.btn-text').textContent = 'Войти';
    } else {
      btnRegister.classList.add('active');
      loginBtn.classList.remove('active');
      btnRegister.querySelector('.btn-text').textContent = 'Зарегистрироваться';
    }
  } else {
    bottomButtons.classList.remove('merged');
    loginBtn.classList.remove('active');
    btnRegister.classList.remove('active');
    loginBtn.querySelector('.btn-text').textContent = 'Вход';
    btnRegister.querySelector('.btn-text').textContent = 'Регистрация';
  }
}

[loginEmail,loginPass,regName,regEmail,regPass,regPass2].forEach(input => {
  if(!input) return;
  input.addEventListener('input', () => {
    checkFields();
    hideErr();
    document.querySelectorAll('.m3-field').forEach(f => f.classList.remove('error'));
    checkMergeState();
  });
});

function fitFormHeight() {
  const pane = document.querySelector('.slide-pane[data-pane="' + (isRegisterMode ? 'reg' : 'login') + '"]');
  if (pane) formsWrap.style.height = pane.scrollHeight + 'px';
}
window.addEventListener('resize', fitFormHeight);

loginBtn.addEventListener('click', () => {
  if (bottomButtons.classList.contains('merged')) {
    doLogin();
  } else {
    isRegisterMode = false;
    pageTitle.textContent = 'Вход • Login';
    updateDocTitle();
    animateTitle();
    track.dataset.active = 'login';
    fitFormHeight();
    hideErr();
    checkMergeState();
  }
});

btnRegister.addEventListener('click', () => {
  if (bottomButtons.classList.contains('merged')) {
    doRegister();
  } else {
    isRegisterMode = true;
    pageTitle.textContent = 'Регистрация • Register';
    updateDocTitle();
    animateTitle();
    track.dataset.active = 'reg';
    fitFormHeight();
    hideErr();
    checkMergeState();
  }
});

function animateTitle() {
  pageTitle.style.animation = 'none';
  void pageTitle.offsetWidth;
  pageTitle.style.animation = 'fadeUp 0.4s var(--ease-standard) both';
}

function showErr(m){
  const b=$('errBox');
  if(!b)return;
  b.textContent=m;
  b.classList.add('show');
  fitFormHeight();
}
function hideErr(){$('errBox')?.classList.remove('show');}

function markEmpty(arr){
  let any=false;
  arr.forEach(i=>{
    if(!i.value.trim()){
      i.classList.add('error');
      const w=i.closest('.m3-field');
      if(w)w.classList.add('error');
      any=true;
    }
  });
  return any;
}

document.querySelectorAll('.pass-toggle').forEach(btn=>btn.addEventListener('click',()=>{
  const inp=document.getElementById(btn.dataset.target);
  if(!inp)return;
  const s=inp.type==='password';
  inp.type=s?'text':'password';
}));
function togglePass(inputId) {
  const input = document.getElementById(inputId);
  if(!input) return;
  const btn = input.parentElement && input.parentElement.querySelector('.pass-icon');
  if (input.type === 'password') {
    input.type = 'text';
    if(btn) btn.textContent = 'visibility';
  } else {
    input.type = 'password';
    if(btn) btn.textContent = 'visibility_off';
  }
}

async function doLogin(){
  hideErr();
  if(markEmpty([$('loginEmail'),$('loginPass')])){showErr(currentLang==='en'?'Enter data':'Введите данные');return;}
  const parsed=extractLogin($('loginEmail').value);
  if(parsed.error){showErr(parsed.error);markLoginError('loginEmail');return;}
  $('loginBtn').disabled=true;
  const email=parsed.email;const pass=$('loginPass').value;
  try{
    showLoader();
    const res=await jsonp({action:'login',email,pass});
    if(!res){hideLoader();showErr(currentLang==='en'?'Empty response':'Пустой ответ');return;}
    if(res.status!=='ok'){hideLoader();showErr(res.message||'Ошибка входа');return;}
    const u=res.user||{};
    if(!u.name)u.name=u.email?u.email.split('@')[0]:'Пользователь';
    if(!u.role||!ROLES[u.role])u.role='Ученик';
    if(!u.email||u.email.indexOf('@')===-1)u.email=email;
    if(isCreatorEmail(u.email))u.role='Создатель';
    u.pass=pass;saveSession(u);hideLoader();await enterApp();
    prefetchAll(u).then(()=>{if(['schedule','homework','diary','users','journal','ministry'].includes(currentPage))refreshCurrentPage();});
  }catch(e){hideLoader();showErr('Ошибка: '+e.message);}
  finally{$('loginBtn').disabled=false;}
}
async function doRegister(){
  hideErr();
  if(markEmpty([$('regName'),$('regEmail'),$('regPass'),$('regPass2')])){showErr(currentLang==='en'?'Enter data':'Введите данные');return;}
  const parsed=extractLogin($('regEmail').value);
  if(parsed.error){showErr(parsed.error);markLoginError('regEmail');return;}
  const p1=$('regPass').value,p2=$('regPass2').value;
  if(p1.length<6){showErr(currentLang==='en'?'Password min 6 chars':'Пароль минимум 6 символов');return;}
  if(p1!==p2){showErr(currentLang==='en'?'Passwords do not match':'Пароли не совпадают');return;}
  $('btnRegister').disabled=true;
  const email=parsed.email;const name=$('regName').value.trim();
  try{
    showLoader();
    const res=await jsonp({action:'register',email,pass:p1,name});
    if(!res){hideLoader();showErr(currentLang==='en'?'Empty response':'Пустой ответ');return;}
    if(res.status!=='ok'){hideLoader();showErr(res.message||'Ошибка');return;}
    const u=res.user||{};
    if(!u.name)u.name=name;
    if(!u.role||!ROLES[u.role])u.role='Ученик';
    if(!u.email||u.email.indexOf('@')===-1)u.email=email;
    if(isCreatorEmail(u.email))u.role='Создатель';
    u.pass=p1;saveSession(u);hideLoader();await enterApp();prefetchAll(u);
  }catch(e){hideLoader();showErr('Ошибка: '+e.message);}
  finally{$('btnRegister').disabled=false;}
}

async function enterApp(){
  $('authView').classList.add('hidden');
  $('appView').classList.remove('hidden');
  applyUserToUI();rebuildMenu();renderPage('home');updateDocTitle();
  requestAnimationFrame(()=>{$('appView').classList.add('ready');moveIndicator();});
}
function applyUserToUI(){
  const u=getCurrentUser();let name=currentLang==='en'?'User':'Пользователь',role='Ученик';
  if(u){if(u.name&&u.name.trim())name=u.name.trim();else if(u.email)name=u.email.split('@')[0];role=userRole();}
  const letter=name.charAt(0).toUpperCase()||'П';
  $$('[data-user-ava]').forEach(el=>{if(!Account.loadAvatar())el.textContent=letter;});
  $$('[data-user-name]').forEach(el=>el.textContent=name);
  $$('[data-user-role]').forEach(el=>{el.className='role-badge '+(ROLES[role]||'student');el.textContent=role;});
  Account.applyAvatar();updateTopbarAdd();
}
function updateTopbarAdd(){const b=$('topbarAddBtn');if(!b)return;const show=(currentPage==='schedule'&&canEditSchedule());b.classList.toggle('hidden',!show);b.innerHTML=ic('icon-plus','sm')+' <span class="txt">'+T('add')+'</span>';}

function rebuildMenu() {
  const mb=$('menuBox'),mB=$('mobileBottom');
  if(!mb||!mB)return;
  const role=userRole();
  let html=`<div class="menu-indicator" id="menuIndicator"></div>`;
  let mHtml='';
  const addMenuItem=(page,icon,key)=>{
    const label=T(key),attrs=`aria-label="${esc(label)}" title="${esc(label)}"`;
    html+=`<button class="menu-item" data-page="${page}" ${attrs}><svg class="ui-icon" aria-hidden="true"><use href="#${icon}"></use></svg><span class="menu-label">${esc(label)}</span></button>`;
    mHtml+=`<button class="mb-item" data-page="${page}" ${attrs}><svg class="ui-icon" aria-hidden="true"><use href="#${icon}"></use></svg></button>`;
  };
  addMenuItem('home','icon-home','menu_home');
  addMenuItem('schedule','icon-calendar','menu_schedule');
  addMenuItem('homework','icon-book-open','menu_homework');
  if(role==='Ученик')addMenuItem('diary','icon-book','menu_diary');
  if(['Учитель','Директор','Администратор','Создатель','Модератор'].includes(role))addMenuItem('journal','icon-chart','menu_journal');
  if(['Администратор','Создатель','Директор'].includes(role))addMenuItem('users','icon-users','menu_users');
  if(role==='Создатель')addMenuItem('ministry','icon-graduation','menu_ministry');
  mb.innerHTML=html;mB.innerHTML=mHtml;
  if(!['home','schedule','homework','diary','journal','users','ministry'].includes(currentPage))currentPage='home';
  $$('.menu-item').forEach(b=>b.classList.toggle('active',b.dataset.page===currentPage));
  $$('.mb-item').forEach(b=>b.classList.toggle('active',b.dataset.page===currentPage));
  moveIndicator();
}
function moveIndicator(){const i=$('menuIndicator'),box=$('menuBox');if(!i||!box)return;const a=box.querySelector('.menu-item.active');if(!a){i.classList.remove('ready');return;}i.style.height=a.offsetHeight+'px';i.style.transform='translateY('+a.offsetTop+'px)';i.classList.add('ready');}
window.addEventListener('resize',()=>setTimeout(moveIndicator,50));

const TITLES={home:'menu_home',schedule:'menu_schedule',homework:'menu_homework',diary:'menu_diary',users:'menu_users',journal:'menu_journal',ministry:'menu_ministry'};
function buildPane(key){const p=document.createElement('div');p.className='page-pane';p.dataset.page=key;p.innerHTML=getPaneHTML(key);return p;}
function getPaneHTML(key){if(key==='home')return homeContentHTML();if(key==='schedule')return scheduleContentHTML(cacheLessons);if(key==='homework')return homeworkContentHTML(cacheLessons,cacheHwStatuses);if(key==='diary')return diaryContentHTML();if(key==='users')return usersContentHTML();if(key==='journal')return journalContentHTML();if(key==='ministry')return ministryContentHTML();return'';}

function createM3Spinner(size, isGrey) {
    const color = isGrey ? 'var(--ol)' : 'var(--p)';
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);svg.setAttribute('height', size);svg.setAttribute('viewBox', '0 0 48 48');svg.style.flex = 'none';
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');path.setAttribute('fill', color);svg.appendChild(path);
    let rafId;const n = Math.PI * 2;const h = [[5,0.14],[9,0.08],[4,0.16],[2,0.22],[12,0.05],[3,0.18],[7,0.12]];
    function p(v,_) { let x = h[v%7]; return Math.cos(x[0]*_)*x[1]+1; }
    function animate(t) {
        let O = t / 1600, pe = Math.floor(O), K = O % 1;K = Math.min(1, K * 3.5); K = K * K * (3 - 2 * K);
        let fn = t / 800, dn = "", ue;const I = 19;
        for (ue = 0; ue < n + 0.005; ue += 0.01) {
            let pn = ((1 - K) * p(pe, ue) + K * p(pe + 1, ue)) / 1.22 * I, ie = ue + fn;
            dn += (ue ? "L" : "M") + (24 + pn * Math.cos(ie)).toFixed(2) + " " + (24 + pn * Math.sin(ie)).toFixed(2);
        }
        path.setAttribute('d', dn + "Z");rafId = requestAnimationFrame(animate);
    }
    rafId = requestAnimationFrame(animate);
    svg.cleanup = () => cancelAnimationFrame(rafId);
    return svg;
}

function renderPage(key){
  const vp=$('pagesViewport');
  $$('.menu-item').forEach(b=>b.classList.toggle('active',b.dataset.page===key));
  $$('.mb-item').forEach(b=>b.classList.toggle('active',b.dataset.page===key));
  moveIndicator();
  $('topbarTitle').textContent=T(TITLES[key]||'menu_home');
  updateDocTitle();
  if(activeDiarySpinner){activeDiarySpinner.cleanup();activeDiarySpinner=null;}
  if(key==='diary'){diaryIsLoading=true;diaryData=null;}
  else{diaryIsLoading=false;if(diaryTimer){clearTimeout(diaryTimer);diaryTimer=null;}}
  if(!vp.firstChild){vp.appendChild(buildPane(key));bindPage(key);currentPage=key;updateTopbarAdd();loadPageData(key);return;}
  if(key===currentPage&&key!=='users')return;
  animating=true;
  const oldPane=vp.querySelector('.page-pane');
  const newPane=buildPane(key);
  vp.appendChild(newPane);bindPage(key);
  if(oldPane)oldPane.remove();
  animating=false;currentPage=key;updateTopbarAdd();loadPageData(key);
}

function bindPage(key){
  if(key==='schedule'||key==='homework')bindWeekPanel();
  if(key==='users'||key==='journal'||key==='ministry')bindUsersPage();
  bindAttachmentOpeners();
  if(key==='diary'&&diaryIsLoading){
      const loaderContainer=document.getElementById('diaryLoaderContainer');
      if(loaderContainer){const data=calcDiaryAverages();const isGrey=data.overall===null;activeDiarySpinner=createM3Spinner(64,isGrey);loaderContainer.appendChild(activeDiarySpinner);}
      if(diaryTimer)clearTimeout(diaryTimer);
      diaryTimer=setTimeout(()=>{
          diaryIsLoading=false;diaryData=calcDiaryAverages();
          const wrapper=document.getElementById('diaryBannerWrapper');
          const blocks=document.getElementById('diaryContentBlocks');
          if(wrapper&&blocks){
              if(diaryData.overall===null){
                  const h=wrapper.offsetHeight;wrapper.style.height=h+'px';wrapper.style.overflow='hidden';wrapper.offsetHeight;
                  wrapper.style.transition='all 0.5s var(--e)';wrapper.style.height='0px';wrapper.style.opacity='0';wrapper.style.transform='translateY(-30px)';wrapper.style.marginBottom='0px';
                  blocks.innerHTML=getDiaryBlocksHTML(diaryData);
                  setTimeout(()=>{wrapper.remove();},500);
              } else {
                  wrapper.innerHTML=getDiaryBannerHTML(diaryData,getCurrentUser());
                  wrapper.style.transition='none';wrapper.style.height='auto';wrapper.style.opacity='1';wrapper.style.transform='none';
                  blocks.innerHTML=getDiaryBlocksHTML(diaryData);
              }
          }
      },2000);
  }
}
function refreshCurrentPage(){const pane=document.querySelector('.page-pane[data-page="'+currentPage+'"]');if(!pane)return;pane.innerHTML=getPaneHTML(currentPage);bindPage(currentPage);}
async function loadPageData(key){
  const user=getCurrentUser();if(!user)return;
  if(key==='schedule'||key==='homework'){
    const hasCache=prefetched.scheduleByDate[selectedDate]!==undefined;
    if(hasCache){cacheLessons=prefetched.scheduleByDate[selectedDate];if(key==='homework'&&prefetched.hwStatuses)cacheHwStatuses=prefetched.hwStatuses;if(currentPage===key)refreshCurrentPage();}
    prefetchWeek(user,selectedDate);
    try{const fresh=await fetchSched(selectedDate,user,true);cacheLessons=fresh;if(key==='homework'){if(prefetched.hwStatuses)cacheHwStatuses=prefetched.hwStatuses;else{try{const hr=await jsonp({action:'hw_status',requester:user.email});if(hr&&hr.status==='ok'){cacheHwStatuses=hr.statuses||{};prefetched.hwStatuses=cacheHwStatuses;saveCacheJson(HW_CACHE_KEY,cacheHwStatuses);}}catch(e){}}}if(currentPage===key)refreshCurrentPage();}catch(e){if(!hasCache){cacheLessons=[];if(currentPage===key)refreshCurrentPage();}}
    return;
  }
  if(key==='users'||key==='journal'||key==='ministry'){if(prefetched.users&&currentPage===key)refreshCurrentPage();try{const res=await jsonp({action:'users_list',requester:user.email});if(res&&res.status==='ok'){prefetched.users=res.users||[];saveCacheJson(USERS_CACHE_KEY,prefetched.users);}}catch(e){}if(currentTableDate&&prefetched.scheduleByDate[currentTableDate]===undefined){try{await fetchSched(currentTableDate,user,true);}catch(e){}}if(currentPage===key)refreshCurrentPage();}
}
function emptyStateHTML(title,subtitle,icon){return `<div class="empty-state">${ic(icon||'icon-info','lg')}<h2>${esc(title)}</h2>${subtitle?`<p>${esc(subtitle)}</p>`:''}</div>`;}

function homeContentHTML(){
  return `
  <div class="banner">${ic('icon-home')}<div class="banner-title">${T('menu_home')}</div></div>
  <div class="ministry-grid">
    <div class="ministry-card">
      <div class="ministry-title">${ic('icon-megaphone')} ${T('news')}</div>
      <div class="empty-state" style="padding:32px 16px;margin-top:0">
        <h2 style="font-size:18px">${T('welcome')}</h2>
        <p>${T('welcome_sub')}</p>
      </div>
    </div>
    <div class="ministry-card">
      <div class="ministry-title">${ic('icon-info')} ${T('today')}</div>
      <div style="font-size:15px;font-weight:600;color:var(--onv);line-height:1.6;overflow-wrap:break-word">
        ${getRelativeDate(todayISO())}
      </div>
    </div>
  </div>`;
}
function isVacation(iso){return (prefetched.vacations||[]).some(v=>iso>=v.start&&iso<=v.end);}
function scheduleContentHTML(lessons){
  let list;
  if(isVacation(selectedDate)){
    list=`<div class="empty-state" style="background:#1E8E3E; color:white; border:none;">${ic('icon-palm','lg')}<h2 style="color:white">${T('vacation_banner_title')}</h2><p style="color:rgba(255,255,255,0.9)">${T('vacation_banner_sub')}</p></div>`;
  } else if(!lessons||!lessons.length){
    const svgIllustration=`<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" rx="24" fill="#F8F9FA"/><circle cx="200" cy="140" r="60" fill="#F1F3F4"/><path d="M170 120H230M170 140H210M170 160H190" stroke="#BDC1C6" stroke-width="8" stroke-linecap="round"/><circle cx="280" cy="80" r="16" fill="#DADCE0"/><circle cx="120" cy="200" r="24" fill="#DADCE0"/><path d="M280 180L320 220" stroke="#DADCE0" stroke-width="6" stroke-linecap="round"/></svg>`;
    list=`<div class="empty-state">${svgIllustration}<h2>${T('no_lessons')}</h2><p>${T('no_lessons_sub')}</p></div>`;
  } else { list='<div class="lessons-list">'+lessons.map((l,i)=>lessonRowHTML(l,'schedule',null,i)).join('')+'</div>'; }
  return weekPanelHTML()+list;
}
function homeworkContentHTML(lessons,hwStatuses){
  const withHw=(lessons||[]).filter(l=>l.homework&&l.homework.trim());
  let list;
  if(!withHw.length){
    const svgIllustration=`<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" rx="24" fill="#F8F9FA"/><path d="M140 80H260V220H140V80Z" fill="#F1F3F4" rx="8"/><path d="M160 110H240M160 140H220M160 170H200" stroke="#BDC1C6" stroke-width="6" stroke-linecap="round"/><circle cx="260" cy="220" r="20" fill="#1E8E3E"/><path d="M252 220L258 226L268 216" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    list=`<div class="empty-state">${svgIllustration}<h2>${T('no_homework')}</h2><p>${T('no_homework_sub')}</p></div>`;
  } else { list='<div class="lessons-list">'+withHw.map((l,i)=>lessonRowHTML(l,'homework',hwStatuses,i)).join('')+'</div>'; }
  return weekPanelHTML()+list;
}
function lessonRowHTML(l,mode,hwStatuses,i){
  const cls=[];if(l.cancelled)cls.push('cancelled');
  const meta=[];if(l.time)meta.push(`<span class="meta-item">${ic('icon-clock','sm')}<span>${esc(l.time)}</span></span>`);if(l.room)meta.push(`<span class="meta-item">${ic('icon-location','sm')}<span>${esc(l.room)}</span></span>`);if(l.teacher)meta.push(`<span class="meta-item">${ic('icon-user','sm')}<b class="flex-truncate">${esc(l.teacher)}</b></span>`);
  const badges=[];if(l.sor)badges.push(`<span class="sor-badge" style="display:inline-block;padding:4px 12px;border-radius:100px;font-size:11px;font-weight:800;background:var(--pc);color:var(--onpc);text-transform:uppercase;letter-spacing:.4px;margin-left:6px">${T('sor')}</span>`);if(l.soch)badges.push(`<span class="soch-badge" style="display:inline-block;padding:4px 12px;border-radius:100px;font-size:11px;font-weight:800;background:#FEF3C7;color:#92400E;text-transform:uppercase;letter-spacing:.4px;margin-left:6px">${T('soch')}</span>`);if(l.cancelled)badges.push(`<span class="role-badge admin" style="margin-left:8px">${currentLang==='en'?'CANCELLED':(currentLang==='kz'?'БОЛДЫРЫЛМАДЫ':'ОТМЕНЁН')}</span>`);
  const dateIso=normDate(l.date);const user=getCurrentUser();const email=user?user.email:'';const entry=getGrade(dateIso,l.id,email);
  let chip='';if(mode==='schedule'){let t='—',c='lesson-grade-chip';if(entry&&entry.status==='Н'){t='Н';c+=' filled g1';}else if(entry&&typeof entry.grade==='number'){t=entry.grade;c+=' filled '+gradeColorClass(entry.grade);}chip=`<div class="${c}">${t}</div>`;}
  const hwIcon=l.homework?`<div style="margin-top:12px;font-size:14px;color:var(--on);display:flex;align-items:flex-start;gap:8px;font-weight:600"><span style="flex-shrink:0">${ic('icon-book-open','sm')}</span><span style="overflow-wrap:break-word;word-break:break-word">${esc(l.homework)}</span></div>`:'';
  const atts=normalizeAttachments(l.attachments);
  const attHtml=atts.length?`<div class="lesson-atts">${atts.map(a=>{const c2=a.type==='video'?'video':(a.type==='file'?'file':'');return`<a class="lesson-att-chip ${c2}" href="${esc(a.url)}" target="_blank" rel="noopener" data-att-url="${esc(a.url)}" data-att-type="${esc(a.type)}" data-att-title="${esc(a.title)}">${ic(attachIcon(a.type),'sm')}<span>${esc(a.title)}</span></a>`;}).join('')}</div>`:'';
  let actionHtml='';if(mode==='schedule'&&canEditSchedule()){actionHtml=`<button class="btn-icon" onclick="editLesson('${esc(l.id)}')">${ic('icon-edit','sm')}</button><button class="btn-icon danger" onclick="deleteLesson('${esc(l.id)}')">${ic('icon-trash','sm')}</button>`;} else if(mode==='homework'){const done=!!(hwStatuses&&hwStatuses[l.id]);actionHtml=`<div class="hw-checkbox ${done?'on':''}" data-hw="${esc(l.id)}" data-done="${done?'1':'0'}"><svg viewBox="0 0 24 24"><polyline points="5 13 10 18 19 7"/></svg></div>`;}
  return `<div class="lesson-row ${cls.join(' ')}"><div class="lesson-num">${esc(l.lessonNum||'—')}</div><div class="lesson-info"><div class="lesson-subject">${esc(l.subject||'')}${badges.join('')}</div><div class="lesson-meta">${meta.join('')}</div>${hwIcon}${attHtml}</div>${chip}<div class="lesson-action">${actionHtml}</div></div>`;
}
function weekPanelHTML(){
  const mon=currentMonday();const ai=dowIdx(selectedDate);const ti=todayISO();
  const locW = getLocalizedWeekdays();
  const dnFull = [locW.full[1], locW.full[2], locW.full[3], locW.full[4], locW.full[5]];
  const dnShort = [locW.short[1], locW.short[2], locW.short[3], locW.short[4], locW.short[5]];
  const days=[];
  for(let i=0;i<5;i++){const d=new Date(mon);d.setDate(mon.getDate()+i);const iso=isoOfDate(d);days.push(`<button class="wp-day ${i===ai?'active':''} ${iso===ti?'today':''}" data-day="${i}"><span class="wp-day-name"><span class="day-full">${dnFull[i]}</span><span class="day-short">${dnShort[i]}</span></span></button>`);}
  return `<div class="schedule-tabs-container"><div class="wp-head"><div class="wp-title" id="wpTitle">${ic('icon-calendar','sm')}<span>${getLocalizedMonths().nom[mon.getMonth()].toUpperCase()+' '+mon.getFullYear()}</span></div></div><div class="wp-body"><button class="wp-arrow" id="wpPrev" type="button">‹</button><div class="wp-days">${days.join('')}</div><button class="wp-arrow" id="wpNext" type="button">›</button></div></div><div class="schedule-content-area"><div class="wp-date-info">${getRelativeDate(selectedDate)}</div>`;
}
function bindWeekPanel(){const prev=$('wpPrev'),next=$('wpNext');if(prev)prev.onclick=()=>{moveWeek(-1);loadPageData(currentPage);};if(next)next.onclick=()=>{moveWeek(1);loadPageData(currentPage);};document.querySelectorAll('.wp-day').forEach(b=>{b.onclick=()=>{setDayOfWeek(parseInt(b.dataset.day,10));loadPageData(currentPage);};});}
function bindHwCheckboxes(){document.querySelectorAll('.hw-checkbox').forEach(cb=>{cb.onclick=async()=>{const id=cb.dataset.hw;const wasDone=cb.dataset.done==='1';const next=!wasDone;cb.dataset.done=next?'1':'0';cb.classList.toggle('on',next);if(!cacheHwStatuses)cacheHwStatuses={};cacheHwStatuses[id]=next;prefetched.hwStatuses=cacheHwStatuses;saveCacheJson(HW_CACHE_KEY,cacheHwStatuses);const u=getCurrentUser();try{await jsonp({action:'set_hw',requester:u.email,lessonId:id,done:next?'true':'false'});}catch(e){}};});}
function bindAttachmentOpeners(){document.querySelectorAll('.lesson-att-chip').forEach(chip=>{chip.onclick=e=>{e.preventDefault();openAttachViewer(chip.dataset.attUrl,chip.dataset.attType,chip.dataset.attTitle);};});}
function openAttachViewer(url,type,title){const m=$('attachViewer'),b=$('attachViewerBody');$('attachViewerTitle').textContent=title||url;$('attachViewerExternal').href=url;b.innerHTML='';const yt=getYouTubeId(url),drive=getDrivePreview(url);if(type==='video'&&yt)b.innerHTML=`<iframe src="https://www.youtube.com/embed/${yt}?autoplay=1" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>`;else if(drive)b.innerHTML=`<iframe src="${drive}" allow="autoplay; fullscreen"></iframe>`;else if(type==='video'&&/\.(mp4|webm|mov|m4v)(\?|$)/i.test(url))b.innerHTML=`<video controls autoplay src="${esc(url)}"></video>`;else if(type==='file'&&/\.(png|jpe?g|gif|webp|svg|bmp)(\?|$)/i.test(url))b.innerHTML=`<img src="${esc(url)}" alt="">`;else if(type==='file'&&/\.pdf(\?|$)/i.test(url))b.innerHTML=`<iframe src="${esc(url)}"></iframe>`;else b.innerHTML=`<div class="av-fallback">${ic('icon-external')}<a href="${esc(url)}" target="_blank" rel="noopener">${currentLang==='en'?'Open in new tab':(currentLang==='kz'?'Жаңа қойындыда ашу':'Открыть в новой вкладке')}</a></div>`;m.classList.add('open');}
$('attachViewerClose').onclick=()=>{$('attachViewer').classList.remove('open');$('attachViewerBody').innerHTML='';};
$('attachViewer').onclick=e=>{if(e.target===$('attachViewer')){$('attachViewer').classList.remove('open');$('attachViewerBody').innerHTML='';}};
function hideInlineForms(){$('attachLinkForm').classList.add('hidden');$('attachFileForm').classList.add('hidden');$('attachAddLink').classList.remove('active');$('attachAddFile').classList.remove('active');}
function resetLinkForm(){$('attachLinkTitle').value='';$('attachLinkUrl').value='';}
function resetFileForm(){$('attachUploadProgress').classList.add('hidden');$('attachProgressFill').style.width='0%';$('attachFilePicker').disabled=false;$('attachFilePicker').classList.remove('has-file');$('attachFilePickerText').textContent=currentLang==='en'?'Choose file (≤200 MB)':'Выбрать файл (≤200 МБ)';$('attachFileTitle').value='';$('attachFileInput').value='';}
$('attachAddLink').onclick=()=>{const h=$('attachLinkForm').classList.contains('hidden');$('attachFileForm').classList.add('hidden');$('attachAddFile').classList.remove('active');if(h){$('attachLinkForm').classList.remove('hidden');$('attachAddLink').classList.add('active');}else{$('attachLinkForm').classList.add('hidden');$('attachAddLink').classList.remove('active');}};
$('attachAddFile').onclick=()=>{const h=$('attachFileForm').classList.contains('hidden');$('attachLinkForm').classList.add('hidden');$('attachAddLink').classList.remove('active');if(h){$('attachFileForm').classList.remove('hidden');$('attachAddFile').classList.add('active');}else{$('attachFileForm').classList.add('hidden');$('attachAddFile').classList.remove('active');}};
$('attachLinkCancel').onclick=()=>{resetLinkForm();hideInlineForms();};
$('attachFileCancel').onclick=()=>{resetFileForm();hideInlineForms();};
$('attachLinkSave').onclick=async()=>{const t=$('attachLinkTitle').value.trim();let u=$('attachLinkUrl').value.trim();if(!u){showToast(currentLang==='en'?'Paste link':'Вставьте ссылку');return;}if(!/^https?:\/\//i.test(u))u='https://'+u;const type=detectTypeFromUrl(u);editingAttachments.push({id:'a'+Date.now(),type,title:t||u.split('/').pop()||'Материал',url:u});renderAttachList();resetLinkForm();hideInlineForms();showToast(currentLang==='en'?'Added':'Добавлено');};
$('attachFilePicker').onclick=()=>$('attachFileInput').click();
$('attachFileInput').onchange=async e=>{const f=e.target.files&&e.target.files[0];if(!f)return;if(f.size>MAX_UPLOAD_MB*1024*1024){showToast(currentLang==='en'?'File >200MB':'Файл >200 МБ');e.target.value='';return;}if(!$('attachFileTitle').value.trim())$('attachFileTitle').value=f.name.replace(/\.[^.]+$/,'');$('attachFilePicker').classList.add('has-file');$('attachFilePickerText').textContent=f.name+' ('+formatSize(f.size)+')';$('attachUploadProgress').classList.remove('hidden');$('attachFilePicker').disabled=true;try{const url=await uploadToCatbox(f,(l,t)=>{const p=Math.round(l/t*100);$('attachProgressFill').style.width=p+'%';$('attachProgressText').textContent=(currentLang==='en'?'Uploading... ':'Загрузка... ')+p+'%';});const type=f.type.startsWith('video/')?'video':'file';const title=$('attachFileTitle').value.trim()||f.name;editingAttachments.push({id:'a'+Date.now(),type,title,url,size:f.size,mime:f.type});renderAttachList();setTimeout(()=>{resetFileForm();hideInlineForms();showToast(currentLang==='en'?'File added':'Файл добавлен');},500);}catch(err){showToast(err.message);resetFileForm();}};
function renderAttachList(){const list=$('attachList');if(!list)return;if(!editingAttachments.length){list.innerHTML='<div class="attach-empty">'+(currentLang==='en'?'No materials':'Материалов пока нет')+'</div>';return;}list.innerHTML=editingAttachments.map((a,idx)=>{const icon=attachIcon(a.type);const size=a.size?formatSize(a.size):'';const meta=attachShortUrl(a.url)+(size?' · '+size:'');return`<div class="attach-item">${ic(icon,'attach-icon')}<div class="attach-info"><div class="attach-title">${esc(a.title)}</div><div class="attach-meta">${esc(meta)}</div></div><a class="attach-open" href="${esc(a.url)}" target="_blank" rel="noopener">${ic('icon-external','sm')}</a><button type="button" class="attach-del" data-attach-del="${idx}">${ic('icon-x-circle','sm')}</button></div>`;}).join('');list.querySelectorAll('[data-attach-del]').forEach(b=>{b.onclick=()=>{const i=parseInt(b.dataset.attachDel,10);editingAttachments.splice(i,1);renderAttachList();};});}
function calcDiaryAverages(){const u=getCurrentUser();if(!u)return{overall:null,days:{}};const email=u.email;const all=[];const days={};getLast5SchoolDays().forEach(iso=>{const ls=prefetched.scheduleByDate[iso]||[];const dg=[];ls.forEach(l=>{const e=getGrade(iso,l.id,email);if(e&&e.status==='ЕСТЬ'&&typeof e.grade==='number'){all.push(e.grade);dg.push(e.grade);}});days[iso]=dg.length?+(dg.reduce((a,b)=>a+b,0)/dg.length).toFixed(1):null;});const overall=all.length?+(all.reduce((a,b)=>a+b,0)/all.length).toFixed(1):null;return{overall,days};}

function diaryContentHTML(){
  const u=getCurrentUser();
  if(!u)return emptyStateHTML(currentLang==='en'?'Sign in':'Войдите в аккаунт','','icon-user');
  if(diaryIsLoading){
      return `<div id="diaryBannerWrapper"><div class="diary-banner" style="background:var(--s1); box-shadow:var(--shadow); display:flex; justify-content:center; align-items:center; min-height:120px; padding:20px; overflow:hidden;"><div id="diaryLoaderContainer" style="width:80px; height:80px; display:flex; align-items:center; justify-content:center;"></div></div></div><div id="diaryContentBlocks"></div>`;
  }
  const data=diaryData||calcDiaryAverages();
  return `<div id="diaryBannerWrapper">${getDiaryBannerHTML(data,u)}</div>`+`<div id="diaryContentBlocks">${getDiaryBlocksHTML(data)}</div>`;
}
function getDiaryBannerHTML(data, u) {
  const {overall}=data;const t100=overall!==null?Math.round(overall*10):0;const circ=2*Math.PI*55;const ratio=overall!==null?Math.min(overall/10,1):0;const fl=(circ*ratio).toFixed(2);
  return `<div class="diary-banner">
      <div class="diary-circle"><svg viewBox="0 0 120 120"><circle class="dc-bg" cx="60" cy="60" r="55" stroke-dasharray="${circ.toFixed(2)} ${circ.toFixed(2)}"/><circle class="dc-fill" cx="60" cy="60" r="55" stroke-dasharray="${fl} ${circ.toFixed(2)}"/></svg><div class="dc-inner"><div class="dc-value">${overall!==null?overall.toFixed(1):'—'}</div><div class="dc-label">${T('avg_score')}</div></div></div>
      <div class="diary-title-wrap"><div class="diary-title">${T('menu_diary')}</div><div class="diary-sub">${esc(u.name||(currentLang==='en'?'Student':'Ученик'))}</div></div>
      <div class="diary-score"><div class="diary-score-value"><span>${t100}</span><span class="sep">/</span><span class="max">100</span></div><div class="diary-score-label">${T('total_score')}</div></div>
  </div>`;
}
function getDiaryBlocksHTML(data) {
  const u=getCurrentUser();if(!u)return'';
  const {days}=data;const email=u.email;const days5=getLast5SchoolDays().slice().reverse();const locW=getLocalizedWeekdays();
  return days5.map(iso=>{
      const ls=prefetched.scheduleByDate[iso]||[];const info=formatRuDate(iso);const wd=locW.short[new Date(iso+'T00:00:00').getDay()];const da=days[iso];
      let lh='';
      if(!ls.length){lh=`<div class="diary-lesson" style="opacity:.6"><div class="diary-lesson-info"><div class="diary-lesson-subject" style="white-space:normal">${T('no_lessons')}</div></div></div>`;}
      else{lh=ls.map(l=>{const e=getGrade(iso,l.id,email);let g='—',gc='diary-grade';if(e&&e.status==='Н'){g='Н';gc+=' filled g1';}else if(e&&typeof e.grade==='number'){g=e.grade;gc+=' filled '+gradeColorClass(e.grade);}return `<div class="diary-lesson"><div class="diary-lesson-info"><div class="diary-lesson-subject">${esc(l.subject||'—')}</div><div class="diary-lesson-meta">${l.teacher?`<span>${ic('icon-user','sm')}<b>${esc(l.teacher)}</b></span>`:''}${l.room?`<span>${ic('icon-location','sm')}<b>${esc(l.room)}</b></span>`:''}</div></div><div class="${gc}">${g}</div></div>`;}).join('');}
      const tot=da!==null?`<div class="day-total"><div class="day-total-label">${T('total')}</div><div class="day-total-value">${da.toFixed(1)}</div><div class="day-total-sub">${T('day')}</div></div>`:`<div class="day-total"><div class="day-total-label">${T('total')}</div><div class="day-total-value empty">—</div><div class="day-total-sub">${T('no_grades')}</div></div>`;
      return `<div class="day-block"><div class="day-head"><div class="day-date">${esc(info)} <span class="day-weekday">${esc(wd)}</span></div></div><div class="day-grid"><div class="lessons-col">${lh}</div>${tot}</div></div>`;
  }).join('');
}

function journalContentHTML() {
  if(!canEditSchedule())return `<div class="banner">${ic('icon-lock')}<div class="banner-title">${currentLang==='en'?'No access':'Нет доступа'}</div></div>`;
  const tabs=[{key:'grades',icon:'icon-chart',label:T('menu_journal')}];
  const tabsHtml=`<div class="mgmt-tabs" id="mgmtTabs">${tabs.map(t=>`<button class="mgmt-tab active" data-mgmt-tab="${t.key}" type="button">${ic(t.icon,'sm')}<span>${t.label}</span></button>`).join('')}</div>`;
  let content=currentTableDate?gradesTableForDateHTML(currentTableDate):gradesDatesHTML();
  return `<div class="banner">${ic('icon-chart')}<div class="banner-title">${T('journal')}</div></div>`+tabsHtml+content;
}

function ministryContentHTML() {
  if(!isCreator())return `<div class="banner">${ic('icon-lock')}<div class="banner-title">${currentLang==='en'?'Creator Only':'Только для Создателя'}</div></div>`;
  const totalUsers=prefetched.users?prefetched.users.length:124;
  const totalLessons=Object.values(prefetched.scheduleByDate).reduce((acc,curr)=>acc+curr.length,0);
  let html=`
  <div class="banner" style="background:var(--on); color:var(--bg)">${ic('icon-graduation')}<div class="banner-title">${T('ministry')}</div></div>
  <div class="ministry-grid">
    <div class="ministry-card"><div class="ministry-title">${ic('icon-chart')} ${T('stats')}</div><div class="stat-row"><div class="stat-box"><div class="stat-val">${totalUsers}</div><div class="stat-label">${T('active_users')}</div></div><div class="stat-box"><div class="stat-val">${totalLessons}</div><div class="stat-label">${T('total_lessons')}</div></div><div class="stat-box"><div class="stat-val">8.4</div><div class="stat-label">${T('avg_grade')}</div></div><div class="stat-box"><div class="stat-val" style="color:#1E8E3E">94%</div><div class="stat-label">${T('online')}</div></div></div></div>
    <div class="ministry-card"><div class="ministry-title">${ic('icon-settings')} ${T('system_status')}</div><div class="ministry-list"><div class="ministry-item"><span>${T('database')}</span><span style="color:#1E8E3E">${T('stable')}</span></div><div class="ministry-item"><span>${T('api')}</span><span style="color:#1E8E3E">${T('stable')}</span></div><div class="ministry-item"><span>Cloud Storage</span><span style="color:#1E8E3E">${T('stable')}</span></div></div></div>
  </div>
  <div class="ministry-card" style="margin-bottom:24px"><div class="ministry-title" style="justify-content:space-between"><div style="display:flex;align-items:center;gap:8px">${ic('icon-sun')} ${T('vacations')}</div><button class="back-btn" id="addVacBtn" style="padding:8px 16px;font-size:12px">${ic('icon-plus','sm')} ${T('add_vacation')}</button></div><div class="vacation-list" id="vacationList">`;
  const vacs=prefetched.vacations||[];
  if(!vacs.length){html+=`<div style="text-align:center;padding:24px;color:var(--onv);font-weight:600">${currentLang==='en'?'No vacations yet':'Каникул пока нет'}</div>`;}
  else{html+=vacs.map((v,idx)=>`<div class="vacation-card"><div class="vacation-icon">${ic('icon-palm')}</div><div class="vacation-info"><div class="vacation-name">${esc(v.name)}</div><div class="vacation-dates">${v.start} — ${v.end}</div></div><button class="vacation-del" onclick="deleteVacation(${idx})">${ic('icon-trash','sm')}</button></div>`).join('');}
  html+=`</div></div><div class="ministry-card"><div class="ministry-title" style="justify-content:space-between"><div style="display:flex;align-items:center;gap:8px">${ic('icon-users')} ${T('schools')}</div><button class="back-btn" id="addSchoolBtn" style="padding:8px 16px;font-size:12px">${ic('icon-plus','sm')} ${T('add_school')}</button></div><div class="school-list" id="schoolList">`;
  const schools=prefetched.schools||[];
  if(!schools.length){html+=`<div style="text-align:center;padding:24px;color:var(--onv);font-weight:600">${currentLang==='en'?'No schools yet':'Школ пока нет'}</div>`;}
  else{html+=schools.map((s,idx)=>`<div class="school-card"><div class="school-icon">${ic('icon-graduation')}</div><div class="school-info"><div class="school-name">${esc(s.name)}</div><div class="school-details"><span>${ic('icon-location','sm')} <b>${esc(s.address||'—')}</b></span><span>${ic('icon-user','sm')} <b>${esc(s.director||'—')}</b></span><span>${ic('icon-users','sm')} <b>${esc(s.students||0)} ${T('students_count')}</b></span></div></div><div class="school-actions"><button class="school-btn" onclick="editSchool(${idx})">${ic('icon-edit','sm')}</button><button class="school-btn danger" onclick="deleteSchool(${idx})">${ic('icon-trash','sm')}</button></div></div>`).join('');}
  html+=`</div></div>`;
  return html;
}

let editingSchoolIdx=-1;
window.editSchool=function(idx){editingSchoolIdx=idx;const s=prefetched.schools[idx];$('schName').value=s.name||'';$('schAddress').value=s.address||'';$('schDirector').value=s.director||'';$('schStudents').value=s.students||'';$('schoolModalTitle').textContent=currentLang==='en'?'Edit School':'Редактировать школу';$('schoolModal').classList.add('show');setDocTitle('Edit - School');};
window.deleteSchool=async function(idx){const ok=await showConfirm(currentLang==='en'?'Delete school?':'Удалить школу?','School');if(!ok)return;prefetched.schools.splice(idx,1);saveCacheJson(SCHOOLS_KEY,prefetched.schools);refreshCurrentPage();showToast(currentLang==='en'?'Deleted':'Удалено');};
function bindSchoolModal(){
  $('schoolModalClose').onclick=()=>{$('schoolModal').classList.remove('show');updateDocTitle();};
  $('schoolModalCancel').onclick=()=>{$('schoolModal').classList.remove('show');updateDocTitle();};
  $('schoolModalSave').onclick=()=>{
    const name=$('schName').value.trim();
    if(!name){showToast(currentLang==='en'?'Enter name':'Введите название');return;}
    const school={name,address:$('schAddress').value.trim(),director:$('schDirector').value.trim(),students:parseInt($('schStudents').value,10)||0};
    if(editingSchoolIdx>=0){prefetched.schools[editingSchoolIdx]=school;}else{prefetched.schools.push(school);}
    saveCacheJson(SCHOOLS_KEY,prefetched.schools);$('schoolModal').classList.remove('show');refreshCurrentPage();updateDocTitle();showToast(currentLang==='en'?'Saved':'Сохранено');
  };
  $('addSchoolBtn').onclick=()=>{editingSchoolIdx=-1;$('schName').value='';$('schAddress').value='';$('schDirector').value='';$('schStudents').value='';$('schoolModalTitle').textContent=currentLang==='en'?'Add School':'Добавить школу';$('schoolModal').classList.add('show');setDocTitle('New - School');};
}
let editingVacationIdx=-1;
window.editVacation=function(idx){editingVacationIdx=idx;const v=prefetched.vacations[idx];$('vacName').value=v.name||'';$('vacStart').value=v.start||'';$('vacEnd').value=v.end||'';$('vacationModalTitle').textContent=currentLang==='en'?'Edit Vacation':'Редактировать каникулы';$('vacationModal').classList.add('show');setDocTitle('Edit - Vacation');};
window.deleteVacation=async function(idx){const ok=await showConfirm(currentLang==='en'?'Delete vacation?':'Удалить каникулы?','Vacation');if(!ok)return;prefetched.vacations.splice(idx,1);saveCacheJson(VACATIONS_KEY,prefetched.vacations);refreshCurrentPage();showToast(currentLang==='en'?'Deleted':'Удалено');};
function bindVacationModal(){
  $('vacationModalClose').onclick=()=>{$('vacationModal').classList.remove('show');updateDocTitle();};
  $('vacationModalCancel').onclick=()=>{$('vacationModal').classList.remove('show');updateDocTitle();};
  $('vacationModalSave').onclick=()=>{
    const name=$('vacName').value.trim();const start=$('vacStart').value;const end=$('vacEnd').value;
    if(!name||!start||!end){showToast(currentLang==='en'?'Fill fields':'Заполните поля');return;}
    if(start>end){showToast(currentLang==='en'?'Invalid dates':'Неверные даты');return;}
    const vac={name,start,end};
    if(editingVacationIdx>=0){prefetched.vacations[editingVacationIdx]=vac;}else{prefetched.vacations.push(vac);}
    saveCacheJson(VACATIONS_KEY,prefetched.vacations);$('vacationModal').classList.remove('show');refreshCurrentPage();updateDocTitle();showToast(currentLang==='en'?'Saved':'Сохранено');
  };
  $('addVacBtn').onclick=()=>{editingVacationIdx=-1;$('vacName').value='';$('vacStart').value='';$('vacEnd').value='';$('vacationModalTitle').textContent=currentLang==='en'?'Add Vacation':'Добавить каникулы';$('vacationModal').classList.add('show');setDocTitle('New - Vacation');};
}

function usersContentHTML(){
  if(!canEditSchedule())return`<div class="banner">${ic('icon-lock')}<div class="banner-title">${currentLang==='en'?'No access':'Нет доступа'}</div></div>`;
  const tabs=[{key:'grades',icon:'icon-chart',label:currentLang==='en'?'Grades':'Оценки'},{key:'users',icon:'icon-users',label:currentLang==='en'?'Users':'Пользователи'}];
  const tabsHtml=`<div class="mgmt-tabs" id="mgmtTabs">${tabs.map(t=>`<button class="mgmt-tab${manageTab===t.key?' active':''}" data-mgmt-tab="${t.key}" type="button">${ic(t.icon,'sm')}<span>${t.label}</span></button>`).join('')}</div>`;
  let content='';
  if(manageTab==='grades'){if(currentTableDate)content=gradesTableForDateHTML(currentTableDate);else content=gradesDatesHTML();}
  else if(manageTab==='users')content=usersListSectionHTML();
  return tabsHtml+content;
}
function gradesDatesHTML(){
  const cfg=getTableCfg();const days=cfg.columns.slice().sort();const ti=todayISO();
  const locM=getLocalizedMonths();const locW=getLocalizedWeekdays();
  const cards=days.map(iso=>{const d=new Date(iso+'T00:00:00');const day=d.getDate();const month=locM.short[d.getMonth()].toUpperCase();const year=d.getFullYear();const wd=locW.short[d.getDay()];let cnt=0;Object.keys(gradesStore).forEach(k=>{if(k.startsWith(iso+'::'))cnt++;});return`<button class="date-card ${iso===ti?'today':''}" data-open-date="${iso}" type="button"><div class="date-card-weekday">${wd}</div><div class="date-card-day">${day}</div><div class="date-card-month">${month}</div><div class="date-card-year">${year}</div><div class="date-card-counter">${ic('icon-chart','sm')}${cnt}</div></button>`;}).join('');
  return`<div class="banner">${ic('icon-chart')}<div class="banner-title">${currentLang==='en'?'Student Grades':'Оценки учеников'}</div><span style="margin-left:auto;font-size:11px;opacity:.9;font-weight:700">${currentLang==='en'?'Select date':'Выберите дату'}</span></div><div class="date-grid" id="dateGrid">${cards}</div><div style="margin-bottom:22px;text-align:center"><button class="back-btn" id="addDateBtn" style="margin:0 auto;display:inline-flex">${ic('icon-plus','sm')} ${T('add_date')}</button></div>`;
}
function usersListSectionHTML(){if(!canManageUsers())return'';const users=prefetched.users||[];const list=users.length?users.map(u=>userRowHTML(u)).join(''):emptyStateHTML(T('no_users'),'','icon-users');return`<div class="banner">${ic('icon-users')}<div class="banner-title">${currentLang==='en'?'User Management':'Управление пользователями'}</div></div><div class="users-list${users.length?' list-group':''}" id="usersList">${list}</div>`;}
function userRowHTML(u){const letter=(u.name||u.email||'?').charAt(0).toUpperCase();const role=ROLES[u.role]?u.role:'Ученик';const isSelf=String(u.email).toLowerCase()===String((getCurrentUser()||{}).email||'').toLowerCase();const isCU=isCreatorEmail(u.email);const opts=Object.keys(ROLES).map(r=>`<option value="${r}" ${r===role?'selected':''} ${isCU&&r!=='Создатель'?'disabled':''}>${r}</option>`).join('');return`<div class="user-row" data-user-email="${esc(u.email)}"><div class="u-ava">${esc(letter)}</div><div class="u-info"><div class="u-name">${esc(u.name||'—')}</div><div class="u-email">${esc(u.email||'')}</div></div><div class="u-role"><select data-role-email="${esc(u.email)}" ${isSelf||isCU?'disabled':''}>${opts}</select></div><button class="u-del" data-del-user="${esc(u.email)}" ${isSelf||isCU?'disabled style="opacity:.35;cursor:not-allowed"':''}>${ic('icon-trash','sm')}</button></div>`;}
function gradesTableForDateHTML(dateIso){
  const cfg=getTableCfg();const students=cfg.students;const dl=formatRuDate(dateIso);const locW=getLocalizedWeekdays();const wd=locW.full[new Date(dateIso+'T00:00:00').getDay()];const lessons=prefetched.scheduleByDate[dateIso]||[];
  const header=`<tr><th class="sticky-col">${currentLang==='en'?'Student Name':'Ф.И. ученика'}</th>${lessons.length?lessons.map(l=>`<th class="lesson-head" data-lesson-head="${esc(l.id)}" title="${esc(l.subject||('Урок '+(l.lessonNum||'')))}">${esc(l.subject||('Урок '+(l.lessonNum||'')))}</th>`).join(''):`<th class="lesson-head" style="opacity:.5">${T('no_lessons')}</th>`}</tr>`;
  const rows=students.map(u=>{const cells=lessons.length?lessons.map(l=>{const e=getGrade(dateIso,l.id,u.email);let t='—',c='cell-btn';if(e&&e.status==='Н'){t='Н';c+=' absent';}else if(e&&typeof e.grade==='number'){t=e.grade;c+=' filled '+gradeColorClass(e.grade);}return`<td><button class="${c}" data-tbl-date="${dateIso}" data-tbl-lesson="${esc(l.id)}" data-tbl-email="${esc(u.email)}" type="button">${t}</button></td>`;}).join(''):`<td><span class="cell-btn not-here">—</span></td>`;return`<tr><td class="name-cell" data-student-email="${esc(u.email)}" title="${esc(u.name)}">${esc(u.name)}</td>${cells}</tr>`;}).join('');
  return`<div class="table-toolbar"><button class="back-btn" id="backToDates">${ic('icon-arrow-left','sm')} ${currentLang==='en'?'Back':'Назад'}</button><div class="table-title">${esc(dl)} · ${esc(wd)}</div></div><div class="table-hint">${ic('icon-info','sm')}<span>${currentLang==='en'?'Right click — actions menu':'ПКМ — меню действий'}</span></div><div class="grades-table-wrap">${lessons.length?`<table class="grades-table"><thead>${header}</thead><tbody>${rows}</tbody></table>`:emptyStateHTML(T('no_lessons'),'','icon-calendar')}</div>`;
}
function bindUsersPage(){
  document.querySelectorAll('[data-mgmt-tab]').forEach(b=>{b.onclick=()=>{manageTab=b.dataset.mgmtTab;refreshCurrentPage();updateTopbarAdd();};});
  if(manageTab==='grades'){
    document.querySelectorAll('[data-open-date]').forEach(card=>{card.onclick=async()=>{currentTableDate=card.dataset.openDate;const u=getCurrentUser();if(u&&prefetched.scheduleByDate[currentTableDate]===undefined){try{await fetchSched(currentTableDate,u,true);}catch(e){}}refreshCurrentPage();};});
    const addDateBtn=$('addDateBtn');if(addDateBtn)addDateBtn.onclick=openDatePicker;
    const backBtn=$('backToDates');if(backBtn)backBtn.onclick=()=>{currentTableDate=null;refreshCurrentPage();};
    document.querySelectorAll('.cell-btn[data-tbl-lesson]').forEach(btn=>{btn.onclick=e=>{e.stopPropagation();openPopover(btn);};btn.addEventListener('contextmenu',e=>{e.preventDefault();showCtxMenu(e.clientX,e.clientY,{type:'cell',date:btn.dataset.tblDate,lesson:btn.dataset.tblLesson,email:btn.dataset.tblEmail});});});
    document.querySelectorAll('.lesson-head[data-lesson-head]').forEach(th=>{th.addEventListener('contextmenu',e=>{e.preventDefault();showCtxMenu(e.clientX,e.clientY,{type:'lesson-head',date:currentTableDate,lesson:th.dataset.lessonHead});});});
    document.querySelectorAll('.name-cell[data-student-email]').forEach(td=>{td.addEventListener('contextmenu',e=>{e.preventDefault();showCtxMenu(e.clientX,e.clientY,{type:'row',email:td.dataset.studentEmail});});});
  }
  if(manageTab==='users'){
    document.querySelectorAll('[data-role-email]').forEach(sel=>{sel.onchange=async()=>{const email=sel.dataset.roleEmail,role=sel.value,me=getCurrentUser();try{const r=await jsonp({action:'set_role',requester:me.email,email,role});if(!r||r.status!=='ok'){showToast(currentLang==='en'?'Error':'Ошибка');refreshCurrentPage();return;}showToast(currentLang==='en'?'Role updated':'Роль обновлена');const pu=(prefetched.users||[]).find(u=>u.email===email);if(pu){pu.role=role;saveCacheJson(USERS_CACHE_KEY,prefetched.users);}}catch(e){showToast(e.message);refreshCurrentPage();}};});
    document.querySelectorAll('[data-del-user]').forEach(btn=>{if(btn.disabled)return;btn.onclick=async()=>{
        const email=btn.dataset.delUser;
        const ok=await showConfirm((currentLang==='en'?'Delete user ':'Удалить пользователя ')+email+'?','User');
        if(!ok)return;
        const me=getCurrentUser();try{const r=await jsonp({action:'delete_user',requester:me.email,email});if(!r||r.status!=='ok'){showToast(currentLang==='en'?'Error':'Ошибка');return;}showToast(currentLang==='en'?'Deleted':'Удалён');prefetched.users=(prefetched.users||[]).filter(u=>u.email!==email);saveCacheJson(USERS_CACHE_KEY,prefetched.users);refreshCurrentPage();}catch(e){showToast(e.message);}
    };});
  }
}
function openDatePicker(){$('dpInput').value='';$('dpPanel').classList.remove('open');$('dpDatesGrid').innerHTML='';$('datePickerModal').classList.add('show');setDocTitle('Add - Date');setTimeout(()=>$('dpInput').focus(),100);}
function closeDatePicker(){$('datePickerModal').classList.remove('show');updateDocTitle();}
$('dpInput').addEventListener('input',e=>{let v=e.target.value.replace(/[^\d]/g,'');if(v.length>8)v=v.slice(0,8);let o='';if(v.length>=1)o=v.slice(0,2);if(v.length>=3)o+='/'+v.slice(2,4);if(v.length>=5)o+='/'+v.slice(4,8);e.target.value=o;});
$('dpPickFromSchedule').onclick=()=>{const panel=$('dpPanel'),grid=$('dpDatesGrid');if(panel.classList.contains('open')){panel.classList.remove('open');return;}const dates=new Set();Object.keys(prefetched.scheduleByDate||{}).forEach(d=>{const arr=prefetched.scheduleByDate[d];if(Array.isArray(arr)&&arr.length)dates.add(d);});const cfg=getTableCfg();(cfg.columns||[]).forEach(d=>dates.add(d));const sorted=Array.from(dates).sort();if(!sorted.length){grid.innerHTML=`<div class="cs-empty">${T('no_lessons')}</div>`;panel.classList.add('open');return;}const locM=getLocalizedMonths();grid.innerHTML=sorted.map(iso=>{const d=new Date(iso+'T00:00:00');return`<button class="dp-date-chip" data-dp-date="${iso}" type="button"><span class="dp-date-chip-day">${d.getDate()}</span><span class="dp-date-chip-month">${locM.short[d.getMonth()]}</span><span class="dp-date-chip-year">${d.getFullYear()}</span></button>`;}).join('');grid.querySelectorAll('[data-dp-date]').forEach(chip=>{chip.onclick=()=>{const iso=chip.dataset.dpDate,d=new Date(iso+'T00:00:00');$('dpInput').value=`${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;grid.querySelectorAll('.dp-date-chip').forEach(c=>c.classList.remove('selected'));chip.classList.add('selected');};});panel.classList.add('open');};
$('dpClose').onclick=closeDatePicker;$('dpCancel').onclick=closeDatePicker;
$('datePickerModal').onclick=e=>{if(e.target===$('datePickerModal'))closeDatePicker();};
$('dpSave').onclick=()=>{const v=$('dpInput').value.trim();if(!v){showToast(currentLang==='en'?'Enter date':'Введите дату');return;}const iso=parseDateDMY(v);if(!iso){showToast(currentLang==='en'?'Invalid date':'Неверная дата');return;}const cfg=getTableCfg();if(cfg.columns.indexOf(iso)===-1){cfg.columns.push(iso);cfg.columns.sort();saveTableCfg(cfg);closeDatePicker();refreshCurrentPage();showToast((currentLang==='en'?'Added: ':'Добавлено: ')+formatRuDate(iso));const u=getCurrentUser();if(u&&prefetched.scheduleByDate[iso]===undefined)fetchSched(iso,u,true).then(()=>{if(currentPage==='users'||currentPage==='journal')refreshCurrentPage();}).catch(()=>{});}else{closeDatePicker();showToast(currentLang==='en'?'Already exists':'Уже есть');}};
function parseDateDMY(str){const s=String(str).trim();let m=s.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/);if(!m)return'';const d=+m[1],mo=+m[2],y=+m[3];if(d<1||d>31||mo<1||mo>12||y<2000)return'';const dt=new Date(y,mo-1,d);if(dt.getDate()!==d||dt.getMonth()!==mo-1)return'';return isoOfDate(dt);}
function showMiniInput(title,label,def,cb){$('miniTitle').textContent=title;$('miniLabel').textContent=label;$('miniInput').value=def||'';miniCallback=cb;$('miniModal').classList.add('show');setTimeout(()=>$('miniInput').focus(),100);}
function closeMini(){$('miniModal').classList.remove('show');miniCallback=null;}
$('miniClose').onclick=closeMini;$('miniCancel').onclick=closeMini;
$('miniModal').onclick=e=>{if(e.target===$('miniModal'))closeMini();};
$('miniSave').onclick=()=>{const v=$('miniInput').value.trim();const cb=miniCallback;closeMini();if(cb)cb(v);};
function showCtxMenu(x,y,data){const menu=$('ctxMenu');ctxData=data;let tt=T('actions');if(data.type==='cell')tt=T('grade_label').split(' ')[0];else if(data.type==='row')tt=currentLang==='en'?'Student':(currentLang==='kz'?'Оқушы':'Ученик');else if(data.type==='lesson-head')tt=currentLang==='en'?'Lesson':(currentLang==='kz'?'Сабақ':'Урок');$('ctxTitle').textContent=tt;menu.querySelectorAll('.ctx-item').forEach(it=>{const act=it.dataset.ctx;let show=false,label='',icon='';if(data.type==='cell'){show=['clear','delete'].includes(act);if(act==='clear'){label=T('clear');icon='icon-trash';}if(act==='delete'){label=currentLang==='en'?'Mark N':'Отметить Н';icon='icon-x-circle';}}else if(data.type==='row'){show=['rename','delete'].includes(act);if(act==='rename'){label=T('rename');icon='icon-edit';}if(act==='delete'){label=T('delete');icon='icon-trash';}}else if(data.type==='lesson-head'){show=['delete'].includes(act);if(act==='delete'){label=currentLang==='en'?'Delete lesson':'Удалить урок';icon='icon-trash';}}it.style.display=show?'':'none';if(show)it.innerHTML=ic(icon,'sm')+' '+label;});menu.classList.add('open');const r=menu.getBoundingClientRect();const vw=window.innerWidth,vh=window.innerHeight;let l=x,t=y;if(l+r.width>vw-10)l=vw-r.width-10;if(t+r.height>vh-10)t=vh-r.height-10;if(l<10)l=10;if(t<10)t=10;menu.style.left=l+'px';menu.style.top=t+'px';}
function hideCtxMenu(){$('ctxMenu').classList.remove('open');ctxData=null;}
document.querySelectorAll('.ctx-item').forEach(it=>{it.onclick=async()=>{
    if(!ctxData)return;
    const act=it.dataset.ctx,d=ctxData;
    hideCtxMenu();
    if(d.type==='cell'){
        if(act==='clear'){setGrade(d.date,d.lesson,d.email,{status:'ЕСТЬ',grade:null});refreshCurrentPage();}
        else if(act==='delete'){setGrade(d.date,d.lesson,d.email,{status:'Н',grade:null});refreshCurrentPage();}
    }else if(d.type==='row'){
        if(act==='rename')renameStudent(d.email);
        else if(act==='delete'){const ok=await showConfirm(currentLang==='en'?'Delete student?':'Удалить ученика?','Student');if(ok)deleteRow(d.email);}
    }else if(d.type==='lesson-head'){
        if(act==='delete'){const ok=await showConfirm(currentLang==='en'?'Delete lesson?':'Удалить урок?','Subject');if(ok)deleteLessonById(d.lesson);}
    }
};});
document.addEventListener('click',e=>{if(!e.target.closest('.ctx-menu'))hideCtxMenu();});
function renameStudent(email){const cfg=getTableCfg();const st=cfg.students.find(s=>s.email===email);if(!st)return;showMiniInput(T('rename'),'Ф.И.',st.name,v=>{if(!v)return;st.name=v;saveTableCfg(cfg);refreshCurrentPage();});}
async function deleteRow(email){const cfg=getTableCfg();cfg.students=cfg.students.filter(s=>s.email!==email);saveTableCfg(cfg);Object.keys(gradesStore).forEach(k=>{if(k.endsWith('::'+String(email).toLowerCase()))delete gradesStore[k];});saveGrades(gradesStore);refreshCurrentPage();}
function deleteLessonById(id){const u=getCurrentUser();const dk=currentTableDate||selectedDate;if(prefetched.scheduleByDate[dk]){prefetched.scheduleByDate[dk]=prefetched.scheduleByDate[dk].filter(x=>String(x.id)!==String(id));saveCacheJson(LESSONS_CACHE_KEY,prefetched.scheduleByDate);}jsonp({action:'del_sched',requester:u.email,role:userRole(),id}).then(()=>refreshCurrentPage()).catch(()=>{});}
function buildGradesGrid(){const g=$('popGrades');const html=[];for(let i=1;i<=10;i++)html.push(`<button class="grade-btn grade-${i}" data-grade="${i}" type="button">${i}</button>`);g.innerHTML=html.join('');g.querySelectorAll('.grade-btn').forEach(b=>{b.onclick=()=>{popState.grade=parseInt(b.dataset.grade,10);updatePopSelection();};});}
function updatePopSelection(){document.querySelectorAll('.grade-btn').forEach(b=>b.classList.toggle('selected',parseInt(b.dataset.grade,10)===popState.grade));document.querySelectorAll('.status-btn').forEach(b=>b.classList.toggle('active',b.dataset.status===popState.status));}
function openPopover(btn){const dateIso=btn.dataset.tblDate,lessonId=btn.dataset.tblLesson,email=btn.dataset.tblEmail||(getCurrentUser()||{}).email||'';if(!dateIso||!lessonId)return;const entry=getGrade(dateIso,lessonId,email)||{status:'ЕСТЬ',grade:null};popState={status:entry.status||'ЕСТЬ',grade:entry.grade};popTarget={dateIso,lessonId,email,btn};const lesson=(prefetched.scheduleByDate[dateIso]||[]).find(l=>String(l.id)===String(lessonId));const subject=lesson?lesson.subject:'—';const me=getCurrentUser();const name=(email===(me&&me.email))?(me.name||'Ученик'):(email||'Ученик');$('popTitle').textContent=name;$('popSub').textContent=subject+' · '+formatRuDate(dateIso);const pop=$('popover');pop.classList.remove('open');pop.style.visibility='hidden';pop.classList.add('open');updatePopSelection();$('popOverlay').classList.add('open');requestAnimationFrame(()=>{positionPopover(btn);pop.style.visibility='';});}
function positionPopover(btn){const pop=$('popover'),br=btn.getBoundingClientRect(),pr=pop.getBoundingClientRect();const vw=window.innerWidth,vh=window.innerHeight,pad=12,gap=12;let top=br.top+window.scrollY,left=br.right+gap+window.scrollX;if(left+pr.width>vw+window.scrollX-pad)left=br.left-pr.width-gap+window.scrollX;if(top+pr.height>vh+window.scrollY-pad)top=br.bottom-pr.height+window.scrollY;if(top<window.scrollY+pad)top=window.scrollY+pad;if(left<window.scrollX+pad)left=window.scrollX+pad;pop.style.top=top+'px';pop.style.left=left+'px';}
function closePopover(){$('popover').classList.remove('open');$('popOverlay').classList.remove('open');popTarget=null;}
$('popClose').onclick=closePopover;$('popOverlay').onclick=closePopover;
document.querySelectorAll('.status-btn').forEach(b=>b.onclick=()=>{popState.status=b.dataset.status;updatePopSelection();});
$('popClear').onclick=()=>{if(!popTarget)return;setGrade(popTarget.dateIso,popTarget.lessonId,popTarget.email,{status:'ЕСТЬ',grade:null});closePopover();refreshCurrentPage();};
$('popSave').onclick=()=>{if(!popTarget)return;const entry={status:popState.status,grade:null};if(popState.status==='ЕСТЬ'&&popState.grade)entry.grade=popState.grade;setGrade(popTarget.dateIso,popTarget.lessonId,popTarget.email,entry);closePopover();refreshCurrentPage();};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closePopover();hideCtxMenu();closeDatePicker();}});

window.openModal=function(lesson){
  if(!canEditSchedule()){showToast(currentLang==='en'?'No rights':'Нет прав');return;}
  editingId=lesson?lesson.id:null;editingAttachments=lesson?normalizeAttachments(lesson.attachments):[];
  $('modalTitle').textContent=lesson?(currentLang==='en'?'Edit':'Редактировать'):T('new_lesson');
  $('mDate').value=lesson?normDate(lesson.date):(currentTableDate||selectedDate);
  setSelectValue('csLessonNum',lesson?String(lesson.lessonNum||''):'');
  setSelectValue('csTime',lesson?lesson.time:'');
  setSelectValue('csSubject',lesson?lesson.subject:'');
  setSelectValue('csTeacher',lesson?lesson.teacher:'');
  setSelectValue('csRoom',lesson?lesson.room:'');
  $('mHomework').value=lesson?lesson.homework:'';
  $('mSor').checked=lesson?!!lesson.sor:false;$('mSoch').checked=lesson?!!lesson.soch:false;$('mCancelled').checked=lesson?!!lesson.cancelled:false;
  renderAttachList();hideInlineForms();resetLinkForm();resetFileForm();$('modalBackdrop').classList.add('show');
  setDocTitle(lesson?'Edit - Subject':'New - Subject');
};
function closeModal(){$('modalBackdrop').classList.remove('show');editingId=null;editingAttachments=[];hideInlineForms();resetLinkForm();resetFileForm();updateDocTitle();}
$('modalClose').onclick=closeModal;$('modalCancel').onclick=closeModal;
$('modalBackdrop').onclick=e=>{if(e.target===$('modalBackdrop'))closeModal();};
$('topbarAddBtn').onclick=()=>openModal(null);
$('modalSave').onclick=async()=>{
  const user=getCurrentUser();if(!user)return;
  const dv=$('mDate').value,sv=getSelectValue('csSubject'),tv=getSelectValue('csTime'),thv=getSelectValue('csTeacher'),rv=getSelectValue('csRoom'),nv=getSelectValue('csLessonNum');
  if(!dv||!sv||!tv||!thv||!rv){showToast(currentLang==='en'?'Fill fields':'Заполните поля');return;}
  if(nv)rememberValue('lessonNum',nv);if(tv)rememberValue('time',tv);if(sv)rememberValue('subject',sv);if(thv)rememberValue('teacher',thv);if(rv)rememberValue('room',rv);
  const atts=normalizeAttachments(editingAttachments);
  const payload={action:'save_sched',requester:user.email,role:userRole(),id:editingId||'',date:dv,lessonNum:nv,time:tv,subject:sv,teacher:thv,room:rv,homework:$('mHomework').value.trim(),sor:$('mSor').checked?'true':'false',soch:$('mSoch').checked?'true':'false',cancelled:$('mCancelled').checked?'true':'false',attachments:JSON.stringify(atts)};
  const dk=normDate(payload.date);const lid=editingId||('tmp_'+Date.now());
  const ll={id:lid,date:payload.date,lessonNum:payload.lessonNum,time:payload.time,subject:payload.subject,teacher:payload.teacher,room:payload.room,homework:payload.homework,sor:payload.sor==='true',soch:payload.soch==='true',cancelled:payload.cancelled==='true',attachments:atts};
  if(prefetched.scheduleByDate[dk]){let arr=prefetched.scheduleByDate[dk].slice();if(editingId){const i=arr.findIndex(x=>String(x.id)===String(editingId));if(i>=0)arr[i]=ll;else arr.push(ll);}else arr.push(ll);arr.sort((a,b)=>(parseInt(a.lessonNum)||0)-(parseInt(b.lessonNum)||0));prefetched.scheduleByDate[dk]=arr;}else prefetched.scheduleByDate[dk]=[ll];
  saveCacheJson(LESSONS_CACHE_KEY,prefetched.scheduleByDate);if(dk===selectedDate)cacheLessons=prefetched.scheduleByDate[dk];
  closeModal();showToast(currentLang==='en'?'Saved':'Сохранено');refreshCurrentPage();
  jsonp(payload).then(res=>{if(res&&res.status==='ok'&&res.id&&!editingId&&prefetched.scheduleByDate[dk]){const arr=prefetched.scheduleByDate[dk];const i=arr.findIndex(x=>String(x.id)===String(lid));if(i>=0){arr[i].id=res.id;saveCacheJson(LESSONS_CACHE_KEY,prefetched.scheduleByDate);if(['schedule','homework'].includes(currentPage))refreshCurrentPage();}}}).catch(()=>{});
};
window.editLesson=function(id){const l=cacheLessons.find(x=>String(x.id)===String(id));if(l)openModal(l);};
window.deleteLesson=async function(id){
    const ok=await showConfirm(currentLang==='en'?'Delete lesson?':'Удалить урок?','Subject');
    if(!ok)return;
    const u=getCurrentUser();const dk=selectedDate;if(prefetched.scheduleByDate[dk]){prefetched.scheduleByDate[dk]=prefetched.scheduleByDate[dk].filter(x=>String(x.id)!==String(id));saveCacheJson(LESSONS_CACHE_KEY,prefetched.scheduleByDate);cacheLessons=prefetched.scheduleByDate[dk];refreshCurrentPage();}jsonp({action:'del_sched',requester:u.email,role:userRole(),id}).catch(()=>{});
};
$$('[data-logout]').forEach(b=>b.onclick=()=>{showLoader();prefetched.scheduleByDate={};prefetched.hwStatuses=null;prefetched.users=null;try{localStorage.removeItem(LESSONS_CACHE_KEY);localStorage.removeItem(HW_CACHE_KEY);localStorage.removeItem(USERS_CACHE_KEY);}catch(e){}clearSession();setTimeout(()=>location.reload(),3500);});
document.addEventListener('click',e=>{const mb=e.target.closest('.menu-item');if(mb&&mb.dataset.page){renderPage(mb.dataset.page);return;}const mbb=e.target.closest('.mb-item');if(mbb&&mbb.dataset.page){renderPage(mbb.dataset.page);return;}});
const _origBindPage=bindPage;
bindPage=function(key){_origBindPage(key);if(key==='homework')bindHwCheckboxes();if(key==='ministry'){bindSchoolModal();bindVacationModal();}};
const _accSaveEl=$('accSave');
if(_accSaveEl){_accSaveEl.addEventListener('click',async(e)=>{e.stopImmediatePropagation();await Account.saveProfile();},true);}

function updateOnlineStatus(){if(!navigator.onLine){$('offlineOverlay').classList.add('show');}else{$('offlineOverlay').classList.remove('show');}}
window.addEventListener('online',updateOnlineStatus);
window.addEventListener('offline',updateOnlineStatus);

(async function init(){
  try{
    checkFields();
    initAllSelects();buildGradesGrid();Theme.init();I18N.init();UserMenu.init();Account.init();Account.applyAvatar();updateOnlineStatus();
    setTimeout(fitFormHeight, 50);
    const s=getSession();
    if(s&&s.user){
      showLoader();$('authView').classList.add('hidden');$('appView').classList.remove('hidden');
      applyUserToUI();rebuildMenu();renderPage('home');updateDocTitle();
      requestAnimationFrame(()=>{$('appView').classList.add('ready');moveIndicator();});
      hideLoader();
      prefetchAll(s.user).then(()=>{if(['schedule','homework','diary','users','journal','ministry'].includes(currentPage))refreshCurrentPage();}).catch(()=>{});
    } else {
      showLoader();hideLoader();$('authView').classList.remove('hidden');updateDocTitle();
    }
  }catch(err){console.error('Init error:',err);hideLoader();$('authView').classList.remove('hidden');}
})();

(function(){
var NS="http://www.w3.org/2000/svg",TAU=Math.PI*2,run=[],LV=0;
var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var $=function(i){return document.getElementById(i)};
function el(n,a){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);return e}
function sm(x){x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)}
function flat(v){return v<.7?1:1-sm((v-.7)/.3)}
function lin(T,get){
var Am=Math.min(3,T*.4),W=240,H=T+2*Am,h=T/2,g=4;
var s=el('svg',{viewBox:'0 0 '+W+' '+H,role:'progressbar','aria-label':'Загрузка'});s.style.overflow='visible';
var tr=el('path',{fill:'none',stroke:'var(--s3)','stroke-width':T,'stroke-linecap':'round'}),
ac=el('path',{fill:'none',stroke:'var(--p)','stroke-width':T,'stroke-linecap':'round','stroke-linejoin':'round'}),
dt=el('circle',{r:2,cy:H/2,cx:W-h,fill:'var(--p)'});
s.appendChild(tr);s.appendChild(ac);s.appendChild(dt);
function ln(a,b,A,ph){a+=h;b-=h;if(b<=a)return'';if(A<.05)return'M'+a+' '+H/2+'L'+b+' '+H/2;var d='',x;for(x=a;x<=b;x+=2)d+=(x==a?'M':'L')+x.toFixed(1)+' '+(H/2+A*Math.sin(TAU*x/40-ph)).toFixed(2);return d+'L'+b+' '+(H/2+A*Math.sin(TAU*b/40-ph)).toFixed(2)}
run.push({n:s,f:function(t){var v=get(),A=Am*flat(v),p=v*W;if(p>T+1){ac.setAttribute('d',ln(0,p,A,t/350));tr.setAttribute('d',ln(p+g,W,0,0))}else{ac.setAttribute('d','');tr.setAttribute('d',ln(0,W,0,0))}dt.style.display=p>W-T-4?'none':''}});
return s}
var SH=[[5,.14],[9,.08],[4,.16],[2,.22],[12,.05],[3,.18],[7,.12]];
function rad(i,th){var q=SH[i%7];return Math.cos(q[0]*th)*q[1]+1}
function load(size,cont,col){
var s=el('svg',{width:size,height:size,viewBox:'0 0 48 48',role:'progressbar','aria-label':'Загрузка'});s.style.flex='none';
if(cont)s.appendChild(el('circle',{cx:24,cy:24,r:24,fill:'var(--s3)'}));
var p=el('path',{fill:col||(cont?'var(--p-ink)':'var(--p)')});s.appendChild(p);var R=cont?12.5:19;
run.push({n:s,f:function(t){var i=Math.floor(t/700),k=sm((t%700)/700*1.5),rot=t/1000*1.6+i*.9,d='',th;for(th=0;th<TAU+.01;th+=.06){var r=((1-k)*rad(i,th)+k*rad(i+1,th))/1.22*R,a=th+rot;d+=(th?'L':'M')+(24+r*Math.cos(a)).toFixed(2)+' '+(24+r*Math.sin(a)).toFixed(2)}p.setAttribute('d',d+'Z')}});
return s}
if($('m3Load'))$('m3Load').appendChild(load(72,1));
if($('m3Bar'))$('m3Bar').appendChild(lin(8,function(){return LV}));
var fill=$('attachProgressFill');
if(fill&&fill.parentNode){var tk=fill.parentNode,uw=document.createElement('div');uw.style.margin='4px 0 10px';
uw.appendChild(lin(6,function(){return(parseFloat(fill.style.width)||0)/100}));
tk.style.display='none';tk.parentNode.insertBefore(uw,tk)}
['loginBtn','btnRegister'].forEach(function(id){var b=$(id);if(!b)return;
new MutationObserver(function(){var s=b.querySelector('.m3-spin');
if(b.disabled&&!s){var x=load(22,0,'#fff');x.classList.add('m3-spin');b.insertBefore(x,b.firstChild)}
else if(!b.disabled&&s)s.remove()}).observe(b,{attributes:true,attributeFilter:['disabled']})});
function frame(t){
var e=typeof _loaderAt==='number'?Date.now()-_loaderAt:0,m=typeof LOADER_MIN_MS==='number'?LOADER_MIN_MS:3000;
LV=e>=m?1:.03+.97*sm(e/m);
for(var i=run.length-1;i>=0;i--){var r=run[i];if(!r.n.isConnected){run.splice(i,1);continue}if(r.n.getBoundingClientRect().width>0)r.f(t)}
if(!RM)requestAnimationFrame(frame)}
if(RM)frame(2000);else requestAnimationFrame(frame);
})();
