export interface EndPointApi {
    login: string;
    register: string;
    logout: string;
    getProfile: string;
    updateProfile: string;
    updateProfilePhoto: string;

    //Blogs
    getAllBlogs?: string;
    getBlogById?: string;

    //Question
    getAllQuestion?: string;

    //Pre-Recorded
    getAllPreRecorded?: string;
    getPreRecordedById?: string;
    postPaymentCreate?: string;
    postPaymentVerify?: string;

    //medical exam
    getAppMedicalExam?: string;
    getMedicalById?: string;
    getAllMedical?: string;

    //my cart
    getCart?: string;
    postCreateAddToCart?: string;
    postAddExamPlanToCart?: string;
    postAddHyperSpecialistToCart?: string;
    postAddLiveCoursesToCart?: string;
    postAddRapidToolToCart?: string; // ✅ NEW
    cartCount?: string;
    removeCart?: string;
    removeCartOption?: string;

    //checkout
    getcheckoutTempId: string;

    //faq
    getAllFaq?: string;

    //User Reagister
    userRagisterCreate?: string;

    //Payment
    verifyStripePayment: string;
    createStripePaymentIntent: string;
    getPlan: string;

    //UpComing Program
    getUpComingProgram: string;

    //LiveCourses
    getAllLiveCourses?: string;
    getLiveCourseById?: string; // ✅ NEW (optional, for fetching single course)

    //Hyper-Specialist
    createHyperSpecialist?: string;
    getAllHyperSpecialist?: string;

    //Terms & Conditions
    getAllTermsAndConditions?: string;

    //Question bank (subjects/chapters/topics/questions)
    getAllSubject?: string;
    getAllChapters?: string;
    getTopicByChapter?: string;
    getQuestionBankByTopic?: string;
    getQuestionStatsBySubject?: string;
    getChapterStatsBySubject?: string;
    getQBankTree?: string;
}

// Define and export the API endpoint object
const endPointApi: EndPointApi = {
    login: 'auth/login',
    register: 'auth/register',
    logout: 'auth/logout',
    getProfile: 'auth/profile',
    updateProfile: 'auth/profile',
    updateProfilePhoto: 'auth/profile-photo',

    //Blogs
    getAllBlogs: 'blogs/getall',
    getBlogById: 'blogs/getById',

    //Question
    getAllQuestion: 'question/getall',

    //Pre-Recorded
    getAllPreRecorded: 'prerecorded/getall',
    getPreRecordedById: 'prerecorded/getById',

    //Add to cart
    postPaymentCreate: 'payment/create',
    postPaymentVerify: 'payment/verify-payment',

    //medical exam
    getAppMedicalExam: 'examlist/exam-category-list',
    getMedicalById: 'examlist/getById',
    getAllMedical: 'examlist/getall',

    //my cart
    getCart: 'cart/get',
    postCreateAddToCart: 'cart/create',
    postAddExamPlanToCart: 'cart/add-exam-plan',
    postAddHyperSpecialistToCart: 'cart/add-hyperspecialist',
    postAddLiveCoursesToCart: 'cart/add-livecourse',
    postAddRapidToolToCart: 'cart/add-rapid-tool', // ✅ NEW
    cartCount: 'cart/count',
    removeCart: 'cart/remove',
    removeCartOption: '/cart/remove-option',

    //checkout
    getcheckoutTempId: 'cart/get-checkout',

    //faq
    getAllFaq: 'faq/getall',

    //User Reagister
    userRagisterCreate: 'contactus/create',

    //Payment
    verifyStripePayment: 'payment/verify-payment-stripe',
    createStripePaymentIntent: 'payment/create-payment-intent',
    getPlan: 'examlist/get-plan',

    //UpComing Program
    getUpComingProgram: 'upcomming-program/getall',

    //LiveCourses
    getAllLiveCourses: 'livecourses/getLiveData',
    getLiveCourseById: 'livecourses/getById', // ✅ NEW (optional)

    //Hyper-Specialist
    getAllHyperSpecialist: 'hyperspecialist/getall',

    //Terms & Conditions
    getAllTermsAndConditions: 'terms-conditions/get',

    //Question bank (subjects/chapters/topics/questions)
    getAllSubject: 'subject/getall',
    getAllChapters: 'chapter/getall',
    getTopicByChapter: 'topic/get-by-chapter',
    getQuestionBankByTopic: 'questions/get-by-topic',
    getQuestionStatsBySubject: 'questions/stats/subjects',
    getChapterStatsBySubject: 'questions/stats/chapters-by-subject',
    getQBankTree: 'subject/getQBankTree',
};

export default endPointApi;
