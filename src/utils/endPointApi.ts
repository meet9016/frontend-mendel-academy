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
    postAddQbankPlanToCart?: string; // ✅ NEW
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
    getQBankTree?: string;
    getQuestionBankByTopic?: string;
    createTestAttempt?: string;
    listTestAttempts?: string;
    getTestAttemptDetail?: string;
    completeTestAttempt?: string;
    listDemoQuestions?: string;
    createDemoQuestion?: string;
    updateDemoQuestion?: string;
    deleteDemoQuestion?: string;

    getActivePlans?: string;
    saveQuestionAnswer?: string;
    bulkSaveAnswers?: string;
    saveQuestionNote?: string;
    toggleQuestionMark?: string;
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
    postAddQbankPlanToCart: 'cart/add-qbank-plan', // ✅ NEW
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
    getQBankTree: 'subject/getQBankTree',
    getQuestionBankByTopic: 'subject/getQuestionBankByTopic',
    createTestAttempt: 'test-attempt/create',
    listTestAttempts: 'test-attempt/list',
    getTestAttemptDetail: 'test-attempt/getDetail',
    completeTestAttempt: 'test-attempt/complete',
    listDemoQuestions: 'demo-question/list',
    createDemoQuestion: 'demo-question/create',
    updateDemoQuestion: 'demo-question',
    deleteDemoQuestion: 'demo-question',
    getActivePlans: 'plans/get-active-plans',
    saveQuestionAnswer: 'test-attempt/questions/answer',
    bulkSaveAnswers: 'test-attempt/questions/bulk',
    saveQuestionNote: 'test-attempt/questions/note',
    toggleQuestionMark: 'test-attempt/questions/mark',
};

export default endPointApi;
