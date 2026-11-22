(function(){
  try{
    var t=localStorage.getItem('nc_theme')||'dark';
    if(t==='winter')t='dark';
    document.documentElement.setAttribute('data-theme',t);
    document.documentElement.lang=localStorage.getItem('nc_lang')||'en';
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
    setDocTitle(currentLang==='en'?(isRegisterMode?'Register':'Login'):(currentLang==='kz'?(isRegisterMode?'Тіркелу':'Кіру'):(isRegisterMode?'Регистрация':'Вход')));
    return;
  }
  const titleKeys={home:'menu_home',schedule:'menu_schedule',diary:'menu_diary',journal:'menu_journal',users:'menu_users',ministry:'menu_ministry'};
  setDocTitle(T(titleKeys[currentPage]||'menu_home'));
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

let currentLang = localStorage.getItem(LANG_KEY) || 'en';
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
  applyAuthTranslations();
  $('offlineTitle').textContent = currentLang === 'en' ? 'No internet connection' : (currentLang === 'kz' ? 'Интернет байланысы жоқ' : 'Нет подключения к интернету');
  $('offlineSub').textContent = currentLang === 'en' ? 'Please check your connection and try again.' : (currentLang === 'kz' ? 'Қосылымды тексеріп, қайталап көріңіз.' : 'Пожалуйста, проверьте ваше соединение и попробуйте снова.');
  rebuildMenu();
  updateDocTitle();
}

const AUTH_TEXT={
  en:{modeLogin:'Login',modeRegister:'Register',loginField:'Login',password:'Password',fullName:'Full name',chooseLanguage:'Choose language',themeDark:'Dark theme',themeLight:'Light theme',toggleTheme:'Toggle theme',togglePassword:'Toggle password visibility',error:'Error'},
  ru:{modeLogin:'Вход',modeRegister:'Регистрация',loginField:'Логин',password:'Пароль',fullName:'Имя и Фамилия',chooseLanguage:'Выбрать язык',themeDark:'Тёмная тема',themeLight:'Светлая тема',toggleTheme:'Переключить тему',togglePassword:'Показать или скрыть пароль',error:'Ошибка'},
  kz:{modeLogin:'Кіру',modeRegister:'Тіркелу',loginField:'Логин',password:'Құпия сөз',fullName:'Аты-жөні',chooseLanguage:'Тілді таңдау',themeDark:'Қараңғы тақырып',themeLight:'Жарық тақырып',toggleTheme:'Тақырыпты ауыстыру',togglePassword:'Құпия сөзді көрсету немесе жасыру',error:'Қате'}
};
function updateAuthBrand(){
  const t=AUTH_TEXT[currentLang]||AUTH_TEXT.en;
  const brand=$('authBrandTitle');
  const mode=isRegisterMode?t.modeRegister:t.modeLogin;
  if(brand) brand.textContent = (window.innerWidth>=768) ? 'NovaClass' : ('NovaClass • '+mode);
}
function applyAuthTranslations(){
  const text=AUTH_TEXT[currentLang]||AUTH_TEXT.en;
  document.querySelectorAll('[data-auth-text="login"]').forEach(el=>el.textContent=text.loginField);
  document.querySelectorAll('[data-auth-text="password"]').forEach(el=>el.textContent=text.password);
  document.querySelectorAll('[data-auth-text="fullName"]').forEach(el=>el.textContent=text.fullName);
  const modeLabel=isRegisterMode?text.modeRegister:text.modeLogin;
  const title=$('pageTitle');
  if(title)title.textContent=modeLabel;
  updateAuthBrand();
  const error=$('errBox');
  if(error&&!error.classList.contains('show'))error.textContent=text.error;
  const loginText=$('loginBtn')?.querySelector('.btn-text');
  const registerText=$('btnRegister')?.querySelector('.btn-text');
  if(loginText)loginText.textContent=text.modeLogin;
  if(registerText)registerText.textContent=text.modeRegister;
  const trigger=$('authLanguageTrigger');
  const languageName=$('authLanguageName');
  const languageNames={en:'English',ru:'Русский',kz:'Қазақша'};
  if(languageName)languageName.textContent=languageNames[currentLang]||languageNames.en;
  if(trigger)trigger.setAttribute('aria-label',text.chooseLanguage);
  document.querySelectorAll('[data-auth-lang]').forEach(option=>option.setAttribute('aria-checked',String(option.dataset.authLang===currentLang)));
  document.querySelectorAll('.pass-icon').forEach(button=>{button.setAttribute('aria-label',text.togglePassword);button.title=text.togglePassword;});
  const themeBtn=$('authThemeToggle');
  const themeText=$('authThemeText');
  const isDark=(document.documentElement.getAttribute('data-theme')||'dark')==='dark';
  if(themeText) themeText.textContent = isDark ? text.themeDark : text.themeLight;
  if(themeBtn){ themeBtn.setAttribute('aria-label',text.toggleTheme); themeBtn.title=text.toggleTheme; }
  updateAuthMerge();
}

function initAuthLanguage(){
  const wrap=$('authLanguageWrap'),trigger=$('authLanguageTrigger');
  if(!wrap||!trigger)return;
  const setOpen=open=>{wrap.classList.toggle('open',open);trigger.setAttribute('aria-expanded',String(open));};
  trigger.addEventListener('click',e=>{e.stopPropagation();setOpen(!wrap.classList.contains('open'));});
  wrap.querySelectorAll('[data-auth-lang]').forEach(option=>option.addEventListener('click',()=>{I18N.set(option.dataset.authLang);setOpen(false);}));
  document.addEventListener('click',event=>{if(!wrap.contains(event.target))setOpen(false);});
  trigger.addEventListener('keydown',event=>{if(event.key==='Escape')setOpen(false);});
}

function ic(name,cls){return '<svg class="ui-icon'+(cls?' '+cls:'')+'"><use href="#'+name+'"></use></svg>';}
function esc(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function showToast(m){let t=$('toast');t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2400);}
function uid(p){return (p||'id')+'_'+Date.now()+'_'+Math.random().toString(36).slice(2,7);}

/* Ripple Effect for all interactive elements */
document.body.addEventListener('click', function(e) {
  const btn = e.target.closest('.m3-btn, .btn, .topbar-add, .btn-save, .btn-clear, .mgmt-tab, .ud-action, .set-tab, .lesson-row, .date-card, .auth-ctl, .auth-language-menu button');
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
function showConfirm(text, titleSuffix, opts) {
  return new Promise(resolve => {
    dialogResolve = resolve;
    opts = opts || {};
    $('dialogTitle').textContent = T('confirm');
    $('dialogText').textContent = text;
    const wrap = $('dialogInputWrap');
    const inp = $('dialogInput');
    if (opts.password) {
      wrap.classList.remove('hidden');
      inp.value = '';
      inp.type = 'password';
      inp.placeholder = currentLang==='en'?'Enter password':'Введите пароль';
    } else {
      wrap.classList.add('hidden');
      inp.type = 'text';
    }
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
function markLoginError(inputId){ const inp = $(inputId); if (!inp) return; inp.classList.add('error'); const field = inp.closest('.m3-field'); if (field) field.classList.add('error'); const wrap = inp.closest('.login-wrap'); if (wrap) wrap.classList.add('error'); }

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
function setCurrentUser(patch){const s=getSession(); if(!s||!s.user) return null; s.user=Object.assign({},s.user,patch||{}); saveSession(s.user); return s.user;}
function userRole(){const u=getCurrentUser();let r=u&&u.role?u.role:'Ученик';if(!ROLES[r])r='Ученик';return r;}
function canEditSchedule(){return EDITOR_ROLES.indexOf(userRole())!==-1;}
function isAdmin(){const r=userRole();return r==='Администратор'||r==='Создатель';}
function canManageUsers(){return isAdmin();}
function canViewMinistry(){return isAdmin();}
function canViewJournal(){const r=userRole();return EDITOR_ROLES.indexOf(r)!==-1;}
function canOpenPage(page){
  if(page==='ministry') return isCreator();
  if(page==='users') return isAdmin();
  if(page==='journal') return canViewJournal();
  if(page==='diary') return userRole()==='Ученик';
  return true;
}
function isCreator(){return userRole()==='Создатель'||isCreatorEmail((getCurrentUser()||{}).email);}
let _syncTimer=null,_syncInFlight=false,_syncFastUntil=0,_lastLessonsSig='',_lastUsersSig='',_lastForcedLogout=0;
function _sig(obj){try{return JSON.stringify(obj);}catch(e){return String(obj||'');}}
function _lessonsSig(list){return _sig((list||[]).map(l=>({id:String(l.id??''),n:String(l.lessonNum??''),s:String(l.subject??''),t:String(l.time??''),r:String(l.room??''),te:String(l.teacher??''),h:String(l.homework??''),d:String(l.date??''),c:!!l.cancelled,sor:!!l.sor,soch:!!l.soch,a:_sig(l.attachments||[])})));}
function _usersSig(list){return _sig((list||[]).map(u=>({e:String(u.email||'').toLowerCase(),n:String(u.name||''),r:String(u.role||''),st:String(u.status||u.state||''),b:!!u.blocked||!!u.banned||!!u.deleted})));}
function forceLogout(message,type){
  const now=Date.now(); if(now-_lastForcedLogout<1500) return; _lastForcedLogout=now;
  try{clearSession();}catch(e){}
  try{ if(typeof UserMenu!=='undefined' && UserMenu.close) UserMenu.close(); }catch(e){}
  try{ cacheLessons=[]; prefetched.users=[]; prefetched.scheduleByDate={}; }catch(e){}
  try{ $('appView')?.classList.add('hidden'); $('authView')?.classList.remove('hidden'); }catch(e){}
  try{ showToast(message || (currentLang==='en'?'Session ended':'Сессия завершена'), type||'error'); }catch(e){}
}
async function validateCurrentSession(){
  const u=getCurrentUser(); if(!u||!u.email) return {ok:false,reason:'no-session'};
  try{
    const res=await jsonp({action:'users_list',requester:u.email});
    if(!res) return {ok:true,soft:true};
    if(res.status==='ok'){
      const users=res.users||[]; prefetched.users=users; saveCacheJson(USERS_CACHE_KEY,users);
      const me=users.find(x=>String(x.email||'').toLowerCase()===String(u.email||'').toLowerCase());
      if(!me){ forceLogout(currentLang==='en'?'Your account was deleted. You can create a new account.':'Ваш аккаунт был удалён. Вы можете создать новый аккаунт.','error'); return {ok:false,reason:'deleted'}; }
      const st=String(me.status||me.state||'').toLowerCase();
      const blocked = !!me.blocked || !!me.banned || !!me.deleted || ['blocked','banned','deleted','disabled'].includes(st);
      if(blocked){ forceLogout(currentLang==='en'?'Your account was blocked or deleted by administrator.':'Ваш аккаунт был заблокирован или удалён администратором.','error'); return {ok:false,reason:'blocked'}; }
      const newRole = ROLES[me.role] ? me.role : (u.role||'Ученик');
      const changedRole = String(newRole)!==String(u.role||'');
      const changedName = String(me.name||'')!==String(u.name||'');
      if(changedRole || changedName){
        setCurrentUser({role:newRole,name:me.name||u.name,email:me.email||u.email});
        try{applyUserToUI();rebuildMenu();updateTopbarAdd();refreshCurrentPage();}catch(e){}
        if(changedRole) showToast(currentLang==='en'?'Your role was updated':'Ваша роль обновлена','success');
      }
      return {ok:true,me,users};
    }
    const msg=String(res.error||res.message||'').toLowerCase();
    if(['deleted','not_found','no_user','user_not_found','blocked','banned','forbidden','unauthorized','disabled'].some(k=>msg.includes(k))){
      forceLogout(currentLang==='en'?'Your account is no longer active.':'Ваш аккаунт больше не активен.','error');
      return {ok:false,reason:msg};
    }
    return {ok:true,soft:true};
  }catch(e){ return {ok:true,soft:true,error:e}; }
}
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

const Theme=(function(){function apply(mode){document.documentElement.setAttribute('data-theme',mode==='dark'?'dark':'light');try{localStorage.setItem(THEME_KEY,mode);}catch(e){}document.querySelectorAll('.theme-card').forEach(c=>c.classList.toggle('active',c.dataset.theme===mode));}function current(){try{return localStorage.getItem(THEME_KEY)||'dark';}catch(e){return'dark';}}function init(){apply(current());document.querySelectorAll('.theme-card').forEach(c=>c.onclick=()=>{apply(c.dataset.theme);showToast(currentLang==='en'?'Theme changed':(currentLang==='kz'?'Тақырып өзгертілді':'Тема изменена'));});}return{apply,current,init};})();
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
  function close(){
    const dd=$('userDropdown');
    if(dd) dd.classList.remove('open');
    const chip=$('userChip');
    if(chip) chip.setAttribute('aria-expanded','false');
  }
  function moveUdSwitch(){
    const wrap=$('udTabs'), ind=$('udSwitchIndicator');
    if(!wrap||!ind) return;
    const active=wrap.querySelector('.ud-switch-option.active');
    if(!active){ind.style.opacity='0';return;}
    ind.style.opacity='1';
    ind.style.width=active.offsetWidth+'px';
    ind.style.transform=`translateX(${active.offsetLeft}px)`;
  }
  function toggle(force){
    const dd=$('userDropdown');
    if(!dd) return;
    const shouldOpen = typeof force==='boolean' ? force : !dd.classList.contains('open');
    dd.classList.toggle('open',shouldOpen);
    const chip=$('userChip');
    if(chip) chip.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    if(shouldOpen) requestAnimationFrame(()=>{moveUdSwitch(); const panes=document.querySelector('.ud-panes'); const active=panes?.querySelector('.ud-pane.active'); if(panes&&active){panes.style.transition='none'; panes.style.height=active.offsetHeight+'px'; panes.offsetHeight; panes.style.transition='';}});
  }
  function openSettingsPane(pane){
    const k=pane||'account';
    document.querySelectorAll('.set-tab').forEach(t=>t.classList.toggle('active',t.dataset.setTab===k));
    document.querySelectorAll('.set-pane').forEach(p=>p.classList.toggle('active',p.dataset.setPane===k));
    Account.fillFields();
    $('settingsModal').classList.add('show');
    setDocTitle('Settings');
  }
  function init(){
    const chip=$('userChip');if(chip){chip.setAttribute('aria-haspopup','menu');chip.setAttribute('aria-expanded','false');chip.onclick=e=>{e.stopPropagation();toggle();};}
    close();
    const syncUdPaneHeight=(immediate=false)=>{
      const panes=document.querySelector('.ud-panes'); if(!panes) return;
      const active=panes.querySelector('.ud-pane.active'); if(!active) return;
      const h=active.offsetHeight;
      if(immediate){ panes.style.transition='none'; panes.style.height=h+'px'; panes.offsetHeight; panes.style.transition=''; }
      else panes.style.height=h+'px';
    };
    document.querySelectorAll('.ud-switch-option').forEach(tab=>{tab.onclick=()=>{const k=tab.dataset.udTab;document.querySelectorAll('.ud-switch-option').forEach(t=>t.classList.toggle('active',t===tab));const tabs=$('udTabs'); if(tabs) tabs.dataset.active=k;document.querySelectorAll('.ud-pane').forEach(p=>p.classList.toggle('active',p.dataset.udPane===k));requestAnimationFrame(()=>{moveUdSwitch();syncUdPaneHeight();});};});
    setTimeout(()=>{moveUdSwitch();syncUdPaneHeight(true);close();},0);
    document.addEventListener('click',e=>{const wrap=$('userMenuWrap'); if(wrap && !wrap.contains(e.target)) close();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape') close();});
    document.querySelectorAll('[data-open-settings]').forEach(b=>b.onclick=e=>{e.stopPropagation();close();openSettingsPane(b.dataset.setOpen||'account');});
    const sc=$('setModalClose');if(sc)sc.onclick=()=>{$('settingsModal').classList.remove('show');updateDocTitle();};
    const sm=$('settingsModal'); if(sm) sm.onclick=e=>{if(e.target===$('settingsModal')){$('settingsModal').classList.remove('show');updateDocTitle();}};
    const ac=$('accModalClose'); if(ac) ac.onclick=()=>{const am=$('accountModal'); if(am) am.classList.remove('show'); updateDocTitle();};
    const acc=$('accClose'); if(acc) acc.onclick=()=>{const am=$('accountModal'); if(am) am.classList.remove('show'); updateDocTitle();};
    const am=$('accountModal'); if(am) am.onclick=e=>{if(e.target===am){am.classList.remove('show');updateDocTitle();}};
    document.querySelectorAll('.set-tab').forEach(tab=>{tab.onclick=()=>{const k=tab.dataset.setTab;document.querySelectorAll('.set-tab').forEach(t=>t.classList.toggle('active',t===tab));document.querySelectorAll('.set-pane').forEach(p=>p.classList.toggle('active',p.dataset.setPane===k));};});
    document.querySelectorAll('[data-delete-account]').forEach(b=>b.onclick=async()=>{
        const pass=await showConfirm(currentLang==='en'?'Enter your password to delete account.':'Введите пароль для удаления аккаунта.','Account',{password:true});
        if(!pass)return;
        const u=getCurrentUser();
        if(!u){showToast(currentLang==='en'?'Not signed in':'Вы не вошли');return;}
        showLoader();
        try{
          const r=await jsonp({action:'login',email:u.email,password:String(pass)});
          if(!r||r.status!=='ok'){showToast(currentLang==='en'?'Wrong password':'Неверный пароль');return;}
          clearSession();try{localStorage.removeItem(AVATAR_KEY);}catch(e){}
          showToast(currentLang==='en'?'Account deleted':'Аккаунт удалён');
          setTimeout(()=>location.reload(),900);
        }catch(e){showToast(currentLang==='en'?'Error':'Ошибка');}
        finally{hideLoader();}
    });
    
    const burger=$('burgerBtn'),sb=$('sidebar'),bd=$('mobileSbBackdrop'),topbar=$('topbar'),mobileBottom=$('mobileBottom');
    function hideBars(){topbar.classList.add('bar-hidden');if(mobileBottom)mobileBottom.classList.add('bar-hidden');}
    function showBars(){topbar.classList.remove('bar-hidden');if(mobileBottom)mobileBottom.classList.remove('bar-hidden');}
    function closeSb(){sb.classList.remove('open');burger.classList.remove('open');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label',currentLang==='en'?'Open menu':'Открыть меню');bd.classList.remove('open');showBars();}
    const syncIndicator=()=>{moveIndicator();setTimeout(moveIndicator,180);setTimeout(moveIndicator,360);};
    burger.onclick=()=>{const opening=!sb.classList.contains('open');sb.classList.toggle('open',opening);burger.classList.toggle('open',opening);burger.setAttribute('aria-expanded',String(opening));burger.setAttribute('aria-label',opening?(currentLang==='en'?'Close menu':'Закрыть меню'):(currentLang==='en'?'Open menu':'Открыть меню'));bd.classList.toggle('open',opening);if(opening)hideBars();else showBars();syncIndicator();};
    sb.addEventListener('mouseenter',()=>{if(window.innerWidth>640)syncIndicator();});
    sb.addEventListener('mouseleave',()=>{if(window.innerWidth>640)syncIndicator();});
    bd.onclick=closeSb;
    document.addEventListener('click',e=>{const mi=e.target.closest('.menu-item');if(mi&&window.innerWidth<=640)closeSb();});
    const sbSet=document.querySelector('#sidebar .sb-settings');
    if(sbSet) sbSet.onclick=e=>{e.stopPropagation();closeSb();openSettingsPane('account');};
  }
  return{close,init};
})();

/* AUTH LOGIC & MORPHING BUTTONS */
let isRegisterMode=false;
const formsWrap=$('formsWrap');
const track=$('track');
const loginEmail=$('loginEmail');
const loginPass=$('loginPass');
const regName=$('regName');
const regEmail=$('regEmail');
const regPass=$('regPass');

const loginBtn=$('loginBtn');
const btnRegister=$('btnRegister');

function checkFields() {
  document.querySelectorAll('#authView .m3-field').forEach(field => {
    const input = field.querySelector('input');
    if (!input) return;
    if (input.value.trim() !== '') field.classList.add('has-value');
    else field.classList.remove('has-value');
  });
}

function updateAuthMerge(){
  const wrap=$('bottomButtons');
  if(!wrap) return;
  const loginReady=!!(loginEmail && loginPass && loginEmail.value.trim() && loginPass.value.trim());
  const regReady=!!(regName && regEmail && regPass && regName.value.trim() && regEmail.value.trim() && regPass.value.trim());
  const ready=isRegisterMode ? regReady : loginReady;
  wrap.classList.toggle('merged', ready);
}

function setAuthButtonState(){
  loginBtn.classList.toggle('active',!isRegisterMode);
  btnRegister.classList.toggle('active',isRegisterMode);
  loginBtn.setAttribute('aria-pressed',String(!isRegisterMode));
  btnRegister.setAttribute('aria-pressed',String(isRegisterMode));
  updateAuthMerge();
}

[loginEmail,loginPass,regName,regEmail,regPass].forEach(input => {
  if(!input) return;
  input.addEventListener('input', () => {
    checkFields();
    hideErr();
    document.querySelectorAll('#authView .m3-field').forEach(f => f.classList.remove('error'));
    updateAuthMerge();
  });
});

document.querySelectorAll('.pass-icon[data-pass-target]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const inp=$(btn.dataset.passTarget);
    if(!inp) return;
    inp.type = inp.type === 'password' ? 'text' : 'password';
    inp.focus();
  });
});

function fitFormHeight() {
  const pane = document.querySelector('.slide-pane[data-pane="' + (isRegisterMode ? 'reg' : 'login') + '"]');
  if (pane && formsWrap) formsWrap.style.height = pane.scrollHeight + 'px';
}
window.addEventListener('resize', ()=>{ fitFormHeight(); updateAuthBrand(); });

let authSwitchTimer=0;
function switchAuthMode(register){
  if(isRegisterMode===register)return;
  const middle=$('authMiddle');
  if(authSwitchTimer)clearTimeout(authSwitchTimer);
  if(middle){ middle.classList.remove('is-entering'); middle.classList.add('is-exiting'); }
  authSwitchTimer=setTimeout(()=>{
    isRegisterMode=register;
    if(track) track.dataset.active=register?'reg':'login';
    applyAuthTranslations();
    setAuthButtonState();
    updateDocTitle();
    hideErr();
    document.querySelectorAll('#authView .m3-field').forEach(field=>field.classList.remove('error'));
    checkFields();
    if(middle){
      middle.classList.remove('is-exiting');
      void middle.offsetWidth;
      middle.classList.add('is-entering');
    }
    fitFormHeight();
    authSwitchTimer=setTimeout(()=>{ if(middle) middle.classList.remove('is-entering'); authSwitchTimer=0; },500);
  },120);
}

loginBtn.addEventListener('click',()=>isRegisterMode?switchAuthMode(false):doLogin());
btnRegister.addEventListener('click',()=>isRegisterMode?doRegister():switchAuthMode(true));
setAuthButtonState();

function showErr(m){
  const b=$('errBox');
  if(!b)return;
  b.textContent=m;
  b.classList.add('show');
  fitFormHeight();
}
function hideErr(){ const b=$('errBox'); if(b) b.classList.remove('show'); }

function markEmpty(arr){
  let any=false;
  arr.forEach(i=>{
    if(!i || !i.value.trim()){
      if(i) i.classList.add('error');
      const w=i && i.closest('.m3-field');
      if(w)w.classList.add('error');
      any=true;
    }
  });
  return any;
}

function togglePass(inputId) {
  const input = document.getElementById(inputId);
  if(!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
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
    prefetchAll(u).then(()=>{if(['schedule','diary','users','journal','ministry'].includes(currentPage))refreshCurrentPage();});
  }catch(e){hideLoader();showErr('Ошибка: '+e.message);}
  finally{$('loginBtn').disabled=false;}
}
async function doRegister(){
  hideErr();
  if(markEmpty([$('regName'),$('regEmail'),$('regPass')])){showErr(currentLang==='en'?'Enter data':(currentLang==='kz'?'Деректерді енгізіңіз':'Введите данные'));return;}
  const parsed=extractLogin($('regEmail').value);
  if(parsed.error){showErr(parsed.error);markLoginError('regEmail');return;}
  const p1=$('regPass').value;
  if(p1.length<6){showErr(currentLang==='en'?'Password min 6 chars':(currentLang==='kz'?'Құпия сөз кемінде 6 таңба':'Пароль минимум 6 символов'));return;}
  $('btnRegister').disabled=true;
  const email=parsed.email;const name=$('regName').value.trim();
  try{
    showLoader();
    const res=await jsonp({action:'register',email,pass:p1,name});
    if(!res){hideLoader();showErr(currentLang==='en'?'Empty response':(currentLang==='kz'?'Бос жауап':'Пустой ответ'));return;}
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

function startRealtimeSync(){
  if(_syncTimer) clearInterval(_syncTimer);
  const tick = async()=>{
    if(_syncInFlight) return;
    const u=getCurrentUser(); if(!u||!u.email) return;
    if(document.hidden && Date.now()>_syncFastUntil) return;
    _syncInFlight=true;
    try{
      const v = await validateCurrentSession();
      if(!v || !v.ok) return;
      if(currentPage==='schedule'){
        try{
          const fresh=await fetchSched(selectedDate,getCurrentUser(),true);
          const arr=Array.isArray(fresh)?fresh:[];
          const sig=_lessonsSig(arr);
          if(sig!==_lastLessonsSig){
            _lastLessonsSig=sig;
            cacheLessons=arr;
            if(currentPage==='schedule') refreshCurrentPage();
          }
        }catch(e){}
      } else if(['users','journal','ministry','diary'].includes(currentPage)){
        await loadPageData(currentPage,{silent:true});
      }
    } finally { _syncInFlight=false; }
  };
  _syncTimer=setInterval(tick, 8000);
  document.addEventListener('visibilitychange',()=>{ if(!document.hidden){ _syncFastUntil=Date.now()+30000; tick(); } });
  window.addEventListener('focus',()=>{ _syncFastUntil=Date.now()+15000; tick(); });
  _syncFastUntil=Date.now()+15000;
  tick();
}

function startRealtimeSync(){
  if(_syncTimer) clearInterval(_syncTimer);
  const tick = async()=>{
    if(_syncInFlight) return;
    const u=getCurrentUser(); if(!u||!u.email) return;
    if(document.hidden && Date.now()>_syncFastUntil) return;
    _syncInFlight=true;
    try{
      const v = await validateCurrentSession();
      if(!v || !v.ok) return;
      if(currentPage==='schedule' || currentPage==='diary'){
        try{
          const fresh=await fetchSched(selectedDate,getCurrentUser(),true);
          const arr=Array.isArray(fresh)?fresh:[];
          const sig=_lessonsSig(arr);
          if(sig!==_lastLessonsSig){
            _lastLessonsSig=sig;
            cacheLessons=arr;
            if(currentPage==='schedule' || currentPage==='diary') refreshCurrentPage();
          } else if(currentPage==='diary' && !window._diaryIntroDone){
            // allow intro to finish naturally
          }
        }catch(e){}
      }
      if(['users','journal','ministry','schedule','diary'].includes(currentPage)){
        await loadPageData(currentPage,{silent:true});
      }
    } finally { _syncInFlight=false; }
  };
  _syncTimer=setInterval(tick, 8000);
  document.addEventListener('visibilitychange',()=>{ if(!document.hidden){ _syncFastUntil=Date.now()+30000; tick(); } });
  window.addEventListener('focus',()=>{ _syncFastUntil=Date.now()+15000; tick(); });
  _syncFastUntil=Date.now()+15000;
  tick();
}

function applyUserToUI(){
  const u=getCurrentUser(); if(!u) return;
  const letter=String(u.name||u.email||'П').charAt(0).toUpperCase()||'П';
  document.querySelectorAll('[data-user-ava]').forEach(el=>{el.textContent=letter;});
  document.querySelectorAll('[data-user-name]').forEach(el=>{el.textContent=u.name||u.email||(currentLang==='en'?'User':'Пользовател');});
  document.querySelectorAll('[data-user-short-name]').forEach(el=>{
    const parts=String(u.name||'').trim().split(/\s+/).filter(Boolean);
    const short=parts.length>=2?(parts[0]+' '+parts[1].charAt(0)+'.'):(parts[0]||u.email||'User');
    el.textContent=short;
  });
  document.querySelectorAll('[data-user-role]').forEach(el=>{el.textContent=u.role||'Ученик';});
}
function rebuildMenu(){
  const u=getCurrentUser(); if(!u) return;
  const box=$('menuBox'); if(!box) return;
  box.querySelectorAll('.menu-item').forEach(el=>el.remove());
  const ind=$('menuIndicator');
  const can=canOpenPage;
  const items=[
    {page:'home',label:'menu_home',icon:'icon-home'},
    {page:'schedule',label:'menu_schedule',icon:'icon-calendar'},
    {page:'diary',label:'menu_diary',icon:'icon-book'},
    {page:'journal',label:'menu_journal',icon:'icon-chart'},
    {page:'users',label:'menu_users',icon:'icon-users'},
    {page:'ministry',label:'menu_ministry',icon:'icon-graduation'}
  ];
  const frag=document.createDocumentFragment();
  items.filter(can).forEach(it=>{
    const b=document.createElement('button');
    b.type='button'; b.className='menu-item'+(currentPage===it.page?' active':''); b.dataset.page=it.page;
    b.setAttribute('aria-label',T(it.label));
    b.innerHTML='<svg class="ui-icon menu-icon"><use href="#'+it.icon+'"></use></svg><span class="menu-label" data-i18n="'+it.label+'">'+T(it.label)+'</span>';
    b.onclick=()=>{renderPage(it.page);try{closeSb&&closeSb();}catch(e){}};
    frag.appendChild(b);
  });
  if(ind) box.insertBefore(frag, ind); else box.appendChild(frag);
  const mb=$('mobileBottom');
  if(mb){
    mb.querySelectorAll('.mb-item').forEach(el=>el.remove());
    const mbf=document.createDocumentFragment();
    items.filter(can).forEach(it=>{
      const b=document.createElement('button');
      b.type='button'; b.className='mb-item'+(currentPage===it.page?' active':''); b.dataset.page=it.page;
      b.setAttribute('aria-label',T(it.label));
      b.innerHTML='<svg class="ui-icon mb-icon"><use href="#'+it.icon+'"></use></svg><span class="mb-label" data-i18n="'+it.label+'">'+T(it.label)+'</span>';
      b.onclick=()=>{renderPage(it.page);};
      mbf.appendChild(b);
    });
    mb.appendChild(mbf);
  }
  if(!canOpenPage(currentPage)){ renderPage('home'); return; }
  try{moveIndicator();moveMobileIndicator();}catch(e){}
}
async function enterApp(){
  try{
    $('authView').classList.add('hidden');
    $('appView').classList.remove('hidden');
    $('appView').classList.add('ready');
    try{ if(typeof UserMenu!=='undefined' && UserMenu.close) UserMenu.close(); }catch(e){}
    const ud=$('userDropdown'); if(ud) ud.classList.remove('open');
    applyUserToUI();rebuildMenu();renderPage('home');updateDocTitle();
    requestAnimationFrame(()=>{try{moveIndicator();moveMobileIndicator();}catch(e){}});
    try{ startRealtimeSync(); }catch(e){ console.error(e); }
  }catch(err){
    console.error('enterApp error:',err);
    try{ $('authView').classList.add('hidden'); $('appView').classList.remove('hidden'); $('appView').classList.add('ready'); }catch(e){}
    try{ renderPage('home'); }catch(e2){ console.error('render home error:',e2); }
  }
}function moveIndicator(){
  const i=$('menuIndicator'),box=$('menuBox');if(!i||!box)return;
  const a=box.querySelector('.menu-item.active');
  if(!a){i.classList.remove('ready');return;}
  const sb=box.closest('.sidebar');
  const isOpen=!!(sb&&(sb.classList.contains('open')||(window.innerWidth>640&&sb.matches(':hover'))));
  i.style.height=(isOpen?48:40)+'px';
  i.style.width=(isOpen?a.offsetWidth:40)+'px';
  i.style.left=(isOpen?a.offsetLeft:(a.offsetLeft+(a.offsetWidth-40)/2))+'px';
  i.style.transform='translateY('+ (isOpen?a.offsetTop:(a.offsetTop+(a.offsetHeight-40)/2)) +'px)';
  i.style.borderRadius=isOpen?'50px':'50%';
  i.classList.add('ready');
}
function moveMobileIndicator(){
  const i=$('mbIndicator'),box=$('mobileBottom');if(!i||!box)return;
  const a=box.querySelector('.mb-item.active');
  if(!a){i.classList.remove('ready');return;}
  i.style.width=a.offsetWidth+'px';
  i.style.height=a.offsetHeight+'px';
  i.style.transform='translateX('+a.offsetLeft+'px)';
  i.classList.add('ready');
}
window.addEventListener('resize',()=>setTimeout(()=>{moveIndicator();moveMobileIndicator();},50));

const TITLES={home:'menu_home',schedule:'menu_schedule',diary:'menu_diary',users:'menu_users',journal:'menu_journal',ministry:'menu_ministry'};
function buildPane(key){const p=document.createElement('div');p.className='page-pane';p.dataset.page=key;p.innerHTML=getPaneHTML(key);return p;}
function getPaneHTML(key){if(key==='home')return homeContentHTML();if(key==='schedule')return scheduleContentHTML(cacheLessons);if(key==='diary')return diaryContentHTML();if(key==='users')return usersContentHTML();if(key==='journal')return journalContentHTML();if(key==='ministry')return ministryContentHTML();return'';}

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
  if(!canOpenPage(key)) key='home';
  try{ if(typeof UserMenu!=='undefined' && UserMenu && UserMenu.close) UserMenu.close(); }catch(e){}
  if(key==='diary') window._diaryIntroDone = false;
  const vp=$('pagesViewport');
  $$('.menu-item').forEach(b=>b.classList.toggle('active',b.dataset.page===key));
  $$('.mb-item').forEach(b=>{const active=b.dataset.page===key;b.classList.toggle('active',active);if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
  requestAnimationFrame(()=>{moveIndicator();moveMobileIndicator();});
  $('topbarTitle').textContent=T(TITLES[key]||'menu_home');
  updateDocTitle();
  if(activeDiarySpinner){activeDiarySpinner.cleanup();activeDiarySpinner=null;}
  if(key==='diary'){diaryIsLoading=true;diaryData=null;}
  else{diaryIsLoading=false;if(diaryTimer){clearTimeout(diaryTimer);diaryTimer=null;}}
  const isFirst=!vp.querySelector('.page-pane');
  if(isFirst){
    const pane=buildPane(key);
    vp.appendChild(pane);bindPage(key);
    currentPage=key;updateTopbarAdd();loadPageData(key);
    return;
  }
  if(key===currentPage&&key!=='users')return;
  const oldPane=vp.querySelector('.page-pane:last-child');
  const newPane=buildPane(key);
  vp.appendChild(newPane);bindPage(key);
  if(oldPane){
    if(oldPane.parentNode)oldPane.remove();
  }
  currentPage=key;updateTopbarAdd();loadPageData(key);
}

function bindPage(key){
  if(key==='schedule')bindWeekPanel();
  if(key==='users'||key==='journal'||key==='ministry')bindUsersPage();
  bindAttachmentOpeners();
  if(key==='diary'){
      window._diaryIntroDone = false;
      diaryData=calcDiaryAverages();
      initDiaryIntro();
  }
}
function refreshCurrentPage(){const pane=document.querySelector('.page-pane[data-page="'+currentPage+'"]');if(!pane)return;pane.innerHTML=getPaneHTML(currentPage);bindPage(currentPage);}
async function loadPageData(key,opts={}){
  const silent=!!opts.silent;
  const user=getCurrentUser();if(!user)return;
  if(key==='schedule'){
    const hasCache=prefetched.scheduleByDate[selectedDate]!==undefined;
    if(hasCache){cacheLessons=prefetched.scheduleByDate[selectedDate]||[]; if(!silent && currentPage===key)refreshCurrentPage();}
    prefetchWeek(user,selectedDate);
    try{
      const fresh=await fetchSched(selectedDate,user,true);
      cacheLessons=Array.isArray(fresh)?fresh:[];
      const sig=_lessonsSig(cacheLessons);
      if(sig!==_lastLessonsSig || !silent){ _lastLessonsSig=sig; if(currentPage===key) refreshCurrentPage(); }
    }catch(e){
      if(!hasCache){cacheLessons=[]; if(currentPage===key)refreshCurrentPage();}
    }
    return;
  }
  if(key==='diary'){
    // diary depends on schedule lessons for selectedDate; refresh them silently
    try{
      const fresh=await fetchSched(selectedDate,user,true);
      cacheLessons=Array.isArray(fresh)?fresh:[];
      const sig=_lessonsSig(cacheLessons);
      if(sig!==_lastLessonsSig || !silent){ _lastLessonsSig=sig; if(currentPage===key) refreshCurrentPage(); }
    }catch(e){ if(!silent && currentPage===key) refreshCurrentPage(); }
    return;
  }
  if(key==='users'||key==='journal'||key==='ministry'){
    if(prefetched.users&&currentPage===key && !silent)refreshCurrentPage();
    try{
      const res=await jsonp({action:'users_list',requester:user.email});
      if(res&&res.status==='ok'){
        const users=res.users||[];
        prefetched.users=users; saveCacheJson(USERS_CACHE_KEY,users);
        const usig=_usersSig(users);
        if(usig!==_lastUsersSig || !silent){ _lastUsersSig=usig; if(currentPage===key) refreshCurrentPage(); }
        const me=users.find(x=>String(x.email||'').toLowerCase()===String(user.email||'').toLowerCase());
        if(!me){ forceLogout(currentLang==='en'?'Your account was deleted. You can create a new account.':'Ваш аккаунт был удалён. Вы можете создать новый аккаунт.','error'); return; }
        const st=String(me.status||me.state||'').toLowerCase();
        if(!!me.blocked||!!me.banned||!!me.deleted||['blocked','banned','deleted','disabled'].includes(st)){ forceLogout(currentLang==='en'?'Your account was blocked or deleted by administrator.':'Ваш аккаунт был заблокирован или удалён администратором.','error'); return; }
        const nr=ROLES[me.role]?me.role:user.role;
        if(String(nr)!==String(user.role||'') || String(me.name||'')!==String(user.name||'')){
          setCurrentUser({role:nr,name:me.name||user.name,email:me.email||user.email});
          applyUserToUI();rebuildMenu();updateTopbarAdd();
          if(currentPage===key) refreshCurrentPage();
          if(String(nr)!==String(user.role||'')) showToast(currentLang==='en'?'Your role was updated':'Ваша роль обновлена','success');
        }
      } else if(res && res.status==='error'){
        const msg=String(res.error||res.message||'').toLowerCase();
        if(['deleted','not_found','no_user','user_not_found','blocked','banned','forbidden','unauthorized','disabled'].some(k=>msg.includes(k))){
          forceLogout(currentLang==='en'?'Your account is no longer active.':'Ваш аккаунт больше не активен.','error');
          return;
        }
      }
    }catch(e){}
    if(currentTableDate&&prefetched.scheduleByDate[currentTableDate]===undefined){try{await fetchSched(currentTableDate,user,true);}catch(e){}}
    if(currentPage===key && !silent)refreshCurrentPage();
  }
}
function emptyStateHTML(title,subtitle,icon){return `<div class="empty-state">${ic(icon||'icon-info','lg')}<h2>${esc(title)}</h2>${subtitle?`<p>${esc(subtitle)}</p>`:''}</div>`;}

function homeContentHTML(){
  return `
  <div class="banner merry-banner">
    <div class="merry-banner-sky" aria-hidden="true"></div>
    <div class="merry-tree" aria-hidden="true">🎄</div>
    <div class="merry-banner-text">
      <div class="merry-banner-title">Merry Christmas</div>
      <div class="merry-banner-sub">С Новым Годом!</div>
    </div>
  </div>`;
}
function isVacation(iso){return (prefetched.vacations||[]).some(v=>iso>=v.start&&iso<=v.end);}
function scheduleHeaderLabel(iso){
  const d=new Date(iso+'T00:00:00');
  const today=new Date(todayISO()+'T00:00:00');
  const diff=Math.round((d-today)/(1000*60*60*24));
  const dateStr=formatRuDate(iso);
  if(diff===0) return T('today')+' '+dateStr;
  if(diff===1) return T('tomorrow')+' '+dateStr;
  if(diff===-1) return T('yesterday')+' '+dateStr;
  return dateStr;
}
function scheduleContentHTML(lessons){
  let list;
  if(isVacation(selectedDate)){
    list=`<div class="empty-state empty-state-vacation"><div class="empty-state-art" aria-hidden="true">🌴</div><h2>${T('vacation_banner_title')}</h2><p>${T('vacation_banner_sub')}</p></div>`;
  } else if(!lessons||!lessons.length){
    list=`<div class="empty-state empty-state-winter">
      <div class="empty-state-art" aria-hidden="true">
        <div class="ws-scene">☃️</div>
      </div>
      <h2>${T('no_lessons')}</h2>
      <p>${T('no_lessons_sub')}</p>
    </div>`;
  } else {
    list='<div class="lessons-list">'+lessons.map((l,i)=>lessonRowHTML(l,'schedule',null,i)).join('')+'</div>';
  }
  return weekPanelHTML()+list;
}
function lessonRowHTML(l,mode,hwStatuses,i){
  const cls=['lesson-card']; if(l.cancelled) cls.push('cancelled');
  const numRaw = String(l.lessonNum ?? '').trim();
  const num = esc(numRaw !== '' ? numRaw : '—');
  const subject = esc(l.subject||'');
  const timeRoom = [l.time?esc(l.time):'', l.room?esc(l.room):''].filter(Boolean).join(' • ');
  const teacher = l.teacher ? esc(l.teacher) : '';
  const hw = (l.homework||'').trim();
  const hwId = 'hw_'+String(l.id||i||Math.random()).replace(/[^a-zA-Z0-9_-]/g,'');
  const viewLabel = currentLang==='en'?'View':(currentLang==='kz'?'Көру':'Посмотреть');
  const hwLabel = currentLang==='en'?'Homework':(currentLang==='kz'?'Үй тапсырмасы':'Домашнее задание');
  const noHw = currentLang==='en'?'No homework assigned':(currentLang==='kz'?'Үй тапсырмасы берілмеген':'Домашнее задание не задано');
  const hwText = hw ? esc(hw) : `<span class="lesson-hw-empty">${noHw}</span>`;
  const canManage = (mode==='schedule') && (typeof canEditSchedule==='function' ? canEditSchedule() : roleCan(userRole(),'edit'));
  const badges=[];if(l.sor)badges.push(`<span class="sor-badge">${T('sor')}</span>`);if(l.soch)badges.push(`<span class="soch-badge">${T('soch')}</span>`);if(l.cancelled)badges.push(`<span class="lesson-cancelled-badge">${currentLang==='en'?'CANCELLED':(currentLang==='kz'?'БОЛДЫРЫЛМАДЫ':'ОТМЕНЕНО')}</span>`);
  return `<div class="${cls.join(' ')}" style="animation-delay:${Math.min((i||0)*45,360)}ms">
    <div class="lesson-main">
      <div class="lesson-num-box">${num}</div>
      <div class="lesson-body">
        <div class="lesson-topline">${timeRoom}</div>
        <div class="lesson-subject">${subject}${badges.join('')}</div>
        ${teacher?`<div class="lesson-teacher">${teacher}</div>`:''}
      </div>
      <div class="lesson-right">
        <button class="lesson-view-btn" type="button" data-hw-toggle="${hwId}">${viewLabel}</button>
        ${canManage?`<div class="lesson-admin-actions"><button class="icon-btn sm lesson-edit-btn" type="button" data-edit-lesson="${esc(l.id||'')}" aria-label="${T('edit')}">${ic('icon-edit','sm')}</button><button class="icon-btn sm red lesson-del-btn" type="button" data-del-lesson="${esc(l.id||'')}" aria-label="${T('delete')}">${ic('icon-trash','sm')}</button></div>`:''}
      </div>
    </div>
    <div class="lesson-hw" id="${hwId}">
      <div class="lesson-hw-line"></div>
      <div class="lesson-hw-title">${hwLabel}:</div>
      <div class="lesson-hw-text">${hwText}</div>
    </div>
  </div>`;
}

function weekPanelHTML(){
  const mon=currentMonday();const ai=dowIdx(selectedDate);
  const locW = getLocalizedWeekdays();
  const isMobile = window.innerWidth <= 640;
  const days=[];
  if(isMobile){
    const d=new Date(selectedDate+'T00:00:00');
    const day=d.getDay();
    const idx=day===0?6:day-1;
    const label=locW.full[idx>=0&&idx<7?idx:1] || '';
    days.push(`<button class="wp-day active" data-day="${Math.min(idx,4)}"><span class="wp-day-name">${esc(label)}</span></button>`);
  } else {
    const dnFull = [locW.short[1], locW.short[2], locW.short[3], locW.short[4], locW.short[5]];
    for(let i=0;i<5;i++){days.push(`<button class="wp-day ${i===ai?'active':''}" data-day="${i}"><span class="wp-day-name">${esc(dnFull[i])}</span></button>`);}
  }
  return `<div class="schedule-group">
    <div class="schedule-head">
      <button class="wp-arrow" id="wpPrev" type="button" aria-label="prev">&#8249;</button>
      <div class="wp-days">${days.join('')}</div>
      <button class="wp-arrow" id="wpNext" type="button" aria-label="next">&#8250;</button>
    </div>
    <div class="schedule-datebar" id="scheduleDateBar">${esc(scheduleHeaderLabel(selectedDate))}</div>
  </div>`;
}
function bindWeekPanel(){
  const prev=$('wpPrev'),next=$('wpNext');
  const isMobile=window.innerWidth<=640;
  const go = (dir)=>{
    const pane=document.querySelector('.page-pane[data-page="schedule"]');
    if(pane){pane.classList.remove('sched-anim-left','sched-anim-right'); void pane.offsetWidth; pane.classList.add(dir>0?'sched-anim-right':'sched-anim-left');}
    if(isMobile){const d=new Date(selectedDate+'T00:00:00');d.setDate(d.getDate()+dir);if(d.getDay()===0)d.setDate(d.getDate()+(dir>0?1:-2));if(d.getDay()===6)d.setDate(d.getDate()+(dir>0?2:-1));selectedDate=isoOfDate(d);}else{moveWeek(dir);}
    loadPageData(currentPage);
  };
  if(prev)prev.onclick=()=>go(-1);
  if(next)next.onclick=()=>go(1);
  document.querySelectorAll('.wp-day').forEach(b=>{
    b.onclick=()=>{
      if(isMobile) return;
      const nd=parseInt(b.dataset.day,10); const cur=dowIdx(selectedDate);
      const pane=document.querySelector('.page-pane[data-page="schedule"]');
      if(pane){pane.classList.remove('sched-anim-left','sched-anim-right'); void pane.offsetWidth; pane.classList.add(nd>=cur?'sched-anim-right':'sched-anim-left');}
      setDayOfWeek(nd);loadPageData(currentPage);
    };
  });
  document.querySelectorAll('[data-hw-toggle]').forEach(btn=>{
    btn.onclick=()=>{
      const id=btn.dataset.hwToggle;
      const card=btn.closest('.lesson-card');
      const panel=document.getElementById(id);
      if(!panel||!card)return;
      const open=card.classList.toggle('hw-open');
      panel.style.maxHeight=open?panel.scrollHeight+'px':'0px';
      btn.textContent = open ? (currentLang==='en'?'Hide':(currentLang==='kz'?'Жасыру':'Скрыть')) : (currentLang==='en'?'View':(currentLang==='kz'?'Көру':'Посмотреть'));
    };
  });
  document.querySelectorAll('[data-edit-lesson]').forEach(btn=>{
    btn.onclick=(e)=>{e.stopPropagation();const id=btn.dataset.editLesson;const l=(cacheLessons||[]).find(x=>String(x.id)===String(id)); if(l&&typeof openModal==='function') openModal(l); else if(typeof window.editLesson==='function') window.editLesson(id);};
  });
  document.querySelectorAll('[data-del-lesson]').forEach(btn=>{
    btn.onclick=async(e)=>{e.stopPropagation();const id=btn.dataset.delLesson;const ok=await showConfirm(currentLang==='en'?'Delete lesson?':'Удалить урок?', currentLang==='en'?'Lesson':'Урок'); if(ok){ if(typeof deleteLessonById==='function') deleteLessonById(id); else if(typeof window.deleteLesson==='function') window.deleteLesson(id); }};
  });
}
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
function calcDiaryAverages(){const u=getCurrentUser();if(!u)return{overall:null,days:{},hasAny:false};const email=u.email;const all=[];const days={};let hasAny=false;getLast5SchoolDays().forEach(iso=>{const ls=prefetched.scheduleByDate[iso]||[];const dg=[];ls.forEach(l=>{const e=getGrade(iso,l.id,email);if(e&&e.status==='ЕСТЬ'&&typeof e.grade==='number'){all.push(e.grade);dg.push(e.grade);hasAny=true;}});days[iso]=dg.length?+(dg.reduce((a,b)=>a+b,0)/dg.length).toFixed(1):null;});const overall=all.length?+(all.reduce((a,b)=>a+b,0)/all.length).toFixed(1):null;return{overall,days,hasAny};}

/* Material You (Expressive): плавный морфинг фигур — шестиугольник, пятиугольник, cookie, треугольник, sunny, квадрат, овал.
   Фигуры задаются радиусом по углу, углы скругляются сглаживанием, между фигурами интерполируются радиусы. */
const DiaryMorph=(function(){
  var N=180,TAU=Math.PI*2,RMS=34,PERIOD=0.72,HOLD=0.62,SHAPES=null,raf=0,t0=0;
  var reduce=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  function polygon(n){return function(a){var seg=TAU/n,f=(((a+Math.PI/2)%seg)+seg)%seg;return Math.cos(Math.PI/n)/Math.cos(f-Math.PI/n);};}
  function cookie(n,amp){return function(a){return 1+amp*Math.cos(n*(a+Math.PI/2));};}
  function oval(ra,rb){return function(a){var c=Math.cos(a),s=Math.sin(a);return 1/Math.sqrt(c*c/(ra*ra)+s*s/(rb*rb));};}
  function smooth(r,sigma){
    if(!sigma)return r;
    var k=Math.ceil(sigma*3),w=[],sum=0,i,j;
    for(i=-k;i<=k;i++){var g=Math.exp(-(i*i)/(2*sigma*sigma));w.push(g);sum+=g;}
    var out=new Array(N);
    for(i=0;i<N;i++){var acc=0;for(j=-k;j<=k;j++)acc+=r[(i+j+N*4)%N]*w[j+k];out[i]=acc/sum;}
    return out;
  }
  function build(){
    var defs=[[polygon(6),6],[polygon(5),6],[cookie(9,.1),0],[polygon(3),9],[cookie(8,.14),3],[polygon(4),8],[oval(1,.64),0]];
    SHAPES=defs.map(function(df){
      var r=[],i;
      for(i=0;i<N;i++)r.push(df[0](i/N*TAU));
      r=smooth(r,df[1]);
      var sq=0;for(i=0;i<N;i++)sq+=r[i]*r[i];
      var k=RMS/Math.sqrt(sq/N);
      return r.map(function(v){return v*k;});
    });
  }
  function easeOutBack(x){var c1=1.15,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2);}
  function draw(now){
    var p=document.getElementById('diaryMorphPath');
    if(!p)return false;
    var T=Math.max(0,(now-t0)/1000),S=SHAPES.length,idx=Math.floor(T/PERIOD),t=T/PERIOD-idx;
    var e=easeOutBack(Math.min(t/HOLD,1));
    var a=SHAPES[idx%S],b=SHAPES[(idx+1)%S],rot=(idx+e)*0.95,d='',i;
    for(i=0;i<N;i++){
      var r=a[i]+(b[i]-a[i])*e,ang=i/N*TAU+rot;
      d+=(i?'L':'M')+(r*Math.cos(ang)).toFixed(1)+' '+(r*Math.sin(ang)).toFixed(1);
    }
    p.setAttribute('d',d+'Z');
    return true;
  }
  function frame(now){
    if(!draw(now)){raf=0;return;}
    raf=requestAnimationFrame(frame);
  }
  function start(){
    if(!SHAPES)build();
    if(reduce){t0=performance.now();draw(t0);return;}
    if(raf){draw(performance.now());return;} /* страницу перерисовали — продолжаем с того же места */
    t0=performance.now();
    draw(t0);
    raf=requestAnimationFrame(frame);
  }
  return{start:start};
})();

function diaryIntroHTML(){
  return `<div class="diary-intro" id="diaryIntro"><div class="diary-intro-inner"><div class="diary-morph" aria-hidden="true"><span class="diary-morph-shape"><svg viewBox="-50 -50 100 100" class="diary-morph-svg"><path id="diaryMorphPath" fill="var(--p)"/></svg></span></div></div></div>`;
}

function diaryContentHTML(){
  const u=getCurrentUser();
  if(!u)return emptyStateHTML(currentLang==='en'?'Sign in':'Войдите в аккаунт','','icon-user');
  const data=diaryData||calcDiaryAverages();
  const intro = !window._diaryIntroDone ? diaryIntroHTML() : '';
  const banner = (window._diaryIntroDone && data.hasAny) ? getDiaryBannerHTML(data,u) : '';
  const blocks = window._diaryIntroDone ? getDiaryBlocksHTML(data) : '';
  return `<div id="diaryBannerWrap">${intro}${banner}</div><div id="diaryContentBlocks">${blocks}</div>`;
}

function initDiaryIntro(){
  if(window._diaryIntroDone) return;
  const intro=document.getElementById('diaryIntro');
  if(!intro) { window._diaryIntroDone=true; return; }
  DiaryMorph.start();
  setTimeout(()=>{
    if(!document.getElementById('diaryIntro')) return;
    intro.classList.add('hide');
    setTimeout(()=>{
      window._diaryIntroDone=true;
      if(currentPage==='diary') refreshCurrentPage();
    }, 450);
  }, 5000);
}
function dayAvgTo5(avg10){
  if(avg10==null || isNaN(avg10)) return null;
  const v = Math.round((avg10/10)*5);
  return Math.max(1, Math.min(5, v));
}
function getDiaryBannerHTML(data, u) {
  const {overall,hasAny}=data;
  if(!hasAny) return '';
  const avg10 = overall!=null ? Number(overall) : null;
  const avg5 = dayAvgTo5(avg10);
  const pct = avg10!=null ? Math.max(0,Math.min(100,(avg10/10)*100)) : 0;
  const circ=2*Math.PI*44;
  const fl=(circ*(pct/100)).toFixed(2);
  const avgLabel = currentLang==='en'?'Average grade':'Средняя оценка';
  return `<div class="diary-banner diary-banner-new">
    <div class="diary-avg-ring">
      <svg viewBox="0 0 100 100" class="diary-avg-svg">
        <circle class="diary-avg-bg" cx="50" cy="50" r="44"></circle>
        <circle class="diary-avg-fill" cx="50" cy="50" r="44" stroke-dasharray="${fl} ${circ.toFixed(2)}"></circle>
      </svg>
      <div class="diary-avg-center">${avg5!=null?avg5:'—'}</div>
    </div>
    <div class="diary-banner-mid">
      <div class="diary-banner-name">${esc(u.name||(currentLang==='en'?'Student':'Ученик'))}</div>
      <div class="diary-banner-sub">${currentLang==='en'?'Nothing':'Ничего'}</div>
    </div>
    <div class="diary-banner-right">
      <div class="diary-banner-right-label">${avgLabel}</div>
      <div class="diary-banner-right-value">${avg10!=null?avg10.toFixed(1):'—'}</div>
    </div>
  </div>`;
}
function getDiaryBlocksHTML(data) {
  const u=getCurrentUser();if(!u)return'';
  const {days}=data;const email=u.email;const days5=getLast5SchoolDays().slice().reverse();const locW=getLocalizedWeekdays();
  return days5.map(iso=>{
      const ls=prefetched.scheduleByDate[iso]||[];const info=formatRuDate(iso);const wd=locW.short[new Date(iso+'T00:00:00').getDay()];const da=days[iso];
      let lh='';
      if(!ls.length){
        lh=`<div class="diary-lesson diary-lesson-empty"><div class="diary-lesson-info"><div class="diary-lesson-subject">${esc(T('no_lessons'))}</div></div><div class="diary-grade-box empty"><span class="diary-grade-dash"></span></div></div>`;
      } else {
        lh=ls.map(l=>{
          const e=getGrade(iso,l.id,email);
          let g='<span class="diary-grade-dash"></span>', cls='diary-grade-box empty';
          if(e&&e.status==='Н'){ g='Н'; cls='diary-grade-box filled g1'; }
          else if(e&&typeof e.grade==='number'){ g=String(e.grade); cls='diary-grade-box filled '+gradeColorClass(e.grade); }
          return `<div class="diary-lesson">
            <div class="diary-lesson-info">
              <div class="diary-lesson-subject">${esc(l.subject||'—')}</div>
              <div class="diary-lesson-meta">${l.teacher?`<span>${ic('icon-user','sm')}<b>${esc(l.teacher)}</b></span>`:''}${l.room?`<span>${ic('icon-location','sm')}<b>${esc(l.room)}</b></span>`:''}</div>
            </div>
            <div class="${cls}">${g}</div>
          </div>`;
        }).join('');
      }
      const day5 = da!==null ? dayAvgTo5(da) : null;
      const tot = `<div class="day-total day-total-5"><div class="day-total-label">${T('total')}</div><div class="day-total-value ${day5==null?'empty':''}">${day5!=null?day5:'—'}</div><div class="day-total-sub">${day5!=null?(currentLang==='en'?'for day':'за день'):T('no_grades')}</div></div>`;
      return `<div class="day-block diary-day-block">
        <div class="day-head"><div class="day-date">${esc(info)} <span class="day-weekday">${esc(wd)}</span></div></div>
        <div class="day-grid diary-day-grid">
          <div class="lessons-col">${lh}</div>
          <div class="day-total-sep" aria-hidden="true"></div>
          ${tot}
        </div>
      </div>`;
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
  const tabs=[{key:'grades',icon:'icon-chart',label:currentLang==='en'?'Grades':'Оценки'},{key:'users',icon:'icon-users',label:currentLang==='en'?'Users':'Пользователи'}].filter(t=>t.key!=='users'||canManageUsers());
  if(manageTab==='users'&&!canManageUsers())manageTab='grades';
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
bindPage=function(key){_origBindPage(key);if(key==='ministry'){bindSchoolModal();bindVacationModal();}};
const _accSaveEl=$('accSave');
if(_accSaveEl){_accSaveEl.addEventListener('click',async(e)=>{e.stopImmediatePropagation();await Account.saveProfile();},true);}

function updateOnlineStatus(){if(!navigator.onLine){$('offlineOverlay').classList.add('show');}else{$('offlineOverlay').classList.remove('show');}}
window.addEventListener('online',updateOnlineStatus);
window.addEventListener('offline',updateOnlineStatus);

(async function init(){
  const revealAuth=()=>{ try{hideLoader();}catch(e){} const a=$('authView'),ap=$('appView'); if(ap) ap.classList.add('hidden'); if(a) a.classList.remove('hidden'); try{updateDocTitle();}catch(e){} };
  try{
    try{checkFields();}catch(e){console.error(e);}
    try{initAllSelects();buildGradesGrid();}catch(e){console.error(e);}
    try{Theme.init();I18N.init();initAuthLanguage();}catch(e){console.error(e);}
    try{UserMenu.init(); try{UserMenu.close();}catch(e){}}catch(e){console.error(e);}
    try{Account.init();Account.applyAvatar();}catch(e){console.error(e);}
    try{updateOnlineStatus();}catch(e){console.error(e);}
    const authThemeBtn=$('authThemeToggle');
    if(authThemeBtn){ authThemeBtn.addEventListener('click',()=>{ Theme.apply(Theme.current()==='dark'?'light':'dark'); applyAuthTranslations(); }); }
    setTimeout(()=>{ try{fitFormHeight(); updateAuthBrand(); updateAuthMerge();}catch(e){} }, 50);
    const finishAuthIntro=()=>{ const l=$('authLayout'); if(l){l.classList.remove('auth-intro'); l.classList.add('auth-ready');} };
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) finishAuthIntro(); else setTimeout(finishAuthIntro, 1200);
    const s=getSession();
    if(s&&s.user){
      showLoader();$('authView').classList.add('hidden');$('appView').classList.remove('hidden');
      try{applyUserToUI();rebuildMenu();renderPage('home');updateDocTitle();}catch(e){console.error(e);}
      requestAnimationFrame(()=>{ const av=$('appView'); if(av) av.classList.add('ready'); try{moveIndicator();}catch(e){} });
      hideLoader();
      prefetchAll(s.user).then(()=>{if(['schedule','diary','users','journal','ministry'].includes(currentPage))refreshCurrentPage();}).catch(()=>{});
    } else {
      revealAuth();
    }
  }catch(err){console.error('Init error:',err); revealAuth();}
})();

(function(){
var NS="http://www.w3.org/2000/svg",run=[],LV=0;
var $=function(i){return document.getElementById(i)};
function el(n,a){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);return e}
function sm(x){x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)}
function lin(T,get){
var s=document.createElement('div'),fill=document.createElement('div');
s.className='nc-progress-track';s.setAttribute('role','progressbar');s.setAttribute('aria-label',currentLang==='en'?'Loading':'Загрузка');s.setAttribute('aria-valuemin','0');s.setAttribute('aria-valuemax','100');
fill.className='nc-progress-fill';s.appendChild(fill);
run.push({n:s,f:function(){var value=Math.max(0,Math.min(1,Number(get())||0)),percent=Math.round(value*100);fill.style.width=percent+'%';s.setAttribute('aria-valuenow',String(percent));}});
return s}
function load(size,cont,col){
var s=el('svg',{width:size,height:size,viewBox:'0 0 48 48',role:'img','aria-label':currentLang==='en'?'Loading':'Загрузка','class':'nc-spinner'});
s.style.flex='none';
s.appendChild(el('circle',{cx:24,cy:24,r:20,class:'spinner-track'}));
var arc=el('circle',{cx:24,cy:24,r:20,class:'spinner-arc','transform':'rotate(-90 24 24)'});
if(col)arc.style.stroke=col;
s.appendChild(arc);
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
var e=typeof _loaderAt==='number'?Date.now()-_loaderAt:0,mn=typeof LOADER_MIN_MS==='number'?LOADER_MIN_MS:3000;
LV=e>=mn?1:.03+.97*sm(e/mn);
for(var i=run.length-1;i>=0;i--){var r=run[i];if(!r.n.isConnected){run.splice(i,1);continue}if(r.n.getBoundingClientRect().width>0)r.f(t)}
requestAnimationFrame(frame)}
requestAnimationFrame(frame);

})();


const DesktopShell=(function(){
  function isDesktop(){ return !!(window.pywebview && window.pywebview.api); }
  async function init(){
    if(!isDesktop()) return;
    document.body.classList.add('has-titlebar');
    const tb=appTitlebar; if(tb){tb.classList.remove('hidden'); tb.setAttribute('aria-hidden','false');}
    const min=tbMin, max=tbMax, close=tbClose;
    if(min) min.onclick=()=>{ try{window.pywebview.api.minimize();}catch(e){} };
    if(max) max.onclick=async()=>{ try{await window.pywebview.api.toggle_maximize();}catch(e){} };
    if(close) close.onclick=()=>{ try{window.pywebview.api.close();}catch(e){ window.close(); } };
    document.addEventListener('keydown',(e)=>{ if(e.key==='F11'){ e.preventDefault(); try{window.pywebview.api.toggle_fullscreen();}catch(_){}} });
  }
  return {init,isDesktop};
})();
window.addEventListener('pywebviewready', ()=>{ DesktopShell.init(); try{UserMenu.close();}catch(e){} });
document.addEventListener('DOMContentLoaded', ()=>{ setTimeout(()=>{ try{DesktopShell.init();}catch(e){} try{UserMenu.close();}catch(e){} }, 0); });


/* NovaClass — естественный снег (canvas, один слой на весь сайт) */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  var canvas = document.createElement('canvas');
  canvas.id = 'snowCanvas';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText =
    'position:fixed;left:0;top:0;width:100%;height:100%;' +
    'pointer-events:none;z-index:99990;display:block;';
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var W = 0, H = 0, dpr = 1;
  var flakes = [];
  var sprites = {};
  var theme = 'dark';
  var rafId = 0, last = 0, time = 0;

  function rand(a, b) { return a + Math.random() * (b - a); }

  /* Мягкая снежинка рисуется один раз в спрайт, дальше только drawImage */
  function makeSprite(kind) {
    var s = 64, c = document.createElement('canvas');
    c.width = c.height = s;
    var g = c.getContext('2d');
    var grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    if (kind === 'light') {
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.45, 'rgba(214,230,252,0.95)');
      grad.addColorStop(0.75, 'rgba(150,185,235,0.55)');
      grad.addColorStop(1, 'rgba(150,185,235,0)');
    } else {
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.5, 'rgba(255,255,255,0.85)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
    }
    g.fillStyle = grad;
    g.beginPath();
    g.arc(s / 2, s / 2, s / 2, 0, Math.PI * 2);
    g.fill();
    return c;
  }

  function readTheme() {
    theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function targetCount() {
    var n = Math.round((W * H) / 9000);
    return Math.max(50, Math.min(n, 200));
  }

  function createFlake(scatter) {
    /* больше мелких (далёких), меньше крупных (близких) */
    var depth = Math.pow(Math.random(), 1.8); // 0..1
    var r = 1.3 + depth * 3.4;
    return {
      x: rand(0, W),
      y: scatter ? rand(-20, H) : rand(-60, -r * 2),
      r: r,
      vy: 22 + depth * 48 + rand(-6, 6),
      alpha: 0.35 + depth * 0.55,
      phase: rand(0, Math.PI * 2),
      swayAmp: rand(8, 22) * (0.5 + depth),
      swaySpeed: rand(0.4, 1.2),
      depth: depth
    };
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var want = targetCount();
    while (flakes.length < want) flakes.push(createFlake(true));
    if (flakes.length > want) flakes.length = want;
    for (var i = 0; i < flakes.length; i++) {
      if (flakes[i].x > W) flakes[i].x = rand(0, W);
    }
  }

  function frame(now) {
    rafId = requestAnimationFrame(frame);
    var dt = (now - last) / 1000;
    last = now;
    if (dt > 0.05) dt = 0.05; // защита от скачков после паузы
    if (dt <= 0) return;
    time += dt;

    /* плавный порывистый ветер */
    var wind = Math.sin(time * 0.17) * 14 + Math.sin(time * 0.53 + 1.3) * 7;

    ctx.clearRect(0, 0, W, H);
    var sprite = sprites[theme];

    for (var i = 0; i < flakes.length; i++) {
      var f = flakes[i];
      f.y += f.vy * dt;
      f.x += (wind * (0.4 + f.depth) + Math.sin(time * f.swaySpeed + f.phase) * f.swayAmp) * dt;

      if (f.x < -f.r * 2) f.x = W + f.r;
      else if (f.x > W + f.r * 2) f.x = -f.r;

      if (f.y > H + f.r * 2) {
        /* заново сверху в случайном месте со случайными параметрами */
        flakes[i] = f = createFlake(false);
      }

      ctx.globalAlpha = f.alpha;
      var d = f.r * 2;
      ctx.drawImage(sprite, f.x - f.r, f.y - f.r, d, d);
    }
    ctx.globalAlpha = 1;
  }

  function start() {
    if (rafId) return;
    last = performance.now();
    rafId = requestAnimationFrame(frame);
  }
  function stop() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }

  sprites.dark = makeSprite('dark');
  sprites.light = makeSprite('light');
  readTheme();
  resize();

  var rt = 0;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(resize, 120);
  });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });

  /* смена светлой/тёмной темы подхватывается сразу */
  new MutationObserver(readTheme).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

  start();
})();
