import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        examsTime: "EXAMS TIME",
        announcements: "Announcements",
        whatsDue: "What's due",
        // Sidebar translations
        sidebar: {
          dashboard: "Dashboard",
          courses: "Courses",
          quizzes: "Quizzes",
          announcements: "Announcements",
          grades: "Grades",
          calendar: "Calendar",
          profile: "Profile",
          settings: "Settings",
          logout: "Logout",
          performance: "Performance",
        },
        // Dashboard specific translations
        dashboard: {
          title: "Dashboard",
          examsTime: {
            title: "EXAMS TIME",
            subtitle:
              "Here we are. Are you ready to fight? Don't worry, we prepared some tips to be ready for your exams",
            quote: '"Nothing happens until something moves." - Albert Einstein',
            viewTipsButton: "View exams tips",
          },
          announcements: {
            title: "Announcements",
            allButton: "All",
            loading: "Loading announcements...",
            error: "Error loading announcements",
          },
          whatsDue: {
            title: "What's due",
            allButton: "All",
            startQuizButton: "Start Quiz",
            questions: "Questions",
            due: "Due",
            topic: "Topic",
            quiz: "Quiz",
            loading: "Loading quizzes...",
            error: "Error loading quizzes",
          },
        },
      },
    },
    ar: {
      translation: {
        welcome: "مرحباً",
        examsTime: "وقت الامتحانات",
        announcements: "الإعلانات",
        whatsDue: "المهام المستحقة",
        // Sidebar translations
        sidebar: {
          dashboard: "لوحة التحكم",
          courses: "المقررات",
          quizzes: "الاختبارات",
          announcements: "الإعلانات",
          grades: "الدرجات",
          calendar: "التقويم",
          profile: "الملف الشخصي",
          settings: "الإعدادات",
          logout: "تسجيل الخروج",
          performance: "اداء الطلاب",
        },
        // Dashboard specific translations
        dashboard: {
          title: "لوحة التحكم",
          examsTime: {
            title: "وقت الامتحانات",
            subtitle:
              "ها نحن هنا. هل أنت مستعد للمعركة؟ لا تقلق، لقد أعددنا بعض النصائح لتكون جاهزاً لامتحاناتك",
            quote: '"لا شيء يحدث حتى يتحرك شيء ما." - ألبرت أينشتاين',
            viewTipsButton: "عرض نصائح الامتحانات",
          },
          announcements: {
            title: "الإعلانات",
            allButton: "الكل",
            loading: "جاري تحميل الإعلانات...",
            error: "خطأ في تحميل الإعلانات",
          },
          whatsDue: {
            title: "المهام المستحقة",
            allButton: "الكل",
            startQuizButton: "بدء الاختبار",
            questions: "أسئلة",
            due: "مستحق",
            topic: "الموضوع",
            quiz: "اختبار",
            loading: "جاري تحميل الاختبارات...",
            error: "خطأ في تحميل الاختبارات",
          },
        },
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
