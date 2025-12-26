export interface EndPointApi {
    login: string;
    register: string;
    logout: string;
    getProfile: string;

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
    postAddExamPlanToCart?: string; // ✅ NEW
    cartCount?: string;
    removeCart?: string;
    removeCartOption?: string;

    //checkout
    getcheckoutTempId: string,

    //faq
    getAllFaq?: string;

    //User Reagister
    userRagisterCreate?: string

    //Payment
    verifyStripePayment: string;
    createStripePaymentIntent: string;
    getPlan: string;

    //UpComing Program
    getUpComingProgram: string;

    //LiveCourses
    getAllLiveCourses?: string;

    //Hyper-Specialist
    createHyperSpecialist?: string;
    getAllHyperSpecialist?: string;
}

// Define and export the API endpoint object
const endPointApi: EndPointApi = {
    login: 'auth/login',
    register: 'auth/register',
    logout: 'auth/logout',
    getProfile: 'auth/profile',

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
    postAddExamPlanToCart: 'cart/add-exam-plan', // ✅ NEW
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

    //Hyper-Specialist
    getAllHyperSpecialist: 'hyperspecialist/getall',
};

export default endPointApi;