import { 
  ShieldAlert, 
  Map as MapIcon, 
  FileText, 
  Menu, 
  X, 
  AlertTriangle,
  CheckCircle,
  Search,
  Upload,
  Calendar,
  MapPin,
  Users,
  Globe,
  GraduationCap,
  Briefcase,
  HeartHandshake,
  Facebook,
  Twitter,
  Linkedin,
  Newspaper,
  LayoutDashboard,
  Settings,
  Home,
  ShieldCheck,
  Clock,
  FileVideo,
  BookOpen,
  Handshake,
  Lightbulb,
  Award,
  Mail,
  Building2,
  UserPlus,
  LayoutTemplate,
  Share2,
  FileUp,
  Link,
  MessageCircle,
  FileSearch2,
  Youtube,
} from 'lucide-react';
import { Violation, Report, TrainingCourse, ViolationType, Governorate, Severity, NewsArticle, Project, Event, TeamMember, NewsletterSubscriber, JobPosting, Slide } from './types';

export const ICONS = {
  Home: Home,
  Observatory: MapIcon,
  FactCheck: ShieldCheck,
  Reports: FileText,
  Panic: ShieldAlert,
  Menu: Menu,
  Close: X,
  Alert: AlertTriangle,
  Success: CheckCircle,
  Search: Search,
  Upload: Upload,
  Calendar: Calendar,
  Location: MapPin,
  Users: Users,
  Globe: Globe,
  CapacityBuilding: GraduationCap,
  Careers: Briefcase,
  Volunteer: HeartHandshake,
  Facebook: Facebook,
  Twitter: Twitter,
  Linkedin: Linkedin,
  Whatsapp: MessageCircle,
  News: Newspaper,
  Dashboard: LayoutDashboard,
  Settings: Settings,
  Clock: Clock,
  FileVideo: FileVideo,
  BookOpen: BookOpen,
  Partners: Handshake,
  Projects: Lightbulb,
  Events: Award,
  Mail: Mail,
  About: Building2,
  GetInvolved: UserPlus,
  // FIX: Added missing UserPlus icon to the ICONS map to be used in the admin dashboard.
  UserPlus: UserPlus,
  Pages: LayoutTemplate,
  Share: Share2,
  FileUp: FileUp,
  Link: Link,
  FileSearch2: FileSearch2,
  Youtube: Youtube,
};

export const MOCK_SLIDES: Slide[] = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop",
    title: "ندافع عن الكلمة الحرة",
    description: "نعمل من أجل بيئة إعلامية آمنة ومستقلة في اليمن عبر الرصد والتوثيق والدعم القانوني وبناء القدرات.",
    button1Text: "أبلغ عن انتهاك",
    button1Link: "observatory",
    button2Text: "آخر تقاريرنا",
    button2Link: "reports",
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
    title: "بناء قدرات الصحفيين",
    description: "نقدم برامج تدريبية متخصصة لتطوير المهارات المهنية والأمان الرقمي للصحفيين لمواكبة تحديات العصر.",
    button1Text: "اكتشف دوراتنا",
    button1Link: "training",
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=2070&auto=format&fit=crop",
    title: "كن شريكاً في دعمنا",
    description: "مساهمتك، سواء بالوقت أو الخبرة، تساعدنا على الاستمرار في الدفاع عن الأصوات الحرة في اليمن.",
    button1Text: "تطوع معنا",
    button1Link: "get_involved",
  }
];

export const MOCK_VIOLATIONS: Violation[] = [
  // January 2025
  { id: 1, title: 'استجواب الصحفي حمدي دوبلة', type: ViolationType.CENSORSHIP, governorate: Governorate.SANAA, date: '2025-01-10', severity: Severity.MEDIUM, description: 'تم استدعاء الصحفي حمدي دوبلة و3 آخرين لنيابة الصحافة بتهمة "نشر أخبار تضر بالسلم العام".', victimCount: 4 },
  { id: 2, title: 'اعتداء على الصحفي طه صالح', type: ViolationType.ASSAULT, governorate: Governorate.TAIZ, date: '2025-01-15', severity: Severity.HIGH, description: 'تعرض الصحفي طه صالح لاعتداء بالضرب ومصادرة كاميرته من قبل أفراد أمنيين.', victimCount: 1 },
  { id: 3, title: 'منع من التصوير في وقفة احتجاجية', type: ViolationType.CENSORSHIP, governorate: Governorate.TAIZ, date: '2025-01-15', severity: Severity.MEDIUM, description: 'تم منع طاقم صحفي من تغطية وقفة احتجاجية.', victimCount: 1 },
  { id: 4, title: 'احتجاز المصور علي بن سعد', type: ViolationType.KIDNAPPING, governorate: Governorate.MARIB, date: '2025-01-20', severity: Severity.LOW, description: 'تم توقيف المصور علي بن سعد في نقطة أمنية ومنعه من الدخول لمعدات التصوير.', victimCount: 1 },
  { id: 5, title: 'تهديد صحفي مستقل', type: ViolationType.THREAT, governorate: Governorate.OTHER, date: '2025-01-25', severity: Severity.MEDIUM, description: 'تلقى صحفي تهديداً هاتفياً من جهة أمنية في شبوة بسبب منشورات تنتقد السلطة المحلية.', victimCount: 1 },

  // February 2025
  { id: 6, title: 'محاكمة جماعية لـ14 صحفياً', type: ViolationType.CENSORSHIP, governorate: Governorate.SANAA, date: '2025-02-05', severity: Severity.CRITICAL, description: 'عقدت جلسات محاكمة لـ 14 صحفياً بتهم "التخابر مع دول أجنبية"، وصدرت ضدهم أحكام مشددة.', victimCount: 14 },
  { id: 7, title: 'اعتقال الصحفي أحمد ماهر', type: ViolationType.KIDNAPPING, governorate: Governorate.ADEN, date: '2025-02-12', severity: Severity.HIGH, description: 'داهمت قوات "الحزام الأمني" منزل الصحفي أحمد ماهر واقتادته للتحقيق.', victimCount: 1 },
  { id: 8, title: 'مداهمة منزل الصحفي فؤاد مسعد', type: ViolationType.CENSORSHIP, governorate: Governorate.ADEN, date: '2025-02-12', severity: Severity.HIGH, description: 'داهمت قوات "الحزام الأمني" منزل الصحفي فؤاد مسعد بسبب آرائه المنشورة.', victimCount: 1 },
  { id: 9, title: 'تحريض ضد صحفي بالضالع', type: ViolationType.THREAT, governorate: Governorate.OTHER, date: '2025-02-18', severity: Severity.MEDIUM, description: 'تعرض صحفي في الضالع لحملة تشهير وتحريض واسعة.', victimCount: 1 },
  { id: 10, title: 'منع عمل طواقم إعلامية', type: ViolationType.CENSORSHIP, governorate: Governorate.HADRAMAUT, date: '2025-02-20', severity: Severity.MEDIUM, description: 'تم منع طواقم إعلامية من دخول مرافق حكومية بقرار إداري.', victimCount: 3 },

  // March 2025
  { id: 11, title: 'استدعاء الصحفي طارق باسلوم', type: ViolationType.CENSORSHIP, governorate: Governorate.HADRAMAUT, date: '2025-03-08', severity: Severity.MEDIUM, description: 'خضع الصحفي طارق باسلوم لتحقيق مطول في إدارة البحث الجنائي بالمكلا.', victimCount: 1 },
  { id: 12, title: 'استدعاء الصحفي علي العوبثاني', type: ViolationType.CENSORSHIP, governorate: Governorate.HADRAMAUT, date: '2025-03-08', severity: Severity.MEDIUM, description: 'خضع الصحفي علي العوبثاني لتحقيق مطول بسبب تحقيقات استقصائية عن "الفساد الإداري".', victimCount: 1 },
  { id: 13, title: 'حملة تحريض ضد هيام القاسمي', type: ViolationType.THREAT, governorate: Governorate.TAIZ, date: '2025-03-15', severity: Severity.HIGH, description: 'رصد المرصد حملة تحريض واسعة ضد الصحفية هيام القاسمي اتهمتها بـ"الخيانة الوطنية".', victimCount: 1 },
  { id: 14, title: 'اقتحام وإغلاق مؤسسة إعلامية', type: ViolationType.CENSORSHIP, governorate: Governorate.SANAA, date: '2025-03-22', severity: Severity.HIGH, description: 'اقتحمت سلطات الحوثي مقر مؤسسة إعلامية وصادرت أجهزتها.', victimCount: 5 },

  // April 2025
  { id: 15, title: 'استشهاد المصور مصعب الحطامي', type: ViolationType.KILLING, governorate: Governorate.MARIB, date: '2025-04-07', severity: Severity.CRITICAL, description: 'استشهاد المصور مصعب الحطامي بانفجار عبوة ناسفة زُرعت في سيارته.', victimCount: 1 },
  { id: 16, title: 'إصابة صحفي مرافق', type: ViolationType.ASSAULT, governorate: Governorate.MARIB, date: '2025-04-07', severity: Severity.CRITICAL, description: 'إصابة صحفي مرافق لمصعب الحطامي بجروح خطيرة في نفس الحادث.', victimCount: 1 },
  { id: 17, title: 'اعتقال الصحفي عوض كشميم', type: ViolationType.KIDNAPPING, governorate: Governorate.HADRAMAUT, date: '2025-04-14', severity: Severity.HIGH, description: 'اعتقلت قوات أمنية الصحفي عوض كشميم من الشارع العام دون توجيه تهمة.', victimCount: 1 },
  { id: 18, title: 'إخفاء قسري للكاتب محمد المياحي', type: ViolationType.KIDNAPPING, governorate: Governorate.SANAA, date: '2025-04-20', severity: Severity.CRITICAL, description: 'استمرار إخفاء الصحفي والكاتب محمد المياحي ونقله إلى زنازين انفرادية.', victimCount: 1 },

  // May 2025
  { id: 19, title: 'حملة اعتقالات بالحديدة', type: ViolationType.KIDNAPPING, governorate: Governorate.HODEIDAH, date: '2025-05-10', severity: Severity.HIGH, description: 'شن الحوثيون حملة اعتقالات طالت 10 إعلاميين وناشطين منهم منصور الدبعي.', victimCount: 10 },
  { id: 20, title: 'مصادرة معدات مصورين في عدن', type: ViolationType.CENSORSHIP, governorate: Governorate.ADEN, date: '2025-05-18', severity: Severity.MEDIUM, description: 'تم احتجاز 5 مصورين ميدانيين، من بينهم صالح العبيدي، ومصادرة كاميراتهم.', victimCount: 5 },
  { id: 21, title: 'اعتداء على الصحفي نايف الوافي', type: ViolationType.ASSAULT, governorate: Governorate.TAIZ, date: '2025-05-25', severity: Severity.HIGH, description: 'تعرض الصحفي نايف الوافي لاعتداء من قبل مسلحين لمنعه من توثيق انتهاكات.', victimCount: 1 },
  { id: 22, title: 'قرارات مقيدة للتصوير', type: ViolationType.CENSORSHIP, governorate: Governorate.SANAA, date: '2025-05-30', severity: Severity.LOW, description: 'إصدار لوائح تمنع التصوير بالهواتف الذكية في الأماكن العامة.', victimCount: 4 },

  // June 2025
  { id: 23, title: 'حملة تشهير ضد مايا العبسي', type: ViolationType.THREAT, governorate: Governorate.ADEN, date: '2025-06-05', severity: Severity.HIGH, description: 'استهداف المذيعة مايا العبسي بحملات تشهير أخلاقية ممنهجة.', victimCount: 1 },
  { id: 24, title: 'حملة تشهير ضد صحفيات قناة بلقيس', type: ViolationType.THREAT, governorate: Governorate.SANAA, date: '2025-06-05', severity: Severity.HIGH, description: 'استهداف صحفيات في قناة بلقيس بحملات تشهير ممنهجة.', victimCount: 3 },
  { id: 25, title: 'إيقاف المذيع محمد باحفين', type: ViolationType.CENSORSHIP, governorate: Governorate.HADRAMAUT, date: '2025-06-15', severity: Severity.MEDIUM, description: 'إيقاف المذيع محمد باحفين عن العمل في إذاعة محلية بسبب انتقادات للسلطة.', victimCount: 1 },
  { id: 26, title: 'ملاحقة الصحفي صبري بن مخاشن', type: ViolationType.CENSORSHIP, governorate: Governorate.HADRAMAUT, date: '2025-06-20', severity: Severity.MEDIUM, description: 'ملاحقة الصحفي صبري بن مخاشن قانونياً بسبب انتقادات للسلطة المحلية.', victimCount: 1 },

  // July 2025
  { id: 27, title: 'اختطاف وإخفاء الصحفي ناصح شاكر', type: ViolationType.KIDNAPPING, governorate: Governorate.ADEN, date: '2025-07-10', severity: Severity.CRITICAL, description: 'تعرض الصحفي ناصح شاكر للاختطاف من قبل جهة أمنية وإخفائه لأكثر من أسبوع.', victimCount: 1 },
  { id: 28, title: 'منع الصحفي عبدالجبار باجبير من السفر', type: ViolationType.CENSORSHIP, governorate: Governorate.HADRAMAUT, date: '2025-07-22', severity: Severity.MEDIUM, description: 'منع الصحفي عبدالجبار باجبير من مغادرة البلاد عبر المطارات والمنافذ البرية.', victimCount: 1 },
  { id: 29, title: 'منع الصحفي يحيى الثلايا من السفر', type: ViolationType.CENSORSHIP, governorate: Governorate.MARIB, date: '2025-07-25', severity: Severity.MEDIUM, description: 'منع الصحفي يحيى الثلايا من مغادرة البلاد ومصادرة وثائق سفره.', victimCount: 1 },
];


export const MOCK_REPORTS: Report[] = [
  {
    id: 101,
    title: "تقرير الحريات الصحفية السنوي في اليمن 2023",
    summary: "رصد شامل لكافة الانتهاكات التي طالت الصحفيين والمؤسسات الإعلامية خلال العام المنصرم، مع تحليل للأنماط والتوصيات.",
    date: "2024-01-15",
    pdfUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=2070&auto=format&fit=crop",
    category: "سنوي"
  },
  {
    id: 102,
    title: "تقرير نوعي: خطاب الكراهية في الإعلام اليمني",
    summary: "تحليل لمحتوى 50 وسيلة إعلامية ورصد مخالفات معايير الصحافة المهنية، وكيف يساهم الإعلام في تأجيج الصراع.",
    date: "2023-11-30",
    pdfUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?q=80&w=2070&auto=format&fit=crop",
    category: "نوعي"
  },
  {
    id: 103,
    title: "تحقيق: التضليل الإعلامي في زمن الحرب",
    summary: "يكشف هذا التحقيق عن شبكات منظمة تعمل على نشر الأخبار المضللة وتأثيرها على الرأي العام والعمليات العسكرية.",
    date: "2023-08-20",
    pdfUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070&auto=format&fit=crop",
    category: "استقصائي",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];

export const MOCK_VERIFIED_NEWS = [
    {
        id: 301,
        title: "صورة متداولة لقرار حكومي جديد بشأن أسعار الوقود",
        source: "منصات التواصل الاجتماعي",
        status: "زائف",
        date: "2024-07-28",
        link: "#"
    },
    {
        id: 302,
        title: "تصريح منسوب لمسؤول دولي حول المساعدات الإنسانية لليمن",
        source: "وكالة أنباء محلية",
        status: "مضلل",
        date: "2024-07-27",
        link: "#"
    },
    {
        id: 303,
        title: "افتتاح مشروع مياه جديد في محافظة مأرب",
        source: "بيان رسمي",
        status: "صحيح",
        date: "2024-07-26",
        link: "#"
    }
];

export const MOCK_NEWS_ARTICLES: NewsArticle[] = [
    {
        id: 401,
        title: "بيت الصحافة يدين استهداف طاقم قناة تلفزيونية في مأرب",
        summary: "أصدر بيت الصحافة بياناً شديد اللهجة يدين فيه الحادث الذي تعرض له فريق قناة 'يمن شباب' أثناء تغطيتهم للأحداث الأخيرة في محافظة مأرب.",
        content: "تفاصيل كاملة عن البيان...",
        date: "2024-07-29",
        imageUrl: "https://images.unsplash.com/photo-1505238680356-667803448bb6?q=80&w=2070&auto=format&fit=crop",
        category: "بيانات"
    },
    {
        id: 402,
        title: "اختتام الدورة التدريبية حول صحافة الموبايل في عدن",
        summary: "اختتمت يوم الخميس الماضي فعاليات الدورة التدريبية المكثفة حول 'صحافة الموبايل' والتي نظمها بيت الصحافة بالتعاون مع منظمة دعم الإعلام الدولي.",
        content: "تفاصيل كاملة عن الدورة...",
        date: "2024-07-25",
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
        category: "أنشطة",
        videoUrl: "https://www.youtube.com/embed/rokGy0huYEA"
    },
    {
        id: 403,
        title: "ورشة عمل تناقش تحديات الصحفيات في اليمن",
        summary: "نظم بيت الصحافة حلقة نقاشية موسعة حول التحديات التي تواجه النساء العاملات في الحقل الصحفي في اليمن، بحضور نخبة من الصحفيات والأكاديميات.",
        content: "تفاصيل كاملة عن الورشة...",
        date: "2024-07-22",
        imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
        category: "فعاليات"
    },
];

export const MOCK_TRAINING_COURSES: TrainingCourse[] = [
  {
    id: 201,
    title: "دورة السلامة الرقمية للصحفيين",
    description: "تزويد الصحفيين بالمهارات اللازمة لحماية بياناتهم وتأمين اتصالاتهم في البيئات عالية المخاطر.",
    date: "2024-09-15",
    duration: "3 أيام",
    status: 'upcoming',
    instructor: "خبير أمن رقمي دولي",
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 202,
    title: "ورشة عمل حول صحافة البيانات",
    description: "كيفية استخدام البيانات المفتوحة لإنشاء قصص صحفية مؤثرة ومدعومة بالأدلة.",
    date: "2024-10-05",
    duration: "5 أيام",
    status: 'upcoming',
    instructor: "فريق 데이터 저널리즘 코리아",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 203,
    title: "التصوير الصحفي في مناطق النزاع",
    description: "تدريب عملي على تقنيات التصوير الآمن والأخلاقي في البيئات الصعبة.",
    date: "2024-06-20",
    duration: "4 أيام",
    status: 'completed',
    instructor: "مصور حائز على جوائز",
    image: "https://images.unsplash.com/photo-1517374462432-3f892005a396?q=80&w=1974&auto=format&fit=crop"
  },
];

export const MOCK_PROJECTS: Project[] = [
    {
        id: 501,
        title: "مشروع 'صوت حر': دعم الإعلام المستقل",
        summary: "يهدف المشروع إلى تقديم منح إنتاجية صغيرة للصحفيين المستقلين والمنصات الناشئة لإنتاج محتوى عالي الجودة حول قضايا الحوكمة والمساءلة.",
        status: 'ongoing',
        imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop',
        donorLogoUrl: 'https://logo.clearbit.com/un.org'
    },
    {
        id: 502,
        title: "برنامج 'مناصَرة': الحماية القانونية للصحفيين",
        summary: "يوفر البرنامج شبكة من المحامين المتطوعين لتقديم الدعم والاستشارة القانونية للصحفيين الذين يواجهون تهديدات أو ملاحقات قضائية بسبب عملهم.",
        status: 'ongoing',
        imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2beda22?q=80&w=2070&auto=format&fit=crop',
        donorLogoUrl: 'https://logo.clearbit.com/rsf.org'
    },
    {
        id: 503,
        title: "مشروع 'الأرشيف': توثيق ذاكرة الصحافة اليمنية",
        summary: "عمل المشروع على أرشفة ورقمنة آلاف الوثائق والصحف والمجلات التاريخية للحفاظ على الإرث الصحفي اليمني وإتاحته للباحثين والجمهور.",
        status: 'completed',
        imageUrl: 'https://images.unsplash.com/photo-1549924231-f129b911e4f4?q=80&w=2070&auto=format&fit=crop',
        donorLogoUrl: 'https://logo.clearbit.com/google.com'
    }
];

export const MOCK_EVENTS: Event[] = [
    {
        id: 601,
        title: "حفل إطلاق التقرير السنوي للحريات الصحفية",
        description: "ندعوكم لحضور حفل إطلاق تقريرنا السنوي الذي يرصد واقع الحريات الإعلامية في اليمن، بحضور نخبة من الصحفيين والدبلوماسيين وممثلي المنظمات الدولية.",
        date: "2025-01-30",
        time: "10:00 AM",
        location: "فندق البستان، صنعاء",
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
        type: 'event'
    },
    {
        id: 602,
        title: "نشاط اليوم العالمي لحرية الصحافة",
        description: "وقفة تضامنية ومعرض صور يسلط الضوء على تضحيات الصحفيين اليمنيين، وذلك بمناسبة اليوم العالمي لحرية الصحافة.",
        date: "2024-05-03",
        time: "11:00 AM",
        location: "أمام نقابة الصحفيين، عدن",
        imageUrl: 'https://images.unsplash.com/photo-1620368297793-2470a7931046?q=80&w=1964&auto=format&fit=crop',
        type: 'activity'
    }
];

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
    { id: 701, name: "علي محسن القحطاني", title: "المدير التنفيذي", imageUrl: "https://i.pravatar.cc/150?u=person1", email: "ali@example.com", phone: "+967777111111" },
    { id: 702, name: "فاطمة أحمد العبسي", title: "مديرة البرامج", imageUrl: "https://i.pravatar.cc/150?u=person2", email: "fatima@example.com", phone: "+967777222222" },
    { id: 703, name: "خالد صالح الحميدي", title: "مسؤول الرصد والتوثيق", imageUrl: "https://i.pravatar.cc/150?u=person3", email: "khaled@example.com", phone: "+967777333333" },
    { id: 704, name: "سارة عبدالله اليماني", title: "مسؤولة الإعلام والاتصال", imageUrl: "https://i.pravatar.cc/150?u=person4", email: "sara@example.com", phone: "+967777444444" },
];

export const MOCK_ADMINISTRATIVE_BOARD: TeamMember[] = [
    { id: 801, name: "عبدالرحمن اليافعي", title: "رئيس مجلس الإدارة", imageUrl: "https://i.pravatar.cc/150?u=person5", email: "abdulrahman@example.com", phone: "" },
    { id: 802, name: "مريم الحضرمي", title: "نائب رئيس مجلس الإدارة", imageUrl: "https://i.pravatar.cc/150?u=person6", email: "maryam@example.com", phone: "" },
    { id: 803, name: "أحمد السنباني", title: "أمين الصندوق", imageUrl: "https://i.pravatar.cc/150?u=person7", email: "ahmed@example.com", phone: "" },
    { id: 804, name: "نورة المأربي", title: "عضو مجلس الإدارة", imageUrl: "https://i.pravatar.cc/150?u=person8", email: "noura@example.com", phone: "" },
];

export const MOCK_ADVISORY_BOARD: TeamMember[] = [
    { id: 901, name: "د. إبراهيم النهاري", title: "خبير قانوني", imageUrl: "https://i.pravatar.cc/150?u=person9", email: "", phone: "" },
    { id: 902, name: "أ. ليلى الشامي", title: "خبيرة إعلامية دولية", imageUrl: "https://i.pravatar.cc/150?u=person10", email: "", phone: "" },
    { id: 903, name: "م. ياسين الصبري", title: "خبير في السلامة الرقمية", imageUrl: "https://i.pravatar.cc/150?u=person11", email: "", phone: "" },
];

export const MOCK_PARTNERS = [
    { name: "United Nations", logo: "https://logo.clearbit.com/un.org" },
    { name: "Reporters Without Borders", logo: "https://logo.clearbit.com/rsf.org" },
    { name: "International Media Support", logo: "https://logo.clearbit.com/mediasupport.org" },
    { name: "Google News Initiative", logo: "https://logo.clearbit.com/google.com" },
    { name: "Free Press Unlimited", logo: "https://logo.clearbit.com/freepressunlimited.org" },
];

export const MOCK_SUBSCRIBERS: NewsletterSubscriber[] = [
    { id: 1, email: 'subscriber1@example.com', subscriptionDate: '2024-07-01', status: 'subscribed' },
    { id: 2, email: 'subscriber2@example.com', subscriptionDate: '2024-07-05', status: 'subscribed' },
    { id: 3, email: 'subscriber3@example.com', subscriptionDate: '2024-07-10', status: 'unsubscribed' },
];

export const MOCK_JOB_POSTINGS: JobPosting[] = [
    { id: 1, title: 'مسؤول رصد وتوثيق ميداني', description: 'مطلوب باحث ميداني لجمع وتوثيق الانتهاكات في محافظة تعز.', type: 'vacancy', closingDate: '2024-08-30', status: 'open' },
    { id: 2, title: 'متطوع في مجال الترجمة (عربي-إنجليزي)', description: 'دعوة للمتطوعين للمساعدة في ترجمة تقارير المنظمة إلى اللغة الإنجليزية.', type: 'volunteer', closingDate: '2024-09-15', status: 'open' },
];